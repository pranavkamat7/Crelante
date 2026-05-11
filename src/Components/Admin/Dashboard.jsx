import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Plus, Trash2, Download, FileText, Loader2 } from "lucide-react";

export default function Dashboard() {
  // ── Form State ──
  const [meta, setMeta] = useState({
    invoiceNo: "INV-001",
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +14 days
  });

  const [client, setClient] = useState({
    name: "",
    address: "",
  });

  const [notes, setNotes] = useState("Thank you for your business. Payment is due within 14 days.");

  const [serviceInput, setServiceInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [items, setItems] = useState([]);
  
  const [isGenerating, setIsGenerating] = useState(false);

  // ── Handlers ──
  const addItem = (e) => {
    e.preventDefault();
    if (!serviceInput || !priceInput) return;
    setItems([...items, { service: serviceInput, price: Number(priceInput) }]);
    setServiceInput("");
    setPriceInput("");
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  // ── PDF Generation ──
  const downloadPDF = async () => {
  setIsGenerating(true);
  try {
    const element = document.getElementById("invoice-capture");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      // Make sure full height is captured
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // How tall is the full image in PDF mm units?
    const imgHeightMm = (canvas.height * pdfWidth) / canvas.width;

    let yOffset = 0; // how far down the image we've printed (in mm)

    while (yOffset < imgHeightMm) {
      if (yOffset > 0) pdf.addPage();

      // How many mm of image remain?
      const remaining = imgHeightMm - yOffset;
      const sliceHeight = Math.min(pdfHeight, remaining);

      // We crop the canvas to just this slice
      const sliceCanvas = document.createElement("canvas");
      const scaleRatio = canvas.width / pdfWidth; // px per mm
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.round(sliceHeight * scaleRatio);

      const ctx = sliceCanvas.getContext("2d");
      ctx.drawImage(
        canvas,
        0, Math.round(yOffset * scaleRatio),          // source x, y
        canvas.width, sliceCanvas.height,              // source w, h
        0, 0,                                          // dest x, y
        sliceCanvas.width, sliceCanvas.height          // dest w, h
      );

      const sliceData = sliceCanvas.toDataURL("image/png");
      pdf.addImage(sliceData, "PNG", 0, 0, pdfWidth, sliceHeight);

      yOffset += pdfHeight;
    }

    pdf.save(`${client.name ? client.name.replace(/\s+/g, '_') : 'Client'}_${meta.invoiceNo}.pdf`);
  } catch (error) {
    console.error("Failed to generate PDF", error);
    alert("Something went wrong generating the PDF.");
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Theme ── */
        .dash-page {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #F9F8F6;
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;

          min-height: 100vh;
          background: var(--crn-bg);
          padding: 24px;
          display: flex;
          gap: 32px;
          align-items: flex-start;
          font-family: 'Manrope', sans-serif;
        }

        /* ── Controls Panel ── */
        .dash-controls {
          flex: 1;
          min-width: 320px;
          max-width: 480px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 24px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
        }

        .dash-controls::-webkit-scrollbar { width: 6px; }
        .dash-controls::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

        .dash-header {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--crn-black);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--crn-gray);
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-section-title {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--crn-orange);
        }

        .input-group { display: flex; flex-direction: column; gap: 6px; }
        .input-row { display: flex; gap: 12px; }
        .input-row > * { flex: 1; }

        label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--crn-text-gray);
        }

        input, textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid var(--crn-gray);
          background: var(--crn-bg);
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          color: var(--crn-black);
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        input:focus, textarea:focus {
          background: var(--crn-white);
          border-color: var(--crn-orange);
          box-shadow: 0 0 0 3px rgba(255, 78, 37, 0.1);
        }
        textarea { resize: vertical; min-height: 80px; }

        /* Add Item Form */
        .add-item-form {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .add-item-form .service-col { flex: 2; }
        .add-item-form .price-col { flex: 1; }

        .btn-add {
          padding: 12px;
          border-radius: 8px;
          background: var(--crn-black);
          color: var(--crn-white);
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 43px;
        }
        .btn-add:hover { background: var(--crn-orange); }
        .btn-add:active { transform: scale(0.95); }

        /* Items List */
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--crn-bg);
          border: 1px solid var(--crn-gray);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .item-price { color: var(--crn-text-gray); }
        .btn-remove {
          background: none;
          border: none;
          color: #EF4444;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease;
        }
        .btn-remove:hover { transform: scale(1.1); }

        /* Main Download Button */
        .btn-download {
          width: 100%;
          padding: 18px;
          border-radius: 10px;
          background: var(--crn-orange);
          color: var(--crn-white);
          border: none;
          font-family: 'Manrope', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
          margin-top: 10px;
        }
        .btn-download:hover:not(:disabled) {
          background: #E03E15;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 78, 37, 0.3);
        }
        .btn-download:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* ── Preview Panel & A4 Invoice ── */
        .dash-preview {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-x: auto;
          padding-bottom: 40px;
        }

        .invoice-paper {
          width: 794px; 
          min-height: 1123px; 
          background: var(--crn-white);
          padding: 60px;
          box-sizing: border-box;
          box-shadow: 0 24px 60px rgba(0,0,0,0.08);
          position: relative;
          color: var(--crn-black);
          transform-origin: top center; 
        }

        .inv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 60px;
        }

        .inv-brand { display: flex; align-items: center; gap: 16px; }
        .inv-logo { width: 56px; height: 56px; object-fit: contain; }
        .inv-company-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 2px 0;
        }
        .inv-company-details {
          font-size: 0.8rem;
          color: var(--crn-text-gray);
          line-height: 1.5;
        }

        .inv-meta { text-align: right; }
        .inv-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--crn-gray);
          margin: 0 0 16px 0;
          text-transform: uppercase;
        }
        .inv-meta-grid {
          display: grid;
          grid-template-columns: auto auto;
          gap: 8px 24px;
          font-size: 0.85rem;
          text-align: right;
        }
        .inv-meta-label { font-weight: 700; color: var(--crn-text-gray); }
        .inv-meta-val { font-weight: 600; }

        .inv-bill-to {
          margin-bottom: 48px;
        }
        .inv-section-title {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--crn-text-gray);
          margin-bottom: 8px;
          border-bottom: 2px solid var(--crn-black);
          padding-bottom: 4px;
          display: inline-block;
        }
        .inv-client-name { font-size: 1.2rem; font-weight: 800; margin: 0 0 4px 0; }
        .inv-client-addr { font-size: 0.9rem; color: var(--crn-text-gray); white-space: pre-wrap; margin: 0;}

        /* Table */
        .inv-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
        }
        .inv-th {
          text-align: left;
          padding: 12px 16px;
          background: var(--crn-black);
          color: var(--crn-white);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .inv-th.right, .inv-td.right { text-align: right; }
        
        .inv-td {
          padding: 16px;
          border-bottom: 1px solid var(--crn-gray);
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* Totals */
        .inv-totals {
          width: 320px;
          margin-left: auto;
          margin-bottom: 60px;
        }
        .inv-total-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          font-size: 0.95rem;
          font-weight: 600;
          border-bottom: 1px solid var(--crn-gray);
        }
        .inv-total-row.grand {
          border-bottom: none;
          background: var(--crn-bg);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--crn-orange);
          border-radius: 8px;
          margin-top: 8px;
        }

        /* Footer / Signatures */
        .inv-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: auto; 
          padding-top: 40px;
        }
        .inv-notes {
          max-width: 400px;
        }
        .inv-notes-title {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--crn-text-gray);
          margin-bottom: 8px;
        }
        .inv-notes-text {
          font-size: 0.85rem;
          color: var(--crn-text-gray);
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .inv-signature-block {
          text-align: center;
          width: 200px;
        }
        .inv-signature-img {
          height: 60px;
          object-fit: contain;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--crn-black);
          width: 100%;
          padding-bottom: 8px;
        }
        .inv-signature-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--crn-black);
          margin-bottom: 2px;
        }
        .inv-signature-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--crn-text-gray);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Responsive Dashboard Layout */
        @media (max-width: 1200px) {
          .dash-page { flex-direction: column; }
          .dash-controls { max-width: 100%; position: static; max-height: none; }
          .dash-preview { width: 100%; justify-content: flex-start; }
          .invoice-paper { transform: scale(0.8); margin-left: -10%; margin-top: -10%; }
        }
        @media (max-width: 768px) {
          .invoice-paper { transform: scale(0.5); margin-left: -25%; margin-top: -25%; }
        }
      `}</style>

      <div className="dash-page">
        
        {/* ── LEFT PANEL: CONTROLS ── */}
        <div className="dash-controls">
          <div className="dash-header">
            <FileText size={24} color="#FF4E25" /> Invoice Generator
          </div>

          <div className="form-section">
            <div className="form-section-title">Meta Information</div>
            <div className="input-row">
              <div className="input-group">
                <label>Invoice #</label>
                <input 
                  value={meta.invoiceNo} 
                  onChange={(e) => setMeta({...meta, invoiceNo: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Issue Date</label>
                <input 
                  type="date" 
                  value={meta.date} 
                  onChange={(e) => setMeta({...meta, date: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Due Date</label>
                <input 
                  type="date" 
                  value={meta.dueDate} 
                  onChange={(e) => setMeta({...meta, dueDate: e.target.value})} 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Client Details</div>
            <div className="input-group">
              <label>Client Name</label>
              <input 
                placeholder="e.g. Acme Corp" 
                value={client.name} 
                onChange={(e) => setClient({...client, name: e.target.value})} 
              />
            </div>
            <div className="input-group">
              <label>Client Address</label>
              <textarea 
                placeholder="123 Business Rd&#10;Tech City, 10010" 
                value={client.address} 
                onChange={(e) => setClient({...client, address: e.target.value})} 
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Services Provided</div>
            
            {items.length > 0 && (
              <div className="items-list">
                {items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span>{item.service}</span>
                    <span className="item-price">
                      ₹ {item.price.toLocaleString()}
                      <button className="btn-remove" onClick={() => removeItem(idx)}>
                        <Trash2 size={16} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form className="add-item-form" onSubmit={addItem}>
              <div className="input-group service-col">
                <label>Description</label>
                <input 
                  placeholder="e.g. Custom SaaS Dev" 
                  value={serviceInput} 
                  onChange={(e) => setServiceInput(e.target.value)} 
                />
              </div>
              <div className="input-group price-col">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={priceInput} 
                  onChange={(e) => setPriceInput(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn-add">
                <Plus size={20} />
              </button>
            </form>
          </div>

          <div className="form-section">
            <div className="form-section-title">Additional Notes</div>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </div>

          <button 
            className="btn-download" 
            onClick={downloadPDF}
            disabled={isGenerating || items.length === 0}
          >
            {isGenerating ? (
              <><Loader2 className="spin" size={20} /> Generating...</>
            ) : (
              <><Download size={20} /> Download PDF</>
            )}
          </button>
        </div>

        {/* ── RIGHT PANEL: A4 PREVIEW ── */}
        <div className="dash-preview">
          
          <div id="invoice-capture" className="invoice-paper">
            
            {/* Header */}
            <div className="inv-header">
              <div className="inv-brand">
                <img src="/crelante.png" alt="Crelante Logo" className="inv-logo" />
                <div>
                  <h1 className="inv-company-name">Crelante</h1>
                  <div className="inv-company-details">
                    Software & Digital Agency<br/>
                    Canacona, Goa, India<br/>
                    crelanteservice@gmail.com
                  </div>
                </div>
              </div>

              <div className="inv-meta">
                <h2 className="inv-title">Invoice</h2>
                <div className="inv-meta-grid">
                  <div className="inv-meta-label">Invoice No:</div>
                  <div className="inv-meta-val">{meta.invoiceNo || "-"}</div>
                  
                  <div className="inv-meta-label">Date:</div>
                  <div className="inv-meta-val">{meta.date || "-"}</div>
                  
                  <div className="inv-meta-label">Due Date:</div>
                  <div className="inv-meta-val">{meta.dueDate || "-"}</div>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="inv-bill-to">
              <div className="inv-section-title">Billed To</div>
              <h3 className="inv-client-name">{client.name || "Client Name"}</h3>
              {client.address ? (
                <p className="inv-client-addr">{client.address}</p>
              ) : (
                <p className="inv-client-addr">Client Address<br/>City, Postal Code</p>
              )}
            </div>

            {/* Table */}
            <table className="inv-table">
              <thead>
                <tr>
                  <th className="inv-th">Description</th>
                  <th className="inv-th right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td className="inv-td" style={{ color: '#ccc' }}>Add services to generate table...</td>
                    <td className="inv-td right">-</td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="inv-td">{item.service}</td>
                      <td className="inv-td right">₹ {item.price.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Totals */}
            <div className="inv-totals">
              <div className="inv-total-row">
                <span>Subtotal</span>
                <span>₹ {total.toLocaleString()}</span>
              </div>
              <div className="inv-total-row grand">
                <span>Total Due</span>
                <span>₹ {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Footer / Signature */}
            <div className="inv-footer">
              <div className="inv-notes">
                {notes && (
                  <>
                    <div className="inv-notes-title">Notes</div>
                    <div className="inv-notes-text">{notes}</div>
                  </>
                )}
              </div>
              
              <div className="inv-signature-block">
                <img 
  src="/psign.jpeg" 
  alt="CEO Signature" 
  className="inv-signature-img" 
/>
                <div className="inv-signature-name">Pranav H. Kamat</div>
                <div className="inv-signature-text">CEO, Crelante</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
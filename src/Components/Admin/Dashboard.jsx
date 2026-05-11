import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Plus,
  Trash2,
  Download,
  FileText,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  // ── Form State ──
  const [meta, setMeta] = useState({
    invoiceNo: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  });

  const [client, setClient] = useState({
    name: "",
    address: "",
  });

  const [notes, setNotes] = useState(
    "Thank you for your business. Payment is due within 14 days."
  );

  const [serviceInput, setServiceInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [items, setItems] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);

  // ── Handlers ──
  const addItem = (e) => {
    e.preventDefault();

    if (!serviceInput || !priceInput) return;

    setItems([
      ...items,
      {
        service: serviceInput,
        price: Number(priceInput),
      },
    ]);

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
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgHeightMm =
        (canvas.height * pdfWidth) / canvas.width;

      let yOffset = 0;

      while (yOffset < imgHeightMm) {
        if (yOffset > 0) pdf.addPage();

        const remaining = imgHeightMm - yOffset;
        const sliceHeight = Math.min(pdfHeight, remaining);

        const sliceCanvas = document.createElement("canvas");

        const scaleRatio = canvas.width / pdfWidth;

        sliceCanvas.width = canvas.width;
        sliceCanvas.height = Math.round(
          sliceHeight * scaleRatio
        );

        const ctx = sliceCanvas.getContext("2d");

        ctx.drawImage(
          canvas,
          0,
          Math.round(yOffset * scaleRatio),
          canvas.width,
          sliceCanvas.height,
          0,
          0,
          sliceCanvas.width,
          sliceCanvas.height
        );

        const sliceData =
          sliceCanvas.toDataURL("image/png");

        pdf.addImage(
          sliceData,
          "PNG",
          0,
          0,
          pdfWidth,
          sliceHeight
        );

        yOffset += pdfHeight;
      }

      pdf.save(
        `${
          client.name
            ? client.name.replace(/\s+/g, "_")
            : "Client"
        }_${meta.invoiceNo}.pdf`
      );
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

        /* ─────────────────────────────
           THEME
        ───────────────────────────── */

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
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        /* ─────────────────────────────
           CONTROLS PANEL
        ───────────────────────────── */

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

        .dash-controls::-webkit-scrollbar {
          width: 6px;
        }

        .dash-controls::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

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

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .input-row > * {
          flex: 1;
        }

        label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--crn-text-gray);
        }

        input,
        textarea {
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
        }

        input:focus,
        textarea:focus {
          background: var(--crn-white);
          border-color: var(--crn-orange);
          box-shadow: 0 0 0 3px rgba(255, 78, 37, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        /* ─────────────────────────────
           ADD ITEM FORM
        ───────────────────────────── */

        .add-item-form {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .add-item-form .service-col {
          flex: 2;
        }

        .add-item-form .price-col {
          flex: 1;
        }

        .btn-add {
          padding: 12px;
          border-radius: 8px;
          background: var(--crn-black);
          color: var(--crn-white);
          border: none;
          cursor: pointer;
          transition: 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 43px;
        }

        .btn-add:hover {
          background: var(--crn-orange);
        }

        /* ─────────────────────────────
           ITEMS
        ───────────────────────────── */

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
          gap: 12px;
        }

        .item-price {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--crn-text-gray);
        }

        .btn-remove {
          background: none;
          border: none;
          color: #EF4444;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        /* ─────────────────────────────
           DOWNLOAD BUTTON
        ───────────────────────────── */

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
          transition: 0.3s ease;
          margin-top: 10px;
        }

        .btn-download:hover:not(:disabled) {
          background: #E03E15;
          transform: translateY(-2px);
        }

        .btn-download:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }

        /* ─────────────────────────────
           PREVIEW PANEL
        ───────────────────────────── */

        .dash-preview {
          flex: 2;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          padding-bottom: 40px;
        }

        /* ─────────────────────────────
           A4 INVOICE
        ───────────────────────────── */

        .invoice-paper {
          width: 794px;
          min-width: 794px;
          min-height: 1123px;
          background: var(--crn-white);
          padding: 60px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.08);
          color: var(--crn-black);
        }

        .inv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 60px;
          gap: 24px;
        }

        .inv-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .inv-logo {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }

        .inv-company-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0;
        }

        .inv-company-details {
          font-size: 0.8rem;
          color: var(--crn-text-gray);
          line-height: 1.5;
        }

        .inv-meta {
          text-align: right;
        }

        .inv-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--crn-gray);
          margin: 0 0 16px;
          text-transform: uppercase;
        }

        .inv-meta-grid {
          display: grid;
          grid-template-columns: auto auto;
          gap: 8px 24px;
          font-size: 0.85rem;
        }

        .inv-meta-label {
          font-weight: 700;
          color: var(--crn-text-gray);
        }

        .inv-meta-val {
          font-weight: 600;
        }

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

        .inv-client-name {
          font-size: 1.2rem;
          font-weight: 800;
          margin: 0 0 4px;
        }

        .inv-client-addr {
          font-size: 0.9rem;
          color: var(--crn-text-gray);
          white-space: pre-wrap;
        }

        /* TABLE */

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
        }

        .inv-th.right,
        .inv-td.right {
          text-align: right;
        }

        .inv-td {
          padding: 16px;
          border-bottom: 1px solid var(--crn-gray);
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* TOTALS */

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
          background: var(--crn-bg);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--crn-orange);
          border-radius: 8px;
          margin-top: 8px;
          border-bottom: none;
        }

        /* FOOTER */

        .inv-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
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
        }

        .inv-signature-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--crn-text-gray);
        }

        /* ─────────────────────────────
           RESPONSIVE
        ───────────────────────────── */

        @media (max-width: 1200px) {
          .dash-page {
            flex-direction: column;
            padding: 16px;
            gap: 20px;
          }

          .dash-controls {
            width: 100%;
            max-width: 100%;
            position: relative;
            top: unset;
            max-height: unset;
            overflow: visible;
          }

          .invoice-paper {
            transform: scale(0.9);
            transform-origin: top left;
          }
        }

        @media (max-width: 768px) {
          .dash-page {
            padding: 12px;
            gap: 16px;
          }

          .dash-controls {
            padding: 20px;
            border-radius: 16px;
            min-width: unset;
          }

          .dash-header {
            font-size: 1.2rem;
          }

          .input-row {
            flex-direction: column;
          }

          .add-item-form {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-add {
            width: 100%;
          }

          .btn-download {
            font-size: 0.9rem;
            padding: 16px;
          }

          .invoice-paper {
            transform: scale(0.45);
            transform-origin: top left;
            margin-bottom: -600px;
          }
        }

        @media (max-width: 480px) {
          .invoice-paper {
            transform: scale(0.38);
            margin-bottom: -720px;
          }

          .dash-controls {
            padding: 16px;
          }

          .item-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .item-price {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="dash-page">
        {/* LEFT PANEL */}

        <div className="dash-controls">
          <div className="dash-header">
            <FileText size={24} color="#FF4E25" />
            Invoice Generator
          </div>

          {/* META */}

          <div className="form-section">
            <div className="form-section-title">
              Meta Information
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Invoice #</label>

                <input
                  value={meta.invoiceNo}
                  onChange={(e) =>
                    setMeta({
                      ...meta,
                      invoiceNo: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Issue Date</label>

                <input
                  type="date"
                  value={meta.date}
                  onChange={(e) =>
                    setMeta({
                      ...meta,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Due Date</label>

                <input
                  type="date"
                  value={meta.dueDate}
                  onChange={(e) =>
                    setMeta({
                      ...meta,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* CLIENT */}

          <div className="form-section">
            <div className="form-section-title">
              Client Details
            </div>

            <div className="input-group">
              <label>Client Name</label>

              <input
                placeholder="e.g. Acme Corp"
                value={client.name}
                onChange={(e) =>
                  setClient({
                    ...client,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="input-group">
              <label>Client Address</label>

              <textarea
                placeholder="123 Business Rd"
                value={client.address}
                onChange={(e) =>
                  setClient({
                    ...client,
                    address: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* ITEMS */}

          <div className="form-section">
            <div className="form-section-title">
              Services Provided
            </div>

            {items.length > 0 && (
              <div className="items-list">
                {items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span>{item.service}</span>

                    <span className="item-price">
                      ₹ {item.price.toLocaleString()}

                      <button
                        className="btn-remove"
                        onClick={() => removeItem(idx)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form
              className="add-item-form"
              onSubmit={addItem}
            >
              <div className="input-group service-col">
                <label>Description</label>

                <input
                  placeholder="e.g. Custom SaaS Dev"
                  value={serviceInput}
                  onChange={(e) =>
                    setServiceInput(e.target.value)
                  }
                />
              </div>

              <div className="input-group price-col">
                <label>Amount (₹)</label>

                <input
                  type="number"
                  placeholder="0.00"
                  value={priceInput}
                  onChange={(e) =>
                    setPriceInput(e.target.value)
                  }
                />
              </div>

              <button type="submit" className="btn-add">
                <Plus size={20} />
              </button>
            </form>
          </div>

          {/* NOTES */}

          <div className="form-section">
            <div className="form-section-title">
              Additional Notes
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* DOWNLOAD */}

          <button
            className="btn-download"
            onClick={downloadPDF}
            disabled={
              isGenerating || items.length === 0
            }
          >
            {isGenerating ? (
              <>
                <Loader2 className="spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* RIGHT PANEL */}

        <div className="dash-preview">
          <div
            id="invoice-capture"
            className="invoice-paper"
          >
            {/* HEADER */}

            <div className="inv-header">
              <div className="inv-brand">
                <img
                  src="/crelante.png"
                  alt="Logo"
                  className="inv-logo"
                />

                <div>
                  <h1 className="inv-company-name">
                    Crelante
                  </h1>

                  <div className="inv-company-details">
                    Software & Digital Agency
                    <br />
                    Goa, India
                    <br />
                    crelanteservice@gmail.com
                  </div>
                </div>
              </div>

              <div className="inv-meta">
                <h2 className="inv-title">
                  Invoice
                </h2>

                <div className="inv-meta-grid">
                  <div className="inv-meta-label">
                    Invoice No:
                  </div>

                  <div className="inv-meta-val">
                    {meta.invoiceNo}
                  </div>

                  <div className="inv-meta-label">
                    Date:
                  </div>

                  <div className="inv-meta-val">
                    {meta.date}
                  </div>

                  <div className="inv-meta-label">
                    Due Date:
                  </div>

                  <div className="inv-meta-val">
                    {meta.dueDate}
                  </div>
                </div>
              </div>
            </div>

            {/* CLIENT */}

            <div className="inv-bill-to">
              <div className="inv-section-title">
                Billed To
              </div>

              <h3 className="inv-client-name">
                {client.name || "Client Name"}
              </h3>

              <p className="inv-client-addr">
                {client.address ||
                  "Client Address"}
              </p>
            </div>

            {/* TABLE */}

            <table className="inv-table">
              <thead>
                <tr>
                  <th className="inv-th">
                    Description
                  </th>

                  <th className="inv-th right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      className="inv-td"
                      style={{ color: "#ccc" }}
                    >
                      Add services...
                    </td>

                    <td className="inv-td right">
                      -
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="inv-td">
                        {item.service}
                      </td>

                      <td className="inv-td right">
                        ₹{" "}
                        {item.price.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* TOTAL */}

            <div className="inv-totals">
              <div className="inv-total-row">
                <span>Subtotal</span>

                <span>
                  ₹ {total.toLocaleString()}
                </span>
              </div>

              <div className="inv-total-row grand">
                <span>Total Due</span>

                <span>
                  ₹ {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* FOOTER */}

            <div className="inv-footer">
              <div className="inv-notes">
                <div className="inv-notes-title">
                  Notes
                </div>

                <div className="inv-notes-text">
                  {notes}
                </div>
              </div>

              <div className="inv-signature-block">
                <img
                  src="/psign.jpeg"
                  alt="Signature"
                  className="inv-signature-img"
                />

                <div className="inv-signature-name">
                  Pranav H. Kamat
                </div>

                <div className="inv-signature-text">
                  CEO, Crelante
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
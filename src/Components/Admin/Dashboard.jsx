import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Dashboard() {
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!service || !price) return;
    setItems([...items, { service, price: Number(price) }]);
    setService("");
    setPrice("");
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);

  const downloadPDF = async () => {
    const element = document.getElementById("invoice");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${client}_invoice.pdf`);
  };

  return (
    <div style={styles.page}>
      {/* LEFT PANEL */}
      <div style={styles.panel}>
        <h2 style={styles.heading}>Invoice Details</h2>

        <input
          style={styles.input}
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Price (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addItem}>
          + Add Service
        </button>

        <button style={styles.pdfBtn} onClick={downloadPDF}>
          Download Invoice PDF
        </button>
      </div>

      {/* INVOICE PREVIEW */}
      <div style={styles.previewWrapper}>
        <div id="invoice" style={styles.invoice}>
          <div style={styles.invoiceHeader}>
            <div style={styles.brand}>
              <img
                src="/crelante.png"
                alt="Crelante Logo"
                style={styles.logoImg}
              />
              <div>
                <h2 style={styles.businessName}>Crelante</h2>
                <p style={styles.businessTag}>Digital Solutions</p>
              </div>
            </div>

            <div style={styles.invoiceMeta}>
              <p style={styles.invoiceTitle}>INVOICE</p>
              <p style={styles.invoiceDate}>
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div style={styles.client}>
            <p>
              <b>Billed To:</b>
            </p>
            <p>{client || "Client Name"}</p>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{i.service}</td>
                  <td style={styles.td}>₹ {i.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>
            <p>Total</p>
            <p>₹ {total}</p>
          </div>

          <p style={styles.footer}>Thank you for your business 🙏</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  panel: {
    flex: "1",
    minWidth: "280px",
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  heading: {
    marginBottom: "16px",
    fontSize: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  addBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  pdfBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  previewWrapper: {
    flex: "1",
    minWidth: "300px",
  },

  invoice: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    maxWidth: "600px",
    margin: "auto",
  },

  invoiceHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  logo: {
    color: "#2563eb",
  },

  client: {
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    borderBottom: "2px solid #e5e7eb",
    textAlign: "left",
    padding: "8px",
  },

  td: {
    padding: "8px",
    borderBottom: "1px solid #f1f5f9",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    fontSize: "18px",
    fontWeight: "700",
  },

  footer: {
    marginTop: "30px",
    fontSize: "13px",
    textAlign: "center",
    color: "#6b7280",
  },
  brand: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
},

logoImg: {
  width: "42px",
  height: "42px",
  objectFit: "contain",
},

businessName: {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  color: "#2563eb",
},

businessTag: {
  margin: 0,
  fontSize: "12px",
  color: "#6b7280",
},

invoiceMeta: {
  textAlign: "right",
},

invoiceTitle: {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "1px",
},

invoiceDate: {
  margin: 0,
  fontSize: "12px",
  color: "#6b7280",
},

};

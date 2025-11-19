import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./InvoicePage.module.css";
import { Download } from "lucide-react";
// ⚠️ Make sure to run: npm install html2pdf.js
import html2pdf from "html2pdf.js";
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import Button from "../../../components/Button/Button";

export default function InvoicePage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Mock Invoice Data
  const invoiceData = {
    invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    product: BUY_NOW_DATA[buyNowId] || { title: "Unknown Product", price: "0" },
    customer: {
      name: user?.name || "John Doe",
      email: user?.email || "john.doe@example.com",
      address: "123, Jubilee Hills, Hyderabad, Telangana, 500033",
      phone: user?.phone || "+91 98765 43210",
    },
    company: {
      name: "BrainBuzz Learning Solutions",
      address: "4th Floor, Tech Park, Madhapur, Hyderabad, 500081",
      gst: "36ABCDE1234F1Z5",
      email: "support@brainbuzz.in",
      website: "www.brainbuzz.in",
    },
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  const itemPrice = parsePrice(invoiceData.product.price);
  const taxRate = 0.18; // 18% GST
  const taxAmount = itemPrice * taxRate;
  const totalAmount = itemPrice + taxAmount;

  // Logic to download content as PDF
  const handleDownload = () => {
    const element = document.getElementById("invoice-content");
    const opt = {
      margin: 0, // No margin to keep A4 styling intact
      filename: `Invoice-${invoiceData.invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and Save
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className={styles.pageBackground}>
      {/* Toolbar: Only Download button on the right */}
      <div className={styles.toolbar}>
        <div className={styles.actionGroup}>
          <Button
            label="Download PDF"
            onClick={handleDownload}
            icon={<Download size={18} />}
            className={styles.downloadBtn}
          />
        </div>
      </div>

      {/* Invoice Paper - The content to be downloaded */}
      <div className={styles.invoicePaper} id="invoice-content">
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.companyInfo}>
            <h1 className={styles.logo}>BrainBuzz</h1>
            <p className={styles.companyAddress}>
              {invoiceData.company.address}
              <br />
              GSTIN: {invoiceData.company.gst}
              <br />
              {invoiceData.company.email}
            </p>
          </div>
          <div className={styles.invoiceMeta}>
            <h2 className={styles.invoiceTitle}>INVOICE</h2>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Invoice No:</span>
              <span className={styles.metaValue}>
                {invoiceData.invoiceNumber}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Date:</span>
              <span className={styles.metaValue}>{invoiceData.date}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Status:</span>
              <span className={`${styles.metaValue} ${styles.paid}`}>PAID</span>
            </div>
          </div>
        </header>

        {/* Addresses */}
        <section className={styles.addressSection}>
          <div className={styles.billTo}>
            <h3>Bill To:</h3>
            <p className={styles.customerName}>{invoiceData.customer.name}</p>
            <p>{invoiceData.customer.address}</p>
            <p>Phone: {invoiceData.customer.phone}</p>
            <p>Email: {invoiceData.customer.email}</p>
          </div>
        </section>

        {/* Items Table */}
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th className={styles.descCol}>Description</th>
              <th className={styles.centerCol}>Qty</th>
              <th className={styles.rightCol}>Price</th>
              <th className={styles.rightCol}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className={styles.descCol}>
                <strong>{invoiceData.product.title}</strong>
                <p className={styles.itemSubtext}>
                  {invoiceData.product.description?.substring(0, 60)}...
                </p>
              </td>
              <td className={styles.centerCol}>1</td>
              <td className={styles.rightCol}>₹{itemPrice.toFixed(2)}</td>
              <td className={styles.rightCol}>₹{itemPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <section className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{itemPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>GST (18%):</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
            <span>Grand Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.terms}>
            <h4>Terms & Conditions</h4>
            <p>1. This is a computer-generated invoice.</p>
            <p>2. All disputes are subject to Hyderabad jurisdiction.</p>
          </div>
          <div className={styles.signature}>
            <p>Authorized Signatory</p>
            <div className={styles.signBox}>BrainBuzz</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./PaymentSuccessPage.module.css";
import Button from "../../../components/Button/Button";
// Added icons for promotions
import {
  CheckCircle,
  Download,
  Home,
  MonitorPlay,
  FileText,
  BookOpen,
  Video,
  ArrowRight,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { buyNowId } = useParams();
  const [searchParams] = useSearchParams();

  // Mock Payment Details (In a real app, fetch these from backend or state)
  const paymentDetails = {
    amount: "9999.00",
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    referenceNumber: "PAY123456789",
    paymentMethod: "UPI",
    senderName: "John Doe",
    senderEmail: "john.doe@example.com",
  };

  // Mock Data for Promotions
  const promotions = [
    {
      id: 1,
      title: "UPSC Prelims 2025 Course",
      category: "Online Course",
      price: "₹14,999",
      icon: <MonitorPlay size={24} color="#007bff" />,
      link: "/online-courses",
      bg: "#e3f2fd",
    },
    {
      id: 2,
      title: "SSC CGL Test Series Pack",
      category: "Test Series",
      price: "₹999",
      icon: <FileText size={24} color="#28a745" />,
      link: "/test-series",
      bg: "#e8f5e9",
    },
    {
      id: 3,
      title: "Indian Polity by Laxmikanth",
      category: "E-Book",
      price: "₹450",
      icon: <BookOpen size={24} color="#ffc107" />,
      link: "/ebooks",
      bg: "#fff9db",
    },
    {
      id: 4,
      title: "Daily Current Affairs Live",
      category: "Live Class",
      price: "₹199/mo",
      icon: <Video size={24} color="#dc3545" />,
      link: "/liveclasses",
      bg: "#f8d7da",
    },
  ];

  const handleDownloadInvoice = () => {
    // Open Invoice Page in a New Tab
    window.open(`/invoice/${buyNowId}`, "_blank");
    // Simulate email alert
    // alert(`Invoice sent to ${paymentDetails.senderEmail}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.successIconWrapper}>
          <CheckCircle className={styles.successIcon} size={64} />
        </div>

        <h1 className={styles.title}>Payment Success!</h1>
        <p className={styles.subtitle}>
          Your payment has been successfully processed.
        </p>

        <div className={styles.amountWrapper}>
          <span className={styles.currency}>₹</span>
          <span className={styles.amount}>{paymentDetails.amount}</span>
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Payment Date</span>
            <span className={styles.value}>
              {paymentDetails.date}, {paymentDetails.time}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Reference No.</span>
            <span className={styles.value}>
              {paymentDetails.referenceNumber}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Payment Method</span>
            <span className={styles.value}>{paymentDetails.paymentMethod}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Sender Name</span>
            <span className={styles.value}>{paymentDetails.senderName}</span>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.downloadBtn}
            onClick={handleDownloadInvoice}
          >
            <Download size={18} />
            Download Invoice
          </button>

          <Button
            label="Go to Home"
            onClick={handleGoHome}
            className={styles.homeBtn}
            icon={<Home size={18} />}
          />
        </div>

        <p className={styles.emailNote}>
          A confirmation email has been sent to{" "}
          <strong>{paymentDetails.senderEmail}</strong>
        </p>
      </div>

      {/* --- New Promotions Section --- */}
      <div className={styles.promoSection}>
        <h3 className={styles.promoTitle}>
          Check out our other popular courses
        </h3>
        <div className={styles.promoGrid}>
          {promotions.map((item) => (
            <div
              key={item.id}
              className={styles.promoCard}
              onClick={() => navigate(item.link)}
            >
              <div
                className={styles.promoIcon}
                style={{ backgroundColor: item.bg }}
              >
                {item.icon}
              </div>
              <div className={styles.promoContent}>
                <span className={styles.promoCategory}>{item.category}</span>
                <h4 className={styles.promoName}>{item.title}</h4>
                <div className={styles.promoFooter}>
                  <span className={styles.promoPrice}>{item.price}</span>
                  <span className={styles.promoLink}>
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

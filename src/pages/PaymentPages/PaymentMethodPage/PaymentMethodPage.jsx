import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./PaymentMethodPage.module.css";

// Icons
import {
  Smartphone,
  Wallet,
  CreditCard,
  Globe,
  Percent,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// Imports
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import Button from "../../../components/Button/Button";

export default function PaymentMethodPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();

  // Get product data
  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  const [selectedMethod, setSelectedMethod] = useState("UPI");

  // --- State for individual methods ---
  const [upiId, setUpiId] = useState("");
  const [saveVPA, setSaveVPA] = useState(true);

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // Payment Methods List
  const paymentMethods = [
    {
      id: "UPI",
      label: "UPI (Google Pay, PhonePe, Paytm etc)",
      icon: <Smartphone size={20} />,
    },
    {
      id: "Wallets",
      label: "Wallets (Paytm, PhonePe, Amazon Pay etc)",
      icon: <Wallet size={20} />,
    },
    {
      id: "Card",
      label: "Credit / Debit / ATM Card",
      icon: <CreditCard size={20} />,
    },
    { id: "NetBanking", label: "Net Banking", icon: <Globe size={20} /> },
    { id: "EMI", label: "EMI", icon: <Percent size={20} /> },
  ];

  // --- Mock Data for Options ---
  const walletsList = [
    "Paytm",
    "PhonePe Wallet",
    "Amazon Pay",
    "Mobikwik",
    "Freecharge",
  ];
  const popularBanks = [
    "HDFC Bank",
    "SBI",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Bank",
  ];

  const handlePay = () => {
    let paymentDetails = { method: selectedMethod, amount: productData?.price };
    let isValid = true;

    if (selectedMethod === "UPI") {
      if (!upiId) {
        alert("Please enter a valid UPI ID");
        isValid = false;
      }
      paymentDetails.details = { upiId, saveVPA };
    } else if (selectedMethod === "Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill all card details");
        isValid = false;
      }
      paymentDetails.details = cardDetails;
    } else if (selectedMethod === "Wallets") {
      if (!selectedWallet) {
        alert("Please select a wallet");
        isValid = false;
      }
      paymentDetails.details = { wallet: selectedWallet };
    } else if (selectedMethod === "NetBanking") {
      if (!selectedBank) {
        alert("Please select a bank");
        isValid = false;
      }
      paymentDetails.details = { bank: selectedBank };
    }

    if (isValid) {
      console.log("Initiating Payment:", paymentDetails);
      // In a real app, you would wait for payment gateway response here
      // For now, simulate success and navigate
      navigate(`/payment-success/${buyNowId}`);
    }
  };

  // Fallback
  if (!productData) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}></div>

      <div className={styles.contentContainer}>
        {/* --- Left Card: Payment Selection --- */}
        <div className={styles.paymentCard}>
          <h2 className={styles.cardTitle}>Select Payment Method</h2>

          <div className={styles.paymentLayout}>
            {/* Sidebar: Methods List */}
            <div className={styles.sidebar}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`${styles.methodItem} ${
                    selectedMethod === method.id ? styles.activeMethod : ""
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <span className={styles.methodIcon}>{method.icon}</span>
                  <span className={styles.methodLabel}>{method.label}</span>
                  {selectedMethod === method.id && (
                    <CheckCircle2 className={styles.activeCheck} size={18} />
                  )}
                </div>
              ))}
            </div>

            {/* Content Area: Specific Form */}
            <div className={styles.contentArea}>
              {/* 1. UPI Section */}
              {selectedMethod === "UPI" && (
                <div className={styles.methodContent}>
                  <h3 className={styles.contentTitle}>Add a new UPI ID</h3>
                  <p className={styles.contentSubtitle}>
                    You need to have a registered UPI ID
                  </p>

                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Enter your UPI Id (e.g. 9876543210@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="saveVPA"
                      checked={saveVPA}
                      onChange={(e) => setSaveVPA(e.target.checked)}
                    />
                    <label htmlFor="saveVPA">
                      Securely save this VPA for future use
                    </label>
                  </div>

                  <Button
                    label="Verify & Pay"
                    onClick={handlePay}
                    className={styles.payButton}
                  />
                </div>
              )}

              {/* 2. Wallets Section */}
              {selectedMethod === "Wallets" && (
                <div className={styles.methodContent}>
                  <h3 className={styles.contentTitle}>Select a Wallet</h3>
                  <div className={styles.listGroup}>
                    {walletsList.map((wallet) => (
                      <div
                        key={wallet}
                        className={`${styles.listItem} ${
                          selectedWallet === wallet ? styles.activeList : ""
                        }`}
                        onClick={() => setSelectedWallet(wallet)}
                      >
                        <span>{wallet}</span>
                        {selectedWallet === wallet && (
                          <CheckCircle2
                            size={18}
                            className={styles.activeCheck}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    label={`Pay via ${selectedWallet || "Wallet"}`}
                    onClick={handlePay}
                    className={styles.payButton}
                    disabled={!selectedWallet}
                  />
                </div>
              )}

              {/* 3. Card Section */}
              {selectedMethod === "Card" && (
                <div className={styles.methodContent}>
                  <h3 className={styles.contentTitle}>Enter Card Details</h3>
                  <div className={styles.cardForm}>
                    <input
                      className={styles.input}
                      placeholder="Card Number"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value,
                        })
                      }
                    />
                    <div className={styles.cardRow}>
                      <input
                        className={styles.input}
                        placeholder="Valid Thru (MM/YY)"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                      />
                      <input
                        className={styles.input}
                        placeholder="CVV"
                        maxLength={3}
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                      />
                    </div>
                    <input
                      className={styles.input}
                      placeholder="Name on Card"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    label="Pay Now"
                    onClick={handlePay}
                    className={styles.payButton}
                  />
                </div>
              )}

              {/* 4. Net Banking Section */}
              {selectedMethod === "NetBanking" && (
                <div className={styles.methodContent}>
                  <h3 className={styles.contentTitle}>Popular Banks</h3>
                  <div className={styles.bankGrid}>
                    {popularBanks.map((bank) => (
                      <div
                        key={bank}
                        className={`${styles.bankItem} ${
                          selectedBank === bank ? styles.activeBank : ""
                        }`}
                        onClick={() => setSelectedBank(bank)}
                      >
                        {bank}
                      </div>
                    ))}
                  </div>

                  <div className={styles.otherBanks}>
                    <label>All Banks</label>
                    <select
                      className={styles.select}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      value={selectedBank}
                    >
                      <option value="" disabled>
                        Select your bank
                      </option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="Canara Bank">Canara Bank</option>
                      <option value="Punjab National Bank">
                        Punjab National Bank
                      </option>
                      <option value="Union Bank">Union Bank</option>
                    </select>
                  </div>

                  <Button
                    label="Proceed to Pay"
                    onClick={handlePay}
                    className={styles.payButton}
                    disabled={!selectedBank}
                  />
                </div>
              )}

              {/* 5. EMI Section */}
              {selectedMethod === "EMI" && (
                <div className={styles.placeholderContent}>
                  <h3 className={styles.contentTitle}>EMI Not Available</h3>
                  <p className={styles.contentSubtitle}>
                    EMI options are currently not available for this product.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Right Card: Order Summary --- */}
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Total items</span>
            <span className={styles.summaryValue}>01</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Total MRP</span>
            <span className={styles.summaryValue}>{productData.price}</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Coupon Discount</span>
            <span className={styles.summaryValue}>0</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total Amount</span>
            <span className={styles.totalValue}>{productData.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

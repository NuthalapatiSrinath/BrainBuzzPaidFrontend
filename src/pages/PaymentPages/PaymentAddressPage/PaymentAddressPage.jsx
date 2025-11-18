import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./PaymentAddressPage.module.css";
// ✅ FIX: Path updated to ../../../../
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { FaUserCircle, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

// Data for the State dropdown
const states = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi",
  "Other",
];

export default function PaymentAddressPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Get product data
  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  // Form state, pre-filled with user data
  const [addressInfo, setAddressInfo] = useState({
    fullName: user?.name || "",
    mobile: user?.phone || "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "Telangana", // Default state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = () => {
    // In a real app, you would save this address
    console.log("Address Data:", addressInfo);
    // ✅ UPDATED: Navigate to the new checkout page
    navigate(`/payment-checkout/${buyNowId}`);
  };

  if (!isAuthenticated) {
    // This page should not be reachable if not logged in
    // Redirect back to the login step
    navigate(`/buy-now/${buyNowId}`);
    return null;
  }

  if (!productData) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Product not found</h2>
          <Button label="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.mainHeader}>Secure payment</h1>

        <div className={styles.gridContainer}>
          {/* --- Left Column: Order Details --- */}
          <div className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h2 className={styles.cardTitle}>Order Details</h2>

              <div className={styles.productDetails}>
                <h3 className={styles.productTitle}>{productData.title}</h3>
                <p className={styles.productDesc}>{productData.description}</p>
              </div>

              <div className={styles.priceDetails}>
                <h3 className={styles.priceTitle}>Price Details</h3>
                <div className={styles.priceRow}>
                  <span>Price</span>
                  <span>{productData.price}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Discount</span>
                  <span className={styles.discount}>- Rs. 0</span>
                </div>
                <div className={styles.priceRowTotal}>
                  <span>Total Amount</span>
                  <span>{productData.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Payment Steps --- */}
          <div className={styles.paymentColumn}>
            {/* Stepper (Step 2 Active) */}
            <div className={styles.stepper}>
              <div className={`${styles.stepItem} ${styles.activeStep}`}>
                <span className={styles.stepIcon}>
                  <FaUserCircle />
                </span>
                <span className={styles.stepLabel}>Account</span>
              </div>
              <div className={styles.stepConnector}></div>
              <div className={`${styles.stepItem} ${styles.activeStep}`}>
                <span className={styles.stepIcon}>
                  <FaMapMarkerAlt />
                </span>
                <span className={styles.stepLabel}>Address</span>
              </div>
              <div className={styles.stepConnector}></div>
              <div className={styles.stepItem}>
                <span className={styles.stepIcon}>
                  <FaCreditCard />
                </span>
                <span className={styles.stepLabel}>Payment</span>
              </div>
            </div>

            {/* Step Content: Address Form */}
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>+ Add New Address</h3>

              <form
                className={styles.addressForm}
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  label="Full Name"
                  name="fullName"
                  value={addressInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                <Input
                  label="Mobile Number"
                  name="mobile"
                  value={addressInfo.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  type="tel"
                />
                <Input
                  label="Address (House No, Building, Street, Area)"
                  name="address"
                  value={addressInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
                <Input
                  label="Landmark"
                  name="landmark"
                  value={addressInfo.landmark}
                  onChange={handleInputChange}
                  placeholder="E.g. Near BrainBuzz Office"
                />
                <div className={styles.formRow}>
                  <Input
                    label="Pincode"
                    name="pincode"
                    value={addressInfo.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter pincode"
                    type="number"
                  />
                  <Input
                    label="City"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>

                {/* State Dropdown */}
                <div className={styles.inputGroup}>
                  <label htmlFor="state" className={styles.inputLabel}>
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className={styles.selectInput}
                    value={addressInfo.state}
                    onChange={handleInputChange}
                  >
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  label="Proceed to Pay"
                  onClick={handleProceedToPayment}
                  className={styles.proceedButton}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./PaymentAddressPage.module.css";

// Icons
import {
  User,
  Phone,
  Mail,
  MapPin,
  Navigation,
  Home,
  RotateCcw,
  Save,
} from "lucide-react";

// Imports
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import Button from "../../../components/Button/Button";

export default function PaymentAddressPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();

  // Auth state
  const { user } = useSelector((state) => state.auth);

  // Initial State Definition
  const initialState = {
    fullName: "",
    mobileNumber: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState(initialState);

  // Pre-fill data when user is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        mobileNumber: user.phone || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Get product data
  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset Form Logic
  const handleReset = () => {
    setFormData(initialState);
  };

  // Save Address Logic
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Address Saved:", formData);
    alert("Address Saved Successfully!");
    // Add backend save logic here
  };

  // Proceed Logic (Navigation)
  const handleProceed = () => {
    // Validation can be added here
    if (!formData.fullName || !formData.mobileNumber) {
      alert("Please fill in the required details");
      return;
    }
    console.log("Proceeding to payment method selection...");
    // ✅ Navigate to Payment Method Page
    navigate(`/payment-method/${buyNowId}`);
  };

  // Fallback if no product
  if (!productData) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}></div>

      <div className={styles.contentContainer}>
        {/* --- Left Card: Billing Address Form --- */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Billing Address</h2>

          <form className={styles.addressForm} onSubmit={handleSave}>
            <div className={styles.formGrid}>
              {/* Full Name */}
              <div className={styles.formGroup}>
                <label>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <User className={styles.icon} size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className={styles.formGroup}>
                <label>
                  Mobile Number <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Phone className={styles.icon} size={18} />
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className={styles.formGroup}>
                <label>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.icon} size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* State */}
              <div className={styles.formGroup}>
                <label>
                  State <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <MapPin className={styles.icon} size={18} />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
              </div>

              {/* City */}
              <div className={styles.formGroup}>
                <label>
                  City <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Navigation className={styles.icon} size={18} />
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Pincode */}
              <div className={styles.formGroup}>
                <label>
                  Pincode <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <MapPin className={styles.icon} size={18} />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Address (Full Width) */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>
                  Address (Area and Street){" "}
                  <span className={styles.required}>*</span>
                </label>
                <div
                  className={`${styles.inputWrapper} ${styles.textareaWrapper}`}
                >
                  <Home className={styles.icon} size={18} />
                  <textarea
                    name="address"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="defaultAddress"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              <label htmlFor="defaultAddress">
                Make this my default address
              </label>
            </div>

            {/* Action Buttons: Reset & Save (Left Side) */}
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.resetButton}
                onClick={handleReset}
              >
                <RotateCcw size={16} /> Reset
              </button>
              <Button
                label={
                  <>
                    <Save size={16} /> Save
                  </>
                }
                type="submit"
                className={styles.saveButton}
              />
            </div>
          </form>
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

          {/* Proceed Button (Right Side) */}
          <Button
            label="Proceed To Payment"
            onClick={handleProceed}
            className={styles.proceedButton}
          />
        </div>
      </div>
    </div>
  );
}

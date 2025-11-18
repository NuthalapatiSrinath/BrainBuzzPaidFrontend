import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./PaymentPage.module.css";

// ✅ Corrected imports with ../../../ path
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import Button from "../../../components/Button/Button";
import { openModal } from "../../../redux/slices/modalSlice";

// ✅ Icon for the placeholder image
import { FaBookOpen } from "react-icons/fa";

export default function PaymentPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux to check for login
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Get product data from buyNowData.js
  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  // ✅ Logic for the "Proceed" button
  const handleProceed = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      console.log("User not logged in, opening login modal.");
      dispatch(openModal({ type: "login" })); // Dispatches modal open
    } else {
      // User is logged in, proceed to next step (Address)
      console.log("User logged in, proceeding to Address step.");
      navigate(`/payment-address/${buyNowId}`); // Navigates to next page
    }
  };

  // Fallback if productData isn't found
  if (!productData) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Product not found</h2>
          <p>The product you are trying to buy is not available.</p>
          <Button label="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  // ✅ UI now matches the new image exactly
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {/* --- Left Column: Product Details --- */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <FaBookOpen size={60} />
              </div>
              <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{productData.title}</h1>
                <p className={styles.productDesc}>{productData.description}</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Order Summary --- */}
          <div className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h2 className={styles.cardTitle}>Order Summary</h2>

              <div className={styles.cardContent}>
                <div className={styles.priceRow}>
                  <span>Total Items</span>
                  <span>1</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Total MRP</span>
                  <span>{productData.price}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Coupon Discount</span>
                  <span className={styles.discount}>- Rs. 0</span>
                </div>

                <div className={styles.priceRowTotal}>
                  <strong>Total Amount</strong>
                  <strong>{productData.price}</strong>
                </div>

                <Button
                  label="Proceed"
                  onClick={handleProceed}
                  className={styles.proceedButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

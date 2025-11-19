import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./PaymentPage.module.css";

// Imports
import BUY_NOW_DATA from "../../../data/buyNowData.js";
import { openModal } from "../../../redux/slices/modalSlice";
import Button from "../../../components/Button/Button";
import QuizButton from "../../../components/QuizButton/QuizButton";

export default function PaymentPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Get product data
  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  // Logic for the "Proceed" button
  const handleProceed = () => {
    if (!isAuthenticated) {
      console.log("User not logged in, opening login modal.");
      dispatch(openModal({ type: "login" }));
    } else {
      console.log("User logged in, proceeding to Address step.");
      navigate(`/payment-address/${buyNowId}`);
    }
  };

  // Fallback
  if (!productData) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.errorContainer}>
          <h2>Product not found</h2>
          <p>The product you are trying to buy is not available.</p>
          <Button label="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        {/* <h2 className={styles.pageHeading}>Payment</h2> */}
      </div>

      <div className={styles.contentContainer}>
        {/* --- Left Card: Course Details --- */}
        <div className={styles.detailsCard}>
          <h1 className={styles.courseTitle}>{productData.title}</h1>

          {/* Tags Section using QuizButton */}
          <div className={styles.tagsWrapper}>
            <QuizButton
              label="English"
              active={true}
              className={styles.activeQuizBtn}
            />
            <QuizButton label="3 Months Validity" active={false} />
          </div>

          {/* Description */}
          <p className={styles.courseDescription}>
            {productData.description ||
              "This course is designed to help aspirants systematically prepare for competitive exams with expert guidance, structured study material and proven strategies. Covering all key subjects, concepts, and problem-solving."}
          </p>

          {/* Price Block */}
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>{productData.price}</span>
            {/* Placeholder for original price styling */}
            <span className={styles.originalPrice}>Rs. 9999</span>
            <span className={styles.discount}> (10% off)</span>
            <button className={styles.applyCouponLink}>Apply Coupon</button>
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

          {/* Using the Button Component */}
          <div className={styles.btnWrapper}>
            <Button
              label="Proceed"
              onClick={handleProceed}
              className={styles.fullWidthBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

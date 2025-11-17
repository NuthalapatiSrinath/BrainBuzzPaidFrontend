import React from "react";
import { useDispatch } from "react-redux"; // 1. Import useDispatch
import { openModal } from "../../../../redux/slices/modalSlice"; // 2. Import openModal
import styles from "./PricingTabContent.module.css";
import Button from "../../../../components/Button/Button";

const PricingTabContent = ({
  title,
  description,
  price,
  onBuyNow,
  // onApplyCoupon is no longer needed as a prop
}) => {
  const dispatch = useDispatch(); // 3. Get the dispatch function

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  return (
    <div className={styles.pricingTab}>
      <div className={styles.enrollMessage}>
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Please Enroll to continue Watching the Topics and complete the Course
      </div>
      <div className={styles.priceBox}>
        <div className={styles.priceInfo}>
          <h4 className={styles.priceTitle}>
            {title || "IAS GS FOUNDATION COURSE"}
          </h4>
          <p className={styles.priceDesc}>
            {description ||
              "This course is designed to help aspirants systematically prepare for competitive exams..."}
          </p>
        </div>
        <div className={styles.priceAction}>
          <span className={styles.price}>{price || "Rs.6000"}</span>
          <Button
            label="Buy Now"
            onClick={onBuyNow}
            className={styles.buyButton}
          />
          {/* 4. Apply Coupon button moved out of this div */}
        </div>
      </div>
      {/* 5. Apply Coupon button is now here, outside the box */}
      <button onClick={handleApplyCoupon} className={styles.couponButton}>
        Apply Coupon
      </button>
    </div>
  );
};

export default PricingTabContent;

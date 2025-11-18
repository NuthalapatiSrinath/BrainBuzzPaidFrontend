import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import styles from "./CourseHero.module.css";
import Button from "../Button/Button";
import QuizButton from "../QuizButton/QuizButton"; // 1. Import QuizButton

// This component is based on the new image (image_555b46.jpg)
const CourseHero = ({
  title = "UPSC Test Series",
  price = 6000,
  originalPrice = 9000,
  discount = "(10% off)",
  pills = ["English", "E-book"], // 2. Make pills dynamic
  onBuyNow,
}) => {
  const dispatch = useDispatch();

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img
            src="/images/categoryhome.webp" // Using this image as placeholder
            alt={title}
            className={styles.heroImage}
          />
        </div>

        {/* Middle: Details */}
        <div className={styles.detailsContainer}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.pills}>
            {/* 3. Use QuizButton for pills */}
            {pills.map((pill) => (
              <QuizButton
                key={pill}
                label={pill}
                className={styles.pillButton} // 4. Apply custom style
                onClick={(e) => e.preventDefault()} // Prevent navigation
              />
            ))}
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>Rs. {price}</span>
            <span className={styles.originalPrice}>{originalPrice}</span>
            <span className={styles.discount}>{discount}</span>
            <button onClick={handleApplyCoupon} className={styles.couponButton}>
              Apply Coupon
            </button>
          </div>
          <Button
            label="Buy Now"
            onClick={onBuyNow}
            className={styles.buyButton}
          />
        </div>

        {/* Right Side: Logo */}
        <div className={styles.logoContainer}>
          <img src="/images/upsc.png" alt="UPSC Logo" className={styles.logo} />
        </div>
      </div>
    </div>
  );
};

export default CourseHero;

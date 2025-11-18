import React from "react";
import styles from "./CourseDetailsHero.module.css";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { FaChevronDown } from "react-icons/fa"; // Import icon

export default function CourseDetailsHero({ courseData, onBuyNow }) {
  const dispatch = useDispatch();

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  if (!courseData) return null;

  const {
    title,
    subtitle,
    batchStartDate,
    isLive,
    medium,
    showAiBadge,
    showLiveCircle,
    mainTitle,
    price,
    originalPrice,
    discount,
    validity, // Get validity from data
  } = courseData;

  // Fallback data to match screenshot
  const displayTitle = title || "GS Foundation";
  const displaySubtitle =
    subtitle || "Pre + Mains (Live from Karol Bagh Classroom)";
  const displayDate = batchStartDate || "6th October";
  const displayMainTitle =
    mainTitle || "IAS GS Foundation Course for IAS prelims and Mains";
  const displayPrice = price || "10,000";
  const displayOrigPrice = originalPrice || "12000";
  const displayDiscount = discount || "(10% off)";
  const displayValidity = validity || "3 Months";

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        {/* Left Side (Course Info) */}
        <div className={styles.leftSection}>
          <div className={styles.topSection}>
            {showAiBadge && <div className={styles.aiBadge}>AI</div>}
            {showLiveCircle && <div className={styles.liveCircle}>Live</div>}

            <h3 className={styles.title}>{displayTitle}</h3>
            <p className={styles.subtitle}>{displaySubtitle}</p>
            <p className={styles.batchInfo}>Begins on: {displayDate}</p>

            <div className={styles.tagsWrapper}>
              {(isLive || true) && ( // Default to true to match image
                <span className={`${styles.tag} ${styles.liveTag}`}>Live</span>
              )}
              {(medium || "English") && ( // Default to English
                <span className={`${styles.tag} ${styles.mediumTag}`}>
                  {medium || "English"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side (Purchase Info) */}
        <div className={styles.rightSection}>
          <h4 className={styles.mainTitle}>{displayMainTitle}</h4>
          <div className={styles.tagsRow}>
            <span className={styles.detailTag}>English</span>
            <span className={styles.detailTag}>
              {displayValidity} Validity
              {/* <FaChevronDown className={styles.dropdownIcon} /> */}
            </span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>Rs. {displayPrice}</span>
            <span className={styles.originalPrice}>{displayOrigPrice}</span>
            <span className={styles.discount}>{displayDiscount}</span>
          </div>
          <button onClick={handleApplyCoupon} className={styles.couponButton}>
            Apply Coupon
          </button>
          <Button
            label="Buy Now"
            onClick={onBuyNow}
            className={styles.buyButton}
          />
        </div>
      </div>
    </div>
  );
}

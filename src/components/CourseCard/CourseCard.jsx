import React from "react";
import PropTypes from "prop-types";
import styles from "./CourseCard.module.css";
// ✅ 1. Import the Button component
import Button from "../Button/Button.jsx";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";

/**
 * A card component for displaying a course.
 * It now has two variants:
 * - 'user': (Default) Shows progress bar for "My Courses".
 * - 'store': Shows price and "Buy Now" buttons for the store.
 */
export default function CourseCard({
  // ✅ 2. Add variant prop
  variant = "user", // 'user' or 'store'
  title,
  subtitle,
  batchStartDate,
  isLive,
  medium,
  showAiBadge,
  showLiveCircle,
  mainTitle,
  courseType,
  validity,
  showValidityDropdown,
  mediumIconText,
  progress,
  onClick, // Click handler for the whole card

  // ✅ 3. Add new props for the 'store' variant
  price,
  originalPrice,
  discount,
  onViewDetails,
  onBuyNow,

  // 🎯 NEW PROP: Indicate if the course is already purchased
  isPurchased = false,
}) {
  const handleClick = (e) => {
    // If a button was clicked, don't trigger the main card click
    if (e.target.closest("button")) {
      e.stopPropagation();
      return;
    }
    onClick && onClick();
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${mainTitle}`}
    >
      {/* === Top Blue Section (Unchanged) === */}
      <div className={styles.topSection}>
        {showAiBadge && <div className={styles.aiBadge}>AI</div>}
        {showLiveCircle && <div className={styles.liveCircle}>Live</div>}

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.batchInfo}>बैच आरंभ: {batchStartDate}</p>

        <div className={styles.tagsWrapper}>
          {isLive && (
            <span className={`${styles.tag} ${styles.liveTag}`}>Live</span>
          )}
          {medium && (
            <span className={`${styles.tag} ${styles.mediumTag}`}>
              {medium}
            </span>
          )}
        </div>
      </div>

      {/* === Bottom White Section (Unchanged) === */}
      <div className={styles.bottomSection}>
        <h4 className={styles.mainTitle}>{mainTitle}</h4>

        {courseType && (
          <span className={styles.courseTypeTag}>{courseType}</span>
        )}

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.icon} />
            <span>Validity: {validity}</span>
            {/* Adding the dropdown icon as seen in the image */}
            {/* {showValidityDropdown && (
              <FaChevronDown className={styles.dropdownIcon} />
            )} */}
          </div>
          <div className={styles.infoItem}>
            <TbLanguage className={styles.icon} />
            <span>Med: {mediumIconText}</span>
          </div>
        </div>

        {/* ✅ 4. CONDITIONAL RENDERING: Show progress OR price/buttons */}
        {variant === "user" ? (
          // --- 'user' variant (Progress Bar) ---
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{progress}% Complete</span>
          </div>
        ) : (
          // --- 'store' variant (Price & Buttons) ---
          <>
            <div className={styles.priceRow}>
              <span className={styles.price}>Rs.{price}</span>
              {originalPrice && (
                <span className={styles.originalPrice}>{originalPrice}</span>
              )}
              {discount && (
                <span className={styles.discount}>({discount})</span>
              )}
            </div>

            <div className={styles.actions}>
              <Button
                label="View Details"
                variant="outline"
                onClick={onViewDetails}
                className={styles.actionButton}
              />
              {/* 🎯 CONDITIONALLY RENDER BUY NOW BUTTON */}
              {!isPurchased && (
                <Button
                  label="Buy now" // "Buy now" is lowercase in your image
                  variant="primary"
                  onClick={onBuyNow}
                  className={styles.actionButton}
                />
              )}
              {/* If purchased, we can show a placeholder or nothing, but hiding the button is enough */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ✅ 5. Update Prop Types
CourseCard.propTypes = {
  variant: PropTypes.oneOf(["user", "store"]), // Add variant
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  batchStartDate: PropTypes.string.isRequired,
  isLive: PropTypes.bool,
  medium: PropTypes.string,
  showAiBadge: PropTypes.bool,
  showLiveCircle: PropTypes.bool,
  mainTitle: PropTypes.string.isRequired,
  courseType: PropTypes.string,
  validity: PropTypes.string.isRequired,
  showValidityDropdown: PropTypes.bool,
  mediumIconText: PropTypes.string.isRequired,
  progress: PropTypes.number,
  onClick: PropTypes.func,
  // Add new props
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.string,
  onViewDetails: PropTypes.func,
  onBuyNow: PropTypes.func,
  // 🎯 NEW PROP TYPE
  isPurchased: PropTypes.bool,
};

CourseCard.defaultProps = {
  variant: "user", // Default to 'user' variant
  isLive: false,
  medium: null,
  showAiBadge: false,
  showLiveCircle: false,
  courseType: null,
  showValidityDropdown: false,
  progress: 0,
  onClick: () => {},
  // Add defaults for new props
  price: "0",
  originalPrice: null,
  discount: null,
  onViewDetails: () => {},
  onBuyNow: () => {},
  // 🎯 NEW DEFAULT
  isPurchased: false,
};

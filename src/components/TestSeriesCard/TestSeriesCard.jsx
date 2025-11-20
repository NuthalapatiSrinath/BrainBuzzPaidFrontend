import React from "react";
import PropTypes from "prop-types";
import styles from "./TestSeriesCard.module.css";
import Button from "../Button/Button.jsx";
import { FaCalendarAlt, FaChevronDown, FaListAlt } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";

/**
 * A card component for displaying a Test Series.
 * It has three variants:
 * - 'store': Shows test count and "View Tests" button.
 * - 'user': Shows validity, progress bar, and a primary action button.
 * - 'mainpage': Shows price, details, and buy now buttons (now conditionally renders).
 */
export default function TestSeriesCard({
  variant = "store", // 'store', 'user', or 'mainpage'
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
  testCount,
  showValidityDropdown,
  mediumIconText,
  progress,
  onClick, // Fallback for the whole card

  // --- New props for 'mainpage' variant ---
  logo, // The main logo (e.g., UPSC, CGL)
  topColor, // The background color for the top section (e.g., "#d4efff")
  price,
  originalPrice,
  discount,
  onViewDetails,
  onBuyNow,

  // --- User variant specific prop ---
  onStartTestSeries,

  // --- Original store callbacks (ensure they exist) ---
  onViewDescription,
  onViewTests,

  // 🎯 NEW PROP: Indicate if the parent package is purchased
  isPackagePurchased = false,
}) {
  const handleClick = (e) => {
    // If a button was clicked, don't trigger the main card click
    if (e.target.closest("button")) {
      e.stopPropagation();
      return;
    }
    onClick && onClick();
  };

  // ===================================================================
  // === NEW "MAINPAGE" VARIANT RENDER (Store page)
  // ===================================================================
  if (variant === "mainpage") {
    // If NOT purchased, show Buy Now. If purchased, the primary action button is hidden entirely.
    const isPrimaryActionVisible = !isPackagePurchased;

    // Fallback label for the non-purchased state
    const buttonLabel = isPackagePurchased ? "" : "Buy Now";
    const buyNowAction = isPackagePurchased ? null : onBuyNow;

    return (
      <div
        className={styles.cardMainpage} // Use new base class
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`View details for ${mainTitle}`}
      >
        {/* === Top Colored Section (New) === */}
        <div
          className={styles.topSectionMainpage}
          style={{ backgroundColor: topColor || "#ebf0ff" }}
        >
          <img
            src={logo}
            alt={`${mainTitle} logo`}
            className={styles.logoMainpage}
          />
        </div>

        {/* === Bottom White Section (New) === */}
        <div className={styles.bottomSectionMainpage}>
          <h4 className={styles.titleMainpage}>{mainTitle}</h4>

          {courseType && (
            <span className={styles.tagMainpage}>{courseType}</span>
          )}

          {/* --- Info Row 1 (Validity & Medium) --- */}
          <div className={styles.infoRowMainpage}>
            <div className={styles.infoItemMainpage}>
              <FaCalendarAlt className={styles.iconMainpage} />
              <span>Validity: {validity}</span>
            </div>
            <div className={styles.infoItemMainpage}>
              <TbLanguage className={styles.iconMainpage} />
              <span>Med: {mediumIconText}</span>
            </div>
          </div>

          {/* --- Info Row 2 (Test Count) --- */}
          <div className={styles.infoRowMainpage}>
            <div className={styles.infoItemMainpage}>
              <FaListAlt className={styles.iconMainpage} />
              <span>{testCount || "0"} Tests</span>
            </div>
          </div>

          {/* --- Price Row (Hidden if purchased) --- */}
          {!isPackagePurchased && (
            <div className={styles.priceRowMainpage}>
              <span className={styles.priceMainpage}>Rs.{price}</span>
              {originalPrice && (
                <span className={styles.originalPriceMainpage}>
                  {originalPrice}
                </span>
              )}
              {discount && (
                <span className={styles.discountMainpage}>({discount})</span>
              )}
            </div>
          )}

          {/* --- Actions Row --- */}
          <div className={styles.actionsMainpage}>
            {/* 1. View Details is ALWAYS visible */}
            <Button
              label="View Details"
              variant="outline"
              onClick={onViewDetails}
              className={styles.actionButtonMainpage}
            />

            {/* 2. Primary Button: ONLY RENDER IF NOT PURCHASED */}
            {isPrimaryActionVisible && (
              <Button
                label={buttonLabel} // "Buy Now"
                variant="primary"
                onClick={buyNowAction}
                className={styles.actionButtonMainpage}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===================================================================
  // === EXISTING "STORE" AND "USER" VARIANT RENDER
  // ===================================================================
  return (
    <div
      className={styles.card} // Uses original base class
      onClick={handleClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${mainTitle}`}
    >
      {/* ... (Existing logic for store/user variant remains here) ... */}
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

      <div className={styles.bottomSection}>
        <h4 className={styles.mainTitle}>{mainTitle}</h4>

        {courseType && (
          <span className={styles.courseTypeTag}>{courseType}</span>
        )}

        <div className={styles.infoRow}>
          {variant === "user" ? (
            // "My Test Series" view (with Validity)
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.icon} />
              <span>Validity: {validity}</span>
              {showValidityDropdown && (
                <FaChevronDown className={styles.dropdownIcon} />
              )}
            </div>
          ) : (
            // "Store" view (with Test Count)
            <div className={styles.infoItem}>
              <FaListAlt className={styles.icon} />
              <span>{testCount || "0"} Tests</span>
            </div>
          )}

          <div className={styles.infoItem}>
            <TbLanguage className={styles.icon} />
            <span>Med: {mediumIconText}</span>
          </div>
        </div>

        {variant === "user" ? (
          // "My Test Series" view (Progress Bar AND Start Button)
          <>
            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{progress}% Complete</span>
            </div>
            {/* Add button for user variant */}
            <div className={styles.actions}>
              <Button
                label="Go to Tests"
                variant="primary"
                onClick={onStartTestSeries}
                className={styles.actionButton}
              />
            </div>
          </>
        ) : (
          // "Store" view (Buttons) - uses onViewDescription/onViewTests
          <div className={styles.actions}>
            <Button
              label="View Description"
              variant="outline"
              onClick={onViewDescription}
              className={styles.actionButton}
            />
            <Button
              label="View Tests"
              variant="primary"
              onClick={onViewTests}
              className={styles.actionButton}
            />
          </div>
        )}
      </div>
    </div>
  );
}

TestSeriesCard.propTypes = {
  variant: PropTypes.oneOf(["store", "user", "mainpage"]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  batchStartDate: PropTypes.string,
  isLive: PropTypes.bool,
  medium: PropTypes.string,
  showAiBadge: PropTypes.bool,
  showLiveCircle: PropTypes.bool,
  mainTitle: PropTypes.string.isRequired,
  courseType: PropTypes.string,
  validity: PropTypes.string,
  testCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showValidityDropdown: PropTypes.bool,
  mediumIconText: PropTypes.string,
  progress: PropTypes.number,
  onClick: PropTypes.func,

  // ✅ Added new props for 'mainpage'
  logo: PropTypes.string,
  topColor: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.string,
  onViewDetails: PropTypes.func,
  onBuyNow: PropTypes.func,

  isPackagePurchased: PropTypes.bool,
  onStartTestSeries: PropTypes.func,

  // Original 'store' variant props (renamed for clarity in 'mainpage')
  onViewDescription: PropTypes.func,
  onViewTests: PropTypes.func,
};

TestSeriesCard.defaultProps = {
  variant: "store",
  isLive: false,
  medium: null,
  showAiBadge: false,
  showLiveCircle: false,
  courseType: "Test Series",
  validity: "1 year",
  testCount: 0,
  showValidityDropdown: false,
  progress: 0,
  onClick: () => {},

  // ✅ Defaults for new props
  logo: "/images/upsc.png",
  topColor: "#ebf0ff",
  price: "0",
  originalPrice: null,
  discount: null,
  onViewDetails: () => {},
  onBuyNow: () => {},

  isPackagePurchased: false,
  onStartTestSeries: () => {},

  // Original defaults
  onViewDescription: () => {},
  onViewTests: () => {},
};

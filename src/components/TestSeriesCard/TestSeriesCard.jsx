import React from "react";
import PropTypes from "prop-types";
import styles from "./TestSeriesCard.module.css";
import Button from "../Button/Button.jsx";
import { FaCalendarAlt, FaChevronDown, FaListAlt } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";

/**
 * A card component for displaying a Test Series.
 * It has two variants based on the images provided:
 * - 'store': Shows test count and "View Tests" button.
 * - 'user': Shows validity, progress bar, and no buttons.
 */
export default function TestSeriesCard({
  variant = "store", // 'store' or 'user'
  title,
  subtitle,
  batchStartDate,
  isLive,
  medium,
  showAiBadge,
  showLiveCircle,
  mainTitle,
  courseType, // e.g., "Test Series" or "Test"
  validity,
  testCount,
  showValidityDropdown,
  mediumIconText,
  progress,
  onViewDescription,
  onViewTests,
  onClick, // Fallback for the whole card
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
      {/* === Top Blue Section (Same as CourseCard) === */}
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

      {/* === Bottom White Section (Changes based on variant) === */}
      <div className={styles.bottomSection}>
        <h4 className={styles.mainTitle}>{mainTitle}</h4>

        {courseType && (
          <span className={styles.courseTypeTag}>{courseType}</span>
        )}

        {/* --- Info Row: Varies by variant --- */}
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

        {/* --- Progress or Buttons: Varies by variant --- */}
        {variant === "user" ? (
          // "My Test Series" view (Progress Bar)
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
          // "Store" view (Buttons)
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
  variant: PropTypes.oneOf(["store", "user"]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  batchStartDate: PropTypes.string.isRequired,
  isLive: PropTypes.bool,
  medium: PropTypes.string,
  showAiBadge: PropTypes.bool,
  showLiveCircle: PropTypes.bool,
  mainTitle: PropTypes.string.isRequired,
  courseType: PropTypes.string,
  validity: PropTypes.string,
  testCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showValidityDropdown: PropTypes.bool,
  mediumIconText: PropTypes.string.isRequired,
  progress: PropTypes.number,
  onClick: PropTypes.func,
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
  showValidityDropdown: true,
  progress: 0,
  onClick: () => {},
  onViewDescription: () => {},
  onViewTests: () => {},
};

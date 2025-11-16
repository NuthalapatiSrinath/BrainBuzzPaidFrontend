import React from "react";
import PropTypes from "prop-types";
import styles from "./CourseCard.module.css";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb"; // A good icon for "Medium"

/**
 * A card component for displaying a course, based on the provided image.
 */
export default function CourseCard({
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
  onClick,
}) {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${mainTitle}`}
    >
      {/* === Top Blue Section === */}
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

      {/* === Bottom White Section === */}
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
          </div>
          <div className={styles.infoItem}>
            <TbLanguage className={styles.icon} />
            <span>Med: {mediumIconText}</span>
          </div>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>{progress}% Complete</span>
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
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
  progress: PropTypes.number.isRequired,
  onClick: PropTypes.func, // Makes the whole card clickable
};

CourseCard.defaultProps = {
  isLive: false,
  medium: null,
  showAiBadge: false,
  showLiveCircle: false,
  courseType: null,
  showValidityDropdown: true, // Set to true to match image
  onClick: () => {},
};

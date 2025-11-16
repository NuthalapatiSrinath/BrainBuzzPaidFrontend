import React from "react";
import PropTypes from "prop-types";
import styles from "./TakeTestCard.module.css";
import Button from "../Button/Button.jsx"; // Assuming Button component exists
import { FaCalendarAlt, FaListAlt, FaCheckCircle } from "react-icons/fa"; // Icons for meta

/**
 * A card component for displaying a live test.
 * Renders a two-part card with test details and metadata.
 */
export default function TakeTestCard({
  iconSrc,
  title,
  subtitle,
  dateTime,
  questions,
  marks,
  onTakeTest,
}) {
  return (
    <div className={styles.card}>
      {/* === Top White Section === */}
      <div className={styles.topSection}>
        <div className={styles.iconWrapper}>
          <img
            src={iconSrc}
            alt={`${title} logo`}
            className={styles.icon}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/lion.png"; // Fallback logo
            }}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            label="Take Test"
            onClick={onTakeTest}
            className={styles.takeTestButton}
          />
        </div>
      </div>

      {/* === Bottom Blue Section === */}
      <div className={styles.bottomSection}>
        <div className={styles.metaItem}>
          <FaCalendarAlt className={styles.metaIcon} />
          <span className={styles.metaText}>{dateTime}</span>
        </div>
        <div className={styles.metaItem}>
          <FaListAlt className={styles.metaIcon} />
          <span className={styles.metaText}>{questions} Ques</span>
        </div>
        <div className={styles.metaItem}>
          <FaCheckCircle className={styles.metaIcon} />
          <span className={styles.metaText}>{marks} Marks</span>
        </div>
      </div>
    </div>
  );
}

TakeTestCard.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  questions: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  marks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onTakeTest: PropTypes.func,
};

TakeTestCard.defaultProps = {
  iconSrc: "/images/lion.png", // Default logo
  title: "Test Title",
  subtitle: "Lang: English",
  dateTime: "1 Jan, 10:00 AM (1 Hour)",
  questions: "100",
  marks: "100",
  onTakeTest: () => {},
};

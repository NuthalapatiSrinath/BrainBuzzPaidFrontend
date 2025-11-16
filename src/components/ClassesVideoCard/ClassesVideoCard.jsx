import React from "react";
import { Link } from "react-router-dom";
import styles from "./ClassesVideoCard.module.css";

// --- Icons ---
const EyeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.062 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="40" height="40">
    <path
      fillRule="evenodd"
      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
      clipRule="evenodd"
    />
  </svg>
);
// --- End Icons ---

/**
 * A dynamic card for displaying video classes.
 *
 * @param {object} props
 * @param {string} props.to - The URL to link to.
 * @param {string} props.thumbnailSrc - The source URL for the main image.
 * @param {string} props.title - The main title of the video.
 * @param {string} props.subtitle - The subtitle (e.g., "UPSC").
 * @param {string} props.views - The view count (e.g., "1.2k views").
 * @param {string} props.duration - The video duration (e.g., "3:15").
 * @param {boolean} [props.isLive=false] - If true, shows the "LIVE" badge.
 * @param {boolean} [props.isLocked=false] - If true, shows the lock overlay.
 */
const ClassesVideoCard = ({
  to,
  thumbnailSrc,
  title,
  subtitle,
  views,
  duration,
  isLive = false,
  isLocked = false,
}) => {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <img
          src={thumbnailSrc}
          alt={title}
          className={styles.thumbnail}
          loading="lazy"
        />

        {/* --- Overlays --- */}

        {isLive && <div className={styles.liveBadge}>LIVE</div>}

        <div className={styles.viewsBadge}>
          <EyeIcon />
          <span>{views}</span>
        </div>

        <div className={styles.durationBadge}>
          <ClockIcon />
          <span>{duration}</span>
        </div>

        {/* --- Lock Overlay (as requested) --- */}
        {isLocked && (
          <div className={styles.lockOverlay}>
            <LockIcon />
          </div>
        )}
      </div>

      <div className={styles.infoWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </Link>
  );
};

export default ClassesVideoCard;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./ClassesVideoCard.module.css";

// --- New Play Icon ---
const PlayIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="28" height="28">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Updated Lock Icon (smaller) ---
const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
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
 * @param {string} props.tutorAvatarSrc - URL for the tutor's avatar image.
 * @param {string} props.tutorName - The name of the tutor.
 * @param {number} props.progress - Percentage of completion (0-100).
 * @param {string} props.lessonCount - Text like "Lesson 1/16".
 * @param {boolean} [props.isLocked=false] - If true, shows the lock overlay.
 */
const ClassesVideoCard = ({
  to,
  thumbnailSrc,
  title,
  tutorAvatarSrc,
  tutorName,
  progress = 0,
  lessonCount,
  isLocked = false,
}) => {
  // Use a placeholder avatar if none is provided
  const avatar =
    tutorAvatarSrc ||
    `https://placehold.co/40x40/EBF0FF/1F4D9D?text=${tutorName
      .charAt(0)
      .toUpperCase()}`;

  return (
    <Link to={to} className={styles.card}>
      {/* --- Thumbnail Section --- */}
      <div className={styles.thumbnailWrapper}>
        <img
          src={thumbnailSrc}
          alt={title}
          className={styles.thumbnail}
          loading="lazy"
        />

        {/* --- Center Icon Overlay --- */}
        {isLocked ? (
          <div className={styles.lockIconOverlay}>
            <LockIcon />
          </div>
        ) : (
          <div className={styles.playIconOverlay}>
            <PlayIcon />
          </div>
        )}
      </div>

      {/* --- Info Section --- */}
      <div className={styles.infoWrapper}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.tutorRow}>
          <img src={avatar} alt={tutorName} className={styles.avatar} />
          <span className={styles.tutorName}>{tutorName}</span>
        </div>

        <div className={styles.progressRow}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        <div className={styles.lessonCountRow}>
          <span className={styles.lessonCount}>{lessonCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ClassesVideoCard;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./LiveClassCard.module.css";
import { Calendar, User } from "lucide-react"; // Using icons from your library

/**
 * A card for displaying Live Classes with status and schedule.
 *
 * @param {object} props
 * @param {string} props.to - The URL to link to.
 * @param {string} props.thumbnailSrc - The source URL for the main image.
 * @param {string} props.title - The main title of the class.
 * @param {string} props.tutorName - The name of the tutor.
 * @param {string} props.scheduledAt - Text for the schedule (e.g., "Today at 5:00 PM").
 * @param {"LIVE" | "UPCOMING" | "ENDED"} [props.status="UPCOMING"] - The status of the class.
 */
const LiveClassCard = ({
  to,
  thumbnailSrc,
  title,
  tutorName = "BrainBuzz Faculty",
  scheduledAt,
  status = "UPCOMING",
}) => {
  // Get the correct style for the status badge
  const getStatusClass = () => {
    if (status === "LIVE") {
      return styles.statusLive;
    }
    if (status === "ENDED") {
      return styles.statusEnded;
    }
    return styles.statusUpcoming; // Default
  };

  return (
    <Link to={to} className={styles.card}>
      {/* --- Thumbnail Section --- */}
      <div className={styles.thumbnailWrapper}>
        <img
          src={thumbnailSrc || "/images/defaultthumb.png"}
          alt={title}
          className={styles.thumbnail}
          loading="lazy"
        />
        <div className={`${styles.statusBadge} ${getStatusClass()}`}>
          {status}
        </div>
      </div>

      {/* --- Info Section --- */}
      <div className={styles.infoWrapper}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.detailRow}>
          <User className={styles.icon} size={16} />
          <span className={styles.detailText}>{tutorName}</span>
        </div>

        <div className={styles.detailRow}>
          <Calendar className={styles.icon} size={16} />
          <span className={styles.detailText}>{scheduledAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default LiveClassCard;

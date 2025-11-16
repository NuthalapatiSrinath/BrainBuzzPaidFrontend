import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CategoryHomeCard.module.css";

/**
 * A reusable card component for the main "Categories" section
 * on the homepage, with dynamic color and image placement.
 */
export default function CategoryHomeCard({ label, imageSrc, to, bgColor }) {
  return (
    <Link
      to={to}
      className={styles.card}
      // Use inline style to dynamically set the background color from props
      style={{ backgroundColor: bgColor }}
    >
      <img src={imageSrc} alt={label} className={styles.image} />
      <span className={styles.label}>{label}</span>
    </Link>
  );
}

CategoryHomeCard.propTypes = {
  label: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired, // Pass CSS color string, e.g., "var(--Utility_Color1)"
};

import React from "react";
import PropTypes from "prop-types";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";
import Button from "../Button/Button.jsx"; // Fixed path
import styles from "./ProductCard.module.css"; // Fixed path

/**
 * A flexible card for displaying products, courses, or e-books.
 * Renders different content based on the `variant` prop.
 */
export default function ProductCard({
  variant = "ebook", // "ebook" or "course"
  image,
  title,
  tag,
  validity,
  medium,
  // E-book props
  price,
  originalPrice,
  discount,
  onViewDetails,
  onBuyNow,
  // Course props
  progress,
  lessonCount,
  onView, // Use this for opening viewer/description
  onDownload, // Use this for initiating PDF download

  // 🎯 NEW PROP: Indicate if the item is already purchased
  isPurchased = false,
}) {
  const validityText = validity || "1 year";
  const mediumText = medium || "Hin";

  // Note: onBuyNow slot is repurposed for primary action when purchased.
  // We don't need the primaryActionLabel logic anymore since we use two explicit buttons.

  return (
    <div className={styles.card} data-variant={variant}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default-book.png";
          }}
        />
      </div>

      <div className={styles.textBlock}>
        <div className={styles.title}>{title}</div>
        {tag && <div className={styles.tagBadge}>{tag}</div>}
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <FaCalendarAlt className={styles.icon} />
          <span>
            <strong>Validity :</strong> {validityText}
          </span>
          {/* <FaChevronDown className={styles.dropdownIcon} /> */}
        </div>
        <div className={styles.infoItem}>
          <TbLanguage className={styles.icon} />
          <span>
            <strong>Med :</strong> {mediumText}
          </span>
        </div>
      </div>

      {/* --- Conditional Price Section --- */}
      {variant === "ebook" &&
        // Hide price row entirely if purchased
        !isPurchased && (
          <div className={styles.priceRow}>
            <span className={styles.price}>Rs.{price}</span>
            {originalPrice && (
              <span className={styles.originalPrice}>{originalPrice}</span>
            )}
            {discount && <span className={styles.discount}>({discount})</span>}
          </div>
        )}

      {variant === "course" && (
        <div className={styles.progressRow}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress || 0}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <span className={styles.progressText}>{progress || 0}% Complete</span>
        </div>
      )}
      {/* --- End Conditional Section --- */}

      <div className={styles.actions}>
        {variant === "ebook" ? (
          // EBOOK ACTIONS
          isPurchased ? (
            // 🎯 Purchased Ebook View: View (Left) and Download (Right)
            <>
              <Button
                label="View" // New label
                variant="outline"
                onClick={onView} // Uses the onView prop for opening the viewer
                className={styles.halfBtn}
              />
              <Button
                label="Download" // New label
                variant="primary"
                onClick={onDownload} // Uses the new onDownload prop for direct download
                className={styles.halfBtn}
              />
            </>
          ) : (
            // Store View (Not Purchased)
            <>
              <Button
                label="View Details"
                variant="outline"
                onClick={onViewDetails}
                className={styles.halfBtn}
              />
              <Button
                label="Buy Now"
                onClick={onBuyNow}
                className={styles.halfBtn}
              />
            </>
          )
        ) : (
          // COURSE ACTIONS (Existing logic)
          <>
            <Button label="View" onClick={onView} className={styles.halfBtn} />
            <Button
              label="Download"
              onClick={onDownload}
              className={styles.halfBtn}
            />
          </>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  variant: PropTypes.oneOf(["ebook", "course"]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string,
  validity: PropTypes.string,
  medium: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.string,
  progress: PropTypes.number,
  lessonCount: PropTypes.string,
  onViewDetails: PropTypes.func,
  onBuyNow: PropTypes.func,
  onView: PropTypes.func, // 🎯 Prop for opening viewer
  onDownload: PropTypes.func, // 🎯 Prop for direct download
  // 🎯 NEW PROP TYPE
  isPurchased: PropTypes.bool,
};

ProductCard.defaultProps = {
  isPurchased: false,
};

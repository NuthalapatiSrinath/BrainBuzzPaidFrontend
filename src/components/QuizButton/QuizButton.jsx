import React from "react";
import PropTypes from "prop-types";
import styles from "./QuizButton.module.css";

/**
 * A styled button for quiz interactions (e.g., Pause, Exit, Question Paper).
 *
 * @param {object} props
 * @param {string} props.label - The text to display on the button.
 * @param {function} props.onClick - The function to call when clicked.
 * @param {string} [props.type="button"] - The button's type (e.g., "button", "submit").
 * @param {boolean} [props.fullWidth=false] - If true, the button will take up 100% of its container's width.
 * @param {string} [props.className=""] - Optional additional class names.
 */
export default function QuizButton({
  label,
  onClick,
  type = "button",
  fullWidth = false,
  className = "",
}) {
  // Combine the base class, the (optional) fullWidth class, and any extra class names
  const buttonClasses = [
    styles.button,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
}

QuizButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

QuizButton.defaultProps = {
  onClick: () => {},
  type: "button",
  fullWidth: false,
  className: "",
};

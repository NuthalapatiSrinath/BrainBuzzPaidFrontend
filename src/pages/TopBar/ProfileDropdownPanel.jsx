// src/pages/TopBar/ProfileDropdownPanel.jsx
import React from "react";
import styles from "./ProfileDropdownPanel.module.css";
import CategoryHomeCard from "../../components/CategoryHomeCard/CategoryHomeCard";

const profileCardData = [
  {
    label: "My Profile",
    imageSrc: "/images/aboutus/icons/online-courses.png",
    to: "/myprofile",
    bgColor: "var(--Utility_Color1)",
  },
  {
    label: "My Courses",
    imageSrc: "/images/aboutus/icons/live-class.png",
    to: "/mycourses",
    bgColor: "var(--Utility_Color2)",
  },
  {
    label: "My Test Series",
    imageSrc: "/images/aboutus/icons/test-series.png",
    to: "/mytestseries",
    bgColor: "var(--Utility_Color3)",
  },
  {
    label: "Settings",
    imageSrc: "/images/aboutus/icons/quiz.png",
    to: "/settings",
    bgColor: "var(--Warning_Color)",
  },
];

// Simple icon for the header
const UserIcon = () => (
  <svg className={styles.userIconSvg} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// --- 1. ACCEPT 'onClose' IN THE PROPS ---
const ProfileDropdownPanel = ({ user, onLogout, onClose }) => {
  if (!user) return null;

  return (
    <div className={styles.profilePanel}>
      <div className={styles.profileHeader}>
        <div className={styles.userIconLarge}>
          <UserIcon />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
        </div>
      </div>

      <div className={styles.profileRow}>
        {profileCardData.map((card) => (
          <CategoryHomeCard
            key={card.label}
            label={card.label}
            imageSrc={card.imageSrc}
            to={card.to}
            bgColor={card.bgColor}
            className={styles.smallCard}
            // --- 2. PASS THE 'onClose' FUNCTION TO THE CARD'S 'onClick' ---
            onClick={onClose}
          />
        ))}
      </div>

      <div className={styles.profileFooter}>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdownPanel;

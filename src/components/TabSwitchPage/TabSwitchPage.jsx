import React, { useState } from "react";
import styles from "./TabSwitchPage.module.css";

/**
 * A responsive tab-switching component.
 *
 * @param {object} props
 * @param {string} props.defaultTab - The 'id' of the tab to show by default.
 * @param {Array<object>} props.tabs - An array of tab objects.
 * Each object should have:
 * - id {string}: A unique key (e.g., 'profile').
 * - label {string}: The text for the tab (e.g., "My Profile").
 * - icon {React.ReactNode}: (This is no longer rendered to match the new UI)
 * - content {React.ReactNode}: The JSX component/page to render.
 */
const TabSwitchPage = ({ tabs, defaultTab }) => {
  // Set the default active tab, or fallback to the first tab
  const [activeTab, setActiveTab] = useState(
    defaultTab || (tabs && tabs.length > 0 ? tabs[0].id : null)
  );

  if (!tabs || tabs.length === 0) {
    return null;
  }

  // Find the content component that matches the active tab's ID
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={styles.tabSwitchPage}>
      {/* 1. The Navigation Bar (Tabs) */}
      <nav className={styles.tabNav} role="tablist" aria-label="Page Sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {/* Icon is intentionally removed to match the new UI design */}
            {/* {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>} */}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 2. The Active Content */}
      <div className={styles.tabContent} role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
};

export default TabSwitchPage;

import React, { useState } from "react";
import styles from "./TabSwitchPage.module.css"; // This component's own default styles

/**
 * A responsive tab-switching component.
 *
 * @param {object} props
 * @param {string} props.defaultTab - The 'id' of the tab to show by default.
 * @param {Array<object>} props.tabs - An array of tab objects.
 * @param {string} [props.navClassName] - **NEW:** Optional class for the <nav> element.
 * @param {string} [props.contentClassName] - **NEW:** Optional class for the content div.
 */
const TabSwitchPage = ({
  tabs,
  defaultTab,
  navClassName = "", // Default to empty string
  contentClassName = "", // Default to empty string
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab || (tabs && tabs.length > 0 ? tabs[0].id : null)
  );

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={styles.tabSwitchPage}>
      {/* 1. The Navigation Bar (Tabs) */}
      {/* Apply the passed-in navClassName OR the default style */}
      <nav
        className={`${navClassName || styles.tabNav}`}
        role="tablist"
        aria-label="Page Sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            // The button class logic is kept internal
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 2. The Active Content */}
      {/* Apply the passed-in contentClassName OR the default style */}
      <div
        className={`${contentClassName || styles.tabContent}`}
        role="tabpanel"
      >
        {activeContent}
      </div>
    </div>
  );
};

export default TabSwitchPage;

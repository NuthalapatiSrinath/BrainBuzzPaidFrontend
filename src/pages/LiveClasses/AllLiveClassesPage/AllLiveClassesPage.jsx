// src/pages/LiveClasses/AllLiveClassesPage/AllLiveClassesPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import styles from "./AllLiveClassesPage.module.css";

// --- Components ---
import SearchBar from "../../../components/SearchBar/SearchBar";
import LiveClassCard from "../../../components/LiveClassCard/LiveClassCard";
import FilterPills from "../../../components/FilterPills/FilterPills";

// ✅ 1. IMPORT YOUR NEW MASTER DATA
import { allLiveClassesData } from "../../../data/liveClassesData";

// --- Mock Data (REMOVED) ---
// const MOCK_ALL_LIVE_CLASSES = [ ... ]; // This is now in liveClassesData.js

// Helper function to group by category (Your function, no changes)
const groupByCategory = (items) => {
  return items.reduce((acc, item) => {
    const category = item.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

export default function AllLiveClassesPage() {
  const [allClasses, setAllClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch data
  useEffect(() => {
    // ✅ 2. SET STATE FROM THE IMPORTED DATA
    setAllClasses(allLiveClassesData);
  }, []);

  // ✅ 3. Get unique category names for the pills (No changes)
  const categoryOptions = [
    "All",
    ...Array.from(new Set(allClasses.map((item) => item.category))),
  ];

  // Memoized filtering logic (Your logic, no changes)
  const filteredAndGroupedClasses = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = allClasses.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.tutorName.toLowerCase().includes(lowerSearchTerm) ||
        item.category.toLowerCase().includes(lowerSearchTerm);

      return categoryMatch && searchMatch;
    });

    return groupByCategory(filtered);
  }, [allClasses, activeCategory, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>All Live Classes</h1>

      {/* Filter Bar (No changes) */}
      <div className={styles.filterBar}>
        <SearchBar
          placeholder="Search for a class, tutor, or category..."
          onSearch={setSearchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* FilterPills component (No changes) */}
      <FilterPills
        options={categoryOptions}
        activePill={activeCategory}
        onSelectPill={setActiveCategory}
      />

      {/* Content Area (No changes) */}
      <div className={styles.contentArea}>
        {Object.keys(filteredAndGroupedClasses).length === 0 ? (
          <p className={styles.noResults}>
            No classes found matching your filters.
          </p>
        ) : (
          Object.keys(filteredAndGroupedClasses).map((categoryName) => (
            <section key={categoryName} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{categoryName}</h2>
              <div className={styles.grid}>
                {filteredAndGroupedClasses[categoryName].map((item) => (
                  <LiveClassCard
                    key={item.id}
                    to={`/liveclasses/class/${item.id}`} // Example link
                    title={item.title}
                    thumbnailSrc={item.img}
                    tutorName={item.tutorName}
                    scheduledAt={item.scheduledAt}
                    status={item.status}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

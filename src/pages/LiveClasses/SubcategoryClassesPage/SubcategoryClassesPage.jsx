// src/pages/LiveClasses/SubcategoryClassesPage/SubcategoryClassesPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./SubcategoryClassesPage.module.css";

// --- Components ---
import SearchBar from "../../../components/SearchBar/SearchBar";
import LiveClassCard from "../../../components/LiveClassCard/LiveClassCard";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader"; // To show the title

// --- Data ---
import {
  allLiveClassesData,
  liveClassesSubcategories,
} from "../../../data/liveClassesData";

export default function SubcategoryClassesPage() {
  const { category, subcategory } = useParams(); // e.g., "upsc", "gs-prelims"
  const [searchTerm, setSearchTerm] = useState("");
  const [pageInfo, setPageInfo] = useState({ title: "Live Classes" });

  // 1. Get the title from our subcategory data
  useEffect(() => {
    if (category && subcategory && liveClassesSubcategories[category]) {
      const sub = liveClassesSubcategories[category].subcategories.find(
        (s) => s.slug === subcategory
      );
      if (sub) {
        setPageInfo({ title: sub.name });
      }
    }
  }, [category, subcategory]);

  // 2. Memoized filtering logic
  const filteredClasses = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return allLiveClassesData.filter((item) => {
      // 3. Filter by URL parameters
      const categoryMatch =
        item.category.toLowerCase() === category.toLowerCase();
      const subcategoryMatch =
        item.subcategory.toLowerCase() === subcategory.toLowerCase();

      // 4. Filter by Search Term
      const searchMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.tutorName.toLowerCase().includes(lowerSearchTerm);

      return categoryMatch && subcategoryMatch && searchMatch;
    });
  }, [category, subcategory, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.categoryheader}>
        {/* Use CategoryHeader for a consistent title */}
        <CategoryHeader title={pageInfo.title} />
      </div>
      <br />
      <div className={styles.contentArea}>
        <div className={styles.filterBar}>
          <SearchBar
            placeholder="Search within this section..."
            onChange={setSearchTerm}
            onSearch={setSearchTerm}
          />
        </div>

        {/* 3. Render the grid of classes */}
        {filteredClasses.length === 0 ? (
          <p className={styles.noResults}>
            No classes found for {pageInfo.title}.
          </p>
        ) : (
          <div className={styles.grid}>
            {filteredClasses.map((item) => (
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
        )}
      </div>
    </div>
  );
}

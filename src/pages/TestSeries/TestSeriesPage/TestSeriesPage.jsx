import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import TestSeriesCard from "../../../components/TestSeriesCard/TestSeriesCard"; // Import the correct card
import styles from "./TestSeriesPage.module.css";
// ✅ 1. Import the new data file
import { TEST_SERIES_CATEGORIES } from "../../../data/testSeries.js";
// 🎯 Import the utility for checking purchases
import { purchasedTestSeries } from "../../../data/userTestSeries.js";

export default function TestSeriesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ 2. Use the imported data
  const testSeriesData = useMemo(() => TEST_SERIES_CATEGORIES, []);

  // Filter logic
  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return testSeriesData;
    return testSeriesData.filter((c) => c.mainTitle.toLowerCase().includes(q));
  }, [search, testSeriesData]);

  // ✅ 3. Update handlers to use categoryKey
  const handleViewDetails = (categoryKey) => {
    console.log("View Details for:", categoryKey);
    // Navigate to the new TestSeriesListPage
    navigate(`/test-series/${categoryKey}`);
  };

  const handleBuyNow = (id) => {
    console.log("Buy Now for:", id);
    // Navigate to the buy now page
    navigate(`/buy-now/${id}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.heroTitle}>Explore Test Series</h1>
          </div>
          <div className={styles.heroImageBox}>
            <img
              src="/images/daily-quizzes-banner.png" // Using this banner as a placeholder
              alt="Test Series"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className={styles.categories}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Test Series</h2>
          <span className={styles.headingUnderline}></span>
        </div>
        <p className={styles.subtitle}>
          Explore our carefully curated courses and unlock valuable knowledge
          that empowers your personal and professional growth
        </p>
        <div className={styles.searchBar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Test Series"
          />
        </div>

        {/* --- GRID --- */}
        <div className={`${styles.grid} ${search ? styles.searchActive : ""}`}>
          {filtered.map((test) => (
            <TestSeriesCard
              key={test.id}
              variant="mainpage" // Use the new variant
              {...test} // Pass all props from the data
              // 🎯 Determine purchase status by checking the category key
              isPackagePurchased={purchasedTestSeries.includes(
                test.categoryKey
              )}
              // ✅ 4. Pass the correct handlers
              onViewDetails={() => handleViewDetails(test.categoryKey)}
              onBuyNow={() => handleBuyNow(test.id)}
            />
          ))}

          {filtered.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No test series found for “{search}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TestSeriesListPage.module.css";

// Import data
import TEST_SERIES_LIST_DATA from "../../../data/testSeries.js";

// Import components
import SearchBar from "../../../components/SearchBar/SearchBar";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import TestSeriesCard from "../../../components/TestSeriesCard/TestSeriesCard";
import Button from "../../../components/Button/Button";
import { FaChevronDown } from "react-icons/fa";

export default function TestSeriesListPage() {
  const navigate = useNavigate();
  const { category } = useParams(); // e.g., "upsc"
  const [search, setSearch] = useState("");

  // Get the correct data for this page based on the URL param
  // Fallback to UPSC data if the category is not found
  const pageData = useMemo(() => {
    return TEST_SERIES_LIST_DATA[category] || TEST_SERIES_LIST_DATA.upsc;
  }, [category]);

  // Filter logic for the grid
  const filteredTests = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return pageData.tests;
    return pageData.tests.filter((c) => c.mainTitle.toLowerCase().includes(q));
  }, [search, pageData.tests]);

  // --- Handlers ---

  // "View Description" on the card
  const handleViewDescription = (id) => {
    console.log("View Description for:", id);
    // ✅ NAVIGATE TO THE DESCRIPTION PAGE WITH THE "description" TAB
    navigate(`/test-series/${category}/${id}/description`);
  };

  // "View Tests" on the card
  const handleViewTests = (id) => {
    console.log("View Tests for:", id);
    // ✅ NAVIGATE TO THE DESCRIPTION PAGE WITH THE "tests" TAB
    navigate(`/test-series/${category}/${id}/tests`);
  };

  // "Buy Now" button in the hero
  const handleHeroBuyNow = () => {
    console.log("Hero Buy Now clicked for:", pageData.hero.buyNowId);
    // This navigates to your "buy now" page
    navigate(`/buy-now/${pageData.hero.buyNowId}`);
  };

  // "Apply Coupon" button in the hero
  const handleApplyCoupon = () => {
    console.log("Apply Coupon clicked");
    // This could open your login/coupon modal
    // dispatch(openModal({ type: "applyCoupon" }));
  };

  return (
    <div className={styles.pageWrapper}>
      {/* === NEW HERO SECTION === */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <img
            src={pageData.hero.image}
            alt="Test Series"
            className={styles.heroImage}
          />
          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>{pageData.hero.title}</h1>
            <div className={styles.heroMeta}>
              <span>English</span>
              <span className={styles.metaDivider}>|</span>
              <span>1 Year Validity</span>
              <FaChevronDown className={styles.metaIcon} />
            </div>
            <div className={styles.heroPrice}>
              <span>Rs. {pageData.hero.price}</span>
              <span className={styles.heroOriginalPrice}>
                {pageData.hero.originalPrice}
              </span>
              <span className={styles.heroDiscount}>
                {pageData.hero.discount}
              </span>
              <button
                className={styles.couponButton}
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </button>
            </div>
            <div className={styles.heroActions}>
              <Button
                label="Buy Now"
                onClick={handleHeroBuyNow}
                className={styles.buyButton}
              />
            </div>
          </div>
          <img
            src={pageData.hero.logo}
            alt={`${pageData.hero.title} Logo`}
            className={styles.heroLogo}
          />
        </div>
      </section>

      {/* === CATEGORY HEADER === */}
      <CategoryHeader
        title={`${pageData.hero.title} Tests`}
        active="English" // This would be dynamic
        onChange={(lang) => console.log("Lang changed", lang)}
      />

      {/* === SEARCH BAR === */}
      <div className={styles.searchBarWrapper}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search Tests"
        />
      </div>

      {/* === CONTENT GRID === */}
      <section className={styles.contentArea}>
        <div className={styles.grid}>
          {filteredTests.map((test) => (
            <TestSeriesCard
              key={test.id}
              variant="store" // Use the "store" variant
              {...test} // Pass all props from the data
              onViewDescription={() => handleViewDescription(test.id)}
              onViewTests={() => handleViewTests(test.id)}
            />
          ))}

          {filteredTests.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No tests found for “{search}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

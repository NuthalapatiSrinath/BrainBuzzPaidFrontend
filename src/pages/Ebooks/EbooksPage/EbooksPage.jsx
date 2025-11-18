import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";

// --- 1. IMPORT THE CategoryCard COMPONENT ---
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

import styles from "./EbooksPage.module.css";
import EBOOKS_DATA from "../../../data/ebooks.js";

export default function EbooksPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ 2. DEFINE THE STATIC "VIEW ALL" CARD
  const viewAllCard = {
    key: "all",
    title: "View All Publications",
    logo: "/images/goals.png", // Using a distinct logo
    description: "Browse all e-book subcategories from all exams in one place.",
    slug: "all", // This will be used for navigation
  };

  const categories = useMemo(() => {
    try {
      return Array.isArray(EBOOKS_DATA?.categories)
        ? EBOOKS_DATA.categories
        : [];
    } catch {
      return [];
    }
  }, []); //

  // filter by search text
  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) {
      // ✅ If not searching, show "View All" card + all categories
      return [viewAllCard, ...categories];
    }
    // ✅ If searching, only search categories (hide "View All")
    return categories.filter((c) => {
      const name = (c.title || c.name || "").toLowerCase();
      const key = (c.key || c.slug || "").toLowerCase();
      return name.includes(q) || key.includes(q);
    });
  }, [search, categories]); //

  const handleNavigate = (slug) => {
    if (!slug) return;
    const s = String(slug).toLowerCase();
    navigate(`/ebooks/${s}`);
  }; //

  const heroImg = "/images/daily-quizzes-banner.png"; //

  return (
    <div className={styles.pageWrapper}>
      {/* HERO (Same as before) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.heroTitle}>Explore Publications</h1>
          </div>
          <div className={styles.heroImageBox}>
            <img
              src={heroImg}
              alt="Ebooks"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Categories area (Same as before) */}
      <section className={styles.categories}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>E-Books</h2>
          <span className={styles.headingUnderline}></span>
        </div>
        <p className={styles.subtitle}>
          Explore our carefully curated publications and unlock valuable
          knowledge that empowers your personal and professional growth.
        </p>
        <div className={styles.searchBar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search E-Books"
          />
        </div>

        {/* --- 2. MODIFIED GRID ---
            This now renders the CategoryCard component instead of the simple div.
        */}
        <div className={`${styles.grid} ${search ? styles.searchActive : ""}`}>
          {filtered.map((cat) => {
            const id = cat.key || cat.id || cat.slug || cat.title;
            const title = cat.title || cat.name || id;
            const logo = cat.logo || cat.hero || "/images/default-sub.png";

            return (
              <CategoryCard
                key={id}
                // Map data from EBOOKS_DATA to CategoryCard props
                name={title}
                logo={logo}
                slug={cat.slug || cat.key} // ✅ Use slug for "all" card, key for others
                description={cat.description || ""} // ✅ Description is passed
                buttonLabel="View Books"
                onClick={handleNavigate} // The card will pass the slug to this function
                ariaLabel={`Go to ${title} publications`}
              />
            );
          })}

          {filtered.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No publications found for “{search}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

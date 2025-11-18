import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import styles from "./DailyQuizzesPage.module.css";
// ✅ 1. IMPORT YOUR CARD COMPONENT AND THE DATA SOURCE
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import DAILY_QUIZZES from "../../../data/dailyQuizzes";

export default function DailyQuizzesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ 2. DEFINE THE STATIC "VIEW ALL" CARD
  const viewAllCard = {
    key: "all",
    title: "View All Quizzes",
    logo: "/hero1.png", // Using a distinct logo
    description: "Browse all quiz subcategories from all exams in one place.",
    slug: "all", // This will be used for navigation
  };

  // ✅ 3. GET CATEGORIES FROM THE CENTRAL DATA FILE
  const categories = useMemo(() => DAILY_QUIZZES.categories || [], []);

  const handleNavigate = (slug) => {
    // This will now correctly navigate to /dailyquizzes/all or /dailyquizzes/upsc
    navigate(`/dailyquizzes/${slug}`);
  };

  // ✅ 4. FILTERING LOGIC
  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) {
      // If not searching, show "View All" card + all categories
      return [viewAllCard, ...categories];
    }
    // If searching, only search categories (hide "View All")
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [search, categories]);

  return (
    <div className={styles.pageWrapper}>
      {/* HERO SECTION (No changes) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.heroTitle}>Explore Daily Quizzes</h1>
          </div>
          <div className={styles.heroImageBox}>
            <img
              src="/images/daily-quizzes-banner.png"
              alt="Daily Quizzes"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className={styles.categories}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Daily Quizzes</h2>
          <span className={styles.headingUnderline}></span>
        </div>
        <p className={styles.subtitle}>
          Explore our carefully curated courses and unlock valuable knowledge
          that empowers your personal and professional growth.
        </p>
        <div className={styles.searchBar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Quiz Categories"
          />
        </div>

        {/* ✅ 5. CATEGORY GRID (UPDATED) */}
        <div className={`${styles.grid} ${search ? styles.searchActive : ""}`}>
          {filtered.map((cat) => (
            <CategoryCard
              key={cat.key}
              name={cat.title}
              logo={cat.logo}
              slug={cat.slug || cat.key} // Use slug for "all" card, key for others
              description={cat.description} // ✅ DESCRIPTION IS NOW ADDED
              onClick={handleNavigate}
              buttonLabel="View Quizzes"
              ariaLabel={`Go to ${cat.title} quizzes`}
            />
          ))}

          {filtered.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No categories found for “{search}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

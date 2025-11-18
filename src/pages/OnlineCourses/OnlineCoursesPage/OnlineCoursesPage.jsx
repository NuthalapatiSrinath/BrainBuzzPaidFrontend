import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import styles from "./OnlineCoursesPage.module.css";
// ✅ 1. Import the new data file
import { ONLINE_COURSES_CATEGORIES } from "../../../data/onlineCourses.js";

export default function OnlineCoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ 2. Define the static "VIEW ALL" card
  const viewAllCard = {
    key: "all",
    title: "All Categories",
    logo: "/images/goals.png", // Using a distinct logo
    description: "Browse all online courses from all exams in one place.",
    slug: "all", // This will be used for navigation
  };

  // ✅ 3. Get categories from the central data file
  const categories = useMemo(() => ONLINE_COURSES_CATEGORIES || [], []);

  const handleNavigate = (slug) => {
    // This will navigate to /online-courses/all or /online-courses/upsc
    navigate(`/online-courses/${slug}`);
  };

  // ✅ 4. Filtering logic
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
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.heroTitle}>Explore Courses</h1>
          </div>
          <div className={styles.heroImageBox}>
            <img
              src="/images/current-affairs-banner.png" // Using placeholder from image
              alt="Online Courses"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className={styles.categories}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Courses</h2>
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
            placeholder="Search Courses"
          />
        </div>

        {/* ✅ 5. CATEGORY GRID (Uses CategoryCard) */}
        <div className={`${styles.grid} ${search ? styles.searchActive : ""}`}>
          {filtered.map((cat) => (
            <CategoryCard
              key={cat.key}
              name={cat.title}
              logo={cat.logo}
              slug={cat.slug || cat.key}
              description={cat.description}
              onClick={handleNavigate}
              buttonLabel="View Courses"
              ariaLabel={`Go to ${cat.title} courses`}
            />
          ))}

          {filtered.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No courses found for “{search}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

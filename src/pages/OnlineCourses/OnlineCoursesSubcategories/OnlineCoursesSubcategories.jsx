import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./OnlineCoursesSubcategories.module.css";
import {
  ONLINE_COURSES_CATEGORIES,
  ONLINE_COURSES_SUBCATEGORIES,
} from "../../../data/onlineCourses.js";
import Header from "../../../components/Header/Header";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

export default function OnlineCoursesSubcategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState(
    localStorage.getItem("bb_lang_code") || "en"
  );

  const { categoryInfo, subcategories } = useMemo(() => {
    const catKey = String(category).toLowerCase();
    const categoryInfo = ONLINE_COURSES_CATEGORIES.find(
      (c) => c.key === catKey
    );
    const subcategories = ONLINE_COURSES_SUBCATEGORIES[catKey] || [];
    return { categoryInfo, subcategories };
  }, [category]);

  const filteredTiles = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return subcategories;
    return subcategories.filter(
      (t) =>
        (t.title || "").toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [query, subcategories]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero banner at the top */}
      <Header
        imageSrc={categoryInfo?.hero || "/images/upsc.png"}
        alt={categoryInfo?.title || "Courses"}
      />

      {/* Language switcher */}
      <CategoryHeader
        title={categoryInfo?.title || category}
        active={lang}
        onChange={setLang}
      />

      {/* Main content area */}
      <section className={styles.subSection}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Sub Categories</h2>
          <span className={styles.headingUnderline}></span>
        </div>
        <p className={styles.subtitle}>
          Explore our carefully curated courses and unlock valuable knowledge
          that empowers your personal and professional growth.
        </p>

        <div className={styles.searchRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search Categories"
          />
        </div>

        {/* Grid of subcategories */}
        <div className={styles.grid}>
          {filteredTiles.map((t) => (
            <CategoryCard
              key={t.id}
              name={t.title}
              logo={t.logo}
              slug={t.path} // Pass the full path
              description={t.description}
              buttonLabel="View Courses"
              onClick={handleNavigate}
              ariaLabel={`Go to ${t.title} courses`}
            />
          ))}
          {filteredTiles.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No subcategories found for “{query}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

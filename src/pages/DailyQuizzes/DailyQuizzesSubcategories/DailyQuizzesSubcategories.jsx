import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import DAILY_QUIZZES from "../../../data/dailyQuizzes";
import styles from "./DailyQuizzesSubcategories.module.css";
// ✅ 1. IMPORT THE CATEGORYCARD COMPONENT
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

/**
 * DailyQuizzesSubcategories
 *
 * Supports:
 * - /dailyquizzes            → (Handled by DailyQuizzesPage.jsx)
 * - /dailyquizzes/:category  → shows quiz subcategories for a given exam (Prelims, Tier 1, etc.)
 */

export default function DailyQuizzesSubcategories() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [lang, setLang] = useState(
    localStorage.getItem("bb_lang_code") || "en"
  );

  /** Top-level exam categories */
  const topCategories = useMemo(() => DAILY_QUIZZES.categories || [], []);

  /** Build entry (either list of categories, or subcategories of one exam) */
  const entry = useMemo(() => {
    if (!category) {
      // Fallback in case this route is hit without a category
      return {
        title: "Daily Quizzes",
        hero: "/images/dailyquizzes-hero.png",
        tiles: topCategories.map((cat) => ({
          id: cat.key,
          title: cat.title,
          logo: cat.logo || cat.hero,
          path: `/dailyquizzes/${cat.key}`,
          description: cat.description || "",
        })),
      };
    }

    // Category-specific quizzes
    const catKey = String(category).toLowerCase();
    const subList = DAILY_QUIZZES.subcategories?.[catKey] || [];
    const catMeta = topCategories.find((c) => c.key === catKey);

    return {
      title: catMeta?.title || catKey.toUpperCase(),
      hero: catMeta?.hero || `/images/${catKey}-hero.png`,
      // ✅ Map all data from the data file to the tiles array
      tiles: subList.map((s) => ({
        id: s.id,
        title: s.title,
        logo: s.logo || "/images/default-sub.png", // Fallback logo
        path: s.path || `/dailyquizzes/${catKey}/${s.id}`,
        description: s.description || "", // ✅ THIS IS THE FIX
      })),
    };
  }, [category, topCategories]);

  /** Search filtering (now also searches description) */
  const tiles = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!entry) return [];
    const all = entry.tiles || [];
    if (!q) return all;
    return all.filter(
      (t) =>
        (t.title || "").toLowerCase().includes(q) ||
        (t.id || "").toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [entry, query]);

  // Navigation handler for the card
  const handleNavigate = (path) => {
    try {
      navigate(path);
    } catch (err) {
      console.error("Navigation failed:", err, path);
    }
  };

  /** Handle no data fallback */
  if (!entry)
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: 40 }}>No quiz data found.</div>
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      {/* HERO (No change) */}
      {entry.hero && <Header imageSrc={entry.hero} alt={entry.title} />}

      {/* HEADER (No change) */}
      <CategoryHeader
        title={entry.title}
        languages={[
          { key: "en", label: "English" },
          { key: "hi", label: "Hindi" },
          { key: "te", label: "Telugu" },
        ]}
        active={lang}
        onChange={(k) => {
          localStorage.setItem("bb_lang_code", k);
          setLang(k);
        }}
        showDivider
      />

      {/* BODY (No change) */}
      <section className={styles.subSection}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>{entry.title}</h2>
          <span className={styles.headingUnderline}></span>
        </div>

        <div className={styles.searchRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search quizzes"
          />
        </div>

        {/* ✅ Grid now correctly passes the description */}
        <div className={styles.grid}>
          {tiles.map((t) => (
            <CategoryCard
              key={t.id}
              name={t.title}
              logo={t.logo}
              slug={t.path} // Pass the full path as the slug
              onClick={handleNavigate} // Use the new handler
              description={t.description} // This now receives the description
              buttonLabel="View Quizzes"
              ariaLabel={`Go to ${t.title} quizzes`}
            />
          ))}

          {tiles.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No quizzes found for “{query}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// src/pages/LiveClasses/LiveClassesSubcategories/LiveClassesSubcategories.jsx

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./LiveClassesSubcategories.module.css"; // We'll re-use this CSS

// 1. Import all the required components
import Header from "../../../components/Header/Header";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CategoryCard from "../../../components/CategoryCard/CategoryCard"; // Our card

// 2. Import the data, aliased as 'DATA' for consistency
import { liveClassesSubcategories as DATA } from "../../../data/liveClassesData";

export default function LiveClassesSubcategories() {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 3. Language state, identical to your example
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("bb_lang_code") || "en";
    } catch {
      return "en";
    }
  });

  // 4. Main data processing logic, wrapped in useMemo
  const entry = useMemo(() => {
    const key = String(paramCategory).toLowerCase();
    const cat = DATA[key];

    if (!cat) {
      // Fallback if data is missing
      return {
        title: key.toUpperCase(),
        hero: "/images/default-book.png", // Default hero
        tiles: [],
      };
    }

    // Map the data to a 'tiles' array
    // Note: We use all the props for our CategoryCard
    const tiles = (cat.subcategories || []).map((sub) => ({
      slug: sub.slug,
      name: sub.name,
      logo: sub.logo,
      description: sub.description,
      buttonLabel: sub.buttonLabel,
    }));

    return {
      title: cat.title,
      hero: cat.bannerImage, // Use the bannerImage from our data as the 'hero'
      tiles: tiles,
    };
  }, [paramCategory]);

  // 5. Search filter logic, wrapped in useMemo
  const tiles = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return entry.tiles || [];

    // Filter by the 'name' property (since our card uses 'name', not 'title')
    return (entry.tiles || []).filter((t) =>
      (t.name || "").toLowerCase().includes(q)
    );
  }, [entry, query]);

  // 6. Navigation handler
  const handleTileClick = (slug) => {
    navigate(`/liveclasses/${paramCategory}/${slug}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 7. Top Header (from your example) */}
      {entry.hero && (
        <Header imageSrc={entry.hero} alt={`${entry.title} hero`} />
      )}

      {/* 8. CategoryHeader (from your example) */}
      <CategoryHeader
        title={entry.title}
        languages={[
          { key: "en", label: "English" },
          { key: "hi", label: "Hindi" },
          { key: "te", label: "Telugu" },
        ]}
        active={lang}
        onChange={(k) => {
          try {
            localStorage.setItem("bb_lang_code", k);
          } catch {}
          setLang(k);
        }}
        showDivider
      />

      {/* 9. Main content section (from your example) */}
      <section className={styles.subSection}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>{entry.title}</h2>
          <span className={styles.headingUnderline}></span>
        </div>

        {/* 10. SearchBar (from your example) */}
        <div className={styles.searchRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search subcategories"
          />
        </div>

        {/* 11. Grid, but using OUR CategoryCard component */}
        <div className={styles.grid}>
          {tiles.map((t) => (
            <CategoryCard
              key={t.slug}
              name={t.name}
              logo={t.logo}
              slug={t.slug}
              description={t.description}
              buttonLabel={t.buttonLabel}
              onClick={handleTileClick} // This will pass 't.slug' to the handler
              ariaLabel={`View ${t.name} live classes`}
            />
          ))}

          {/* 12. No results message (from your example) */}
          {tiles.length === 0 && (
            <div style={{ padding: 24, color: "#666" }}>
              No subcategories match “{query}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

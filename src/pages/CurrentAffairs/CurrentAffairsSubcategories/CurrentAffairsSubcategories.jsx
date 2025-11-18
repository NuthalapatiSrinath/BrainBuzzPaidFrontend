import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import styles from "./CurrentAffairsSubcategories.module.css";
import DATA from "../../../data/CurrentAffairsSubcategories";
// ✅ 1. Import the CategoryCard component
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

export default function CurrentAffairsSubcategories() {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("bb_lang_code") || "en";
    } catch {
      return "en";
    }
  });

  const entry = useMemo(() => {
    if (!paramCategory) {
      const tiles = (DATA.categories || []).map((c) => ({
        id: c.key,
        title: c.title,
        logo: c.logo || c.hero || "/images/default-hero.png",
        path: `/currentaffairs/${c.key}`,
        description: c.description || "", // ✅ Pass description
      }));
      return {
        title: "Current Affairs",
        hero: "/images/current-affairs-hero.png",
        tiles,
      };
    }

    const key = String(paramCategory).toLowerCase();
    const cat = DATA.subcategories[key];
    if (!cat) {
      return {
        title: key.toUpperCase(),
        hero: `/images/${key}-hero.png`,
        tiles: [],
      };
    }

    return {
      title: cat.title || key.toUpperCase(),
      hero: cat.hero || `/images/${key}-hero.png`,
      tiles: (cat.tiles || []).map((t) => ({
        ...t, // This includes id, title, logo, and description
        path: t.path || `/currentaffairs/${key}/${t.id}`,
      })),
    };
  }, [paramCategory]);

  const tiles = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return entry.tiles || [];
    return (entry.tiles || []).filter(
      (t) =>
        (t.title || "").toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q) // ✅ Search description too
    );
  }, [entry, query]);

  // ✅ 2. Create a handler that accepts the slug
  const handleNavigate = (slug) => {
    if (!slug) return;
    navigate(slug);
  };

  return (
    <div className={styles.pageWrapper}>
      {entry.hero && (
        <Header imageSrc={entry.hero} alt={`${entry.title} hero`} />
      )}

      <CategoryHeader
        title={entry.title || "Current Affairs"}
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

      <section className={styles.subSection}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>{entry.title}</h2>
          <span className={styles.headingUnderline}></span>
        </div>

        <div className={styles.searchRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search subcategories"
          />
        </div>

        {/* ✅ 3. Use CategoryCard in the grid */}
        <div className={styles.grid}>
          {tiles.map((t) => (
            <CategoryCard
              key={t.id}
              name={t.title}
              logo={t.logo}
              slug={t.path} // Pass the full path as the slug
              description={t.description} // Pass the description
              onClick={handleNavigate} // Pass the handler
              buttonLabel="View Articles"
              ariaLabel={`Go to ${t.title}`}
            />
          ))}

          {tiles.length === 0 && (
            <div className={styles.noResults} role="status" aria-live="polite">
              No subcategories match “{query}”
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

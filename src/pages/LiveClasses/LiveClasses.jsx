import React, { useState, useMemo } from "react"; // ✅ 1. Import hooks
import { useNavigate } from "react-router-dom"; // ✅ navigation hook
import styles from "./LiveClasses.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard"; // new component
import SearchBar from "../../components/SearchBar/SearchBar"; // ✅ 2. Import SearchBar

export default function LiveClasses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 3. Add search state

  const categories = [
    // 👇 1. ADD YOUR NEW "ALL CATEGORIES" CARD HERE
    {
      id: 0, // Or any unique ID
      name: "All Categories",
      logo: "/images/brainbuzz.png", // Using this as a placeholder
      slug: "all",
    },
    // (Rest of your categories)
    { id: 1, name: "UPSC", logo: "/images/upsc.png", slug: "upsc" },
    { id: 2, name: "CGL", logo: "/images/cgl.png", slug: "cgl" },
    { id: 3, name: "CHSL", logo: "/images/chsl.png", slug: "chsl" },
    { id: 4, name: "APPSC", logo: "/images/appsc.png", slug: "appsc" },
    { id: 5, name: "TSPSC", logo: "/images/tspsc.png", slug: "tspsc" },
    {
      id: 6,
      name: "AP POLICE SI",
      logo: "/images/appolice.png",
      slug: "appolice",
    },
    {
      id: 7,
      name: "TS POLICE SI",
      logo: "/images/tspolice.png",
      slug: "tspolice",
    },
    {
      id: 8,
      name: "State Bank of India PO",
      logo: "/images/sbi.png",
      slug: "sbi",
    },
    { id: 9, name: "IBPS", logo: "/images/ibps.png", slug: "ibps" },
    { id: 10, name: "Railways", logo: "/images/railway.png", slug: "railways" },
    { id: 11, name: "OTHERS…", logo: "/images/brainbuzz.png", slug: "others" },
  ];

  // ✅ 4. Memoized filtering logic
  const filteredCategories = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    if (!lowerSearch) {
      return categories; // Return all if search is empty
    }
    // Filter categories based on the name
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, categories]);

  // ✅ This function now handles BOTH normal categories and your "all" category
  const handleNavigate = (slug) => {
    navigate(`/liveclasses/${slug}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.heroTitle}>Live Classes</h1>
          </div>

          <div className={styles.heroImageBox}>
            <img
              src="/images/current-affairs-banner.png"
              alt="Live Classes"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.categories}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Categories</h2>
          <span className={styles.headingUnderline}></span>
        </div>

        <p className={styles.subtitle}>
          Check the categories and please choose the category that you are
          striving to reach your desired career path in this competitive world.
        </p>

        {/* ✅ 5. Add SearchBar here */}
        <div className={styles.searchBarWrapper}>
          <SearchBar
            placeholder="Search Courses"
            value={searchTerm}
            onChange={setSearchTerm} // The SearchBar component uses onChange
            onSearch={setSearchTerm} // Adding onSearch as a fallback
          />
        </div>

        {/* ✅ 6. Map over filteredCategories */}
        <div className={styles.grid}>
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              logo={cat.logo}
              slug={cat.slug}
              description="Explore Structured Courses for SSC CGL, CHSL & More"
              onClick={handleNavigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

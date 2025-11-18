import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnlineCoursesAllPage.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FilterPills from "../../../components/FilterPills/FilterPills";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import {
  ONLINE_COURSES_CATEGORIES,
  ONLINE_COURSES_SUBCATEGORIES,
} from "../../../data/onlineCourses.js";

// Helper function to group by category
const groupByCategory = (items) => {
  return items.reduce((acc, item) => {
    const category = item.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

export default function OnlineCoursesAllPage() {
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // 1. Load and flatten all subcategories from the data source
  useEffect(() => {
    const flattened = [];
    ONLINE_COURSES_CATEGORIES.forEach((parentCat) => {
      const subList = ONLINE_COURSES_SUBCATEGORIES[parentCat.key] || [];
      subList.forEach((sub) => {
        flattened.push({
          id: `${parentCat.key}-${sub.id}`,
          title: sub.title,
          logo: sub.logo || parentCat.logo,
          path: sub.path || `/online-courses/${parentCat.key}/${sub.id}`,
          category: parentCat.title, // The parent category name for grouping
          description: sub.description || "",
        });
      });
    });
    setAllSubcategories(flattened);
  }, []);

  // 2. Get unique category names for the filter pills
  const categoryOptions = [
    "All",
    ...Array.from(new Set(allSubcategories.map((item) => item.category))),
  ];

  // 3. Memoized filtering and grouping logic
  const filteredAndGrouped = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = allSubcategories.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.category.toLowerCase().includes(lowerSearchTerm) ||
        (item.description || "").toLowerCase().includes(lowerSearchTerm);

      return categoryMatch && searchMatch;
    });

    return groupByCategory(filtered);
  }, [allSubcategories, activeCategory, searchTerm]);

  // 4. Handle navigation
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.pageWrapper}>
      <CategoryHeader title="All Online Courses" />

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <SearchBar
          placeholder="Search for a course subcategory..."
          onSearch={setSearchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* FilterPills component */}
      <FilterPills
        options={categoryOptions}
        activePill={activeCategory}
        onSelectPill={setActiveCategory}
      />

      {/* Content Area */}
      <div className={styles.contentArea}>
        {Object.keys(filteredAndGrouped).length === 0 ? (
          <p className={styles.noResults}>
            No courses found matching your filters.
          </p>
        ) : (
          Object.keys(filteredAndGrouped).map((categoryName) => (
            <section key={categoryName} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{categoryName}</h2>
              <div className={styles.grid}>
                {filteredAndGrouped[categoryName].map((item) => (
                  <CategoryCard
                    key={item.id}
                    name={item.title}
                    logo={item.logo}
                    slug={item.path} // Pass the path as the slug
                    description={item.description} // Pass the description
                    onClick={handleCardClick}
                    buttonLabel="View Courses"
                    ariaLabel={`Go to ${item.title}`}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

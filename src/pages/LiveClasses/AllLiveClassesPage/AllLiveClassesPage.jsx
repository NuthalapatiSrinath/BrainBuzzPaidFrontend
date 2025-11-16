import React, { useState, useEffect, useMemo } from "react";
import styles from "./AllLiveClassesPage.module.css";

// --- Components ---
import SearchBar from "../../../components/SearchBar/SearchBar";
import LiveClassCard from "../../../components/LiveClassCard/LiveClassCard";
// ✅ 1. Import your new FilterPills component
import FilterPills from "../../../components/FilterPills/FilterPills";

// --- Mock Data (with category property) ---
const MOCK_ALL_LIVE_CLASSES = [
  {
    id: 101,
    title: "Modern History Masterclass (LIVE)",
    category: "UPSC", // Filter key
    img: "/images/hero2.jpg",
    tutorName: "Mr. Sharma",
    scheduledAt: "Today at 10:00 AM",
    status: "LIVE",
  },
  {
    id: 102,
    title: "Political Science Deep Dive",
    category: "UPSC", // Filter key
    img: "/images/learning.jpg",
    tutorName: "Ms. Gupta",
    scheduledAt: "Today at 4:00 PM",
    status: "UPCOMING",
  },
  {
    id: 201,
    title: "Advanced Mathematics for CGL",
    category: "CGL", // Filter key
    img: "/images/categoryhome.webp",
    tutorName: "Mr. Verma",
    scheduledAt: "Tomorrow, 11:00 AM",
    status: "UPCOMING",
  },
  {
    id: 301,
    title: "AP History & Geography",
    category: "APPSC", // Filter key
    img: "/images/aboutus/about3.webp",
    tutorName: "Mr. Reddy",
    scheduledAt: "Today at 1:00 PM",
    status: "UPCOMING",
  },
  {
    id: 501,
    title: "Indian Economy for Banking",
    category: "BANKING", // Filter key
    img: "/images/aboutus/aboutus1.webp",
    tutorName: "Ms. Rao",
    scheduledAt: "Today at 2:00 PM",
    status: "UPCOMING",
  },
];

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

export default function AllLiveClassesPage() {
  const [allClasses, setAllClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // ✅ 2. State now holds the active pill's string, defaulting to "All"
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch data
  useEffect(() => {
    // TODO: Replace this with your real API call
    setAllClasses(MOCK_ALL_LIVE_CLASSES);
  }, []);

  // ✅ 3. Get unique category names for the pills
  const categoryOptions = [
    "All",
    ...Array.from(new Set(allClasses.map((item) => item.category))),
  ];

  // Memoized filtering logic
  const filteredAndGroupedClasses = useMemo(() => {
    // --- 1. NORMALIZE SEARCH TERM ---
    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = allClasses.filter((item) => {
      // 1. Filter by Category (using the activeCategory string)
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      // 2. Filter by Search Term
      // --- 2. UPDATE SEARCH LOGIC ---
      const searchMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.tutorName.toLowerCase().includes(lowerSearchTerm) ||
        item.category.toLowerCase().includes(lowerSearchTerm);

      return categoryMatch && searchMatch;
    });

    // Group the final filtered list
    return groupByCategory(filtered);
  }, [allClasses, activeCategory, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>All Live Classes</h1>

      {/* ✅ 4. Updated Filter Bar */}
      <div className={styles.filterBar}>
        <SearchBar
          placeholder="Search for a class, tutor, or category..."
          // --- 3. FIX onSearch PROP ---
          // The SearchBar component I see passes the value directly to onChange
          // If yours passes an event, use: (e) => setSearchTerm(e.target.value)
          // Based on your code, it seems to pass the value directly.
          onSearch={setSearchTerm}
          onChange={setSearchTerm} // Adding onChange as a fallback based on your other components
        />
      </div>

      {/* ✅ 5. Add the new FilterPills component */}
      <FilterPills
        options={categoryOptions}
        activePill={activeCategory}
        onSelectPill={setActiveCategory}
      />

      {/* Content Area (No changes here) */}
      <div className={styles.contentArea}>
        {Object.keys(filteredAndGroupedClasses).length === 0 ? (
          <p className={styles.noResults}>
            No classes found matching your filters.
          </p>
        ) : (
          Object.keys(filteredAndGroupedClasses).map((categoryName) => (
            <section key={categoryName} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{categoryName}</h2>
              <div className={styles.grid}>
                {filteredAndGroupedClasses[categoryName].map((item) => (
                  <LiveClassCard
                    key={item.id}
                    to={`/liveclasses/class/${item.id}`} // Example link
                    title={item.title}
                    thumbnailSrc={item.img}
                    tutorName={item.tutorName}
                    scheduledAt={item.scheduledAt}
                    status={item.status}
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

import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./OnlineCoursesListPage.module.css";
import { ONLINE_COURSES_SUBCATEGORIES } from "../../../data/onlineCourses.js";
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CourseCard from "../../../components/CourseCard/CourseCard";
// 🎯 Import purchased IDs to check course status
import { purchasedCourseIds } from "../../../data/userCourses.js";

export default function OnlineCoursesListPage() {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [lang, setLang] = useState(
    localStorage.getItem("bb_lang_code") || "en"
  );

  const { subcategoryInfo, courses } = useMemo(() => {
    const catKey = String(category).toLowerCase();
    const subKey = String(subcategory).toLowerCase();

    const subcategoryInfo = (ONLINE_COURSES_SUBCATEGORIES[catKey] || []).find(
      (s) => s.id === subKey
    );

    const courses = subcategoryInfo?.courses || [];

    return { subcategoryInfo, courses };
  }, [category, subcategory]);

  const filteredCourses = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (course) =>
        course.mainTitle.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q)
    );
  }, [searchTerm, courses]);

  // ✅ Renamed handler for clarity
  const handleViewDetailsClick = (courseId) => {
    // ✅ This now navigates to your new description page
    // It defaults to the 'description' tab
    navigate(
      `/online-courses/${category}/${subcategory}/${courseId}/description`
    );
  };

  // ✅ Added new handler for "Buy Now"
  const handleBuyNowClick = (buyNowId) => {
    if (buyNowId) {
      navigate(`/buy-now/${buyNowId}`);
    } else {
      console.error("No buyNowId provided for this course.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header with language tabs */}
      <CategoryHeader
        title={subcategoryInfo?.title || subcategory}
        active={lang}
        onChange={setLang}
      />

      {/* Search Bar */}
      <div className={styles.searchBarWrapper}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Courses"
        />
      </div>

      {/* Content Area */}
      <section className={styles.contentArea}>
        <div className={styles.grid}>
          {filteredCourses.length === 0 ? (
            <div className={styles.noResults}>
              No courses found for this category.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                variant="store" // ✅ Use the "store" variant
                {...course}
                // 🎯 PASS THE NEW PROP: Check if the current course is in the purchased list
                isPurchased={purchasedCourseIds.includes(course.id)}
                // ✅ Pass handlers to the correct props
                onViewDetails={() => handleViewDetailsClick(course.id)}
                onBuyNow={() => handleBuyNowClick(course.buyNowId)}
                // Keep the main card click as a fallback
                onClick={() => handleViewDetailsClick(course.id)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

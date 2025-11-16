import React from "react";
import styles from "./CategoryHomeSection.module.css";
import CategoryHomeCard from "../../components/CategoryHomeCard/CategoryHomeCard"; // Adjust path as needed

// --- Placeholder Image Paths ---
// Replace this with your actual image asset
const womanImage = "/images/categoryhome.webp"; // Placeholder for the woman's image
// ---------------------------------

// Data for the 6 category cards
const categoryData = [
  {
    label: "Online Courses",
    imageSrc: "/images/aboutus/icons/online-courses.png",
    to: "/courses",
    bgColor: "var(--Utility_Color1)", // Light Blue
  },
  {
    label: "Live Class",
    imageSrc: "/images/aboutus/icons/live-class.png",
    to: "/live-class",
    bgColor: "var(--Utility_Color2)", // Green
  },
  {
    label: "Test Series",
    imageSrc: "/images/aboutus/icons/test-series.png",
    to: "/test-series",
    bgColor: "var(--Utility_Color3)", // Pink
  },
  {
    label: "Daily Quizzes",
    imageSrc: "/images/aboutus/icons/quiz.png",
    to: "/dailyquizzes",
    bgColor: "var(--Warning_Color)", // Using Warning for Yellow
  },
  {
    label: "Current Affairs",
    imageSrc: "/images/aboutus/icons/current-affairs.png",
    to: "/currentaffairs",
    bgColor: "var(--Utility_Color4)", // Using Utility 4 for Purple-blue
  },
  {
    label: "Publications",
    imageSrc: "/images/aboutus/icons/question-paper.png",
    to: "/publications",
    bgColor: "var(--Info_Color)", // Using Info for the darker blue
  },
];

export default function CategoryHomeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* === Text Heading (UPDATED STRUCTURE) === */}
        <div className={styles.headingWrapper}>
          <div className={styles.headingline}>
            <div className={styles.heading}>Categories</div>
            <div className={styles.headingUnderline}></div>
          </div>
          <p className={styles.subtitle}>
            Check the categories and please choose the category that you are
            striving to reach your desired career path in this competitive
            world.
          </p>
        </div>

        {/* === Main Content Area === */}
        <div className={styles.contentWrapper}>
          {/* Woman Image */}
          <div className={styles.imageWrapper}>
            <img
              src={womanImage}
              alt="Find your career path"
              className={styles.womanImage}
            />
          </div>

          {/* Categories Grid */}
          <div className={styles.gridContainer}>
            {categoryData.map((card) => (
              <CategoryHomeCard
                key={card.label}
                label={card.label}
                imageSrc={card.imageSrc}
                to={card.to}
                bgColor={card.bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// src/sections/CategoryHomeSection/CategoryHomeSection.jsx
import React from "react";
import styles from "./CategoryHomeSection.module.css";
import CategoryHomeCard from "../../components/CategoryHomeCard/CategoryHomeCard"; // Adjust path as needed

const womanImage = "/images/categoryhome.webp";

// Data for the 6 category cards
const categoryData = [
  {
    label: "Online Courses",
    imageSrc: "/images/aboutus/icons/online-courses.png",
    to: "/online-courses",
    bgColor: "var(--Utility_Color1)",
  },
  {
    label: "Live Class",
    imageSrc: "/images/aboutus/icons/live-class.png",
    to: "/liveclasses",
    bgColor: "var(--Utility_Color2)",
  },
  {
    label: "Test Series",
    imageSrc: "/images/aboutus/icons/test-series.png",
    to: "/test-series",
    bgColor: "var(--Utility_Color3)",
  },
  {
    label: "Daily Quizzes",
    imageSrc: "/images/aboutus/icons/quiz.png",
    to: "/dailyquizzes",
    bgColor: "var(--Warning_Color)",
  },
  {
    label: "Current Affairs",
    imageSrc: "/images/aboutus/icons/current-affairs.png",
    to: "/currentaffairs",
    bgColor: "var(--Utility_Color4)",
  },
  {
    label: "Publications",
    imageSrc: "/images/aboutus/icons/question-paper.png",
    to: "/ebooks",
    bgColor: "var(--Info_Color)",
  },
];

export default function CategoryHomeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
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

        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <img
              src={womanImage}
              alt="Find your career path"
              className={styles.womanImage}
            />
          </div>

          <div className={styles.gridContainer}>
            {categoryData.map((card) => (
              <CategoryHomeCard
                key={card.label}
                label={card.label}
                imageSrc={card.imageSrc}
                to={card.to}
                bgColor={card.bgColor}
                // --- THIS IS THE CHANGE ---
                hoverLabel="View All"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

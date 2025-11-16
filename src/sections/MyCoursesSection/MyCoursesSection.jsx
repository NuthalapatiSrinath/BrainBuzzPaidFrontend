import React from "react";
import styles from "./MyCoursesSection.module.css";
// Adjust the import path based on your file structure
import CourseCard from "../../components/CourseCard/CourseCard";

// Mock data based on your "My Courses" image
const myCoursesData = [
  {
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B54",
    courseType: "Course",
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    progress: 60,
    onClick: () => console.log("Clicked course 1"),
  },
  {
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B54",
    courseType: "Course",
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    progress: 30,
    onClick: () => console.log("Clicked course 2"),
  },
  {
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    // showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B54",
    courseType: "Course",
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    progress: 60,
    onClick: () => console.log("Clicked course 1"),
  },
];

export default function MyCoursesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* === Text Heading === */}
        <div className={styles.headingWrapper}>
          <div className={styles.headingline}>
            <h2 className={styles.heading}>My Courses</h2>
            <div className={styles.headingUnderline}></div>
          </div>
          <p className={styles.subtitle}>
            Explore our carefully curated courses and unlock valuable knowledge
            that empowers your personal and professional growth
          </p>
        </div>

        {/* === Courses Grid === */}
        <div className={styles.gridContainer}>
          {myCoursesData.map((course, index) => (
            <CourseCard
              key={index}
              {...course} // Spread all props from the data object
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseDescriptionPage.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice";

// --- Import Data ---
import {
  ONLINE_COURSES_CATEGORIES,
  ONLINE_COURSES_SUBCATEGORIES,
} from "../../../data/onlineCourses.js";

// --- Import Components ---
import CourseDetailsHero from "../../../components/CourseDetailsHero/CourseDetailsHero.jsx"; // The new hero
import Button from "../../../components/Button/Button";
import ClassesVideoCard from "../../../components/ClassesVideoCard/ClassesVideoCard";
import AuthorCard from "../../../components/AuthorCard/AuthorCard";
import TakeTestCard from "../../../components/TakeTestCard/TakeTestCard";
import PricingTabContent from "../../Ebooks/BookDetailPage/PricingTabContent/PricingTabContent";

export default function CourseDescriptionPage() {
  const { category, subcategory, courseId, tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determine the active tab from the URL, default to "description"
  const activeTab = tab || "description";

  // Find the specific course data
  const { courseData, heroData } = useMemo(() => {
    const catKey = String(category).toLowerCase();
    const subKey = String(subcategory).toLowerCase();

    const categoryInfo = ONLINE_COURSES_CATEGORIES.find(
      (c) => c.key === catKey
    );
    const subcategoryInfo = (ONLINE_COURSES_SUBCATEGORIES[catKey] || []).find(
      (s) => s.id === subKey
    );
    const course = (subcategoryInfo?.courses || []).find(
      (c) => c.id === courseId
    );

    // Hero data for pricing tab
    const heroData = {
      title: course?.mainTitle || "Course",
      description:
        course?.description || "This is the complete course package.",
      price: course?.price ? `Rs.${course.price}` : "Free",
      buyNowId: course?.buyNowId,
    };

    return { courseData: course, heroData };
  }, [category, subcategory, courseId]);

  // --- Handlers ---

  const handleBuyNow = () => {
    if (heroData?.buyNowId) {
      navigate(`/buy-now/${heroData.buyNowId}`);
    } else {
      alert("This course is not available for purchase.");
    }
  };

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  const handleTakeTest = (testId) => {
    // This is a placeholder. You'd navigate to your test instructions page.
    console.log("Taking test:", testId);
    // Example: navigate(`/test-series/${category}/${testId}/instructions`);
  };

  // --- Handle Tab Navigation ---
  const handleTabClick = (tabId) => {
    // Update the URL without adding a new entry to the history
    navigate(
      `/online-courses/${category}/${subcategory}/${courseId}/${tabId}`,
      {
        replace: true,
      }
    );
  };

  // --- 1. Define Description Tab Content ---
  const descriptionContent = (
    <div className={styles.panelContent}>
      <h3 className={styles.contentTitle}>About Course :</h3>
      <p className={styles.descText}>
        {courseData?.description || "No description available."}
      </p>
      <h3 className={styles.contentTitle}>What you will get :</h3>
      <ul className={styles.bullets}>
        {courseData?.whatYouWillGet?.length > 0 ? (
          courseData.whatYouWillGet.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No details available.</li>
        )}
      </ul>
      <h3 className={styles.contentTitle}>Download the Structure :</h3>
      <div className={styles.pdfCard}>
        <div className={styles.pdfIcon}>
          <img src="/images/pdf-icon.png" alt="PDF" />
        </div>
        <div className={styles.pdfMeta}>
          <div className={styles.pdfTitle}>IAS GS Foundation Structure.pdf</div>
          <div className={styles.pdfActions}>
            <Button
              label="Download"
              onClick={() => window.open(courseData?.pdfStructureUrl || "#")}
              className={styles.smallDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // --- 2. Define Classes Tab Content ---
  const classesContent = (
    <div className={styles.panelContent}>
      <div className={styles.classesGrid}>
        {(courseData?.classes || []).map((video) => (
          <ClassesVideoCard
            key={video.id}
            // ✅ UPDATED: Use the new path structure
            to={`/online-courses/${category}/${subcategory}/${courseId}/video/${video.videoId}`}
            thumbnailSrc={video.thumbnailSrc}
            title={video.title}
            tutorAvatarSrc={video.tutorAvatarSrc}
            tutorName={video.tutorName}
            progress={video.progress}
            lessonCount={video.lessonCount}
            isLocked={video.isLocked}
          />
        ))}
      </div>
    </div>
  );

  // --- 3. Define Tutors Tab Content ---
  const tutorsContent = (
    <div className={styles.panelContent}>
      <div className={styles.tutorsGrid}>
        {(courseData?.tutors || []).map((tutor) => (
          <AuthorCard
            key={tutor.name}
            name={tutor.name}
            qualification="" // Your data doesn't have this, so it's empty
            language={tutor.language}
            imageUrl={tutor.imageUrl}
          />
        ))}
      </div>
    </div>
  );

  // --- 4. Define Test Series Tab Content ---
  const testSeriesContent = (
    <div className={styles.panelContent}>
      <div className={styles.testList}>
        {(courseData?.testSeries || []).map((test) => (
          <TakeTestCard
            key={test.id}
            iconSrc={test.logo}
            title={test.title}
            subtitle={`Lang: ${test.lang}`}
            dateTime={test.time}
            questions={test.ques}
            marks={test.marks}
            onTakeTest={() => handleTakeTest(test.id)}
          />
        ))}
      </div>
    </div>
  );

  // --- 5. Define Study Notes Tab Content ---
  const studyNotesContent = (
    <div className={styles.panelContent}>
      <div className={styles.pdfList}>
        {(courseData?.studyNotes || []).map((note) => (
          <div className={styles.pdfCard} key={note.id}>
            <div className={styles.pdfIcon}>
              <img src="/images/pdf-icon.png" alt="PDF" />
            </div>
            <div className={styles.pdfMeta}>
              <div className={styles.pdfTitle}>{note.title}</div>
              <div className={styles.pdfActions}>
                <Button
                  label="Download"
                  onClick={() => window.open(note.pdfUrl || "#")}
                  className={styles.smallDownload}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- 6. Define Pricing Tab Content ---
  const pricingContent = (
    <div className={styles.panelContent}>
      <PricingTabContent
        title={heroData.title}
        description={heroData.description}
        price={heroData.price}
        onBuyNow={handleBuyNow}
        onApplyCoupon={handleApplyCoupon}
      />
    </div>
  );

  // --- 7. Create Tabs Array (for navigation) ---
  const tabs = [
    { id: "description", label: "Description" },
    { id: "classes", label: "Classes" },
    { id: "tutors", label: "Tutors" },
    { id: "testseries", label: "Test Series" },
    { id: "studynotes", label: "Study Notes" },
    { id: "pricing", label: "Pricing" },
  ];

  if (!courseData) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Course not found</h2>
          <Button label="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Render the new Hero component */}
      <CourseDetailsHero courseData={courseData} onBuyNow={handleBuyNow} />

      {/* 2. Render the tabs and content */}
      <main className={styles.contentArea}>
        {/* === CUSTOM TAB NAVIGATION === */}
        <nav className={styles.tabs} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* === CUSTOM TAB CONTENT === */}
        <div className={styles.panel} role="tabpanel">
          {activeTab === "description" && descriptionContent}
          {activeTab === "classes" && classesContent}
          {activeTab === "tutors" && tutorsContent}
          {activeTab === "testseries" && testSeriesContent}
          {activeTab === "studynotes" && studyNotesContent}
          {activeTab === "pricing" && pricingContent}
        </div>
      </main>
    </div>
  );
}

import React, { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseDescriptionPage.module.css";
import { ONLINE_COURSES_SUBCATEGORIES } from "../../../data/onlineCourses.js";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice";
// Import the list of purchased course IDs
import { purchasedCourseIds } from "../../../data/userCourses.js";

// Import Components
import CourseHero from "../../../components/CourseDetailsHero/CourseDetailsHero.jsx";
import ClassesVideoCard from "../../../components/ClassesVideoCard/ClassesVideoCard";
import AuthorCard from "../../../components/AuthorCard/AuthorCard";
import TakeTestCard from "../../../components/TakeTestCard/TakeTestCard";
import PricingTabContent from "../../Ebooks/BookDetailPage/PricingTabContent/PricingTabContent";
import Button from "../../../components/Button/Button";

export default function CourseDescriptionPage() {
  const { category, subcategory, courseId, tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determine the active tab from the URL, default to "description"
  const activeTab = tab || "description";

  // --- Purchase Logic & Data Retrieval ---
  const { courseData, heroData, isCoursePurchased } = useMemo(() => {
    const catKey = String(category).toLowerCase();
    const subKey = String(subcategory).toLowerCase();

    // 1. Find Course Data
    const subcategoryInfo = (ONLINE_COURSES_SUBCATEGORIES[catKey] || []).find(
      (s) => s.id === subKey
    );
    const course = (subcategoryInfo?.courses || []).find(
      (c) => c.id === courseId
    );

    // 2. Check Purchase Status
    const isPurchased = purchasedCourseIds.includes(courseId);

    // 3. Prepare Hero Data for display (mostly used internally and for Pricing tab)
    const heroData = {
      title: course?.mainTitle || "Course",
      description:
        course?.description || "This is the complete course package.",
      price: course?.price ? `Rs.${course.price}` : "Free",
      buyNowId: course?.buyNowId,
    };

    return { courseData: course, heroData, isCoursePurchased: isPurchased };
  }, [category, subcategory, courseId]);

  // --- Handlers ---

  const handleBuyNow = useCallback(() => {
    if (heroData?.buyNowId) {
      navigate(`/buy-now/${heroData.buyNowId}`);
    } else {
      console.error(
        "Buy Now failed: Course ID missing or not available for purchase."
      );
    }
  }, [heroData.buyNowId, navigate]);

  const handleStartCourse = useCallback(() => {
    // Navigate to the first available video or the classes tab
    const firstVideo = courseData?.classes?.find((video) => !video.isLocked);
    if (firstVideo) {
      navigate(
        `/online-courses/${category}/${subcategory}/${courseId}/video/${firstVideo.videoId}`
      );
    } else {
      // If no immediate video, just navigate to the classes tab
      navigate(
        `/online-courses/${category}/${subcategory}/${courseId}/classes`
      );
    }
  }, [courseData, category, subcategory, courseId, navigate]);

  const handleTakeTest = (testId) => {
    navigate(`/test-series/${category}/${testId}/instructions`);
  };

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  // --- Handle Tab Navigation ---
  const handleTabClick = (tabId) => {
    navigate(
      `/online-courses/${category}/${subcategory}/${courseId}/${tabId}`,
      {
        replace: true,
      }
    );
  };

  // Filter tabs: remove 'pricing' if the course is already purchased
  const baseTabs = [
    { id: "description", label: "Description" },
    { id: "classes", label: "Classes" },
    { id: "tutors", label: "Tutors" },
    { id: "test-series", label: "Test Series" },
    { id: "study-notes", label: "Study Notes" },
  ];

  // Add pricing tab only if the course is NOT purchased
  const tabs = isCoursePurchased
    ? baseTabs
    : [...baseTabs, { id: "pricing", label: "Pricing" }];

  // --- Render logic for tab contents ---

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
          <div className={styles.pdfTitle}>
            {courseData?.structurePdf?.title}
          </div>
          <div className={styles.pdfActions}>
            <Button
              label={isCoursePurchased ? "Download" : "Buy to Download"}
              onClick={
                isCoursePurchased
                  ? () => window.open(courseData?.structurePdf?.url, "_blank")
                  : handleBuyNow
              }
              className={styles.smallDownload}
              // Disable button if not purchased
              disabled={!isCoursePurchased && true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const classesContent = (
    <div className={styles.panelContent}>
      <div className={styles.classesGrid}>
        {(courseData?.classes || []).map((video) => (
          <ClassesVideoCard
            key={video.id}
            // Navigate to video ONLY IF purchased OR if it's a free preview video
            to={
              isCoursePurchased || !video.isLocked
                ? `/online-courses/${category}/${subcategory}/${courseId}/video/${video.videoId}`
                : "#"
            }
            thumbnailSrc={video.thumbnailSrc}
            title={video.title}
            tutorAvatarSrc={video.tutorAvatarSrc}
            tutorName={video.tutorName}
            progress={video.progress}
            lessonCount={video.lessonCount}
            // `isLocked` prop controls the lock icon. Set to false if purchased.
            isLocked={isCoursePurchased ? false : video.isLocked}
          />
        ))}
      </div>
    </div>
  );

  const tutorsContent = (
    <div className={styles.panelContent}>
      <div className={styles.tutorsGrid}>
        {(courseData?.tutors || []).map((tutor) => (
          <AuthorCard
            key={tutor.id}
            avatarSrc={tutor.img}
            name={tutor.name}
            title={tutor.title}
          />
        ))}
      </div>
    </div>
  );

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
            // Only allow taking test if purchased
            onTakeTest={
              isCoursePurchased ? () => handleTakeTest(test.id) : undefined
            }
            disabled={!isCoursePurchased} // Disable button if not purchased
          />
        ))}
      </div>
    </div>
  );

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
                  label={isCoursePurchased ? "Download" : "Buy to Download"}
                  onClick={
                    isCoursePurchased
                      ? () => window.open(note.pdfUrl, "_blank")
                      : handleBuyNow
                  }
                  className={styles.smallDownload}
                  disabled={!isCoursePurchased}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- 6. Define Pricing Tab Content (Only used if tab is active) ---
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

  // Set the correct primary action handler based on purchase status
  const primaryActionHandler = isCoursePurchased
    ? handleStartCourse
    : handleBuyNow;

  return (
    <div className={styles.pageWrapper}>
      {/* 1. RENDER COURSE HERO ONLY IF THE COURSE IS *NOT* PURCHASED */}
      {/* If buied, don't show the hero at all */}
      {!isCoursePurchased && (
        <CourseHero courseData={courseData} onBuyNow={primaryActionHandler} />
      )}

      {/* 2. RENDER A SIMPLE BUTTON/HEADER IF PURCHASED, AS THE HERO IS HIDDEN */}
      {isCoursePurchased && (
        <div className={styles.purchasedHeader}>
          <h1 className={styles.purchasedMainTitle}>{courseData.mainTitle}</h1>
          <Button
            label="Start Course"
            variant="primary"
            onClick={handleStartCourse}
            className={styles.purchasedStartButton}
          />
        </div>
      )}

      {/* 3. Render the tabs and content */}
      <main className={styles.contentArea}>
        {/* === CUSTOM TAB NAVIGATION === */}
        <nav className={styles.tabs} role="tablist">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              role="tab"
              aria-selected={activeTab === tabItem.id}
              className={`${styles.tabButton} ${
                activeTab === tabItem.id ? styles.active : ""
              }`}
              onClick={() => handleTabClick(tabItem.id)}
            >
              {tabItem.label}
            </button>
          ))}
        </nav>

        {/* === CUSTOM TAB CONTENT === */}
        <div className={styles.panel} role="tabpanel">
          {activeTab === "description" && descriptionContent}
          {activeTab === "classes" && classesContent}
          {activeTab === "tutors" && tutorsContent}
          {activeTab === "test-series" && testSeriesContent}
          {activeTab === "study-notes" && studyNotesContent}
          {activeTab === "pricing" && pricingContent}
        </div>
      </main>
    </div>
  );
}

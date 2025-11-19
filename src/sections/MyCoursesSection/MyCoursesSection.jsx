import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyCoursesSection.module.css";
// Adjusted import path for CourseCard
import CourseCard from "../../components/CourseCard/CourseCard";

// Icons for content pills
import {
  BookOpen,
  Video,
  FileText,
  Download,
  NotebookText,
  ArrowRight,
} from "lucide-react";

export default function MyCoursesSection() {
  const navigate = useNavigate();
  // State to track which course card is currently selected for details panel
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Mock Data (Adjusted to include unique IDs for navigation)
  const myCoursesData = useMemo(
    () => [
      {
        id: "ias-gs-b54",
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
        mediumIconText: "Hin",
        progress: 60,
        details: {
          totalVideos: 120,
          totalPdfs: 50,
          totalTests: 15,
          courseCategory: "online-courses",
        },
      },
      {
        id: "ssc-cgl-101",
        title: "SSC CGL (Tier 1 & 2)",
        subtitle: "Full Syllabus Coverage & 100+ Mock Tests",
        batchStartDate: "15 नवंबर",
        isLive: false,
        medium: "English",
        showAiBadge: false,
        showLiveCircle: false,
        mainTitle: "SSC CGL Full Course (English) : T101",
        courseType: "Course",
        validity: "6 months",
        mediumIconText: "Eng",
        progress: 30,
        details: {
          totalVideos: 80,
          totalPdfs: 30,
          totalTests: 25,
          courseCategory: "test-series",
        },
      },
      {
        id: "rly-grp-d",
        title: "Railway Group D",
        subtitle: "Technical & Non-Technical Papers Included",
        batchStartDate: "1 जनवरी",
        isLive: false,
        medium: "Hindi",
        showAiBadge: true,
        showLiveCircle: false,
        mainTitle: "Railway Group D Prep: RGD-03",
        courseType: "Course",
        validity: "1 year",
        mediumIconText: "Hin",
        progress: 95,
        details: {
          totalVideos: 50,
          totalPdfs: 70,
          totalTests: 10,
          courseCategory: "online-courses",
        },
      },
    ],
    []
  );

  // Filter Pills data structure
  const coursePills = [
    { id: "syllabus", label: "Syllabus", icon: <BookOpen size={16} /> },
    { id: "videos", label: "Videos", icon: <Video size={16} /> },
    { id: "pdfs", label: "PDFs", icon: <FileText size={16} /> },
    { id: "notes", label: "My Notes", icon: <NotebookText size={16} /> },
    { id: "downloads", label: "Downloads", icon: <Download size={16} /> },
  ];

  const [activePill, setActivePill] = useState("videos"); // Default active pill

  // Find the selected course object
  const selectedCourse = useMemo(
    () =>
      myCoursesData.find((c) => c.id === selectedCourseId) || myCoursesData[0],
    [selectedCourseId, myCoursesData]
  );

  useEffect(() => {
    // Automatically select the first course on load if none is selected
    if (!selectedCourseId && myCoursesData.length > 0) {
      setSelectedCourseId(myCoursesData[0].id);
    }
  }, [selectedCourseId, myCoursesData]);

  // Handler passed to the CourseCard
  const handleCourseClick = (courseId) => {
    // When a card is clicked, set it as active to show its details below
    setSelectedCourseId(courseId);
    setActivePill("videos"); // Reset to default pill when course changes
  };

  // Handler for deep navigation (e.g., View Content button inside the pills)
  const handleViewContent = (pillId) => {
    // This navigation logic should be customized based on your AppRoutes.jsx structure
    // We navigate to a generic video player page which should handle content logic internally
    console.log(`Navigating to ${pillId} content for ${selectedCourse.id}`);
    navigate(`/online-courses/${selectedCourse.id}/player/${pillId}`);
  };

  const renderPillContent = () => {
    const data = selectedCourse?.details;
    if (!data)
      return (
        <p className={styles.emptyState}>Select a course to view details.</p>
      );

    // Mock Content based on the active pill
    switch (activePill) {
      case "videos":
        return (
          <div className={styles.contentDetail}>
            <p className={styles.contentStat}>
              Total Videos: <strong>{data.totalVideos}</strong>
            </p>
            <p className={styles.contentDescription}>
              Access all recorded video lectures covering the full syllabus.
            </p>
            <button
              className={styles.viewContentBtn}
              onClick={() => handleViewContent("videos")}
            >
              Start Watching <ArrowRight size={16} />
            </button>
          </div>
        );
      case "pdfs":
        return (
          <div className={styles.contentDetail}>
            <p className={styles.contentStat}>
              Total PDFs: <strong>{data.totalPdfs}</strong>
            </p>
            <p className={styles.contentDescription}>
              Download comprehensive study materials, notes, and handouts. These
              are read-only resources.
            </p>
            <button
              className={styles.viewContentBtn}
              onClick={() => handleViewContent("pdfs")}
            >
              View/Download PDFs <ArrowRight size={16} />
            </button>
          </div>
        );
      case "syllabus":
        return (
          <div className={styles.contentDetail}>
            <p className={styles.contentDescription}>
              Detailed breakdown of topics and subtopics covered in this course
              to track your progress.
            </p>
            <button
              className={styles.viewContentBtn}
              onClick={() => handleViewContent("syllabus")}
            >
              View Full Syllabus <ArrowRight size={16} />
            </button>
          </div>
        );
      case "notes":
        return (
          <div className={styles.contentDetail}>
            <p className={styles.contentDescription}>
              Access your personalized notes and highlights created during the
              lectures for quick review.
            </p>
            <button
              className={styles.viewContentBtn}
              onClick={() => handleViewContent("notes")}
            >
              View My Notes <ArrowRight size={16} />
            </button>
          </div>
        );
      case "downloads":
        return (
          <div className={styles.contentDetail}>
            <p className={styles.contentDescription}>
              Manage and access your locally saved videos and PDFs for offline
              viewing.
            </p>
            <button
              className={styles.viewContentBtn}
              onClick={() => handleViewContent("downloads")}
            >
              Manage Downloads <ArrowRight size={16} />
            </button>
          </div>
        );
      default:
        return (
          <p className={styles.emptyState}>Select a content type above.</p>
        );
    }
  };

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
            Explore your purchased courses and continue your learning journey.
          </p>
        </div>

        {/* === Courses Grid === */}
        <div className={styles.gridContainer}>
          {myCoursesData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              // Set the active state based on selectedCourseId
              className={
                course.id === selectedCourseId ? styles.activeCard : ""
              }
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>

        {/* === Content Pills and Details === */}
        {selectedCourse && (
          <div className={styles.detailsContainer}>
            <h3 className={styles.detailsHeader}>
              Content for: {selectedCourse.mainTitle}
            </h3>

            {/* Pills/Tabs */}
            <div className={styles.pillsWrapper}>
              {coursePills.map((pill) => (
                <div
                  key={pill.id}
                  className={`${styles.pillItem} ${
                    activePill === pill.id ? styles.activePill : ""
                  }`}
                  onClick={() => setActivePill(pill.id)}
                >
                  {pill.icon}
                  <span className={styles.pillLabel}>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* Pill Content Area */}
            <div className={styles.pillContentArea}>{renderPillContent()}</div>
          </div>
        )}
      </div>
    </section>
  );
}

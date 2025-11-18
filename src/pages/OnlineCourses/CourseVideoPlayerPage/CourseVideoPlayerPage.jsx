import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseVideoPlayerPage.module.css";
import { ONLINE_COURSES_SUBCATEGORIES } from "../../../data/onlineCourses.js";

// Import the new components
import VideoTopicList from "../../../components/VideoTopicList/VideoTopicList.jsx";
import TakeNotes from "../../../components/TakeNotes/TakeNotes.jsx";
import QuizButton from "../../../components/QuizButton/QuizButton";
import { FaArrowLeft, FaRegClock, FaLock } from "react-icons/fa";
import Button from "../../../components/Button/Button.jsx";

export default function CourseVideoPlayerPage() {
  const { category, subcategory, courseId, videoId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null); // Ref for the video element
  const [isLoading, setIsLoading] = useState(true); // Loader state

  // Find the current course and video
  const { course, currentVideo } = useMemo(() => {
    const catKey = String(category).toLowerCase();
    const subKey = String(subcategory).toLowerCase();

    const subcategoryInfo = (ONLINE_COURSES_SUBCATEGORIES[catKey] || []).find(
      (s) => s.id === subKey
    );
    const course = (subcategoryInfo?.courses || []).find(
      (c) => c.id === courseId
    );
    const video = (course?.classes || []).find((v) => v.videoId === videoId);

    return { course, currentVideo: video };
  }, [category, subcategory, courseId, videoId]);

  // Find the next video in the list
  const nextVideo = useMemo(() => {
    if (!course || !course.classes) return null;
    const currentIndex = course.classes.findIndex((v) => v.videoId === videoId);
    if (currentIndex > -1 && currentIndex < course.classes.length - 1) {
      return course.classes[currentIndex + 1];
    }
    return null;
  }, [course, videoId]);

  // When the video URL changes, show loader and load new video
  useEffect(() => {
    if (currentVideo && !currentVideo.isLocked) {
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.load(); // Tell the video element to load the new source
      }
    } else {
      setIsLoading(false); // No video to load, so don't show loader
    }
  }, [currentVideo]); // Dependency on the video object

  const handleNext = () => {
    if (nextVideo) {
      const basePath = `/online-courses/${category}/${subcategory}/${courseId}`;
      navigate(`${basePath}/video/${nextVideo.videoId}`);
    } else {
      // You could navigate back to the course description or show an alert
      alert("You have completed all topics!");
      navigate(
        `/online-courses/${category}/${subcategory}/${courseId}/classes`
      );
    }
  };

  // ✅ Handle "Buy Now" from the lock overlay
  const handleBuyNow = () => {
    if (course?.buyNowId) {
      navigate(`/buy-now/${course.buyNowId}`);
    }
  };

  if (!course || !currentVideo) {
    return <div>Loading or video not found...</div>;
  }

  // This is the base path for the "Back" button in the sidebar
  const courseBasePath = `/online-courses/${category}/${subcategory}/${courseId}`;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* --- Main Content (Left Side) --- */}
        <main className={styles.mainContent}>
          {/* --- Video Block (Player + Title) --- */}
          <div className={styles.videoBlock}>
            {/* Real Video Player with Loader and Lock Overlay */}
            <div className={styles.videoWrapper}>
              {/* ✅ 1. Check if Locked */}
              {currentVideo.isLocked ? (
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIconBox}>
                    <FaLock className={styles.lockIcon} />
                  </div>
                  <h3>This content is locked</h3>
                  <p>Please purchase the course to unlock all videos.</p>
                  <Button label="Buy Course Now" onClick={handleBuyNow} />
                </div>
              ) : (
                /* ✅ 2. If Not Locked, show Player + Loader */
                <>
                  {isLoading && (
                    <div className={styles.loaderBackdrop}>
                      <div className={styles.loader}></div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    key={currentVideo.videoUrl} // Force re-render on URL change
                    controls
                    autoPlay
                    width="100%"
                    className={styles.videoPlayer}
                    onCanPlay={() => setIsLoading(false)} // Hide loader when video is ready
                    style={{ display: isLoading ? "none" : "block" }}
                  >
                    <source src={currentVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )}
            </div>

            <div className={styles.metaRow}>
              <h2 className={styles.videoTitle}>
                Introduction to {currentVideo.title}
              </h2>
              {nextVideo && (
                <div className={styles.navButtons}>
                  <QuizButton
                    label="Next >>"
                    onClick={handleNext}
                    className={styles.nextButton}
                  />
                </div>
              )}
            </div>
          </div>

          {/* --- Take Notes (Below Video) --- */}
          <TakeNotes />
        </main>

        {/* --- Right Sidebar --- */}
        <div className={styles.sidebarWrapper}>
          <VideoTopicList course={course} basePath={courseBasePath} />
        </div>
      </div>
    </div>
  );
}

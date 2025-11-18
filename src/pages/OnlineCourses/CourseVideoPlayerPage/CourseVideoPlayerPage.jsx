import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseVideoPlayerPage.module.css";
import {
  ONLINE_COURSES_CATEGORIES,
  ONLINE_COURSES_SUBCATEGORIES,
} from "../../../data/onlineCourses.js";

// Import the new components
import VideoTopicList from "../../../components/VideoTopicList/VideoTopicList.jsx";
import TakeNotes from "../../../components/TakeNotes/TakeNotes.jsx";
import QuizButton from "../../../components/QuizButton/QuizButton.jsx";

export default function CourseVideoPlayerPage() {
  const { category, subcategory, courseId, videoId } = useParams();
  const navigate = useNavigate();

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

  if (!course || !currentVideo) {
    return <div>Loading or video not found...</div>;
  }

  // This is the base path for the "Back" button in the sidebar
  const courseBasePath = `/online-courses/${category}/${subcategory}/${courseId}/classes`;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* --- Left Sidebar --- */}
        <VideoTopicList course={course} basePath={courseBasePath} />

        {/* --- Main Content (Right Side) --- */}
        <main className={styles.mainContent}>
          {/* Placeholder for the video player */}
          <div className={styles.videoWrapper}>
            {/* In a real app, you'd put your video player here */}
            <span>Video Player for: {currentVideo.title}</span>
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

          <TakeNotes />
        </main>
      </div>
    </div>
  );
}

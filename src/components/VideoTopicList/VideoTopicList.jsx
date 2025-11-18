import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VideoTopicList.module.css";
import { FaArrowLeft, FaRegClock, FaLock } from "react-icons/fa";

// This is a single item in the list
const TopicItem = ({ video, path, isActive }) => (
  <Link
    to={path}
    // ✅ 2. Add 'locked' class if video is locked
    className={`${styles.topicItem} ${isActive ? styles.active : ""} ${
      video.isLocked ? styles.locked : ""
    }`}
  >
    <div className={styles.activeBar}></div>
    <div className={styles.topicInfo}>
      <span className={styles.topicTitle}>{video.title}</span>
      <span className={styles.topicMeta}>
        <FaRegClock className={styles.clockIcon} /> {video.lessonCount}
      </span>
    </div>
    {/* ✅ 3. Show lock icon */}
    {video.isLocked && <FaLock className={styles.lockIcon} />}
  </Link>
);

// This is the full sidebar component
export default function VideoTopicList({ course, basePath }) {
  const { videoId } = useParams();

  // Flatten all "classes" from the course data
  const allVideos = course?.classes || [];

  return (
    <aside className={styles.sidebar}>
      {/* Header: "IAS FOUNDATION" */}
      <Link to={basePath} className={styles.header}>
        <FaArrowLeft />
        <span className={styles.headerTitle}>{course?.mainTitle}</span>
      </Link>

      {/* List of videos */}
      <nav className={styles.topicList}>
        {allVideos.map((video, index) => (
          <TopicItem
            key={video.id}
            video={video}
            // Construct the path to this specific video
            path={`${basePath}/video/${video.videoId}`}
            isActive={video.videoId === videoId}
          />
        ))}
      </nav>
    </aside>
  );
}

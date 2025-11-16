import React from "react";
import styles from "./CoursesDataPage.module.css";

// --- 1. IMPORT THE TWO COMPONENTS ---
import TabSwitchPage from "../../../components/TabSwitchPage/TabSwitchPage";
import ClassesVideoCard from "../../../components/ClassesVideoCard/ClassesVideoCard";

// --- 2. CREATE EXAMPLE CONTENT FOR EACH TAB ---

// Example placeholder for 'My Profile'
const MyProfileContent = () => (
  <div className={styles.placeholder}>
    <h2>My Profile</h2>
    <p>Your profile content and settings will go here.</p>
  </div>
);

// Example placeholder for 'My Test Series'
const MyTestSeriesContent = () => (
  <div className={styles.placeholder}>
    <h2>My Test Series</h2>
    <p>A list of your purchased test series will go here.</p>
  </div>
);

// Example placeholder for 'Settings'
const SettingsContent = () => (
  <div className={styles.placeholder}>
    <h2>Settings</h2>
    <p>Your account settings will go here.</p>
  </div>
);

// --- THIS IS THE 'MY COURSES' CONTENT FROM YOUR IMAGE ---
// This creates the grid of video cards.
const MyCoursesContent = () => {
  // Mock data for the video cards based on your image
  const coursesData = [
    {
      id: 1,
      to: "/courses/1",
      thumbnailSrc: "/images/hero2.jpg", // Using an existing image, replace as needed
      title: "Complete GS Foundation",
      subtitle: "UPSC",
      views: "1.2k views",
      duration: "4:15",
      isLive: true,
      isLocked: false,
    },
    {
      id: 2,
      to: "/courses/2",
      thumbnailSrc: "/images/learning.jpg", // Using an existing image, replace as needed
      title: "APPSC Group 2",
      subtitle: "APPSC",
      views: "890 views",
      duration: "1:30:00",
      isLive: false,
      isLocked: true,
    },
    {
      id: 3,
      to: "/courses/3",
      thumbnailSrc: "/images/aboutus/about3.webp", // Using an existing image, replace as needed
      title: "SI & Constable Batch",
      subtitle: "Police",
      views: "2.5k views",
      duration: "45:10",
      isLive: false,
      isLocked: false,
    },
    // Add more courses as needed
  ];

  return (
    <div className={styles.cardGrid}>
      {coursesData.map((course) => (
        <ClassesVideoCard
          key={course.id}
          to={course.to}
          thumbnailSrc={course.thumbnailSrc}
          title={course.title}
          subtitle={course.subtitle}
          views={course.views}
          duration={course.duration}
          isLive={course.isLive}
          isLocked={course.isLocked}
        />
      ))}
    </div>
  );
};

// --- 3. DEFINE ICONS & TABS ARRAY ---

// Example Icon components (you can import your own)
const ProfileIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const CoursesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
const TestSeriesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);
const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// This array combines all your tabs and content
const userTabs = [
  {
    id: "profile",
    label: "My Profile",
    icon: <ProfileIcon />,
    content: <MyProfileContent />,
  },
  {
    id: "courses",
    label: "My Courses",
    icon: <CoursesIcon />,
    content: <MyCoursesContent />,
  },
  {
    id: "testseries",
    label: "My Test Series",
    icon: <TestSeriesIcon />,
    content: <MyTestSeriesContent />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    content: <SettingsContent />,
  },
];

// --- 4. THE FINAL PAGE COMPONENT ---
const CoursesDataPage = () => {
  return (
    <div className={styles.pageContainer}>
      <TabSwitchPage
        tabs={userTabs}
        defaultTab="courses" // Set "My Courses" as active by default
      />
    </div>
  );
};

export default CoursesDataPage;

import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TestSeriesDescriptionPage.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/modalSlice";

// --- Import Data ---
// ✅ FIX: Path changed from ../../ to ../../../
import TEST_SERIES_LIST_DATA from "../../../data/testSeries.js";

// --- Import Components ---
// ✅ FIX: Path changed from ../../ to ../../../
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader";
import Button from "../../../components/Button/Button";
import TakeTestCard from "../../../components/TakeTestCard/TakeTestCard";
import PricingTabContent from "../../Ebooks/BookDetailPage/PricingTabContent/PricingTabContent";

// --- Mock Data for the "Tests" tab ---
// This is the list of individual tests inside the series
const individualTests = [
  {
    id: "ias-live-1",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
  {
    id: "ias-live-2",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
  {
    id: "ias-live-3",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
  {
    id: "ias-live-4",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
  {
    id: "ias-live-5",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
  {
    id: "ias-live-6",
    title: "IAS GS Foundation - Live Test",
    lang: "English",
    time: "12 May, 12:00 PM to 1:00 PM (1 Hour)",
    ques: "100 Ques",
    marks: "100 Marks",
    logo: "/images/upsc.png",
  },
];

export default function TestSeriesDescriptionPage() {
  const { category, seriesId, tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determine the active tab from the URL, default to "description"
  const activeTab = tab || "description";

  // Find the specific test series data from our data file
  const seriesData = useMemo(() => {
    const catData = TEST_SERIES_LIST_DATA[category];
    if (!catData) return null;
    return catData.tests.find((test) => test.id === seriesId) || null;
  }, [category, seriesId]);

  // Find the hero data for the pricing tab
  const heroData = useMemo(() => {
    return TEST_SERIES_LIST_DATA[category]?.hero || null;
  }, [category]);

  const handleTakeTest = (testId) => {
    console.log("Taking test:", testId);
    // ✅ This now correctly links to the instructions page
    navigate(`/test-series/${category}/${seriesId}/instructions`);
  };

  const handleBuyNow = () => {
    if (heroData?.buyNowId) {
      navigate(`/buy-now/${heroData.buyNowId}`);
    }
  };

  const handleApplyCoupon = () => {
    dispatch(openModal({ type: "applyCoupon" }));
  };

  // --- Handle Tab Navigation ---
  const handleTabClick = (tabId) => {
    // Update the URL without adding a new entry to the history
    navigate(`/test-series/${category}/${seriesId}/${tabId}`, {
      replace: true,
    });
  };

  // --- 1. Define Description Tab Content ---
  const descriptionContent = (
    <div className={styles.panelContent}>
      <h3 className={styles.contentTitle}>About Course :</h3>
      <p className={styles.descText}>
        This course is designed to help aspirants systematically prepare for
        competitive exams with expert guidance, structured study material, and
        proven strategies. Covering all key subjects, concepts, and
        problem-solving techniques, the course ensures that students build a
        strong foundation while practicing with mock tests and previous-year
        papers.
      </p>
      <h3 className={styles.contentTitle}>What you will get :</h3>
      <ul className={styles.bullets}>
        <li>Comprehensive syllabus coverage</li>
        <li>Expert-led interactive classes</li>
        <li>Time management & exam strategies</li>
        <li>Doubt-solving sessions</li>
        <li>Mock tests & performance analysis</li>
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
              onClick={() => console.log("Download PDF")}
              className={styles.smallDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // --- 2. Define Tests Tab Content ---
  const testsContent = (
    <div className={styles.panelContent}>
      <div className={styles.testList}>
        {individualTests.map((test) => (
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

  // --- 3. Define Pricing Tab Content ---
  const pricingContent = (
    <div className={styles.panelContent}>
      {heroData ? (
        <PricingTabContent
          title={heroData.title}
          description={
            heroData.description || "This is the complete test series package."
          }
          price={heroData.price}
          onBuyNow={handleBuyNow}
          onApplyCoupon={handleApplyCoupon}
        />
      ) : (
        <p>Pricing information not available.</p>
      )}
    </div>
  );

  // --- 4. Create Tabs Array (for navigation) ---
  const tabs = [
    { id: "description", label: "Description" },
    { id: "tests", label: "Tests" },
    { id: "pricing", label: "Pricing" },
  ];

  if (!seriesData || !heroData) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Test Series not found</h2>
          <Button label="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <CategoryHeader
        title={seriesData.mainTitle}
        active="English"
        onChange={(lang) => console.log("Lang changed", lang)}
      />

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
          {activeTab === "tests" && testsContent}
          {activeTab === "pricing" && pricingContent}
        </div>
      </main>
    </div>
  );
}

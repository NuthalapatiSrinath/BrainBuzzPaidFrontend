import React, { useMemo } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./TestResultPage.module.css";
// ✅ 1. Import data and the card component
// ✅ FIX: Path changed from ../../../ to ../../../../
import TEST_SERIES_LIST_DATA, {
  TEST_SERIES_CATEGORIES,
} from "../../../data/testSeries.js";
import TestSeriesCard from "../../../components/TestSeriesCard/TestSeriesCard";
import Button from "../../../components/Button/Button";
// ✅ 2. Import new icons to match the screenshot
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaListOl,
  FaTachometerAlt,
  FaPencilAlt,
  FaBullseye,
} from "react-icons/fa";

export default function TestResultPage() {
  const { category, seriesId, testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from the play page
  const { test, answers, timeTaken } = useMemo(() => {
    const state = location.state || {};
    return {
      test: state.test,
      answers: state.answers || [],
      timeTaken: state.timeTaken || 0,
    };
  }, [location.state]);

  // ✅ 3. Updated score logic to match all stats in the image
  const {
    score,
    correct,
    incorrect,
    skipped,
    allQuestions,
    attempted,
    accuracy,
    speed,
    correctPercent,
    incorrectPercent,
  } = useMemo(() => {
    if (!test || !test.questions) {
      return {
        score: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        allQuestions: [],
        attempted: 0,
        accuracy: 0,
        speed: 0,
        correctPercent: 0,
        incorrectPercent: 0,
      };
    }

    const allQuestions = test.questions.flatMap((s) => s.questions);
    let correctCount = 0;
    const answeredIndices = [];

    allQuestions.forEach((q, index) => {
      // Find the index of the correct answer string in the options array
      const correctOptionIndex = q.options.findIndex(
        (opt) => opt === q.correctAnswer
      );

      // Check if the user's answer (which is an index) is not null
      if (answers[index] !== null) {
        answeredIndices.push(index);
        // Check if the answered index matches the correct index
        if (answers[index] === correctOptionIndex) {
          correctCount++;
        }
      }
    });

    const total = allQuestions.length;
    const attemptedCount = answeredIndices.length;
    const incorrectCount = attemptedCount - correctCount;
    const skippedCount = total - attemptedCount; // New
    const score = correctCount * 1; // Assuming 1 mark per question

    // Accuracy based on attempted questions
    const accuracy =
      attemptedCount > 0
        ? ((correctCount / attemptedCount) * 100).toFixed(0)
        : 0;

    // Speed in q/min
    const timeInMinutes = timeTaken / 60;
    const speed =
      timeInMinutes > 0 ? (attemptedCount / timeInMinutes).toFixed(1) : 0;

    // For chart
    const correctPercent = total > 0 ? (correctCount / total) * 100 : 0;
    const incorrectPercent = total > 0 ? (incorrectCount / total) * 100 : 0;

    return {
      score,
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      allQuestions,
      attempted: attemptedCount,
      accuracy,
      speed,
      correctPercent,
      incorrectPercent,
    };
  }, [test, answers, timeTaken]);

  // --- (Promo logic is unchanged) ---
  const promoItems = useMemo(() => {
    return TEST_SERIES_CATEGORIES.filter(
      (item) => item.categoryKey !== category
    ).slice(0, 3);
  }, [category]);

  const handleViewDetails = (categoryKey) => {
    navigate(`/test-series/${categoryKey}`);
  };

  const handleBuyNow = (id) => {
    navigate(`/buy-now/${id}`);
  };
  // --- (End of promo logic) ---

  if (!test) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Test data not found.</h2>
          <Button label="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  // Calculate percentages for the 3-part chart
  const correctDeg = (correct / allQuestions.length) * 360;
  const incorrectDeg = (incorrect / allQuestions.length) * 360;

  // CSS variables for the conic-gradient
  const chartStyle = {
    "--correct-deg": `${correctDeg}deg`,
    "--incorrect-deg": `${correctDeg + incorrectDeg}deg`,
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ✅ 4. UPDATED HEADER to match image */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>{test.mainTitle} - Quiz 1</div>
        <div className={styles.headerMeta}>
          <div className={styles.metaItem}>
            <FaHourglassHalf />
            <span>1 Hour</span>
          </div>
          <div className={styles.metaItem}>
            <FaListOl />
            <span>{allQuestions.length} Questions</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Thank You for attempting this Test</h2>

        <div className={styles.summaryGrid}>
          {/* Rank Card - Updated Text */}
          <div className={styles.rankCard}>
            <img
              src="/images/result/rank.png"
              alt="Rank"
              className={styles.rankImage}
            />
            <div className={styles.rankText}>Rank 24</div>
            <div className={styles.rankSubtext}>Out of 1000 members</div>
          </div>

          {/* ✅ 5. UPDATED Stats Card (Vertical List) */}
          <div className={styles.statsCard}>
            <div className={styles.statItem}>
              {/* Using fallback icon, replace src with your new icon path */}
              <img
                src="/images/result/check.png"
                alt="Score"
                className={styles.statIconImg}
              />
              <div>
                <div className={styles.statLabel}>Score</div>
                <div className={styles.statValue}>
                  {score} / {allQuestions.length}
                </div>
              </div>
            </div>
            <div className={styles.statItem}>
              {/* Using fallback icon, replace src with your new icon path */}
              <img
                src="/images/result/clock.png"
                alt="Speed"
                className={styles.statIconImg}
              />
              <div>
                <div className={styles.statLabel}>Speed</div>
                <div className={styles.statValue}>{speed} q/Min</div>
              </div>
            </div>
            <div className={styles.statItem}>
              {/* Using fallback icon, replace src with your new icon path */}
              <img
                src="/images/result/percentage.png"
                alt="Accuracy"
                className={styles.statIconImg}
              />
              <div>
                <div className={styles.statLabel}>Accuracy</div>
                <div className={styles.statValue}>{accuracy}%</div>
              </div>
            </div>
            <div className={styles.statItem}>
              {/* Using fallback icon, replace src with your new icon path */}
              <FaPencilAlt className={`${styles.statIcon} ${styles.attempt}`} />
              <div>
                <div className={styles.statLabel}>Attempt</div>
                <div className={styles.statValue}>{attempted}</div>
              </div>
            </div>
          </div>

          {/* ✅ 6. UPDATED Chart Card (3-part legend) */}
          <div className={styles.chartCard}>
            <div className={styles.chartPlaceholder} style={chartStyle}>
              <div className={styles.chartInner}>
                {/* The image shows accuracy here, not percentage of total */}
                {accuracy}%
              </div>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <span
                  className={`${styles.legendColor} ${styles.correct}`}
                ></span>
                Correct: {correct}
              </div>
              <div className={styles.legendItem}>
                <span
                  className={`${styles.legendColor} ${styles.incorrect}`}
                ></span>
                Incorrect: {incorrect}
              </div>
              <div className={styles.legendItem}>
                <span
                  className={`${styles.legendColor} ${styles.skipped}`}
                ></span>
                Skipped: {skipped}
              </div>
            </div>
          </div>
        </div>

        {/* --- Explanation Section (Unchanged) --- */}
        <div className={styles.explanationSection}>
          <h3 className={styles.explanationTitle}>
            View Explanation of Every Question
          </h3>
          <img
            src="/images/defaultthumb.png"
            alt="View Explanation"
            className={styles.explanationImage}
          />
        </div>

        {/* --- Promotion Section (Unchanged as requested) --- */}
        <section className={styles.promoSection}>
          <h2 className={styles.promoTitle}>Also check out</h2>
          <div className={styles.promoGrid}>
            {promoItems.map((item) => (
              <TestSeriesCard
                key={item.id}
                variant="mainpage"
                {...item}
                onViewDetails={() => handleViewDetails(item.categoryKey)}
                onBuyNow={() => handleBuyNow(item.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

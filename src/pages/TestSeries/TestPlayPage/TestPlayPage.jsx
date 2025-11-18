import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TestPlayPage.module.css";
// ✅ FIX: Path changed to ../../../../
import TEST_SERIES_LIST_DATA from "../../../data/testSeries.js";
import Button from "../../../components/Button/Button";
import { FaRegCircle, FaCheckCircle, FaEye, FaFlag } from "react-icons/fa";

// --- Local Submit Modal Component ---
const SubmitModal = ({ summary, onClose, onSubmit }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Submit your test?</h3>
        <p className={styles.modalSubtitle}>Test Summary:</p>
        <table className={styles.modalTable}>
          <thead>
            <tr>
              <th>Section</th>
              <th>No of Questions</th>
              <th>Answered</th>
              <th>Not Answered</th>
              <th>Marked for Review</th>
              <th>Not Visited</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>{s.total}</td>
                <td>{s.answered}</td>
                <td>{s.notAnswered}</td>
                <td>{s.marked}</td>
                <td>{s.notVisited}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.modalActions}>
          <Button label="Close" variant="outline" onClick={onClose} />
          <Button label="Submit Test" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default function TestPlayPage() {
  const { category, seriesId, testId } = useParams();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // --- Load Test Data ---
  const { test, allQuestions, sections, questionMap } = useMemo(() => {
    const catData = TEST_SERIES_LIST_DATA[category];
    const series = catData?.tests.find((test) => test.id === seriesId);
    if (!series || !series.questions) {
      return {
        test: null,
        allQuestions: [],
        sections: [],
        questionMap: new Map(),
      };
    }

    const sections = series.questions.map((s) => s.section);
    const allQuestions = [];
    const questionMap = new Map();

    series.questions.forEach((section, sectionIndex) => {
      section.questions.forEach((q, qIndex) => {
        const globalIndex = allQuestions.length;
        const questionData = {
          ...q,
          globalIndex,
          sectionIndex,
          sectionName: section.section,
        };
        allQuestions.push(questionData);
        questionMap.set(q.id, questionData);
      });
    });

    return { test: series, allQuestions, sections, questionMap };
  }, [category, seriesId]);

  // --- State ---
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Stores the selected option index (0, 1, 2, 3) or null
  const [answers, setAnswers] = useState(() =>
    new Array(allQuestions.length).fill(null)
  );

  // Stores 'unseen', 'unanswered', 'answered', 'marked'
  const [statuses, setStatuses] = useState(() =>
    new Array(allQuestions.length).fill("unseen")
  );

  const [isPaused, setIsPaused] = useState(false);

  const [remainingTime, setRemainingTime] = useState(3600); // 1 hour
  const timerInterval = useRef(null);

  // --- Set initial question and status ---
  useEffect(() => {
    const firstQuestion = questionMap.get(testId);
    let startIndex = 0;
    if (firstQuestion) {
      startIndex = firstQuestion.globalIndex;
    }

    // Ensure startIndex is valid
    if (startIndex < 0 || startIndex >= allQuestions.length) {
      startIndex = 0;
    }

    setActiveQuestionIndex(startIndex);
    setActiveSectionIndex(allQuestions[startIndex]?.sectionIndex || 0);

    setStatuses((prev) => {
      const newStatuses = [...prev];
      if (newStatuses[startIndex] === "unseen") {
        newStatuses[startIndex] = "unanswered";
      }
      return newStatuses;
    });
  }, [testId, allQuestions, questionMap]);

  // --- Timer Logic ---
  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (isPaused) {
          return prev; // Don't tick down if paused
        }
        if (prev <= 1) {
          clearInterval(timerInterval.current);
          handleSubmit(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval.current);
  }, [isPaused]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // --- Computed Values ---
  const activeQuestion = allQuestions[activeQuestionIndex];
  const currentAnswer = answers[activeQuestionIndex];

  // ✅ FIX: This is the full, correct useMemo block
  const summary = useMemo(() => {
    return sections.map((name, index) => {
      const sectionQuestions = allQuestions.filter(
        (q) => q.sectionIndex === index
      );
      return {
        name,
        total: sectionQuestions.length,
        answered: sectionQuestions.filter(
          (q) => statuses[q.globalIndex] === "answered"
        ).length,
        notAnswered: sectionQuestions.filter(
          (q) => statuses[q.globalIndex] === "unanswered"
        ).length,
        marked: sectionQuestions.filter(
          (q) => statuses[q.globalIndex] === "marked"
        ).length,
        notVisited: sectionQuestions.filter(
          (q) => statuses[q.globalIndex] === "unseen"
        ).length,
      };
    });
  }, [sections, allQuestions, statuses]);

  // ✅ Get summary for the *current* active section
  const currentSectionSummary = summary[activeSectionIndex];

  // --- Event Handlers ---

  const updateStatus = (index, newStatus) => {
    setStatuses((prev) => {
      const newStatuses = [...prev];
      if (newStatus) {
        newStatuses[index] = newStatus;
      } else {
        // Infer status
        if (newStatuses[index] !== "marked") {
          newStatuses[index] =
            answers[index] !== null ? "answered" : "unanswered";
        }
      }
      return newStatuses;
    });
  };

  const handleQuestionChange = (newIndex) => {
    if (newIndex < 0 || newIndex >= allQuestions.length) return;

    updateStatus(activeQuestionIndex, null);

    setActiveQuestionIndex(newIndex);
    setActiveSectionIndex(allQuestions[newIndex].sectionIndex);

    if (statuses[newIndex] === "unseen") {
      updateStatus(newIndex, "unanswered");
    }
  };

  const handleSaveAndNext = () => {
    handleQuestionChange(activeQuestionIndex + 1);
  };

  const handleOptionChange = (optionIndex) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[activeQuestionIndex] = optionIndex;
      return newAnswers;
    });
    if (statuses[activeQuestionIndex] !== "marked") {
      updateStatus(activeQuestionIndex, "answered");
    }
  };

  const handleMarkForReview = () => {
    updateStatus(activeQuestionIndex, "marked");
    handleQuestionChange(activeQuestionIndex + 1);
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[activeQuestionIndex] = null;
      return newAnswers;
    });
    if (statuses[activeQuestionIndex] !== "marked") {
      updateStatus(activeQuestionIndex, "unanswered");
    }
  };

  const handleSubmit = () => {
    updateStatus(activeQuestionIndex, null);
    setShowSubmitModal(false);

    // Pass all necessary data to the result page
    navigate(`/test-series/${category}/${seriesId}/result/${testId}`, {
      state: {
        answers,
        test, // Pass the full test series data
        timeTaken: 3600 - remainingTime,
      },
    });
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleExit = () => {
    // Use window.confirm for simplicity as this is a critical action
    if (
      window.confirm(
        "Are you sure you want to exit? This will submit your test."
      )
    ) {
      handleSubmit();
    }
  };

  if (!test || !activeQuestion) return <div>Loading test...</div>;

  return (
    <div className={styles.pageWrapper}>
      {isPaused && (
        <div className={styles.pauseOverlay}>
          <h2>Paused</h2>
          <Button label="Resume" onClick={handleTogglePause} />
        </div>
      )}

      {showSubmitModal && (
        <SubmitModal
          summary={summary}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* --- Header --- */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerTitle}>{test.mainTitle}</span>
        </div>
        <div className={styles.headerCenter}>
          Remaining Time:
          <span className={styles.timer}>{formatTime(remainingTime)}</span>
        </div>
        <div className={styles.headerRight}>
          <Button
            label={isPaused ? "Resume" : "Pause"}
            variant="outline"
            className={styles.headerBtn}
            onClick={handleTogglePause}
          />
          <Button
            label="Exit"
            className={styles.headerBtn}
            onClick={handleExit}
          />
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className={styles.mainContent}>
        {/* --- Left Panel (Questions) --- */}
        <div className={styles.questionPanel}>
          <div className={styles.sectionTabs}>
            {sections.map((name, index) => (
              <button
                key={name}
                className={`${styles.tab} ${
                  index === activeSectionIndex ? styles.activeTab : ""
                }`}
                onClick={() => {
                  const firstQInSec = allQuestions.findIndex(
                    (q) => q.sectionIndex === index
                  );
                  if (firstQInSec !== -1) handleQuestionChange(firstQInSec);
                }}
              >
                {name}
              </button>
            ))}
          </div>

          {/* ✅ UPDATED STATS BAR to match screenshot */}
          <div className={styles.questionStats}>
            {currentSectionSummary && (
              <>
                <span className={styles.statSectionName}>
                  {currentSectionSummary.name}
                </span>
                <span className={styles.statItem}>
                  Questions: {currentSectionSummary.total}
                </span>
                <span className={styles.statItem}>
                  Marks: {currentSectionSummary.total}
                </span>
              </>
            )}
            <span className={styles.statItem}>English</span>
          </div>

          <div className={styles.questionBody}>
            {/* ✅ UPDATED QUESTION TITLE to match screenshot */}
            <h3 className={styles.questionTitle}>
              Question {activeQuestionIndex + 1}
            </h3>
            <p className={styles.questionText}>{activeQuestion.text}</p>

            {/* Check if descriptive (no options) */}
            {activeQuestion.options.length === 0 ? (
              <div className={styles.descriptivePlaceholder}>
                <textarea placeholder="This is a descriptive question. Your answer will be reviewed manually." />
              </div>
            ) : (
              <div className={styles.options}>
                {activeQuestion.options.map((opt, index) => (
                  <label
                    key={index}
                    className={`${styles.option} ${
                      currentAnswer === index ? styles.selectedOption : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q_${activeQuestion.id}`}
                      checked={currentAnswer === index}
                      onChange={() => handleOptionChange(index)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={styles.questionFooter}>
            <Button
              label="Mark as Review"
              variant="outline"
              onClick={handleMarkForReview}
              className={styles.footerBtn}
            />
            <Button
              label="Clear Response"
              variant="outline"
              onClick={handleClearResponse}
              className={styles.footerBtn}
            />
            <Button
              label="Save and Next"
              onClick={handleSaveAndNext}
              className={styles.footerBtn}
            />
          </div>
        </div>

        {/* --- Right Panel (Grid) --- */}
        <div className={styles.sidebarPanel}>
          <div className={styles.studentInfo}>
            <div className={styles.studentAvatar}></div>
            <span>{user ? user.name : "Student Name"}</span>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendIcon} ${styles.unsolved}`}>
                <FaRegCircle />
              </span>{" "}
              Unsolved
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendIcon} ${styles.marked}`}>
                <FaFlag />
              </span>{" "}
              Marked
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendIcon} ${styles.answered}`}>
                <FaCheckCircle />
              </span>{" "}
              Answered
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendIcon} ${styles.unanswered}`}>
                <FaEye />
              </span>{" "}
              Unanswered
            </div>
          </div>

          <div className={styles.questionGrid}>
            {allQuestions.map((q, index) => (
              <button
                key={q.id}
                className={`${styles.gridItem} ${styles[statuses[index]]} ${
                  index === activeQuestionIndex ? styles.activeQuestion : ""
                }`}
                onClick={() => handleQuestionChange(index)}
                aria-label={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className={styles.sidebarActions}>
            <Button label="Question Paper" variant="outline" fullWidth />
            <Button
              label="Submit"
              onClick={() => setShowSubmitModal(true)}
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

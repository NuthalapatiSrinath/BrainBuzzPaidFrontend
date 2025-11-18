import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TestInstructionsPage.module.css";
import TEST_SERIES_LIST_DATA from "../../../data/testSeries.js";
import Button from "../../../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa";

// Simple Dropdown for language
const LanguageDropdown = ({ selected, onChange }) => (
  <select className={styles.langDropdown} value={selected} onChange={onChange}>
    <option value="en">English</option>
    <option value="hi">Hindi</option>
    <option value="te">Telugu</option>
  </select>
);

export default function TestInstructionsPage() {
  const { category, seriesId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [isDeclared, setIsDeclared] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { test, testId } = useMemo(() => {
    const catData = TEST_SERIES_LIST_DATA[category];
    const foundTest = catData?.tests.find((test) => test.id === seriesId);
    // Get the ID of the very first question in the first section
    const firstTestId = foundTest?.questions?.[0]?.questions?.[0]?.id || "q1";
    return { test: foundTest, testId: firstTestId };
  }, [category, seriesId]);

  if (!test) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Test Series not found.</h2>
          <Button label="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  const handleStartTest = () => {
    if (isDeclared) {
      // Navigate to the play page, starting with the first question
      navigate(`/test-series/${category}/${seriesId}/play/${testId}`);
    } else {
      // We can't use a custom modal easily here, so we use alert
      alert("Please read and accept the declaration.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Link
          to={`/test-series/${category}/${seriesId}/tests`}
          className={styles.backLink}
        >
          <FaArrowLeft />
          <span className={styles.backText}>{test.mainTitle}</span>
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.instructionsPanel}>
          <div className={styles.panelHeader}>
            <span>Questions: 100</span>
            <span>Marks: 100</span>
          </div>
          <div className={styles.panelBody}>
            <h2 className={styles.title}>Read the following instructions :</h2>
            <ul className={styles.instructionsList}>
              <li>Write the question paper carefully before answering.</li>
              <li>Write your roll number clearly on the answer sheet.</li>
              <li>All questions are compulsory unless specified otherwise.</li>
              <li>Answer in the space provided in the answer sheet only.</li>
              <li>
                Maintain neatness and legible handwriting throughout the exam.
              </li>
              <li>Do not write unnecessary information.</li>
            </ul>

            <div className={styles.langSelector}>
              <label htmlFor="lang">Choose default language</label>
              <LanguageDropdown
                selected={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <p className={styles.langNote}>
              Please note that all questions will appear in your default
              language.
            </p>

            <div className={styles.declaration}>
              <label>
                <input
                  type="checkbox"
                  checked={isDeclared}
                  onChange={(e) => setIsDeclared(e.target.checked)}
                />
                <span>
                  I hereby, read all the instructions carefully and have
                  understood them. I agree not to cheat or use any unfair by
                  means in this examination. I understood that using to any
                  cheating leads to disqualification.
                </span>
              </label>
            </div>
          </div>
          <div className={styles.panelFooter}>
            <Link
              to={`/test-series/${category}/${seriesId}/tests`}
              className={styles.footerBackLink}
            >
              &lt;&lt; Back
            </Link>
            <Button
              label="I am ready to begin"
              onClick={handleStartTest}
              disabled={!isDeclared}
              className={styles.beginButton}
            />
          </div>
        </div>
        <div className={styles.profilePanel}>
          <div className={styles.profileIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className={styles.profileName}>
            {user ? user.name : "Student Name"}
          </div>
        </div>
      </div>
    </div>
  );
}

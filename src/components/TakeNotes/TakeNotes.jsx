import React, { useState } from "react";
import styles from "./TakeNotes.module.css";
import QuizButton from "../QuizButton/QuizButton";

export default function TakeNotes() {
  const [note, setNote] = useState("");

  const handleSave = () => {
    console.log("Saving note:", note);
    // Here you would save the note to your backend or localStorage
  };

  const handleReset = () => {
    setNote("");
  };

  return (
    <div className={styles.notesWrapper}>
      <h3 className={styles.title}>Take Notes</h3>
      <textarea
        className={styles.textarea}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Start writing your notes here..."
      />
      <div className={styles.actions}>
        <QuizButton
          label="Reset page"
          onClick={handleReset}
          className={styles.resetButton}
        />
        <QuizButton
          label="Save"
          onClick={handleSave}
          className={styles.saveButton}
        />
      </div>
    </div>
  );
}

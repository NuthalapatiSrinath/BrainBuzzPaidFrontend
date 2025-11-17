import React from "react";
import styles from "./AuthorCard.module.css";

const AuthorCard = ({ name, qualification, language, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={name}
        className={styles.authorImage}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/200x150/EBF0FF/1F4D9D?text=A";
        }}
      />
      <div className={styles.info}>
        <h4 className={styles.name}>
          {name} ({qualification})
        </h4>
        <p className={styles.detail}>{language}</p>
      </div>
    </div>
  );
};

export default AuthorCard;

import React from "react";
import styles from "./Result.module.css";

const Result = ({ cgpa, onClose, isModal, cgpaMessage }) => {
  if (cgpa === null) {
    return null; // Don't render if no CGPA is available
  }

  // const getCgpaMessage = (value) => {
  //   if (value >= 4.5) return "Excellent Work!";
  //   if (value >= 3.5) return "Great Job!";
  //   if (value >= 2.5) return "Good Effort!";
  //   return "Keep Working Hard!";
  // };

  const content = (
    <div className={styles.cgpaResultPanel}>
      <h3>YOUR CGPA IS</h3>
      <div className={styles.cgpaValue}>
        {typeof cgpa === "number" && !isNaN(cgpa) ? cgpa.toFixed(2) : "N/A"}
      </div>
      <p className={styles.cgpaMessage}>{cgpaMessage}</p>
    </div>
  );

  if (isModal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            &times;
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default Result;

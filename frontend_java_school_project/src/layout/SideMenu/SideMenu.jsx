import React from "react";
import styles from "./SideMenu.module.css";

const SideMenu = ({
  isOpen,
  onCloseMenu,
  showAboutSection,
  setShowAboutSection,
}) => {
  // Toggle the dropdown without closing the menu
  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    setShowAboutSection((prev) => !prev);
  };

  // Close dropdown and menu when clicking Calculate
  const handleCalculateClick = () => {
    setShowAboutSection(false);
    onCloseMenu();
  };

  return (
    <div className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
      <div className={styles.menuContent}>
        <a
          href="#how-it-works"
          className={styles.menuLink}
          onClick={handleHowItWorksClick}
        >
          How it Works {showAboutSection ? "▲" : "▼"}
        </a>

        <div
          className={`${styles.dropdownContent} ${
            showAboutSection ? styles.show : ""
          }`}
        >
          <div className={styles.innerText}>
            <p>
              This CGPA Calculator helps you determine your Cumulative Grade
              Point Average based on your courses, units, and grades.
            </p>
            <ul>
              <li>
                <strong>Enter Your Name:</strong> Start by typing your name.
              </li>
              <li>
                <strong>Add Courses:</strong> Create rows for each subject.
              </li>
              <li>
                <strong>Fill in Details:</strong> Enter{" "}
                <strong>Course Name</strong>, <strong>Units</strong>, and{" "}
                <strong>Grade</strong> (e.g., 80, A).
              </li>
              <li>
                <strong>Calculate:</strong> Press the 'Calculate CGPA' button.
              </li>
            </ul>
            <p>Your data is automatically saved so you can continue later.</p>

            <button
              onClick={handleCalculateClick}
              className={styles.innerCtaButton}
            >
              Get started now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

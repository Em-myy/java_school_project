import React from "react";
import styles from "./SideMenu.module.css";

const SideMenu = ({
  isOpen,
  onCloseMenu,
  showAboutSection,
  setShowAboutSection,
}) => {
  const handleHowItWorksClick = () => {
    setShowAboutSection((prev) => !prev);
    onCloseMenu(); // Close the side menu after clicking
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
        <a
          href="#calculate-cgpa"
          className={styles.menuLink}
          onClick={onCloseMenu}
        >
          Calculate Now
        </a>
      </div>
    </div>
  );
};

export default SideMenu;

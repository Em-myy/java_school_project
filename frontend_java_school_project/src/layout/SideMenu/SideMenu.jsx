import React from 'react';
import styles from './SideMenu.module.css';

const SideMenu = ({ isOpen, onReset, children, isMobile }) => {
  // On mobile, don't render the component at all if it's not open.
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuContent}>
        {children}
        <button onClick={onReset} className={styles.menuButton}>Reset Form</button>
      </div>
    </div>
  );
};

export default SideMenu;

import React from 'react';
import styles from './Header.module.css';

const Header = ({ onMenuClick, isMenuOpen }) => {
  return (
    <header className={styles.appHeader}>
      <button 
        className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.open : ''}`} 
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>
    </header>
  );
};

export default Header;

import React from 'react';
import styles from './Header.module.css';

const Header = ({ onMenuClick, isMenuOpen }) => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.headerTitle}>
        CGPA Master
      </div>
      <button 
        className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.open : ''}`} 
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      <nav className={styles.desktopNav}>
        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How it Works</a>
        <a href="#calculate-cgpa" onClick={(e) => { e.preventDefault(); scrollToSection('calculate-cgpa'); }}>Calculate Now</a>
      </nav>
    </header>
  );
};

export default Header;

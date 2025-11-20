import React from 'react';
import styles from './CourseActionsMenu.module.css';

const CourseActionsMenu = ({ onEdit, onDelete, onClose }) => {
  return (
    <div className={styles.menuWrapper}>
      <ul className={styles.menu}>
        <li className={styles.menuItem} onClick={onEdit}>
          Edit
        </li>
        <li className={`${styles.menuItem} ${styles.delete}`} onClick={onDelete}>
          Delete
        </li>
      </ul>
      <div className={styles.overlay} onClick={onClose}></div>
    </div>
  );
};

export default CourseActionsMenu;

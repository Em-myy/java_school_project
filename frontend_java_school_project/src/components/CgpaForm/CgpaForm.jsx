import React, { useState } from 'react';
import styles from './CgpaForm.module.css';
import CourseActionsMenu from '../CourseActionsMenu/CourseActionsMenu';

const ThreeDotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  </svg>
);

const CgpaForm = ({ 
  studentName, setStudentName, courses, onCalculate, loading,
  addCourse, removeCourse, updateCourse, toggleEditCourse 
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleSave = (id) => {
    toggleEditCourse(id, false);
    setOpenMenuId(null);
  }

  return (
    <div className={styles.cgpaForm}>
      <div className={styles.studentDetails}>
        <h2>Student Details</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      <div className={styles.courseList}>
        <h2>Course List</h2>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseItem}>
            <input
              type="text"
              placeholder="Course Name"
              value={course.name}
              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
              disabled={!course.isEditing}
            />
            <input
              type="number"
              placeholder="Units"
              value={course.unit}
              onChange={(e) => updateCourse(course.id, 'unit', e.target.value)}
              disabled={!course.isEditing}
            />
            <input
              type="number"
              placeholder="Grade"
              value={course.grade}
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
              disabled={!course.isEditing}
            />

            <div className={styles.courseItemActions}>
              {course.isEditing ? (
                <button onClick={() => handleSave(course.id)} className={styles.saveBtn}>Save</button>
              ) : (
                <button onClick={() => setOpenMenuId(course.id)} className={styles.dotsBtn}>
                  <ThreeDotsIcon />
                </button>
              )}
              {openMenuId === course.id && (
                <CourseActionsMenu
                  onClose={() => setOpenMenuId(null)}
                  onEdit={() => {
                    toggleEditCourse(course.id, true);
                    setOpenMenuId(null);
                  }}
                  onDelete={() => {
                    removeCourse(course.id);
                    setOpenMenuId(null);
                  }}
                />
              )}
            </div>
          </div>
        ))}
        <button onClick={addCourse} className={styles.addCourseBtn}>+ Add Another Course</button>
      </div>

      <button onClick={onCalculate} disabled={loading} className={styles.calculateBtn}>
        {loading ? 'Calculating...' : 'Calculate CGPA Now'}
      </button>
    </div>
  );
};

export default CgpaForm;
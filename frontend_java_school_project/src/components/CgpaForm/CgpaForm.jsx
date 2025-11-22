import React, { useState, memo, useRef } from "react";
import toast from "react-hot-toast";
import styles from "./CgpaForm.module.css";
import CourseActionsMenu from "../CourseActionsMenu/CourseActionsMenu";
import useOnClickOutside from "../../hooks/useOncllickOutside";

const ThreeDotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
  </svg>
);

const CgpaForm = memo(
  ({
    studentName,
    setStudentName,
    courses,
    onCalculate,
    loading,
    addCourse,
    removeCourse,
    updateCourse,
    toggleEditCourse,
    onSaveAll,
    onReset, // Add onReset prop
  }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    // Ref for the active menu to detect outside clicks
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useOnClickOutside(menuRef, () => setOpenMenuId(null));

    const handleSave = (id) => {
      const courseToSave = courses.find((c) => c.id === id);
      if (!courseToSave.name || !courseToSave.unit || !courseToSave.grade) {
        toast.error("Course name, units, and grade cannot be empty.");
        return;
      }
      if (courseToSave && parseInt(courseToSave.grade, 10) > 100) {
        toast.error("Grade cannot be higher than 100.");
        return; // Stop the save
      }
      toggleEditCourse(id, false);
      setOpenMenuId(null);
      if (onSaveAll) onSaveAll();
    };

    return (
      <div className={styles.cgpaForm}>
        <div className={styles.studentDetails}>
          <h2>Student Details</h2>
          <input
            type="text"
            aria-label="Student Name"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <div className={styles.courseList}>
          <h2>Course List</h2>

          {courses.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#888" }}
            >
              <p>No courses added yet. Click below to start!</p>
            </div>
          )}

          {courses.map((course) => (
            <div key={course.id} className={styles.courseItem}>
              <input
                type="text"
                aria-label="Course Name"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) =>
                  updateCourse(course.id, "name", e.target.value)
                }
                disabled={!course.isEditing}
              />
              <input
                type="number"
                min="0"
                aria-label="Units"
                placeholder="Units"
                value={course.unit}
                onChange={(e) =>
                  updateCourse(course.id, "unit", e.target.value)
                }
                disabled={!course.isEditing}
              />
              <input
                type="text"
                min="0"
                aria-label="Grade"
                placeholder="Grade"
                value={course.grade}
                onChange={(e) =>
                  updateCourse(course.id, "grade", e.target.value)
                }
                disabled={!course.isEditing}
              />

              <div className={styles.courseItemActions}>
                {course.isEditing ? (
                  <div className={styles.editingActions}>
                    <button
                      onClick={() => handleSave(course.id)}
                      className={styles.saveBtn}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className={styles.deleteBtn}
                      aria-label="Remove Course"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent immediate close logic
                      setOpenMenuId(course.id);
                    }}
                    className={styles.dotsBtn}
                    aria-label="Options"
                  >
                    <ThreeDotsIcon />
                  </button>
                )}

                {openMenuId === course.id && (
                  /* We wrap the menu in a div with the Ref to detect clicks */
                  <div
                    ref={menuRef}
                    style={{ position: "absolute", zIndex: 10 }}
                  >
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
                  </div>
                )}
              </div>
            </div>
          ))}
          <button onClick={addCourse} className={styles.addCourseBtn}>
            + Add Another Course
          </button>
        </div>

        <div className={styles.formActions}>
          <button
            onClick={onCalculate}
            disabled={loading || courses.length < 3}
            className={styles.calculateBtn}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
          <button onClick={onReset} className={styles.resetFormBtn}>
            Reset Form
          </button>
        </div>
      </div>
    );
  }
);

export default CgpaForm;

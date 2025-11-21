import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <h2>How It Works</h2>
      <p>
        This CGPA Calculator helps you determine your Cumulative Grade Point
        Average based on your courses, units, and grades.
      </p>
      <ul>
        <li>
          <strong>Enter Your Name:</strong> Start by typing your name into the
          designated field.
        </li>
        <li>
          <strong>Add Courses:</strong> Use the 'Add Course' button to create
          new rows for each of your subjects.
        </li>
        <li>
          <strong>Fill in Details:</strong> For each course, enter the{" "}
          <strong>Course Name</strong> (e.g., "Introduction to Programming"),
          the <strong>Course Units</strong>, and the <strong>Grade</strong> you
          achieved (e.g 80, 73, 65).
        </li>
        <li>
          <strong>Calculate:</strong> Once all your courses are entered, press
          the <strong>'Calculate CGPA'</strong> button.
        </li>
        <li>
          <strong>View Your Result:</strong> Your final CGPA will be displayed,
          along with a motivational message.
        </li>
      </ul>
      <p>
        Your data is automatically saved in your browser, so you can come back
        and continue where you left off.
      </p>
    </div>
  );
};

export default About;

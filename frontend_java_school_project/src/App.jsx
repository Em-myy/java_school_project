import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import "./App.css";
import CgpaForm from "./components/CgpaForm/CgpaForm";
import calculateCGPA from "./services/api";
import Header from "./layout/Header/Header";
import SideMenu from "./layout/SideMenu/SideMenu";
import { useCourses } from "./hooks/useCourses";
import { useWindowSize } from "./hooks/useWindowSize";

const Result = lazy(() => import("./components/Result/Result"));
const About = lazy(() => import("./components/About/About"));

function App() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("studentName") || "";
  });
  const { courses, addCourse, removeCourse, updateCourse, toggleEditCourse, setCoursesFromReset } = useCourses();
  const [cgpaResult, setCgpaResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false); // State for mobile result modal
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  }, []);

  const handleResetForm = useCallback(() => {
    setStudentName("");
    setCoursesFromReset([]);
    setCgpaResult(null);
    setError(null);
    setMenuOpen(false); // Close menu after resetting
  }, []);

  const handleSaveAll = useCallback(() => {
    localStorage.setItem("studentName", studentName);
    localStorage.setItem("courses", JSON.stringify(courses));
    alert("Your data has been saved!"); // Optional: provide feedback to the user
  }, [studentName, courses]);

  const handleCalculateCgpa = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        studentName,
        courses: courses.map((course) => ({
          courseName: course.name,
          courseUnit: parseInt(course.unit),
          courseGrade: parseInt(course.grade),
        })),
      };
      const response = await calculateCGPA(payload);
      setCgpaResult(parseFloat(response.cgpa));
      if (isMobile) {
        setShowResultModal(true); // Show modal on mobile
      }
    } catch (err) {
      setError(
        "Failed to calculate CGPA. Please check your inputs and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [studentName, courses, isMobile]);

  return (
    <div className="App">
      <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="container">
        <h1>CGPA Master</h1>
        <div className="contentWrapper">
          <SideMenu 
            isOpen={isMenuOpen} 
            onReset={handleResetForm} 
            isMobile={isMobile}
          >
            <Suspense fallback={<div>Loading About...</div>}>
              <About />
            </Suspense>
          </SideMenu>
          <main className="mainContent">
            <CgpaForm
              studentName={studentName}
              setStudentName={setStudentName}
              courses={courses}
              addCourse={addCourse}
              removeCourse={removeCourse}
              updateCourse={updateCourse}
              toggleEditCourse={toggleEditCourse}
              onCalculate={handleCalculateCgpa}
              onSaveAll={handleSaveAll}
              loading={loading}
            />
            {cgpaResult !== null && !isMobile && (
              <Suspense fallback={<div>Loading Result...</div>}>
                <Result cgpa={cgpaResult} />
              </Suspense>
            )}
            {error && <p className="error-message">{error}</p>}
          </main>
        </div>
      </div>

      {isMobile && showResultModal && (
        <Suspense fallback={<div>Loading Result...</div>}>
          <Result
            cgpa={cgpaResult}
            onClose={() => setShowResultModal(false)}
            isModal={true}
          />
        </Suspense>
      )}
    </div>
  );
}
export default App;

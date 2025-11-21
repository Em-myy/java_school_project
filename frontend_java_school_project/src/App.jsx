import React, { useState, useCallback, Suspense, lazy } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CgpaForm from "./components/CgpaForm/CgpaForm";
import calculateCGPA from "./services/api";
import Header from "./layout/Header/Header";
import SideMenu from "./layout/SideMenu/SideMenu";
import { useCourses } from "./hooks/useCourses";
import { useWindowSize } from "./hooks/useWindowSize";
import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";

const Result = lazy(() => import("./components/Result/Result"));
const About = lazy(() => import("./layout/About/About"));

function App() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("studentName") || "";
  });
  const {
    courses,
    addCourse,
    removeCourse,
    updateCourse,
    toggleEditCourse,
    setCoursesFromReset,
  } = useCourses();
  const [cgpaResult, setCgpaResult] = useState(null);
  const [cgpaMessage, setCgpaMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showAboutSection, setShowAboutSection] = useState(false); // New state for About section

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }, []);

  const handleResetForm = useCallback(() => {
    setShowConfirmationDialog(true);
    setConfirmationAction(() => () => {
      setStudentName("");
      setCoursesFromReset([]);
      setCgpaResult(null);
      setError(null);
      setMenuOpen(false);
      toast.success("Form has been reset!");
      setShowConfirmationDialog(false);
      setShowAboutSection(false); // Hide About section on reset
    });
  }, [setCoursesFromReset]);

  const handleConfirm = useCallback(() => {
    if (confirmationAction) {
      confirmationAction();
    }
  }, [confirmationAction]);

  const handleCancel = useCallback(() => {
    setShowConfirmationDialog(false);
    setConfirmationAction(null);
  }, []);

  const handleSaveAll = useCallback(() => {
    localStorage.setItem("studentName", studentName);
    localStorage.setItem("courses", JSON.stringify(courses));
    toast.success("Your data has been saved!");
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
      setCgpaMessage(response.message);
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
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "var(--glass-bg)",
              color: "var(--text-color)",
              boxShadow: "0 8px 32px var(--glass-shadow)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid var(--glass-border)",
            },
          },
          error: {
            style: {
              background: "var(--glass-bg)",
              color: "var(--text-color)",
              boxShadow: "0 8px 32px var(--glass-shadow)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid var(--glass-border)",
            },
          },
        }}
      />
      <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="container">
        <h1>CGPA Master</h1>
        <div className="contentWrapper">
          {isMobile && isMenuOpen && (
            <SideMenu
              isOpen={isMenuOpen}
              isMobile={isMobile}
              onCloseMenu={toggleMenu}
              showAboutSection={showAboutSection}
              setShowAboutSection={setShowAboutSection}
            />
          )}
          <main className="mainContent">
            <div className="desktopLayout">
              <div
                className={`aboutContainer ${
                  isMobile && !showAboutSection ? "hidden" : ""
                }`}
              >
                <section id="how-it-works">
                  <Suspense fallback={<div>Loading About...</div>}>
                    <About onReset={handleResetForm} />
                  </Suspense>
                </section>
              </div>
              <div className="formContainer">
                <section id="calculate-cgpa">
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
                    onReset={handleResetForm} // Pass handleResetForm here
                    loading={loading}
                  />
                </section>
              </div>
            </div>
            {cgpaResult !== null && !isMobile && (
              <Suspense fallback={<div>Loading Result...</div>}>
                <Result cgpa={cgpaResult} cgpaMessage={cgpaMessage} />
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
            cgpaMessage={cgpaMessage}
            onClose={() => setShowResultModal(false)}
            isModal={true}
          />
        </Suspense>
      )}

      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        title="Confirm Reset"
        message="Are you sure you want to reset the form? All your data will be lost."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
export default App;

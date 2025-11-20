import React, { useState, useEffect } from "react";
import "./App.css";
import CgpaForm from "./components/CgpaForm/CgpaForm";
import Result from "./components/Result/Result";
import calculateCGPA from "./services/api";
import Header from "./layout/Header/Header";
import SideMenu from "./layout/SideMenu/SideMenu";
import About from "./components/About/About";

// Import background images
import desktopBackground from "./assets/desktop-background-image.png";
import mobileBackground from "./assets/mobile-background-image.png";

function App() {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("studentName") || "";
  });
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      try {
        return JSON.parse(savedCourses);
      } catch (e) {
        console.error("Failed to parse courses from localStorage", e);
        return [];
      }
    }
    return [];
  });
  const [cgpaResult, setCgpaResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile for background
  const [showResultModal, setShowResultModal] = useState(false); // State for mobile result modal
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("studentName", studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // Effect to update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', unit: '', grade: '', isEditing: true }]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id, field, value) => {
    const newCourses = courses.map(course => {
      if (course.id === id) {
        return { ...course, [field]: value };
      }
      return course;
    });
    setCourses(newCourses);
  };
  
  const toggleEditCourse = (id, isEditing) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, isEditing } : course
    ));
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResetForm = () => {
    setStudentName("");
    setCourses([]);
    setCgpaResult(null);
    setError(null);
    setMenuOpen(false); // Close menu after resetting
  };

  const handleCalculateCgpa = async () => {
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
  };

  const appStyle = {
    backgroundImage: `url(${isMobile ? mobileBackground : desktopBackground})`,
  };

  return (
    <div className="App" style={appStyle}>
      <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="container">
        <h1>CGPA Master</h1>
        <div className="contentWrapper">
          <SideMenu 
            isOpen={isMenuOpen} 
            onReset={handleResetForm} 
            isMobile={isMobile}
          >
            <About />
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
              loading={loading}
            />
            {cgpaResult !== null && !isMobile && <Result cgpa={cgpaResult} />}
            {error && <p className="error-message">{error}</p>}
          </main>
        </div>
      </div>

      {isMobile && showResultModal && (
        <Result
          cgpa={cgpaResult}
          onClose={() => setShowResultModal(false)}
          isModal={true}
        />
      )}
    </div>
  );
}

export default App;

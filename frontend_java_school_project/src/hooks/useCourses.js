import { useReducer, useCallback } from "react";

const coursesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return [
        ...state,
        { id: Date.now(), name: "", unit: "", grade: "", isEditing: true },
      ];
    case "REMOVE_COURSE":
      return state.filter((course) => course.id !== action.payload);
    case "UPDATE_COURSE":
      return state.map((course) =>
        course.id === action.payload.id
          ? { ...course, [action.payload.field]: action.payload.value }
          : course
      );
    case "TOGGLE_EDIT_COURSE":
      return state.map((course) =>
        course.id === action.payload.id
          ? { ...course, isEditing: action.payload.isEditing }
          : course
      );
    case "SET_COURSES":
      return action.payload;
    default:
      return state;
  }
};

export const useCourses = () => {
  const [courses, dispatch] = useReducer(coursesReducer, [], () => {
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

  const addCourse = useCallback(() => {
    dispatch({ type: "ADD_COURSE" });
  }, []);

  const removeCourse = useCallback((id) => {
    dispatch({ type: "REMOVE_COURSE", payload: id });
  }, []);

  const updateCourse = useCallback((id, field, value) => {
    dispatch({ type: "UPDATE_COURSE", payload: { id, field, value } });
  }, []);

  const toggleEditCourse = useCallback((id, isEditing) => {
    dispatch({ type: "TOGGLE_EDIT_COURSE", payload: { id, isEditing } });
  }, []);

  const setCoursesFromReset = useCallback((newCourses) => {
    dispatch({ type: "SET_COURSES", payload: newCourses });
  }, []);

  return {
    courses,
    addCourse,
    removeCourse,
    updateCourse,
    toggleEditCourse,
    setCoursesFromReset,
  };
};

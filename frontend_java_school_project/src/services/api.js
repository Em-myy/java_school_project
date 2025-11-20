import axios from "axios";

const API_URL = "https://java-school-project.onrender.com/api/cgpa/calculate";
const calculateCGPA = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error calculating cgpa: ", error.response.data);
      throw error;
    }
  }

  //   const dummyPayload = {
  //    studentName: "Jamal",
  //     courses: [
  //       {
  //         courseName: "Java Fundamentals",
  //         courseUnit: 3,
  //         courseGrade: 5
  //       },
  //       {
  //         courseName: "React Basics",
  //         courseUnit: 2,
  //         courseGrade: 4
  //       }
  //     ]
  //   };

  //   try {
  //     console.log(" Pinging API...");
  //     const response = await axios.post(url, dummyPayload);
  //     console.log(" SUCCESS! Here is the API structure:");
  //     console.log(JSON.stringify(response.data, null, 2));
  //   } catch (error) {
  //     console.error(" Request Failed:", error.message);
  //     if (error.response) {
  //       console.log("Server Error Data:", error.response.data);
  //       console.log("Server Status:", error.response.status);
  //     }
  //   }
};

export default calculateCGPA();

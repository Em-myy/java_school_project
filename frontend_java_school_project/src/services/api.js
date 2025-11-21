import axios from "axios";

const API_URL = "https://java-school-project.onrender.com/api/cgpa/calculate";
const calculateCGPA = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    console.log(" SUCCESS! Here is the API structure:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error calculating cgpa: ", error.response.data);
      console.log("Server Status:", error.response.status);
      throw error;
    }
  }
};

export default calculateCGPA;

import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-health-companion-mk5a.onrender.com",
});

// Predict disease
export const predictDisease = (symptoms) => {
  return API.post("/predict", {
    symptoms,
  });
};

// Get prediction history
export const getHistory = () => {
  return API.get("/history");
};

export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
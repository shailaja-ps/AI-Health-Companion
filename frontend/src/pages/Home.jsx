import { useState } from "react";
import Navbar from "../components/Navbar";
import SymptomSelector from "../components/SymptomSelector";
import PredictionCard from "../components/PredictionCard";
import { predictDisease } from "../services/api";
import {
  FaBrain,
  FaChartLine,
  FaHistory,
  FaHeartbeat,
} from "react-icons/fa";

function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    try {
      setLoading(true);

      const response = await predictDisease(selectedSymptoms);
      setPrediction(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero Section */}

        <div className="text-center mb-12">

          <div className="flex justify-center mb-4">
            <FaHeartbeat className="text-red-500 text-6xl animate-pulse" />
          </div>

          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            AI Health Companion
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Predict diseases intelligently using Machine Learning based on
            symptoms entered by the user. Get confidence scores, disease
            information, precautions, and maintain prediction history.
          </p>

        </div>

        {/* Symptom Selection Card */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            🩺 Select Your Symptoms
          </h2>

          <SymptomSelector
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
          />

          <div className="flex justify-center">

            <button
              disabled={selectedSymptoms.length === 0 || loading}
              onClick={handlePredict}
              className={`mt-8 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 ${
                selectedSymptoms.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 hover:shadow-2xl text-white"
              }`}
            >
              {loading ? "Predicting..." : "🔍 Predict Disease"}
            </button>

          </div>

        </div>

        {/* Prediction */}

        {prediction && (
          <PredictionCard
            prediction={prediction}
            selectedSymptoms={selectedSymptoms}
          />
        )}

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaBrain className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">
              AI Disease Prediction
            </h3>
            <p className="text-gray-600">
              Uses a Machine Learning model to predict diseases from symptoms
              with confidence scores.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaChartLine className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600">
              View disease distribution, confidence metrics and recent
              predictions through interactive analytics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaHistory className="text-purple-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Prediction History
            </h3>
            <p className="text-gray-600">
              Every prediction is securely stored in MongoDB Atlas so previous
              results can be viewed anytime.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
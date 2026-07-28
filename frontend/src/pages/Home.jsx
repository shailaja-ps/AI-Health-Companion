import { useState } from "react";
import Navbar from "../components/Navbar";
import SymptomSelector from "../components/SymptomSelector";
import { predictDisease } from "../services/api";
import PredictionCard from "../components/PredictionCard";
function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlePredict = async () => {
  try {
    setLoading(true);

    const response = await predictDisease(selectedSymptoms);
    console.log(response.data);

    setPrediction(response.data);
  } catch (error) {
  console.error(error);

  if (error.response) {
    console.log(error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col items-center mt-10 px-4">
        <SymptomSelector
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />

        <button
        disabled={selectedSymptoms.length === 0 || loading}
        onClick={handlePredict}
        className={`mt-8 px-8 py-3 rounded-lg shadow-lg text-white transition ${
            selectedSymptoms.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
            >
                {loading ? "Predicting..." : "Predict Disease"}
                </button>
                {prediction && (
  <PredictionCard
    prediction={prediction}
    selectedSymptoms={selectedSymptoms}
  />
)}
                
      </div>
    </div>
  );
}

export default Home;
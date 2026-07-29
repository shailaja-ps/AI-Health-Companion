import diseaseInfo from "../data/diseaseInfo";
import { generateReport } from "../utils/generateReport";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaUserMd,
  FaShieldAlt,
  FaHeartbeat,
} from "react-icons/fa";

function PredictionCard({ prediction, selectedSymptoms }) {
  const info = diseaseInfo[prediction.prediction];

  const confidence = Number(prediction.confidence);

  let badgeColor = "bg-red-100 text-red-700";
  let progressColor = "bg-red-500";
  let confidenceLabel = "Low Confidence";

  if (confidence >= 80) {
    badgeColor = "bg-green-100 text-green-700";
    progressColor = "bg-green-500";
    confidenceLabel = "High Confidence";
  } else if (confidence >= 50) {
    badgeColor = "bg-yellow-100 text-yellow-700";
    progressColor = "bg-yellow-500";
    confidenceLabel = "Medium Confidence";
  }

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-gray-200">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-3xl font-bold text-blue-700">
            🩺 Disease Prediction
          </h2>

          <p className="text-gray-500 mt-1">
            AI-powered prediction based on selected symptoms.
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor}`}
        >
          {confidenceLabel}
        </span>

      </div>

      {/* Download Button */}

      <div className="flex justify-end mb-6">
        <button
          onClick={() => generateReport(prediction, selectedSymptoms)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          📄 Download Report
        </button>
      </div>

      {/* Disease */}

      <div className="bg-blue-50 rounded-xl p-6 mb-8">

        <p className="text-gray-500 text-sm">
          Predicted Disease
        </p>

        <h3 className="text-4xl font-bold text-blue-700 mt-2">
          {prediction.prediction}
        </h3>

      </div>

      {/* Confidence */}

      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            Confidence Score
          </span>

          <span className="font-bold text-lg">
            {confidence.toFixed(2)}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

          <div
            className={`${progressColor} h-5 rounded-full transition-all duration-700`}
            style={{ width: `${confidence}%` }}
          ></div>

        </div>

      </div>

      {/* Top Predictions */}

      <div className="mb-8">

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaHeartbeat className="text-red-500" />
          Top Predictions
        </h3>

        <div className="space-y-3">

          {prediction.top3_predictions.map((item, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 shadow-sm"
            >
              <span className="font-medium">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : "🥉"}{" "}
                {item.disease}
              </span>

              <span className="font-bold text-blue-700">
                {item.confidence.toFixed(2)}%
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Selected Symptoms */}

      <div className="mb-8">

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-green-600" />
          Selected Symptoms
        </h3>

        <div className="flex flex-wrap gap-3">

          {selectedSymptoms.map((symptom, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
            >
              {symptom.replaceAll("_", " ")}
            </span>

          ))}

        </div>

      </div>

      {/* Disease Information */}

      <div className="border-t pt-8">

        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <FaInfoCircle />
          Disease Information
        </h3>

        {info ? (
          <>
            <div className="bg-gray-50 rounded-xl p-5 mb-5">

              <h4 className="font-bold mb-2">
                Description
              </h4>

              <p className="text-gray-700 leading-7">
                {info.description}
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-5 mb-5">

              <h4 className="font-bold flex items-center gap-2 mb-3">
                <FaShieldAlt className="text-green-600" />
                Precautions
              </h4>

              <ul className="list-disc ml-6 space-y-2">

                {info.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}

              </ul>

            </div>

            <div className="bg-blue-50 rounded-xl p-5">

              <h4 className="font-bold flex items-center gap-2 mb-2">
                <FaUserMd className="text-blue-700" />
                Recommended Specialist
              </h4>

              <p className="text-lg text-blue-700 font-semibold">
                {info.specialist}
              </p>

            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5">

            <p className="text-yellow-800 font-semibold">
              Information for {prediction.prediction} is currently unavailable.
            </p>

            <p className="text-gray-600 mt-2">
              Please consult a qualified healthcare professional for an accurate diagnosis and treatment plan.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default PredictionCard;
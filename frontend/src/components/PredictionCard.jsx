import diseaseInfo from "../data/diseaseInfo";

function PredictionCard({ prediction, selectedSymptoms }) {
  const info = diseaseInfo[prediction.prediction];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl border border-gray-200">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        🩺 Disease Prediction
      </h2>

      {/* Disease */}
      <div className="mb-5">
        <p className="text-gray-500 text-sm">Predicted Disease</p>
        <h3 className="text-3xl font-bold text-gray-800">
          {prediction.prediction}
        </h3>
      </div>

      {/* Confidence */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Confidence</span>

          <span className="font-bold text-blue-700">
            {prediction.confidence.toFixed(2)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-700"
            style={{ width: `${prediction.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Top Predictions */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">
          Top Predictions
        </h3>

        {prediction.top3_predictions.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b"
          >
            <span>
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : "🥉"}{" "}
              {item.disease}
            </span>

            <span className="font-semibold">
              {item.confidence.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      {/* Selected Symptoms */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">
          Selected Symptoms
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedSymptoms.map((symptom, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {symptom.replaceAll("_", " ")}
            </span>
          ))}
        </div>
      </div>

      {/* Disease Information */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4">
          🩺 Disease Information
        </h3>

        {info ? (
          <>
            <div className="mb-5">
              <h4 className="font-semibold mb-2">Description</h4>

              <p className="text-gray-700">
                {info.description}
              </p>
            </div>

            <div className="mb-5">
              <h4 className="font-semibold mb-2">
                Precautions
              </h4>

              <ul className="list-disc ml-6 space-y-2">
                {info.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Recommended Specialist
              </h4>

              <p className="text-blue-700 font-medium">
                👨‍⚕️ {info.specialist}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <p className="text-yellow-800">
              Detailed information for{" "}
              <strong>{prediction.prediction}</strong> is not available yet.
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Please consult a qualified healthcare professional for medical
              advice.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default PredictionCard;
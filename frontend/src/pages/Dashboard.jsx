import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import DiseaseBarChart from "../components/charts/DiseaseBarChart";
import { getHistory } from "../services/api";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const totalPredictions = history.length;

  const averageConfidence =
    totalPredictions > 0
      ? (
          history.reduce((sum, item) => sum + Number(item.confidence), 0) /
          totalPredictions
        ).toFixed(2)
      : 0;

  const highestConfidence =
    totalPredictions > 0
      ? Math.max(...history.map((item) => Number(item.confidence))).toFixed(2)
      : 0;

  const diseaseCount = {};

  history.forEach((item) => {
    diseaseCount[item.prediction] =
      (diseaseCount[item.prediction] || 0) + 1;
  });

  let mostPredictedDisease = "-";
  let maxCount = 0;

  for (const disease in diseaseCount) {
    if (diseaseCount[disease] > maxCount) {
      maxCount = diseaseCount[disease];
      mostPredictedDisease = disease;
    }
  }

  const latestPrediction =
    totalPredictions > 0
      ? history[history.length - 1].prediction
      : "-";

  const recentPredictions = [...history].reverse().slice(0, 5);

  const chartData = Object.entries(diseaseCount).map(([disease, count]) => ({
    disease,
    count,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            AI Health Companion Dashboard
          </h1>

          <p className="text-gray-600 mt-3">
            Analytics and prediction insights from your AI-powered healthcare assistant.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-600">
            Loading dashboard...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
              <DashboardCard
                title="Total Predictions"
                value={totalPredictions}
                icon="📊"
                color="text-blue-600"
              />

              <DashboardCard
                title="Average Confidence"
                value={`${averageConfidence}%`}
                icon="📈"
                color="text-green-600"
              />

              <DashboardCard
                title="Highest Confidence"
                value={`${highestConfidence}%`}
                icon="🏆"
                color="text-purple-600"
              />

              <DashboardCard
                title="Most Predicted"
                value={mostPredictedDisease}
                icon="🩺"
                color="text-orange-600"
              />

              <DashboardCard
                title="Latest Prediction"
                value={latestPrediction}
                icon="🕒"
                color="text-red-600"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
              <DiseaseBarChart data={chartData} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-6 py-4 text-xl font-bold">
                📋 Recent Predictions
              </div>

              <table className="min-w-full">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left">Disease</th>
                    <th className="px-6 py-4 text-left">Confidence</th>
                    <th className="px-6 py-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>

                  {recentPredictions.length > 0 ? (
                    recentPredictions.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-blue-50 transition"
                      >
                        <td className="px-6 py-4 font-semibold">
                          {item.prediction}
                        </td>

                        <td className="px-6 py-4 text-blue-700 font-bold">
                          {Number(item.confidence).toFixed(2)}%
                        </td>

                        <td className="px-6 py-4">
                          {new Date(item.timestamp).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-8 text-gray-500"
                      >
                        No predictions available.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
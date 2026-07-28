import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getHistory } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch prediction history.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.prediction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 px-4">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          📜 Prediction History
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <p className="text-gray-600">Loading history...</p>
        ) : history.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              No prediction history found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">

            <table className="min-w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Disease</th>
                  <th className="px-4 py-3 text-left">Confidence</th>
                  <th className="px-4 py-3 text-left">Symptoms</th>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Disease */}
                      <td className="px-4 py-3 font-semibold">
                        {item.prediction}
                      </td>

                      {/* Confidence */}
                      <td className="px-4 py-3">
                        <span
                          className={`font-bold ${
                            item.confidence >= 90
                              ? "text-green-600"
                              : item.confidence >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {Number(item.confidence).toFixed(2)}%
                        </span>
                      </td>

                      {/* Symptoms */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {item.symptoms.map((symptom, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                            >
                              {symptom.replaceAll("_", " ")}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3">
                        <div>
                          {new Date(item.timestamp).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>

                        <div className="text-gray-500 text-sm">
                          {new Date(item.timestamp).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-8 text-gray-500"
                    >
                      🔍 No matching disease found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default History;
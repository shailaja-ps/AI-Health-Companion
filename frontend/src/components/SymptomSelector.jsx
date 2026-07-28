import { useState } from "react";
import symptoms from "../data/symptoms";

function SymptomSelector({ selectedSymptoms, setSelectedSymptoms }) {
  const [search, setSearch] = useState("");
  

  // Filter symptoms based on search and hide already selected symptoms
  const filteredSymptoms = symptoms.filter(
    (symptom) =>
      symptom.toLowerCase().includes(search.toLowerCase()) &&
      !selectedSymptoms.includes(symptom)
  );

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Search Symptoms
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search symptoms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Suggestions */}
      {search && (
        <div className="mt-4 border rounded-lg max-h-60 overflow-y-auto">
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map((symptom, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedSymptoms([...selectedSymptoms, symptom]);
                  setSearch("");
                }}
                className="p-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer"
              >
                {symptom.replaceAll("_", " ")}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No matching symptoms found.
            </div>
          )}
        </div>
      )}

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            Selected Symptoms
          </h3>

          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
              >
                {symptom.replaceAll("_", " ")}

                <button
                  onClick={() =>
                    setSelectedSymptoms(
                      selectedSymptoms.filter((s) => s !== symptom)
                    )
                  }
                  className="font-bold hover:text-red-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SymptomSelector;
import jsPDF from "jspdf";
import diseaseInfo from "../data/diseaseInfo";

export function generateReport(prediction, selectedSymptoms) {
  const doc = new jsPDF();

  const info = diseaseInfo[prediction.prediction];

  let y = 20;

  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text("AI Health Companion", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Disease Prediction Report", 20, y);

  y += 15;

  doc.setFontSize(13);

  doc.text(`Disease: ${prediction.prediction}`, 20, y);
  y += 10;

  doc.text(
    `Confidence: ${prediction.confidence.toFixed(2)}%`,
    20,
    y
  );
  y += 15;

  doc.setFontSize(15);
  doc.text("Selected Symptoms", 20, y);

  y += 10;

  doc.setFontSize(12);

  selectedSymptoms.forEach((symptom) => {
    doc.text(
      `• ${symptom.replaceAll("_", " ")}`,
      25,
      y
    );
    y += 8;
  });

  if (info) {
    y += 8;

    doc.setFontSize(15);
    doc.text("Precautions", 20, y);

    y += 10;

    doc.setFontSize(12);

    info.precautions.forEach((item) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 8;

    doc.setFontSize(15);
    doc.text("Recommended Specialist", 20, y);

    y += 10;

    doc.setFontSize(12);
    doc.text(info.specialist, 25, y);
  }

  y += 20;

  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    20,
    y
  );

  doc.save(
    `${prediction.prediction.replaceAll(" ", "_")}_Report.pdf`
  );
}
import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { saveAs } from "file-saver";
import { CircularProgress } from '@mui/material';
import {
  getLatestOperation,
  getEmissionByOperation,
  getLatestCarbonSink,
  getSuggestions
} from "../../api/api";

const ExportOptions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const opRes = await getLatestOperation();
        const operation = opRes.data.operation;

        const [emissionRes, sinkRes, suggestionsRes] = await Promise.allSettled([
          getEmissionByOperation(operation._id),
          getLatestCarbonSink(),
          getSuggestions()
        ]);

        setReportData({
          operation,
          emission: emissionRes.status === 'fulfilled' ? emissionRes.value.data.emission : null,
          sink: sinkRes.status === 'fulfilled' ? sinkRes.value.data.sink : null,
          suggestions: suggestionsRes.status === 'fulfilled' ? suggestionsRes.value.data.suggestions : [],
          summary: suggestionsRes.status === 'fulfilled' ? suggestionsRes.value.data.summary : null
        });
      } catch (err) {
        setError(err?.response?.data?.message || "Could not load report data. Submit a mining operation first.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ✅ Build a flat row structure for CSV
  const buildCSVRows = () => {
    const { operation, emission, sink, summary } = reportData;
    const rows = [];

    rows.push({ Section: "Mining Operation", Field: "Excavation Method", Value: operation.excavationData?.excavationMethod });
    rows.push({ Section: "Mining Operation", Field: "Material Volume (tons)", Value: operation.excavationData?.materialVolumeTons });
    rows.push({ Section: "Mining Operation", Field: "Transport Mode", Value: operation.transportationData?.transportMode });
    rows.push({ Section: "Mining Operation", Field: "Equipment Category", Value: operation.equipmentData?.equipmentCategory });
    rows.push({ Section: "Mining Operation", Field: "Efficiency (%)", Value: operation.equipmentData?.efficiencyPercentage });

    if (emission) {
      rows.push({ Section: "Emissions", Field: "Total Daily (kg)", Value: emission.totalDailyKg });
      rows.push({ Section: "Emissions", Field: "Total Monthly (kg)", Value: emission.totalMonthlyKg });
      rows.push({ Section: "Emissions", Field: "Excavation Contribution (%)", Value: emission.contribution?.excavationPercent });
      rows.push({ Section: "Emissions", Field: "Transport Contribution (%)", Value: emission.contribution?.transportPercent });
      rows.push({ Section: "Emissions", Field: "Equipment Contribution (%)", Value: emission.contribution?.equipmentPercent });
    }

    if (sink) {
      rows.push({ Section: "Carbon Sinks", Field: "Afforestation (tCO2/yr)", Value: sink.afforestation?.sequestrationTonsPerYear });
      rows.push({ Section: "Carbon Sinks", Field: "Soil Carbon (tCO2/yr)", Value: sink.soilCarbon?.sequestrationTonsPerYear });
      rows.push({ Section: "Carbon Sinks", Field: "Grassland (tCO2/yr)", Value: sink.grassland?.sequestrationTonsPerYear });
      rows.push({ Section: "Carbon Sinks", Field: "Total Sequestration (tCO2/yr)", Value: sink.totalSequestrationTons });
    }

    if (summary) {
      rows.push({ Section: "Summary", Field: "Total Emissions (tCO2/yr)", Value: summary.emissionsTonsPerYear });
      rows.push({ Section: "Summary", Field: "Total Offset (tCO2/yr)", Value: summary.carbonOffsetTonsPerYear });
      rows.push({ Section: "Summary", Field: "Net Emissions (tCO2/yr)", Value: summary.netEmissionsTonsPerYear });
    }

    return rows;
  };

  const exportToCSV = () => {
    const rows = buildCSVRows();
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "carbon_neutrality_report.csv");
  };

  const exportToPDF = () => {
    const { operation, emission, sink, suggestions, summary } = reportData;
    const pdf = new jsPDF();
    let y = 15;

    const addSection = (title) => {
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text(title, 10, y);
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(11);
      y += 8;
    };

    const addLine = (text) => {
      if (y > 280) { pdf.addPage(); y = 15; }
      pdf.text(text, 12, y);
      y += 7;
    };

    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text("Carbon Neutrality Report", 10, y);
    y += 12;

    addSection("Mining Operation");
    addLine(`Excavation Method: ${operation.excavationData?.excavationMethod || '-'}`);
    addLine(`Material Volume: ${operation.excavationData?.materialVolumeTons || 0} tons`);
    addLine(`Transport Mode: ${operation.transportationData?.transportMode || '-'}`);
    addLine(`Equipment: ${operation.equipmentData?.equipmentCategory || '-'} (${operation.equipmentData?.efficiencyPercentage || 0}% efficient)`);
    y += 4;

    if (emission) {
      addSection("Emissions");
      addLine(`Total Daily: ${emission.totalDailyKg?.toFixed(2) || 0} kg CO2e`);
      addLine(`Excavation: ${emission.contribution?.excavationPercent || 0}% | Transport: ${emission.contribution?.transportPercent || 0}% | Equipment: ${emission.contribution?.equipmentPercent || 0}%`);
      y += 4;
    }

    if (sink) {
      addSection("Carbon Sinks");
      addLine(`Afforestation: ${sink.afforestation?.sequestrationTonsPerYear?.toFixed(2) || 0} tCO2/yr`);
      addLine(`Soil Carbon: ${sink.soilCarbon?.sequestrationTonsPerYear?.toFixed(2) || 0} tCO2/yr`);
      addLine(`Grassland: ${sink.grassland?.sequestrationTonsPerYear?.toFixed(2) || 0} tCO2/yr`);
      addLine(`Total Sequestration: ${sink.totalSequestrationTons?.toFixed(2) || 0} tCO2/yr`);
      y += 4;
    }

    if (summary) {
      addSection("Net Emissions Summary");
      addLine(`Total Emissions: ${summary.emissionsTonsPerYear} tCO2/yr`);
      addLine(`Total Offset: ${summary.carbonOffsetTonsPerYear} tCO2/yr`);
      addLine(`Net Emissions: ${summary.netEmissionsTonsPerYear} tCO2/yr`);
      y += 4;
    }

    if (suggestions && suggestions.length > 0) {
      addSection("AI Recommendations");
      suggestions.forEach((s, i) => {
        if (y > 270) { pdf.addPage(); y = 15; }
        pdf.setFont(undefined, 'bold');
        addLine(`${i + 1}. ${s.title} [${s.priority} Priority]`);
        pdf.setFont(undefined, 'normal');
        const explanationLines = pdf.splitTextToSize(s.explanation || '', 180);
        explanationLines.forEach(line => addLine(line));
        y += 2;
      });
    }

    pdf.save("carbon_neutrality_report.pdf");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <CircularProgress sx={{ color: '#FFA500' }} />
        <p className="text-gray-500">Preparing your report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 font-medium text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-center rounded-md shadow-md">
      <h3 className="text-xl font-bold mb-2">Export Report</h3>
      <p className="text-gray-500 mb-6">Download your full carbon neutrality report, including operation data, emissions, sinks, and AI recommendations.</p>
      <div className="flex justify-center space-x-4">
        <div className="flex-1 max-w-xs h-40">
          <button
            onClick={exportToCSV}
            className="w-full h-full flex flex-col items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 p-4 transition-colors"
          >
            <FaFileCsv className="mb-2 text-4xl" />
            <span className="text-lg">Export as CSV</span>
          </button>
        </div>
        <div className="flex-1 max-w-xs h-40">
          <button
            onClick={exportToPDF}
            className="w-full h-full flex flex-col items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 p-4 transition-colors"
          >
            <FaFilePdf className="mb-2 text-4xl" />
            <span className="text-lg">Export as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
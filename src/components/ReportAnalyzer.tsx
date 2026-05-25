import { useState } from "react";

export default function ReportAnalyzer() {
  const [reportType, setReportType] = useState("lab");
  const [language, setLanguage] = useState("english");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">AI Report Analyzer</h1>
        <p className="text-slate-600 mb-8">Upload your medical reports for instant, easy-to-understand analysis.</p>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-slate-700">Report Type</label>
            <div className="flex rounded-lg shadow-sm">
              <button onClick={() => setReportType("lab")} className={`flex-1 py-2 px-4 rounded-l-lg border ${reportType === "lab" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}>Lab Blood Test</button>
              <button onClick={() => setReportType("xray")} className={`flex-1 py-2 px-4 rounded-r-lg border-y border-r ${reportType === "xray" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}>Written X-Ray</button>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-slate-700">Language</label>
            <div className="flex rounded-lg shadow-sm">
              <button onClick={() => setLanguage("english")} className={`flex-1 py-2 px-4 rounded-l-lg border ${language === "english" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}>English</button>
              <button onClick={() => setLanguage("hindi")} className={`flex-1 py-2 px-4 rounded-r-lg border-y border-r ${language === "hindi" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}>हिंदी (Hindi)</button>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-indigo-300 bg-indigo-50 rounded-2xl p-12 text-center hover:bg-indigo-100 transition cursor-pointer">
          <div className="text-5xl mb-4">📸</div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Click to Upload or Drag & Drop</h3>
          <p className="text-indigo-600">Supports JPG, PNG, or PDF</p>
          <input type="file" className="hidden" />
        </div>

        <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition">
          Analyze Report ✨
        </button>
      </div>

      {/* Placeholder for AI Results */}
      <div className="opacity-50 p-6 border border-slate-200 rounded-2xl text-center bg-slate-50">
        <p className="text-slate-500 italic">AI Analysis, Color Coded Results, and Doctor Recommendations will appear here after upload.</p>
      </div>
    </div>
  );
}
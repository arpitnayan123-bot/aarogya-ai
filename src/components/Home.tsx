import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    { icon: "🩸", title: "Diabetes", desc: "Sugar tracker, HbA1c, Diet, Reminders", link: "/diabetes" },
    { icon: "🇮🇳", title: "Disease Guide", desc: "Top 10 Indian diseases", link: "/guide" },
    { icon: "🌱", title: "Health Tips", desc: "Daily AI tips Hindi+English", link: "/tips" },
    { icon: "📋", title: "Risk Assessment", desc: "Health quiz with score", link: "/quiz" },
    { icon: "🚨", title: "Outbreak Alerts", desc: "Seasonal disease warnings", link: "/alerts" },
    { icon: "🌸", title: "Women Health", desc: "Period tracker, PCOD, Pregnancy", link: "/women-health" },
    { icon: "🧠", title: "Mental Health", desc: "Mood tracker, Breathing, Journal", link: "/mental-health" },
    { icon: "⚖️", title: "BMI & Nutrition", desc: "BMI, Calories, Water tracker", link: "/nutrition" },
  ];

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="bg-indigo-900 rounded-3xl p-8 md:p-16 text-center text-white shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Understand Your Health with AI
        </h1>
        <p className="text-lg md:text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
          Upload your lab reports or X-rays and let our AI explain them in simple terms, in English or Hindi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/report-analyzer" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition shadow-lg">
            🧪 Analyze Lab Report
          </Link>
          <Link to="/report-analyzer" className="bg-indigo-600 border border-indigo-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition shadow-lg">
            🩻 Analyze X-Ray
          </Link>
        </div>
      </section>

      {/* ALL HEALTH SECTIONS */}
      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Comprehensive Health Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Link to={feature.link} key={idx} className="block h-full">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-300 transition cursor-pointer h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
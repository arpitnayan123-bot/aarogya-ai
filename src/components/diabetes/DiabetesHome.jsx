import React, { useState } from 'react';
import SugarTracker from './SugarTracker';
import HbA1cCalculator from './HbA1cCalculator';
import DiabetesChat from './DiabetesChat';
import DietPlanner from './DietPlanner';
import MedicineReminder from './MedicineReminder';
import ExerciseGuide from './ExerciseGuide';
import ComplicationChecker from './ComplicationChecker';
import EmergencyGuide from './EmergencyGuide';
import '../styles/diabetes.css';

const DiabetesHome = () => {
  const [activeFeature, setActiveFeature] = useState('home');

  const topStats = [
    { label: 'Normal Sugar', range: '70-100 mg/dL', color: '#00897B', icon: '🟢' },
    { label: 'Pre-diabetes', range: '100-125 mg/dL', color: '#F59E0B', icon: '🟡' },
    { label: 'Diabetes', range: '126+ mg/dL', color: '#DC2626', icon: '🔴' },
    { label: 'HbA1c Normal', range: 'Below 5.7%', color: '#00897B', icon: '✅' }
  ];

  const features = [
    { id: 'sugar-tracker', title: 'Sugar Tracker', icon: '📊', component: SugarTracker },
    { id: 'hba1c', title: 'HbA1c Calculator', icon: '🧮', component: HbA1cCalculator },
    { id: 'ai-chat', title: 'Diabetes AI Chat', icon: '🤖', component: DiabetesChat },
    { id: 'diet', title: 'Diet Planner', icon: '🥗', component: DietPlanner },
    { id: 'medicine', title: 'Medicine Reminder', icon: '💊', component: MedicineReminder },
    { id: 'exercise', title: 'Exercise Guide', icon: '🏃', component: ExerciseGuide },
    { id: 'complications', title: 'Complication Checker', icon: '🩺', component: ComplicationChecker },
    { id: 'emergency', title: 'Emergency Guide', icon: '🆘', component: EmergencyGuide }
  ];

  const ActiveComponent = features.find(f => f.id === activeFeature)?.component;

  if (activeFeature !== 'home' && ActiveComponent) {
    return (
      <div className="diabetes-container">
        <div className="diabetes-header" style={{ background: 'linear-gradient(135deg, #1A73E8, #0D47A1)' }}>
          <button onClick={() => setActiveFeature('home')} className="back-btn">← Back</button>
          <h2>{features.find(f => f.id === activeFeature)?.title}</h2>
        </div>
        <ActiveComponent />
      </div>
    );
  }

  return (
    <div className="diabetes-container">
      <div className="diabetes-header" style={{ background: 'linear-gradient(135deg, #1A73E8, #0D47A1)' }}>
        <h1>Diabetes Care Center 🔴</h1>
        <p className="subtitle">Aapka Sugar, Hamari Zimmedari</p>
      </div>

      <div className="stats-scroll">
        {topStats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-info">
              <h4>{stat.label}</h4>
              <p>{stat.range}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="features-grid">
        {features.map(feature => (
          <div 
            key={feature.id} 
            className="feature-card"
            onClick={() => setActiveFeature(feature.id)}
          >
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>

      <div className="weekly-tip">
        <h3>💡 Weekly Diabetes Tip</h3>
        <p>Check your blood sugar 2 hours after meals to understand how food affects your glucose levels.</p>
      </div>
    </div>
  );
};

export default DiabetesHome;

import React, { useState } from 'react';

const ComplicationChecker = () => {
  const [checks, setChecks] = useState({
    eyes: false,
    feet: false,
    kidneys: false,
    heart: false,
    nerves: false
  });

  const symptoms = {
    eyes: {
      title: '👁️ Eye Problems',
      symptoms: ['Blurry vision', 'Floaters', 'Difficulty reading', 'Dark spots'],
      specialist: 'Ophthalmologist',
      urgency: 'Get an eye exam within 2 weeks'
    },
    feet: {
      title: '🦶 Foot Problems',
      symptoms: ['Numbness', 'Tingling', 'Wounds not healing', 'Cold feet'],
      specialist: 'Podiatrist',
      urgency: 'Check feet daily, see specialist if wounds present'
    },
    kidneys: {
      title: '🫘 Kidney Problems',
      symptoms: ['Swelling in legs', 'Frequent urination', 'Foamy urine', 'Fatigue'],
      specialist: 'Nephrologist',
      urgency: 'Get kidney function test (Creatinine, GFR) immediately'
    },
    heart: {
      title: '❤️ Heart Problems',
      symptoms: ['Chest pain', 'Breathlessness', 'Irregular heartbeat', 'Dizziness'],
      specialist: 'Cardiologist',
      urgency: 'Seek immediate medical attention if chest pain present'
    },
    nerves: {
      title: '🧠 Nerve Problems',
      symptoms: ['Burning sensation', 'Sharp pain', 'Numbness in hands/feet', 'Muscle weakness'],
      specialist: 'Neurologist',
      urgency: 'Consult neurologist for nerve conduction study'
    }
  };

  const toggleCheck = (area) => {
    setChecks({ ...checks, [area]: !checks[area] });
  };

  const hasAnyWarning = Object.values(checks).some(v => v);

  return (
    <div className="feature-container">
      <h2>🩺 Check for Diabetes Complications</h2>
      <p className="subtitle">Early detection prevents serious problems</p>

      <div className="warning-checklist">
        {Object.entries(symptoms).map(([key, area]) => (
          <div key={key} className="complication-card">
            <h3>{area.title}</h3>
            <div className="symptoms-list">
              {area.symptoms.map((symptom, i) => (
                <div key={i} className="symptom-item">
                  <span>⚠️ {symptom}</span>
                </div>
              ))}
            </div>
            <div className="check-buttons">
              <button
                onClick={() => toggleCheck(key)}
                className={`check-btn ${checks[key] ? 'checked' : ''}`}
              >
                {checks[key] ? '✅ Yes - See Doctor' : 'No issues'}
              </button>
            </div>
            {checks[key] && (
              <div className="specialist-recommendation">
                <strong>🏥 See: {area.specialist}</strong>
                <p>{area.urgency}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {hasAnyWarning && (
        <div className="urgent-alert">
          <h3>🚨 Important</h3>
          <p>You've reported warning signs. Please consult the recommended specialists immediately. Early treatment prevents serious complications.</p>
          <button className="emergency-btn" onClick={() => window.location.href = 'tel:108'}>
            📞 Call Emergency: 108
          </button>
        </div>
      )}

      {!hasAnyWarning && (
        <div className="healthy-message">
          <h3>✅ Great!</h3>
          <p>You haven't reported any warning signs. Continue regular check-ups and maintain your diabetes management routine.</p>
        </div>
      )}
    </div>
  );
};

export default ComplicationChecker;

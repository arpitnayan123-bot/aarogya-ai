import React, { useState } from 'react';

const HbA1cCalculator = () => {
  const [averageSugar, setAverageSugar] = useState('');
  const [result, setResult] = useState(null);

  const calculateHbA1c = () => {
    if (!averageSugar || averageSugar < 50 || averageSugar > 500) {
      alert('Please enter a valid average blood sugar (50-500 mg/dL)');
      return;
    }

    const hba1c = ((parseFloat(averageSugar) + 46.7) / 28.7).toFixed(1);
    
    let category, color, hindiExplanation;
    if (hba1c < 5.7) {
      category = 'Normal';
      color = '#00897B';
      hindiExplanation = 'आपका HbA1c सामान्य है। शुगर नियंत्रण में है।';
    } else if (hba1c < 6.5) {
      category = 'Pre-diabetes';
      color = '#F59E0B';
      hindiExplanation = 'आपको प्री-डायबिटीज है। खानपान और व्यायाम पर ध्यान दें।';
    } else if (hba1c < 8.0) {
      category = 'Diabetes - Controlled';
      color = '#FF9800';
      hindiExplanation = 'आपका शुगर नियंत्रित है लेकिन सुधार की जरूरत है।';
    } else {
      category = 'Diabetes - Poorly Controlled';
      color = '#DC2626';
      hindiExplanation = 'आपका शुगर नियंत्रण में नहीं है। डॉक्टर से तुरंत मिलें।';
    }

    setResult({ hba1c, category, color, hindiExplanation });
  };

  const tips = [
    'रोज 30 मिनट पैदल चलें - Walk 30 min daily',
    'मीठा और मैदा छोड़ें - Avoid sugar and refined flour',
    'हरी सब्जियां खाएं - Eat green vegetables',
    'नियमित दवा लें - Take medicines regularly',
    'तनाव कम करें - Reduce stress with yoga'
  ];

  return (
    <div className="feature-container">
      <h2>🧮 HbA1c Estimator</h2>
      
      <div className="input-group">
        <input
          type="number"
          value={averageSugar}
          onChange={(e) => setAverageSugar(e.target.value)}
          placeholder="Enter average blood sugar (mg/dL)"
          min="50"
          max="500"
        />
        <button onClick={calculateHbA1c} className="add-btn">Calculate HbA1c</button>
      </div>

      {result && (
        <div className="result-card" style={{ borderColor: result.color }}>
          <h3 style={{ color: result.color }}>
            Estimated HbA1c: {result.hba1c}%
          </h3>
          <div className="category-badge" style={{ backgroundColor: result.color }}>
            {result.category}
          </div>
          <p className="hindi-explanation">{result.hindiExplanation}</p>
          
          <div className="reference-table">
            <h4>Reference Ranges:</h4>
            <div className="range-item">🟢 Below 5.7% - Normal</div>
            <div className="range-item">🟡 5.7-6.4% - Pre-diabetes</div>
            <div className="range-item">🟠 6.5-7.9% - Diabetes Controlled</div>
            <div className="range-item">🔴 8% and above - Poorly Controlled</div>
          </div>
        </div>
      )}

      <div className="tips-section">
        <h3>💡 Tips to Improve HbA1c</h3>
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">✅ {tip}</div>
        ))}
      </div>
    </div>
  );
};

export default HbA1cCalculator;

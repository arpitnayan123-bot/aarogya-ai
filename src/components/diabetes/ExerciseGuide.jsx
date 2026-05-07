import React, { useState } from 'react';

const ExerciseGuide = () => {
  const [exerciseLog, setExerciseLog] = useState([]);
  const [formData, setFormData] = useState({
    type: 'walking',
    duration: '',
    sugarBefore: '',
    sugarAfter: ''
  });

  const exercises = [
    { name: 'Walking', duration: '30 min daily', benefit: 'Reduces blood sugar naturally', icon: '🚶' },
    { name: 'Yoga (Mandukasana)', duration: '15-20 min', benefit: 'Improves pancreas function', icon: '🧘' },
    { name: 'Swimming', duration: '20-30 min', benefit: 'Full body workout, good for joints', icon: '🏊' },
    { name: 'Cycling', duration: '20-30 min', benefit: 'Improves insulin sensitivity', icon: '🚴' }
  ];

  const logExercise = (e) => {
    e.preventDefault();
    const newLog = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    setExerciseLog([newLog, ...exerciseLog]);
    setFormData({ type: 'walking', duration: '', sugarBefore: '', sugarAfter: '' });
  };

  return (
    <div className="feature-container">
      <h2>🏃 Exercise for Diabetics</h2>

      <div className="exercise-tips">
        <h3>✅ Best Exercises for Diabetes</h3>
        {exercises.map((ex, i) => (
          <div key={i} className="exercise-card">
            <span className="ex-icon">{ex.icon}</span>
            <div>
              <h4>{ex.name}</h4>
              <p>{ex.duration} - {ex.benefit}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="guidelines">
        <h3>⚠️ Exercise Guidelines</h3>
        <div className="guideline-item">✅ Best time: 1-2 hours after meals</div>
        <div className="guideline-item">❌ Never exercise when sugar below 100 mg/dL</div>
        <div className="guideline-item">✅ Always check sugar before and after exercise</div>
        <div className="guideline-item">💧 Stay hydrated during exercise</div>
        <div className="guideline-item">🍬 Keep glucose tablets handy for emergencies</div>
      </div>

      <div className="exercise-logger">
        <h3>📝 Log Your Exercise</h3>
        <form onSubmit={logExercise}>
          <div className="input-group">
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="walking">Walking</option>
              <option value="yoga">Yoga</option>
              <option value="swimming">Swimming</option>
              <option value="cycling">Cycling</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="Duration (minutes)"
              required
            />
            <input
              type="number"
              value={formData.sugarBefore}
              onChange={(e) => setFormData({...formData, sugarBefore: e.target.value})}
              placeholder="Sugar before exercise (mg/dL)"
            />
            <input
              type="number"
              value={formData.sugarAfter}
              onChange={(e) => setFormData({...formData, sugarAfter: e.target.value})}
              placeholder="Sugar after exercise (mg/dL)"
            />
            <button type="submit" className="add-btn">Log Exercise</button>
          </div>
        </form>

        {exerciseLog.length > 0 && (
          <div className="readings-list">
            <h4>Exercise History</h4>
            {exerciseLog.map((log, i) => (
              <div key={i} className="reading-item">
                <strong>{log.type.charAt(0).toUpperCase() + log.type.slice(1)}</strong> - {log.duration} min
                <br />
                <small>
                  Sugar: {log.sugarBefore || 'N/A'} → {log.sugarAfter || 'N/A'} mg/dL
                  <br />
                  {log.date}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseGuide;

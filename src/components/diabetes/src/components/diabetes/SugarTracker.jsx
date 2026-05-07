import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SugarTracker = () => {
  const [readings, setReadings] = useState([]);
  const [currentReading, setCurrentReading] = useState('');
  const [measureTime, setMeasureTime] = useState('fasting');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setDateTime(now.toISOString().slice(0, 16));
    const saved = localStorage.getItem('sugarReadings');
    if (saved) setReadings(JSON.parse(saved));
  }, []);

  const measureTimes = [
    { value: 'fasting', label: 'Fasting (morning before food)' },
    { value: 'after-breakfast', label: 'After breakfast (2 hours)' },
    { value: 'before-lunch', label: 'Before lunch' },
    { value: 'after-lunch', label: 'After lunch (2 hours)' },
    { value: 'before-dinner', label: 'Before dinner' },
    { value: 'after-dinner', label: 'After dinner (2 hours)' },
    { value: 'bedtime', label: 'Bedtime' }
  ];

  const getSugarColor = (value) => {
    if (value < 70) return '#2196F3';
    if (value <= 140) return '#00897B';
    if (value <= 200) return '#F59E0B';
    return '#DC2626';
  };

  const getSugarStatus = (value) => {
    if (value < 70) return 'Low - Hypoglycemia';
    if (value <= 140) return 'Normal';
    if (value <= 200) return 'High';
    return 'Very High';
  };

  const addReading = () => {
    if (!currentReading || currentReading < 20 || currentReading > 600) {
      alert('Please enter a valid blood sugar reading (20-600 mg/dL)');
      return;
    }

    const newReading = {
      value: parseInt(currentReading),
      time: measureTime,
      dateTime: dateTime || new Date().toISOString(),
      color: getSugarColor(parseInt(currentReading)),
      status: getSugarStatus(parseInt(currentReading))
    };

    const updatedReadings = [newReading, ...readings].slice(0, 30);
    setReadings(updatedReadings);
    localStorage.setItem('sugarReadings', JSON.stringify(updatedReadings));
    setCurrentReading('');
  };

  const weeklyAverage = readings.slice(0, 7).reduce((acc, r) => acc + r.value, 0) / Math.min(readings.length, 7) || 0;

  const chartData = {
    labels: readings.slice(0, 10).map(r => new Date(r.dateTime).toLocaleDateString()).reverse(),
    datasets: [{
      label: 'Blood Sugar (mg/dL)',
      data: readings.slice(0, 10).map(r => r.value).reverse(),
      borderColor: '#1A73E8',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
      tension: 0.4
    }]
  };

  const exportToPDF = () => {
    const csv = 'Date,Time,Reading,Status\n' + 
      readings.map(r => `${r.dateTime},${r.time},${r.value},${r.status}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sugar-readings.csv';
    a.click();
  };

  return (
    <div className="feature-container">
      <h2>📊 Blood Sugar Log</h2>

      <div className="weekly-average">
        <h3>Weekly Average: {weeklyAverage.toFixed(1)} mg/dL</h3>
        <span style={{ color: getSugarColor(weeklyAverage) }}>
          {getSugarStatus(weeklyAverage)}
        </span>
      </div>

      <div className="input-group">
        <input
          type="number"
          value={currentReading}
          onChange={(e) => setCurrentReading(e.target.value)}
          placeholder="Enter sugar reading (mg/dL)"
          min="20"
          max="600"
        />
        <select value={measureTime} onChange={(e) => setMeasureTime(e.target.value)}>
          {measureTimes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button onClick={addReading} className="add-btn">Add Reading</button>
      </div>

      {readings.length > 1 && (
        <div className="chart-container">
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      )}

      <div className="readings-list">
        <h3>Last 7 Readings</h3>
        {readings.slice(0, 7).map((reading, index) => (
          <div key={index} className="reading-item" style={{ borderLeft: `4px solid ${reading.color}` }}>
            <div className="reading-value">
              <span className="badge" style={{ backgroundColor: reading.color }}>
                {reading.value}
              </span>
              <span>{reading.status}</span>
            </div>
            <small>{new Date(reading.dateTime).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <button onClick={exportToPDF} className="export-btn">📥 Export Data</button>
    </div>
  );
};

export default SugarTracker;

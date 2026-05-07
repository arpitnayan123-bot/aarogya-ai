import React from 'react';

const EmergencyGuide = () => {
  return (
    <div className="feature-container">
      <h2>🆘 Diabetes Emergency Guide</h2>

      <div className="emergency-section low-sugar">
        <div className="emergency-header">
          <span className="emergency-icon">🔵</span>
          <h3>LOW SUGAR EMERGENCY</h3>
        </div>
        <h4>Hypoglycemia (Below 70 mg/dL)</h4>
        
        <div className="signs-list">
          <h4>⚠️ Warning Signs:</h4>
          <ul>
            <li>Shaking or trembling</li>
            <li>Sweating</li>
            <li>Confusion</li>
            <li>Weakness</li>
            <li>Dizziness</li>
            <li>Hunger</li>
          </ul>
        </div>

        <div className="action-steps">
          <h4>⚡ Immediate Action - 15/15 Rule:</h4>
          <ol>
            <li><strong>Eat 3-4 glucose tablets</strong> (fastest acting)</li>
            <li><strong>OR Drink half cup fruit juice</strong></li>
            <li><strong>OR Eat 3-4 hard candies</strong></li>
            <li><strong>OR Take 2 spoons sugar in water</strong></li>
          </ol>
          <p className="important-note">⏱️ Wait 15 minutes</p>
          <p>Check blood sugar again. If still below 70, repeat treatment.</p>
        </div>

        <div className="what-not-to-do">
          <h4>❌ DO NOT:</h4>
          <ul>
            <li>Don't eat chocolate (fat slows sugar absorption)</li>
            <li>Don't eat ice cream</li>
            <li>Don't inject more insulin</li>
          </ul>
        </div>

        <div className="call-emergency">
          <p>🚨 If person is unconscious or cannot swallow:</p>
          <p>Call 108 immediately. Do not give anything by mouth.</p>
          <button className="emergency-call-btn" onClick={() => window.location.href = 'tel:108'}>
            📞 CALL 108 NOW
          </button>
        </div>
      </div>

      <div className="emergency-section high-sugar">
        <div className="emergency-header">
          <span className="emergency-icon">🔴</span>
          <h3>HIGH SUGAR EMERGENCY</h3>
        </div>
        <h4>Hyperglycemia (Above 250 mg/dL)</h4>

        <div className="signs-list">
          <h4>⚠️ Warning Signs:</h4>
          <ul>
            <li>Excessive thirst</li>
            <li>Frequent urination</li>
            <li>Weakness or fatigue</li>
            <li>Blurred vision</li>
            <li>Headache</li>
          </ul>
        </div>

        <div className="action-steps">
          <h4>⚡ Immediate Action:</h4>
          <ol>
            <li>Drink plenty of water (sugar-free)</li>
            <li>Take prescribed medication (if due)</li>
            <li>Light walk (if able and no ketones)</li>
            <li>Check for ketones if Type 1 diabetes</li>
            <li>Monitor blood sugar every 2 hours</li>
          </ol>
        </div>

        <div className="danger-signs">
          <h4>🚨 DANGER SIGNS - Go to Emergency:</h4>
          <ul>
            <li>Blood sugar above 300 mg/dL for 6+ hours</li>
            <li>Moderate to large ketones</li>
            <li>Vomiting or severe nausea</li>
            <li>Difficulty breathing</li>
            <li>Confusion or altered consciousness</li>
          </ul>
        </div>

        <button className="emergency-call-btn" onClick={() => window.location.href = 'tel:108'}>
          📞 CALL AMBULANCE: 108
        </button>
      </div>

      <div className="quick-reference">
        <h3>📋 Quick Reference Card</h3>
        <div className="reference-item">
          <strong>Normal Sugar:</strong> 70-140 mg/dL
        </div>
        <div className="reference-item">
          <strong>Low Sugar Emergency:</strong> Below 70 mg/dL → Eat 15g fast carbs
        </div>
        <div className="reference-item">
          <strong>High Sugar:</strong> Above 250 mg/dL → Water + medication
        </div>
        <div className="reference-item">
          <strong>Severe Emergency:</strong> Unconscious or vomiting → Call 108
        </div>
      </div>

      <div className="emergency-kit">
        <h3>🎒 Always Carry:</h3>
        <ul>
          <li>✅ Glucose tablets or candy</li>
          <li>✅ Diabetes ID card</li>
          <li>✅ Extra medication</li>
          <li>✅ Blood sugar meter</li>
          <li>✅ Emergency contact numbers</li>
        </ul>
      </div>

      <p className="disclaimer">
        ⚠️ This guide is for reference only. In any doubt, seek immediate medical help. Call your doctor or 108 for emergencies.
      </p>
    </div>
  );
};

export default EmergencyGuide;

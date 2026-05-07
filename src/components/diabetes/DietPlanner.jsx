import React, { useState } from 'react';

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    activity: 'moderate',
    diabetesType: 'type2'
  });
  const [dietPlan, setDietPlan] = useState(null);

  const generateDietPlan = (e) => {
    e.preventDefault();
    
    const plan = {
      foodsToEatFreely: [
        { name: 'Karela (bitter gourd)', icon: '✅' },
        { name: 'Methi (fenugreek)', icon: '✅' },
        { name: 'Palak (spinach)', icon: '✅' },
        { name: 'Jamun', icon: '✅' },
        { name: 'Brown rice', icon: '✅' },
        { name: 'Whole wheat roti', icon: '✅' },
        { name: 'Dal (lentils)', icon: '✅' },
        { name: 'Green vegetables', icon: '✅' }
      ],
      foodsInModeration: [
        { name: 'White rice', icon: '🥗' },
        { name: 'Fruit juices', icon: '🧃' },
        { name: 'Potatoes', icon: '🥔' },
        { name: 'Bananas', icon: '🍌' },
        { name: 'Mango', icon: '🥭' }
      ],
      foodsToAvoid: [
        { name: 'Maida items', icon: '❌' },
        { name: 'Mithai and sweets', icon: '❌' },
        { name: 'Cold drinks', icon: '❌' },
        { name: 'White bread', icon: '❌' },
        { name: 'Fried snacks', icon: '❌' }
      ],
      mealTiming: [
        { meal: 'Breakfast', time: '8 AM', suggestions: 'Oats/Methi roti + vegetable' },
        { meal: 'Mid-morning snack', time: '11 AM', suggestions: 'Fruit or nuts' },
        { meal: 'Lunch', time: '1 PM', suggestions: 'Brown rice + dal + vegetables' },
        { meal: 'Evening snack', time: '4 PM', suggestions: 'Green tea + roasted chana' },
        { meal: 'Dinner', time: '7 PM', suggestions: 'Whole wheat roti + sabzi' },
        { meal: 'Bedtime', time: '10 PM', suggestions: 'Warm milk (no sugar)' }
      ]
    };

    setDietPlan(plan);
  };

  return (
    <div className="feature-container">
      <h2>🥗 Diabetes Diet Plan</h2>

      <form onSubmit={generateDietPlan} className="diet-form">
        <div className="input-group">
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            placeholder="Weight (kg)"
            required
          />
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({...formData, height: e.target.value})}
            placeholder="Height (cm)"
            required
          />
          <select value={formData.activity} onChange={(e) => setFormData({...formData, activity: e.target.value})}>
            <option value="sedentary">Sedentary (little exercise)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (daily exercise)</option>
          </select>
          <select value={formData.diabetesType} onChange={(e) => setFormData({...formData, diabetesType: e.target.value})}>
            <option value="type2">Type 2 Diabetes</option>
            <option value="type1">Type 1 Diabetes</option>
            <option value="prediabetes">Pre-diabetes</option>
            <option value="gestational">Gestational Diabetes</option>
          </select>
        </div>
        <button type="submit" className="add-btn">Generate My Diet Plan</button>
      </form>

      {dietPlan && (
        <div className="diet-plan">
          <h3>Your Personalized Diet Plan</h3>
          
          <div className="food-section">
            <h4 style={{ color: '#00897B' }}>✅ Foods to Eat Freely</h4>
            {dietPlan.foodsToEatFreely.map((food, i) => (
              <div key={i} className="food-item">{food.icon} {food.name}</div>
            ))}
          </div>

          <div className="food-section">
            <h4 style={{ color: '#F59E0B' }}>⚠️ Foods in Moderation</h4>
            {dietPlan.foodsInModeration.map((food, i) => (
              <div key={i} className="food-item">{food.icon} {food.name}</div>
            ))}
          </div>

          <div className="food-section">
            <h4 style={{ color: '#DC2626' }}>❌ Foods to Avoid</h4>
            {dietPlan.foodsToAvoid.map((food, i) => (
              <div key={i} className="food-item">{food.icon} {food.name}</div>
            ))}
          </div>

          <div className="meal-timing">
            <h4>🕐 Meal Timing Guide</h4>
            {dietPlan.mealTiming.map((meal, i) => (
              <div key={i} className="meal-item">
                <strong>{meal.time}</strong> - {meal.meal}
                <br /><small>{meal.suggestions}</small>
              </div>
            ))}
          </div>

          <div className="warning-box">
            ⚠️ Never skip meals! Skipping meals can cause dangerous blood sugar fluctuations.
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanner;

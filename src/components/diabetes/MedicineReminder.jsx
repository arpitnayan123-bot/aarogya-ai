import React, { useState, useEffect } from 'react';

const MedicineReminder = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    when: 'before-food',
    time: 'morning',
    duration: '30'
  });

  useEffect(() => {
    const saved = localStorage.getItem('medicines');
    if (saved) setMedicines(JSON.parse(saved));
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const addMedicine = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) {
      alert('Please fill all fields');
      return;
    }

    const newMedicine = {
      ...formData,
      id: Date.now(),
      addedOn: new Date().toISOString()
    };

    const updated = [...medicines, newMedicine];
    setMedicines(updated);
    localStorage.setItem('medicines', JSON.stringify(updated));
    
    setFormData({ name: '', dosage: '', when: 'before-food', time: 'morning', duration: '30' });
  };

  const deleteMedicine = (id) => {
    const updated = medicines.filter(m => m.id !== id);
    setMedicines(updated);
    localStorage.setItem('medicines', JSON.stringify(updated));
  };

  return (
    <div className="feature-container">
      <h2>💊 Medicine Reminder</h2>

      <form onSubmit={addMedicine} className="medicine-form">
        <div className="input-group">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Medicine name (Metformin, etc.)"
            required
          />
          <input
            type="text"
            value={formData.dosage}
            onChange={(e) => setFormData({...formData, dosage: e.target.value})}
            placeholder="Dosage (500mg, 1000mg)"
            required
          />
          <select value={formData.when} onChange={(e) => setFormData({...formData, when: e.target.value})}>
            <option value="before-food">Before Food</option>
            <option value="after-food">After Food</option>
          </select>
          <select value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <select value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>
        <button type="submit" className="add-btn">Add Reminder</button>
      </form>

      <div className="medicines-list">
        <h3>Your Medicines</h3>
        {medicines.length === 0 ? (
          <p>No medicines added yet. Add your first reminder above.</p>
        ) : (
          medicines.map(med => (
            <div key={med.id} className="medicine-item">
              <div className="medicine-info">
                <h4>{med.name} - {med.dosage}</h4>
                <p>
                  {med.when === 'before-food' ? '🍽️ Before' : '🍽️ After'} Food • 
                  {med.time.charAt(0).toUpperCase() + med.time.slice(1)} • 
                  {med.duration === 'ongoing' ? 'Ongoing' : `${med.duration} Days`}
                </p>
              </div>
              <button onClick={() => deleteMedicine(med.id)} className="delete-btn">🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicineReminder;

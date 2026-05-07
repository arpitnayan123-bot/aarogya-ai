import React, { useState, useRef, useEffect } from 'react';

const DiabetesChat = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Namaste! 🙏 I'm your Diabetes Care Assistant. How can I help you today?", 
      sender: 'ai' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  const quickQuestions = [
    'What can I eat?',
    'Which foods to avoid?',
    'Exercise tips for diabetes',
    'Sugar is very high, what to do?',
    'Sugar is very low, what to do?',
    'Diabetes and fasting (Ramadan/Navratri)',
    'Diabetes during pregnancy',
    'Metformin side effects'
  ];

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('eat') || message.includes('food') || message.includes('diet')) {
      return "For a diabetes-friendly Indian diet: ✅ Karela, Methi, Palak, Brown Rice, Whole Wheat Roti. ❌ Avoid: Maida, Mithai, Cold Drinks, White Bread, Fried Snacks. Would you like a detailed diet plan?";
    } else if (message.includes('high') || message.includes('up')) {
      return "If your sugar is very high: 1) Drink plenty of water 2) Take prescribed medication 3) Avoid carbohydrates 4) Light walk if feeling okay 5) Check ketones if Type 1. If above 300 mg/dL or feeling very sick, seek emergency care immediately. 🆘";
    } else if (message.includes('low') || message.includes('down')) {
      return "LOW SUGAR EMERGENCY: Immediately consume 15g fast-acting carbs: 3-4 glucose tablets OR ½ cup fruit juice OR 3-4 candies OR 2 spoons sugar in water. Recheck after 15 minutes. If not improving, call 108. 🚨";
    } else if (message.includes('exercise')) {
      return "Best exercises for diabetes: Walking 30 min daily, Yoga (especially Mandukasana), Swimming, Cycling. Best time: 1-2 hours after meals. Never exercise if sugar below 100 mg/dL. Always check before and after.";
    } else if (message.includes('fasting') || message.includes('ramadan') || message.includes('navratri')) {
      return "Fasting with diabetes requires careful planning. Always consult your doctor before fasting. Check sugar frequently. Break fast immediately if sugar goes below 70 or above 300. Stay hydrated during non-fasting hours. Eat complex carbs for Suhoor/Sargi.";
    } else if (message.includes('pregnancy') || message.includes('gestational')) {
      return "Gestational diabetes needs careful monitoring. Target blood sugar: Fasting <95, 1hr after meal <140, 2hr after meal <120. Regular checkups essential. Most women return to normal after delivery but have higher risk for Type 2 later.";
    } else if (message.includes('metformin')) {
      return "Metformin is first-line diabetes medication. Common side effects: nausea, diarrhea (usually temporary). Take with food to reduce stomach issues. Serious but rare: lactic acidosis (seek immediate help if severe weakness, breathing trouble). Never stop without doctor's advice.";
    } else {
      return "I can help you with diet, exercise, medication info, and emergency guidance for diabetes. Please ask specific questions about managing your diabetes safely. Remember, I'm an AI assistant - always consult your doctor for medical decisions. 🙏";
    }
  };

  const sendMessage = (text = inputMessage) => {
    if (!text.trim()) return;
    
    const userMsg = { text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      const aiResponse = getAIResponse(text);
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="feature-container">
      <h2>🤖 Ask Diabetes AI</h2>

      <div className="quick-questions">
        {quickQuestions.map((q, i) => (
          <button key={i} onClick={() => sendMessage(q)} className="quick-btn">
            {q}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="message-avatar">
              {msg.sender === 'ai' ? '🤖' : '👤'}
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your diabetes question..."
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
};

export default DiabetesChat;

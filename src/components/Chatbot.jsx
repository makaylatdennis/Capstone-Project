import React, { useState, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const chatbotRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    const userMessage = userInput.trim();
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:4000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.reply) {
        throw new Error('No reply found in response');
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: data.reply },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={chatbotRef}
      className={`chatbot-container ${isOpen ? 'open' : ''}`}
      onClick={() => !isOpen && toggleChatbot()}
    >
      {isOpen ? (
        <div className="chatbot-content">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.role === 'user' ? 'user-message' : 'bot-message'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-button" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="chatbot-toggle-button">
          <span>Talk to an assistant!</span>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

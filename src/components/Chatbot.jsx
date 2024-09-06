import React, { useState, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  // State to control if the chatbot is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // State to store the conversation messages
  const [messages, setMessages] = useState([]);
  
  // State to track if the chatbot is waiting for a response
  const [loading, setLoading] = useState(false);
  
  // State to store the user's input
  const [userInput, setUserInput] = useState('');
  
  // Reference for the chatbot container, useful for focusing or animations
  const chatbotRef = useRef(null);

  // Function to toggle the chatbot open/close state
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the chatbot when the 'X' button is clicked
  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Function to handle form submission (sending a message)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Ensure the user input isn't empty
    if (!userInput.trim()) return;

    setLoading(true); // Set loading to true when the message is being processed
    
    // Store the user's message and reset the input field
    const userMessage = userInput.trim();
    setMessages([...messages, { role: "user", content: userMessage }]);
    setUserInput("");

    try {
      // Make a POST request to the server with the user's message
      const response = await fetch('http://localhost:4000/chatbot', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice: userMessage }),
      });

      // Check if the server response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response data from the server
      const data = await response.json();

      // Check if a reply was received from the server
      if (!data.reply) {
        throw new Error("No reply found in response");
      }

      // Add the bot's reply to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: data.reply },
      ]);
    } catch (error) {
      // Handle any errors and display a message in case of failure
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    // Main chatbot container, which will either be open or closed based on state
    <div
      ref={chatbotRef}
      className={`chatbot-container ${isOpen ? 'open' : ''}`} // Conditionally apply 'open' class if the chatbot is active
    >
      {isOpen ? (
        // Content section of the chatbot that appears when it is open
        <div className="chatbot-content">
          
          {/* Chatbot header section with the title and close button */}
          <div className="chatbot-header">
            {/* Title of the chatbot */}
            <h4>Chat with Assistant</h4>
            
            {/* Close button to close the chatbot */}
            <button className="chatbot-close-button" onClick={closeChatbot}>
              X {/* "X" indicates a close icon */}
            </button>
          </div>

          {/* Message area where all the messages between user and bot are displayed */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              // Dynamically render each message, differentiating between user and bot messages
              <div
                key={index}
                className={`chatbot-message ${
                  msg.role === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.content} {/* The actual message content */}
              </div>
            ))}
            
            {/* Display a loading message if the chatbot is currently processing the user's input */}
            {loading && <p>Loading...</p>}
          </div>

          {/* Form for the user to input their message */}
          <form onSubmit={handleSubmit} className="chatbot-input-form">
            {/* Input field for typing the message */}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)} // Update the input state as the user types
              placeholder="Type your message here..." // Placeholder text when the input is empty
              className="chatbot-input"
            />

            {/* Submit button to send the message */}
            <button type="submit" className="chatbot-button" disabled={loading}>
              Send {/* Button text, disabled when the bot is loading */}
            </button>
          </form>
        </div>
      ) : (
        // Button to open the chatbot when it is closed
        <div className="chatbot-toggle-button" onClick={toggleChatbot}>
          <span>Talk to an assistant!</span> {/* Prompt for the user to open the chatbot */}
        </div>
      )}
    </div>
  );
};

export default Chatbot;

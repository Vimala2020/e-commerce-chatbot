import React, { useState } from 'react';
import axios from 'axios';

// Use the API URL from the environment variables
const API_URL = process.env.REACT_APP_API_URL;

function Chatbot() {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [query, setQuery] = useState(''); // Tracks user input

  // Handles sending user query and fetching product results
  const handleSend = async () => {
    if (!query.trim()) return; // Avoid empty queries

    // Add the user message to the chat
    const userMessage = { sender: 'user', text: query };
    setMessages([...messages, userMessage]);

    try {
      // Fetch data from the backend API
      const response = await axios.get(
        `${API_URL}/api/products/search?query=${query}`
      );

      // Format the bot's response
      const botMessage = {
        sender: 'bot',
        text: response.data.length
          ? response.data.map((prod) => `${prod.name} - $${prod.price}`).join(', ')
          : 'No products found.',
      };

      // Update the chat with the bot's response
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Handle API errors
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error fetching data. Please try again.' },
      ]);
    }

    setQuery(''); // Clear the input field
  };

  return (
    <div className="w-full mt-11 max-w-lg mx-auto p-6 bg-orange-400 shadow-xl rounded-lg">
      {/* Chat Window */}
      <div
        className="h-full w-full overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{ maxHeight: '800px' }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex justify-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about products..."
          className="w-full p-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-3 rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 hover:bg-blue-600"
        >
          <span className="text-xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

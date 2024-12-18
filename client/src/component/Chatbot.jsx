import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  const handleSend = async () => {
    const userMessage = { sender: 'user', text: query };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?query=${query}`
      );
      const botMessage = {
        sender: 'bot',
        text: response.data.length
          ? response.data.map((prod) => `${prod.name} - $${prod.price}`).join(', ')
          : 'No products found.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error fetching data' }]);
    }
    setQuery('');
  };

  return (
    <div className="w-full mt-11 max-w-lg mx-auto p-6 bg-orange-400 shadow-xl rounded-lg">
     
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
              className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input and send button */}
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

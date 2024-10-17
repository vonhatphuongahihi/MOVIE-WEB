import React, { useState, useEffect } from 'react';
import './Chatbot_popup.css';
import { AiOutlineDelete } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const ChatbotPopup = ({ closePopup }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState(() => {
    // Lấy tin nhắn từ localStorage nếu có
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    // Lưu lịch sử tin nhắn vào localStorage mỗi khi messages thay đổi
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (input === '') return;

    const userMessage = { name: 'User', message: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          const botMessage = { name: 'MELON', message: data.answer };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        }, 3000);
      })
      .catch(error => console.error('Error:', error));

    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Hàm xóa lịch sử tin nhắn
  const handleClearHistory = () => {
    localStorage.removeItem('chatMessages');
    setMessages([]);
  };

  return (
    <div className="chatbox">
      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src="./favicon.png" alt="User" />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">MELON CSKH</h4>
            <button onClick={closePopup} style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}><IoMdClose />
            </button>
          </div>
        </div>

        <div className="chatbox__messages">
          {messages.slice().reverse().map((msg, index) => (
            <div key={index} className={`messages__item ${msg.name === 'MELON' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
              {msg.message}
            </div>
          ))}
        </div>

        <div className="chatbox__footer">
          <input 
            type="text" 
            placeholder="Viết gì đó..." 
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="chatbox__send--footer send__button" onClick={handleSendMessage}><LuSendHorizonal />
          </button>
          {/* Nút để xóa lịch sử tin nhắn */}
          <button className="chatbox__clear--footer" onClick={handleClearHistory}><AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPopup;

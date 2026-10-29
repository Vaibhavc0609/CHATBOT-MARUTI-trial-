import { useState } from 'react';
import ChatInput from './Components/ChatInput.jsx';
import ChatMessages from './Components/ChatMessages.jsx';
import { getReply } from './utils/marutiBot.js';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: 'Namaste! Ask me about any Maruti Suzuki car in India.', sender: 'robot', id: 'id1' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  function sendUserMessage(text) {
    const t = text.trim();
    if (!t || isTyping) return;
    setChatMessages((prev) => [...prev, { message: t, sender: 'user', id: crypto.randomUUID() }]);
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { message: getReply(t), sender: 'robot', id: crypto.randomUUID() }]);
      setIsTyping(false);
    }, 600);
  }

  return (
    <div className="app-container">
      <header className="chat-header">
        <h1>Maruti Suzuki Assistant</h1>
        <p>Ask about any car in India. Prices are indicative ex-showroom figures.</p>
      </header>
      <ChatMessages chatMessages={chatMessages} isTyping={isTyping} />
      <ChatInput onSend={sendUserMessage} isTyping={isTyping} />
    </div>
  );
}

export default App;

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage.jsx';
import RobotProfile from '../assets/cute-robot-chatbot-icon-in-flat-style-bot-operator-illustration-with-long-shadow-smart-chatbot-character-business-concept-vector.webp';

function ChatMessages({ chatMessages, isTyping }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (c) c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  return (
    <div className="chat-messages-container" ref={ref}>
      {chatMessages.map((m) => (
        <ChatMessage key={m.id} message={m.message} sender={m.sender} />
      ))}
      {isTyping && (
        <div className="chat-message-robot">
          <img src={RobotProfile} alt="Robot" className="chat-message-profile" />
          <div className="chat-message-text typing"><i /><i /><i /></div>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;

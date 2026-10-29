import RobotProfile from '../assets/cute-robot-chatbot-icon-in-flat-style-bot-operator-illustration-with-long-shadow-smart-chatbot-character-business-concept-vector.webp';
import SenderProfile from '../assets/unknown-person-3d-render-photo.webp';

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && (
        <img src={RobotProfile} alt="Robot" className="chat-message-profile" />
      )}

      <div className="chat-message-text">{message}</div>

      {sender === 'user' && (
        <img src={SenderProfile} alt="User" className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage;

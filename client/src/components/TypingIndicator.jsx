import './TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="message-row bot">
      <div className="chat-bubble">
        <span className="label">Gemini</span>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;


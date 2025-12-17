import './ChatHeader.css';

const ChatHeader = ({ onToggleSidebar }) => {
  return (
    <div className="chat-header">
      <button className="toggle-sidebar" onClick={onToggleSidebar}>
        ☰
      </button>
      <h3>Gemini Chatbot</h3>
      <div></div>
    </div>
  );
};

export default ChatHeader;


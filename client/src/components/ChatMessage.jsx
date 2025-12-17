import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { role, text, file } = message;

  return (
    <div className={`message-row ${role}`}>
      <div className="chat-bubble">
        <span className="label">{role === 'user' ? 'You' : 'Gemini'}</span>

        {file && file.dataUrl && file.type.startsWith('image/') && (
          <div className="message-image">
            <img src={file.dataUrl} alt={file.name} />
          </div>
        )}
        {file && !file.type.startsWith('image/') && (
          <div className="message-file">
            <span className="file-icon">📄</span>
            <span className="file-name">{file.name}</span>
          </div>
        )}

        {role === 'bot' ? (
          <ReactMarkdown>{text}</ReactMarkdown>
        ) : (
          text && <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;


import './Sidebar.css';

const Sidebar = ({ chats, activeChatId, onNewChat, onSwitchChat, onDeleteChat, isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h4>Chats</h4>
        <button onClick={onNewChat} className="new-chat-btn">
          + New
        </button>
      </div>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => onSwitchChat(chat.id)}
          >
            <span className="chat-title">{chat.title}</span>
            <button
              className="delete-chat"
              onClick={e => onDeleteChat(chat.id, e)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


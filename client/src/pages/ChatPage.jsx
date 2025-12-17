import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useFileUpload } from '../hooks/useFileUpload';
import { sessionService } from '../services/api';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import './ChatPage.css';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    chats,
    activeChatId,
    messages,
    isLoading,
    sendMessage: sendChatMessage,
    startNewChat,
    switchChat,
    deleteChat,
  } = useChat();

  const {
    fileStatus,
    isUploading,
    imagePreview,
    attachedFile,
    fileInputRef,
    handleUpload,
    removeFile,
    clearFile,
  } = useFileUpload(activeChatId);

  const handleSendMessage = () => {
    sendChatMessage(input, attachedFile);
    setInput('');
    clearFile();
  };

  const handleNewChat = () => {
    const newChat = startNewChat();
    if (newChat) {
      clearFile();
    }
  };

  const handleSwitchChat = (chatId) => {
    switchChat(chatId);
    clearFile();
  };

  const handleDeleteChat = async (chatId, e) => {
    await deleteChat(chatId, sessionService.resetSession);
  };

  return (
    <div className="app-layout">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSwitchChat={handleSwitchChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
      />

      <div className="container">
        <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="messages-area">
          {messages.map((message, i) => (
            <ChatMessage key={i} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
          isLoading={isLoading}
          imagePreview={imagePreview}
          fileStatus={fileStatus}
          isUploading={isUploading}
          fileInputRef={fileInputRef}
          onUpload={handleUpload}
          onRemoveFile={removeFile}
        />
      </div>
    </div>
  );
};

export default ChatPage;


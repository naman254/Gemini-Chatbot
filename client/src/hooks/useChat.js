import { useState } from 'react';
import { chatService } from '../services/api';

export const useChat = () => {
  const [chats, setChats] = useState([{ id: Date.now(), title: 'New Chat', messages: [] }]);
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id);
  const [isLoading, setIsLoading] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const sendMessage = async (text, attachedFile) => {
    if (!text.trim() && !attachedFile) return;

    const userMsg = {
      role: 'user',
      text: text || '',
      file: attachedFile ? { ...attachedFile } : null,
    };

    const currentInput = text;
    const currentFile = attachedFile;

    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMsg],
              title:
                chat.messages.length === 0
                  ? (currentInput.slice(0, 30) || 'New Chat') +
                    (currentInput.length > 30 ? '...' : '')
                  : chat.title,
            }
          : chat
      )
    );

    setIsLoading(true);
    try {
      const res = await chatService.sendMessage(
        currentInput || '',
        activeChatId,
        !!currentFile
      );
      setChats(prev =>
        prev.map(chat =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, { role: 'bot', text: res.reply }] }
            : chat
        )
      );
    } catch (err) {
      setChats(prev =>
        prev.map(chat =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: 'bot', text: 'Error connecting to server.' },
                ],
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    if (activeChat && activeChat.messages.length === 0) return;

    const newChat = { id: Date.now(), title: 'New Chat', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  };

  const switchChat = chatId => {
    setActiveChatId(chatId);
  };

  const deleteChat = async (chatId, resetSession) => {
    if (resetSession) {
      try {
        await resetSession(chatId);
      } catch (err) {
        console.error('Failed to reset session:', err);
      }
    }

    if (chats.length === 1) {
      const newChat = { id: Date.now(), title: 'New Chat', messages: [] };
      setChats([newChat]);
      setActiveChatId(newChat.id);
    } else {
      const newChats = chats.filter(c => c.id !== chatId);
      setChats(newChats);
      if (activeChatId === chatId) {
        setActiveChatId(newChats[0].id);
      }
    }
  };

  return {
    chats,
    activeChatId,
    activeChat,
    messages,
    isLoading,
    sendMessage,
    startNewChat,
    switchChat,
    deleteChat,
    setActiveChatId,
  };
};


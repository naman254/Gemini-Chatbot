import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const chatService = {
  sendMessage: async (message, sessionId, hasFile = false) => {
    const response = await api.post('/chat', {
      message,
      sessionId,
      hasFile,
    });
    return response.data;
  },
};

export const uploadService = {
  uploadFile: async (file, sessionId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const sessionService = {
  resetSession: async (sessionId) => {
    const response = await api.post('/reset', { sessionId });
    return response.data;
  },
};

export default api;


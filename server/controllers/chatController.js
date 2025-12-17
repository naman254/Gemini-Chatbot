const { getGeminiResponse } = require('../services/geminiService');
const { getSession, clearFileContext } = require('../services/sessionService');

async function sendMessage(req, res) {
  try {
    const { message, sessionId = 'default', hasFile } = req.body;

    if (!message && !hasFile) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const session = getSession(sessionId);
    const reply = await getGeminiResponse(message || '', sessionId);

    session.chatHistory.push({ role: 'user', text: message || '' });
    session.chatHistory.push({ role: 'model', text: reply });

    if (hasFile) {
      clearFileContext(sessionId);
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function resetSession(req, res) {
  try {
    const { sessionId = 'default' } = req.body;
    const { deleteSession } = require('../services/sessionService');
    deleteSession(sessionId);
    res.json({ message: 'Chat reset successfully' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  sendMessage,
  resetSession,
};


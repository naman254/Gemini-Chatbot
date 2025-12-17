const { GoogleGenAI } = require('@google/genai');
const { getSession } = require('./sessionService');

require('dotenv').config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getGeminiResponse(userMessage, sessionId) {
  const session = getSession(sessionId);
  try {
    const contents = [];

    for (const msg of session.chatHistory) {
      contents.push({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      });
    }

    const currentParts = [];

    currentParts.push({
      text: 'You are a helpful assistant. Answer clearly using Markdown.',
    });

    if (session.fileContext) {
      if (session.fileContext.type === 'text') {
        currentParts.push({
          text: `[DOCUMENT CONTENT]\n${session.fileContext.content}`,
        });
      } else {
        currentParts.push({
          inlineData: {
            data: session.fileContext.content,
            mimeType: session.fileContext.mimeType,
          },
        });
      }
    }

    currentParts.push({ text: userMessage });

    contents.push({
      role: 'user',
      parts: currentParts,
    });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    });

    const output = result.text;
    return output || 'No text returned by Gemini.';
  } catch (err) {
    console.error('Gemini Error:', err);
    return 'Chatbot is unavailable.';
  }
}

module.exports = {
  getGeminiResponse,
};


const sessions = {};

function getSession(sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = { chatHistory: [], fileContext: null };
  }
  return sessions[sessionId];
}

function deleteSession(sessionId) {
  if (sessions[sessionId]) {
    delete sessions[sessionId];
  }
}

function clearFileContext(sessionId) {
  const session = getSession(sessionId);
  session.fileContext = null;
}

module.exports = {
  getSession,
  deleteSession,
  clearFileContext,
};


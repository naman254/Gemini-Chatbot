const { processFile } = require('../services/fileService');

async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const sessionId = req.body.sessionId || 'default';
    const result = await processFile(req.file, sessionId);

    res.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    if (error.message === 'Unsupported file type') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'File processing failed' });
  }
}

module.exports = {
  uploadFile,
};


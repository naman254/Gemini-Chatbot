const pdfParse = require('pdf-parse');
const { getSession } = require('./sessionService');

async function processFile(file, sessionId) {
  const session = getSession(sessionId);
  const mime = file.mimetype;

  if (mime === 'application/pdf') {
    const data = await pdfParse(file.buffer);
    session.fileContext = {
      type: 'text',
      content: data.text,
      mimeType: mime,
    };
  } else if (mime === 'text/plain') {
    session.fileContext = {
      type: 'text',
      content: file.buffer.toString(),
      mimeType: mime,
    };
  } else if (mime.startsWith('image/')) {
    session.fileContext = {
      type: 'media',
      content: file.buffer.toString('base64'),
      mimeType: mime,
    };
  } else {
    throw new Error('Unsupported file type');
  }

  return { message: 'File attached successfully' };
}

module.exports = {
  processFile,
};


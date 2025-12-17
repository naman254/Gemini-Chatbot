const express = require('express');
const router = express.Router();
const { sendMessage, resetSession } = require('../controllers/chatController');

router.post('/chat', sendMessage);
router.post('/reset', resetSession);

module.exports = router;


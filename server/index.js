const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', chatRoutes);
app.use('/', uploadRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

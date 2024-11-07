// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/accountRoutes');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*',  // 或者将 origin 设置为 ngrok 的 URL
}));
app.use(bodyParser.json());
app.use('/api/account', authRoutes);

app.listen(3001,'0.0.0.0', () => {
  console.log(`Server running on 3001`);
});
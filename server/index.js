// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/accountRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/account', authRoutes);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
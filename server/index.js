// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // 引入类别路由
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*',  // 或者将 origin 设置为 ngrok 的 URL
}));
app.use(bodyParser.json());

app.use('/api/account', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3001,'0.0.0.0', () => {
  console.log(`Server running on 3001`);
});
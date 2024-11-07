// server/routes/productRoutes.js
const express = require('express');
const { addProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/add-product', addProduct);

module.exports = router;

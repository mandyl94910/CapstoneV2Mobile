// server/routes/orderRoutes.js
const express = require('express');
const { getAllOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/all-orders', getAllOrders);

module.exports = router;

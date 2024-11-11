// server/routes/orderRoutes.js
const express = require('express');
const { getAllOrders,updateOrder  } = require('../controllers/orderController');
const router = express.Router();

router.get('/all-orders', getAllOrders);
router.put('/update-order', updateOrder);

module.exports = router;

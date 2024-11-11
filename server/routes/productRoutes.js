// server/routes/productRoutes.js
const express = require('express');
const { addProduct,getAllProducts,updateProduct   } = require('../controllers/productController');
const router = express.Router();

router.post('/add-product', addProduct);
router.get('/all-products', getAllProducts);
router.put('/update-product', updateProduct);

module.exports = router;

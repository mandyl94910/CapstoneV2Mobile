// server/routes/productRoutes.js
const express = require('express');
const { addProduct,getAllProducts,updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/add-product', addProduct);
router.get('/all-products', getAllProducts);
router.put('/update-product', updateProduct);
router.delete('/delete-product', deleteProduct);

module.exports = router;

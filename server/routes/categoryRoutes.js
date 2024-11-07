// server/routes/categoryRoutes.js
const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');
const router = express.Router();

router.get('/get-category', getAllCategories); // 定义 GET 请求路由

module.exports = router;
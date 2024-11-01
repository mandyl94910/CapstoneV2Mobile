// server/routes/authRoutes.js
const express = require('express');
const { loginAdmin } = require('../controllers/accountController');
const router = express.Router();
const db = require('../db');

router.post('/login', loginAdmin);

module.exports = router;
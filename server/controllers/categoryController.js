// server/controllers/categoryController.js
const db = require('../db');

const getAllCategories = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM category'); // 查询所有类别
    res.json(result.rows); // 返回查询结果
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // 返回错误信息
  }
};

module.exports = { getAllCategories };
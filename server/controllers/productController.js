// server/controllers/productController.js
const db = require('../db');

const addProduct = async (req, res) => {
  const {
    product_name,
    price,
    product_description,
    category_id,
    quantity,
    visibility
  } = req.body;

  try {
    // 插入新的产品信息
    const result = await db.query(
      `INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, visibility)
       VALUES ($1, $2, $3, $4, $5, $4, $6) RETURNING *`,
      [product_name, price, product_description, category_id, quantity, visibility]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addProduct };

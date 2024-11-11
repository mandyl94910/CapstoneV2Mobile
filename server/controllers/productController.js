// server/controllers/productController.js
const db = require('../db');

const addProduct = async (req, res) => {
  const {
    product_id,
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
      `INSERT INTO product (product_id, product_name, price, product_description, category_id, quantity, visibility)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
       [product_id, product_name, price, product_description, category_id, quantity, visibility]
      );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 获取所有产品信息，包括类目名称
const getAllProducts = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT product.product_id, product.product_name, product.price, 
             product.product_description, product.quantity, 
             product.visibility, category.name AS category_name
      FROM product
      JOIN category ON product.category_id = category.id
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  console.log('Received update request:', req.body);
  const {
    product_id,
    product_name,
    product_description,
    price,
    quantity,
    visibility,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE product 
       SET product_name = $1, product_description = $2, price = $3, quantity = $4, visibility = $5
       WHERE product_id = $6
       RETURNING *`,
      [product_name, product_description, price, quantity, visibility, product_id]
    );

    res.status(200).json(result.rows[0]); // 返回更新后的产品信息
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addProduct, getAllProducts,updateProduct  };

// server/controllers/orderController.js
const db = require('../db');

const getAllOrders = async (req, res) => {
    try {
      const result = await db.query(`
        SELECT orders.id AS order_id, orders.total, orders.order_date, orders.status, 
               customer.customer_name AS customer_name
        FROM orders
        JOIN customer ON orders.customer_id = customer.customer_id
      `);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving orders:', error.message); // 输出具体的错误信息
      console.error(error.stack); // 打印错误堆栈，帮助定位错误
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { getAllOrders };

// server/controllers/orderController.js
const db = require('../db');

const getAllOrders = async (req, res) => {
    try {
      const result = await db.query(`
        SELECT *
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

  const updateOrder = async (req, res) => {
    const { order_id, shipping_method, tracking_number, ship_date, status } = req.body;
  
    try {
      const result = await db.query(
        `UPDATE orders 
         SET shipping_method = $1, tracking_number = $2, ship_date = $3, status = $4 
         WHERE id = $5
         RETURNING *`,
        [shipping_method, tracking_number, ship_date, status, order_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(result.rows[0]); // 返回更新后的订单信息
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { getAllOrders,updateOrder  };

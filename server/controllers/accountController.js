// server/controllers/accountController.js
const db = require('../db');

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM admin WHERE name = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Hello Admin' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

module.exports = { loginAdmin };
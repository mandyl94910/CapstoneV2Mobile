// server/db.js
const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'capstonedatabase2', // 数据库名称
    password: 'password',          // 数据库密码
    port: 5432,                    // PostgreSQL 默认端口
});

module.exports = db;
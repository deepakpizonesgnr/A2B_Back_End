const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
const initializeDatabase = () => {
    db.query('CREATE DATABASE IF NOT EXISTS a2bmiddleware', (err) => {
        if (err) throw err;

        db.query('USE a2bmiddleware', (err) => {
            if (err) throw err;

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            `;
            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log('Database and users table created successfully');
            });
        });
    });
};

initializeDatabase();
module.exports = db;

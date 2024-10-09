const db = require('../config/db');

class User {
    static addUser(username, password) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [username, password], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findUser(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }
}

module.exports = User;


const db = require('../../config/db');

class User {
    static addUser(email, password) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findUser(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }
}

module.exports = User;


// models/user.js
const db = require('../configs/db');
class User {
    static findByIdentifier(identifier) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
            db.query(query, [identifier, identifier], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}



module.exports =User;

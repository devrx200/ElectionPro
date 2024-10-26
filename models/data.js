const db = require('../configs/db');

class Data {
    // Method to fetch all data from the 'electionpro' table
    static loadAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM electionpro'; // 'WHERE 1' is redundant
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err); // Rejecting the promise with an error
                }
                resolve(results); // Resolving the promise with the results
            });
        });
    }

// 
}

module.exports = Data;

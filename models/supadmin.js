const db = require("../configs/db");

// Class For Super Admin 
class supAdmin {


// Method to fetch all data from the 'users' table where 'created_by' matches the provided username
static loadList(username) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE created_by = ?";
      db.query(query, [username], (err, results) => {
        if (err) {
          return reject(err); // Rejecting the promise with an error
        }
            // Extract password and return the rest of the data
      const users = results.map(({ password, ...rest }) => rest);
      resolve(users); // Resolving the promise with results excluding passwords

      });
    });
  }
  








}


// Export supAdmin
module.exports = supAdmin;
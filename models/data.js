const db = require("../configs/db");

class Data {
  // Method to fetch all data from the 'electionpro' table
  static loadAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM electionpro"; // 'WHERE 1' is redundant
      db.query(query, (err, results) => {
        if (err) {
          return reject(err); // Rejecting the promise with an error
        }
        resolve(results); // Resolving the promise with the results
      });
    });
  }

// Search Data From Db Acording Input
static search(keyword = '') {
        return new Promise((resolve, reject) => {
            // Define the base query
            let query = 'SELECT * FROM electionpro';
            let queryParams = [];

            // If a search term is provided, modify the query to search in all fields
            if (keyword) {
                query += ` WHERE 
                    AC_NO LIKE ? OR
                    PART_NO LIKE ? OR
                    SECTION_NO LIKE ? OR
                    SLNOINPART LIKE ? OR
                    C_HOUSE_NO LIKE ? OR
                    C_HOUSE_NO_V1 LIKE ? OR
                    FM_NAME_EN LIKE ? OR
                    LASTNAME_EN LIKE ? OR
                    FM_NAME_V1 LIKE ? OR
                    LASTNAME_V1 LIKE ? OR
                    RLN_TYPE LIKE ? OR
                    RLN_FM_NM_EN LIKE ? OR
                    RLN_L_NM_EN LIKE ? OR
                    RLN_FM_NM_V1 LIKE ? OR
                    RLN_L_NM_V1 LIKE ? OR
                    EPIC_NO LIKE ? OR
                    GENDER LIKE ? OR
                    AGE LIKE ? OR
                    MOBILE_NO LIKE ?`;

                // Add the search term to each field (with wildcards for partial matches)
                queryParams = Array(19).fill(`%${keyword}%`);
            }

            // Execute the query
            db.query(query, queryParams, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }


}

module.exports = Data;

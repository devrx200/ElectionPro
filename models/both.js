// Both modal
const db = require("../configs/db");


class Both {
 // Find all active slides ordered by position
 static findAllActive() {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, title, image_url, position FROM slider WHERE is_active = true ORDER BY position ASC";
      db.query(query, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

   // Find all active records from the 'what_ban' table for a specific created_by user
   static findBanData(created_by) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id, title, name, img_url, created_by, election_time FROM what_ban WHERE created_by = ?";
        db.query(query, [created_by], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}



}

module.exports = Both;

const db = require("../configs/db");

class Data {
  // Method to fetch all data from the 'data' table
  static loadAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT data.*, district_master.district_name,district_master.district_name_eng FROM `data` JOIN district_master ON district_master.district_id=data.district_id"; // 'WHERE 1' is redundant
      db.query(query, (err, results) => {
        if (err) {
          return reject(err); // Rejecting the promise with an error
        }
        resolve(results); // Resolving the promise with the results
      });
    });
  }

  // Search Data From Db According to Input
  static search(keyword = "") {
    return new Promise((resolve, reject) => {
      // Base query to select all records
      let query = "SELECT data.*, district_master.district_name, district_master.district_name_eng, ward_master.ward_no, ward_master.ward_name, ward_master.nikay_name, ward_master.nikay_type FROM data JOIN district_master ON district_master.district_id = data.district_id JOIN ward_master ON ward_master.ward_id = data.ward_id ";
      let queryParams = [];
      // If a keyword is provided, update the query to filter by keyword
      if (keyword) {
        query += `WHERE ac_no LIKE ? OR  part_no LIKE ? OR sr_no LIKE ? OR  house_no LIKE ? OR voter_name_eng LIKE ?  OR voter_name_hin LIKE ? OR rln_type LIKE ? OR rln_name_eng LIKE ? OR rln_name_hin LIKE ? OR caste LIKE ? OR samaj LIKE ? OR epic_no LIKE ? OR gender LIKE ? OR age LIKE ? OR mobile_no LIKE ?`;
        // Add the search term with wildcards to each field
        queryParams = Array(19).fill(`%${keyword}%`);
      }
      // const aa=  db.query(query, queryParams)
      // console.log(aa);
      // Execute the query
  db.query(query, queryParams, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Load Vidhansabha
  static loadVidhanSabha() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM vidhansabha_master"; // 'WHERE 1' is redundant
      db.query(query, (err, results) => {
        if (err) {
          return reject(err); // Rejecting the promise with an error
        }
        resolve(results); // Resolving the promise with the results
      });
    });
  }

  // Load Data Acording AC_No According to Input
  static vidhansabha(ac_no) {
    if (!ac_no) return Promise.resolve([]); // Return empty array for no keyword
    // Execute the query for exact match
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM data WHERE AC_NO = ?",
        [ac_no],
        (err, results) => {
          err ? reject(err) : resolve(results); // Simplified error handling
        }
      );
    });
  }
  // Load Data Acording PART_NO According to Input
  static byPart(part_no) {
    if (!part_no) return Promise.resolve([]); // Return empty array for no keyword
    // Execute the query for exact match
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM data WHERE PART_NO = ?",
        [part_no],
        (err, results) => {
          err ? reject(err) : resolve(results); // Simplified error handling
        }
      );
    });
  }



// Load Data According to AC_NO with All Parts
static loadpartAll(ac_no) {
  if (!ac_no) return Promise.resolve([]); // Return empty array if no AC_NO is provided

  return new Promise((resolve, reject) => {
    const query = `SELECT PART_NO, CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "ac_no", ac_no, "ward", ward, "sr_no", sr_no, "house_no", house_no, "voter_name_eng", voter_name_eng, "voter_sername_eng", voter_sername_eng, "voter_name_hin", voter_name_hin, "voter_sername_hin", voter_sername_hin, "rln_type", rln_type, "rln_name_eng", rln_name_eng, "rln_sername_eng", rln_sername_eng, "rln_name_hin", rln_name_hin, "rln_sername_hin", rln_sername_hin, "epic_no", epic_no, "gender", gender, "age", age, "mobile_no", mobile_no, "polling_booth", polling_booth)), ']') AS data FROM dta WHERE ac_no = ? GROUP BY part_no ORDER BY part_no ASC`;

    db.query(query, [ac_no], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(new Error("Failed to load data. Please try again."));
      }
      // Parse the data field as JSON for each result entry
      results.forEach(row => {
        row.data = JSON.parse(row.data || "[]"); // Handle empty or null results
      });

      resolve(results);
    });
  });
}

// loadpartList
static loadpartList() {
  return new Promise((resolve, reject) => {
    const query = "SELECT part_no, polling_booth, COUNT(*) AS total_voters, SUM(V_STATUS = 1) AS voted_count FROM data GROUP BY PART_NO";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err); // Rejecting the promise with an error
      }
      resolve(results); // Resolving the promise with the results
    });
  });
}


// Function to update the V_STATUS
static updateVStatus(epicNo, vStatus) {
  return new Promise((resolve, reject) => {
    // Convert boolean to integer (true -> 1, false -> 0)
    const statusValue = vStatus ? 1 : 0;
    const query = "UPDATE `data` SET `V_STATUS` = ? WHERE `EPIC_NO` = ?";
    db.query(query, [statusValue, epicNo], (err, result) => {
      if (err) {
        return reject(err); // Rejecting the promise with an error
      }
      resolve(result); // Resolving the promise with the result
    });
  });
}

//  Update Voter Info By ID And Epic No vInfo

static UvInfo(houseNo, voterNameEng, voterNameHin, rlnNameEng, rlnNameHin, caste,  samaj, epic_no, gender, age, mobileNo, priority) {
  return new Promise((resolve, reject) => {
    const params = [houseNo, voterNameEng, voterNameHin, rlnNameEng, rlnNameHin, caste, samaj, gender, age, mobileNo, priority, epic_no];
    const query = "UPDATE `data` SET `house_no` = ?, `voter_name_eng` = ?, `voter_name_hin` = ?, `rln_name_eng` = ?, `rln_name_hin` = ?, `caste` = ?,`samaj`=?, `gender` = ?, `age` = ?, `mobile_no` = ?, `priority` = ? WHERE `epic_no` = ?";
    db.query(query, params, (err, result) => {
      if (err) {
        return reject(err); // Rejecting the promise with an error
        }
        resolve(result); // Resolving the promise with the result 
      })
  });
}







}

module.exports = Data;



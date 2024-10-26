const Data = require("../models/data");

const load = async (req, res) => {
  try {
    const data = await Data.loadAll(); // Fetch all records from electionpro

    if (data.length > 0) {
      res
        .status(200)
        .json({ success: "true", message: "Data Retrieve Successfully", data: data }); // 200 OK if data is found
    } else {
      res.status(404).json({success: "false", message: "No data Found" }); // 404 if no data is found
    }
  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed To Retrieve Data" }); // 500 Internal Server Error if something goes wrong
  }
};

module.exports = { load };

const Data = require("../models/data");


// Load All Data From Table 
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

// Search Data From Input Any Values
const search = async (req, res) => {
const { keyword } = req.body; // Get search term from the request body
  console.log(keyword);
  try {
    const data = await Data.search(keyword); // Use the search term in the query
    if (data.length > 0) {
      res
        .status(200)
        .json({ success: "true", message: "Search Data Retrieved Successfully", data: data });
    } else {
      res.status(404).json({ success: "false", message: "No Data Found..." });
    }
  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed to Retrieve Data" });
  }
};






module.exports = { load,search };

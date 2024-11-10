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
  const { keyword = '' } = req.body; // Get search term or default to an empty string
  console.log(keyword);
  try {
    const data = await Data.search(keyword); // Pass the keyword to the model
    if (data.length > 0) {
      res.status(200).json({ success: "true", message: "Search Data Retrieved Successfully", data });
    } else {
      res.status(404).json({ success: "false", message: "No Data Found..." });
    }
  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed To Retrieve Data" });
  }
};

// Load vidhansabha List
const loadVidhanSabha = async (req, res) => {
  try {
    const data = await Data.loadVidhanSabha(); // Fetch all records from vidhansabha master Table 
    if (data.length > 0) {
      res.status(200).json({
        success: "true",
        message: "Vidhan Sabha Data Retrieved Successfully",
        data: data
      }); // 200 OK if data is found
    } else {
      res.status(404).json({
        success: "false",
        message: "No Vidhan Sabha Found..."
      }); // 404 if no data is found
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Failed To Retrieve Vidhan Sabha Data"
    }); // 500 Internal Server Error if something goes wrong
  }
};
 
// vidhansabha  AC_NO Data From Input Any Values
const vidhansabha = async (req, res) => {
  const { ac_no } = req.body; // Get vidhansabha term or default to an empty string
  console.log( "AC_No=",ac_no);
  try {
    const data = await Data.vidhansabha(ac_no); // Pass the keyword to the model
    if (data.length > 0) {
      res.status(200).json({ success: "true", message: "vidhansabha Data Retrieved Successfully", data });
    } else {
      res.status(404).json({ success: "false", message: "No Data Found..." });
    }
  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed To Retrieve Data" });
  }
};

// Part_no Data From Input Any Values
const part = async (req, res) => {
const { part_no } = req.body; // Get vidhansabha term or default to an empty string
console.log( "Part_No=",part_no);
  try {
    const data = await Data.byPart(part_no); // Pass the keyword to the model
    if (data.length > 0) {
      res.status(200).json({ success: "true", message: "Part According Data Retrieved Successfully", data });
    } else {
      res.status(404).json({ success: "false", message: "No Data Found..." });
    }
  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed To Retrieve Data" });
  }
};


// Load all Data All Part loadpart
const loadpartData = async (req, res) => {
  const { ac_no } = req.body; // Get vidhansabha term or default to an empty string
  console.log( "ac_no=",ac_no);
    try {
      const data = await Data.loadpartAll(ac_no); // Pass the keyword to the model
      if (data.length > 0) {
        res.status(200).json({ success: "true", message: "Part According Data Retrieved Successfully", data });
      } else {
        res.status(404).json({ success: "false", message: "No Data Found..." });
      }
    } catch (error) {
      res.status(500).json({ success: "false", error: "Failed To Retrieve Data" });
    }
  };

// Load Part List 
const partList = async (req, res) => {
  try {
    const data = await Data.loadpartList();  
    if (data.length > 0) {
      res.status(200).json({
        success: "true",
        message: "All Part List Data Retrieved Successfully",
        data: data
      }); // 200 OK if data is found
    } else {
      res.status(404).json({
        success: "false",
        message: "No Part List Found..."
      }); // 404 if no data is found
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Failed To Retrieve  Part List  Data"
    }); // 500 Internal Server Error if something goes wrong
  }
};

// Update Voter Status According to EPIC NO
const VStatus = async (req, res) => {
  const { epic_no, v_status } = req.body; // Destructuring EPIC_NO and V_STATUS from req.body
  try {
    const data = await Data.updateVStatus(epic_no, v_status);  
    if (data.affectedRows > 0) {
      res.status(200).json({
        success: "true",
        epic_no:  epic_no, 
        message: "Voter status updated successfully",
        v_status: v_status
      }); // 200 OK if update is successful
    } else {
      res.status(404).json({
        success: "false",
        message: "Voter not found"
      }); // 404 if no matching record is found
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Failed to update voter status"
    }); // 500 Internal Server Error if something goes wrong
  }
};


// vInfo  Update Info 
const updateVInfo = async (req, res) => {
  const {house_no,voter_name_eng, voter_name_hin,rln_name_eng,rln_name_hin,caste,samaj,epic_no, gender, age, mobile_no,priority} = req.body; // Destructuring from req.body
  // Validate that epic_no is present
if (!epic_no) {
  return res.status(400).json({ success: "false", error: 'epic_no is Required' });
}
  try {
    const data = await Data.UvInfo(house_no,voter_name_eng,voter_name_hin,rln_name_eng, rln_name_hin,caste,samaj,epic_no, gender, age, mobile_no,priority);  
    if (data.affectedRows > 0) {
      res.status(200).json({
        success: "true",
        message: "Voter details updated Successfully",
        voter_name_eng: voter_name_eng,
      }); // 200 OK if update is successful
    } else {
      res.status(404).json({
        success: "false",
        message: "Voter Details not found"
      }); // 404 if no matching record is found
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: "Failed to update voter details"
    }); // 500 Internal Server Error if something goes wrong
  }
};





// Export Module
module.exports = { load,search,loadVidhanSabha,vidhansabha,part,loadpartData, partList,VStatus,updateVInfo};

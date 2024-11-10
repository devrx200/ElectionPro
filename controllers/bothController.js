const Both = require("../models/both"); // Use the correct model for slider data
const { getBaseUrl } = require('../configs/helper');

// Controller to load slider data
const loadSlider = async (req, res) => {
  try {
    // Retrieve all active slides from the database, ordered by position
    const slides = await Both.findAllActive();

    // If no slides are found, return a 404 response
    if (!slides || slides.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No slides found",
      });
    }

    // Map slides to include full image URLs
    const sliderData = slides.map(slide => ({
      ...slide,
      image_url: `${getBaseUrl(req)}/uploads/${slide.image_url}` // Generate the full URL for the image
    }));

    // Send slider data in the response
    return res.status(200).json({
      success: true,
      message: "Slider data loaded successfully",
      slides: sliderData,
    });

  } catch (error) {
    // Handle errors and send a 500 response if needed
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// Controller to load data from the 'what_ban' table
const loadWhatBan = async (req, res) => {
    const {created_by }= req.body; 
   // Check if 'created_by' is provided in the request body
   if (!created_by) {
    return res.status(400).json({success: false,message: "'created_by' field is required",});
}
    try {
      // Retrieve all active records from the 'what_ban' table, ordered by 'time' or any other column you prefer
      const records = await Both.findBanData(created_by); // Assuming `findAllActive` retrieves only active records
  
      // If no records are found, return a 404 response
      if (!records || records.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No records found",
        });
      }
  
      // Map the records to include full image URLs
      const data = records.map(record => ({
        ...record,
        img_url: `${getBaseUrl(req)}/uploads/${record.img_url}` // Generate the full URL for the image
      }));
  
      // Send the records in the response
      return res.status(200).json({
        success: true,
        message: "What Ban data loaded successfully",
        records: data,
      });
  
    } catch (error) {
      // Handle errors and send a 500 response if needed
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };


// Export the loadSlider function
module.exports = { loadSlider,loadWhatBan};

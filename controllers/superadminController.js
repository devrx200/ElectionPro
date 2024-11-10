const supAdmin = require("../models/supadmin");
const { getBaseUrl } = require('../configs/helper');

const usersList = async (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ success: "false", error: 'Username is required' });
  }

  try {
    const data = await supAdmin.loadList(username); // Fetch records based on username

    if (data.length === 0) {
      return res.status(404).json({ success: "false", message: "No Users List Data Found" }); // Return 404 if no data is found
    }

    // Process each user record to remove 'password' and handle 'profile_pic' URL
    const users = data.map(({ password, profile_pic, gender, ...userData }) => {
      // Define default profile picture URLs based on gender
      const Profile1Url = `${getBaseUrl(req)}/assets/img/default/profile1.jpg`;
      const Profile2Url = `${getBaseUrl(req)}/assets/img/default/profile2.jpg`;
      // Set the profile picture URL dynamically
      userData.profile_pic = profile_pic ? `${getBaseUrl(req)}/uploads/${profile_pic}` : (gender === "Male" ? Profile1Url : Profile2Url);
      // Add gender explicitly to user data
      userData.gender = gender;

      return userData; // Return user data excluding password
    });

    // Return all users in a single object
    res.status(200).json({
      success: "true",
      message: "Users List Data Retrieved Successfully",
      users: users // Return the list of users here
    });

  } catch (error) {
    res.status(500).json({ success: "false", error: "Failed to retrieve users list" }); // Handle any errors
  }
};

// Export the module
module.exports = { usersList };

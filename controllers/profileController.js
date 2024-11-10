const User = require("../models/users");
const { getBaseUrl} = require('../configs/helper');
// Sote Log On Table 
const loadUserProfile = async (req, res) => {
   const { identifier } = req.body; // Assuming the identifier 
//  console.log("Base URL:", getBaseUrl(req)); // This should print the URL string
//     console.log(identifier);
// const user = req.session.user; // Get the logged-in user from session
    try {
      // Retrieve user data based on the identifier
      const results = await User.findByIdentifier(identifier);
      if (results.length === 0) {
        return res.status(404).json({
          success: "false",
          message: "User Not Found...",
        });
      }
  // Destructure user data and set the profile_pic URL
  const { password, profile_pic, gender, ...userData } = results[0];
// Generate the full profile_pic URL dynamically
userData.gender= gender; 
// Define Profile URLs by calling getBaseUrl(req) correctly
const Profile1Url = `${getBaseUrl(req)}/assets/img/default/profile1.jpg`;
const Profile2Url = `${getBaseUrl(req)}/assets/img/default/profile2.jpg`;
 // Set profile_pic with gender-based default if profile_pic is null
userData.profile_pic = profile_pic ? `${getBaseUrl(req)}/uploads/${profile_pic}` : (gender === "Male" ? Profile1Url : Profile2Url);
     
req.session.user = {
 ...userData,
};

// // Respond with user profile data, excluding password
      // if (user.user_type==='superadmin') {
      //   // Send user data to the 'superadmin-dashboard' view
      //   res.render('superadmin/profile', { profile: userData });
      //   return res.status(200).json({success: "true",message: "User Profile Loaded Successfully",user: userData,});
      // }
      // if (user.user_type==='admin') {
      //   // Send user data to the 'admin-dashboard' view
      //   res.render('admin/profile', { profile: userData });
      //   return res.status(200).json({success: "true",message: "User Profile Loaded Successfully",user: userData,});
      // }
      // if (user.user_type==='user') {
        return res.status(200).json({success: "true",message: "User Profile Loaded Successfully",user: userData,});
        
      // }
    } catch (error) {
      return res.status(500).json({ success: "false", error: error.message });
    }
  };
//   Export
module.exports = {loadUserProfile};
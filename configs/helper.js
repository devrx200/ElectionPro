// Helper 
const db = require('./db');
// ============================Get BaseUrl 
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

//================================ Helper function to log user activity
async function logUserActivity(userId,userName,userType,loginTime, ipAddress, userAgent, status) {
    const sql = `INSERT INTO users_logs (user_id, username, user_type, login_time, ip_add, user_agent, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [userId,userName,userType, loginTime, ipAddress, userAgent, status];
  
    try {
      // Await the promise to get the result
      await db.execute(sql, values);  // Awaiting the execution of the query
      console.log("User activity logged successfully.");
    } catch (error) {
      console.error("Error logging user activity:", error);
    }
  }
  
// Export  the function
module.exports = { getBaseUrl,logUserActivity};

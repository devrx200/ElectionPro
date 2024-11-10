// apiKeyMiddleware.js
require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['apikey'];
  // Check if the API key exists and matches the one in .env
  if (apiKey && apiKey === process.env.API_KEY) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
};

module.exports = apiKeyMiddleware;

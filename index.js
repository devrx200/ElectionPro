const express = require('express');
const path = require('path'); // Import the 'path' module
const BodyParser = require('body-parser');
const cors = require('cors');
// Routes

//  object for express
const app = express();

// Middleware
app.use(BodyParser.json());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"*"}));

// Port No. For Running Api 
const PORT = process.env.PORT || 3100;

// Serve static files from the 'Uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the 'Assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Set 'views' directory for any views
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');



// Message On Browser - Route to render index.ejs
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/home", (req, res) => {
    res.render('home');
});
 
app.post("/lyt", (req, res) => {
    res.render('layaout');
});

// Listening to the port
app.listen(PORT, () => {
    // console.log('Project :- Kanker Recruitment Portal');
    console.log(`\x1b[31mBacked Api Is Running On => http://localhost:${PORT}\x1b[0m`);
    // console.log('Developed By. Lomash Rishi');
  });
require('dotenv').config();
const express = require('express');
const path = require('path'); // Import the 'path' module
const BodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
//  object for express Main App 
const app = express();
// Middleware Extantion 
app.use(BodyParser.json());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"*"}));
// SESSION
app.use(session({
    secret: process.env.SECRET, // Change to a strong secret
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
    resave: false,
    saveUninitialized: true,
    cookie: { 
    secure: false,            // only https pe save hoga agar true hain to 
    rolling: true, 
    sameSite: 'strict'
    } // Set to true if using HTTPS
  }));
// =============== Pass Session Data On Every View Ejs Pages 
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Make `user` data available in all views for this request
  next();
});

// ============================================================================
// Middleware  Custum For All Routes
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const isAuthenticated = require('./middlewares/isAuthenticated');
const isLogin = require('./middlewares/isLogin');

// Port No. For Running Api 
const PORT = process.env.PORT || 3100;
const HOST = process.env.HOST || 'localhost'; // Bind to all network interfaces (local IP)
// Serve static files from the 'Uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the 'Assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Set 'views' directory for any views
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// app.use((req, res) => {
//     console.log(`404 - Page Not Found: ${req.originalUrl}`);
//     res.status(404).render('404', { url: req.originalUrl });
// });


//==============  Render Routes For Fontend Both Super Admin & Admin ============
app.get("/",isLogin,(req, res) => {
    res.render('index',{ title: 'Login Page || Election Pro' });
});



//======================== Super Admin Routes For Frontend ============================

app.get("/superadmin/dashboard",isAuthenticated(['superadmin']), (req, res) => {
    res.render('superadmin/dashboard',{ title: 'Dashboard - Super Admin || Election Pro' });
});
app.get('/superadmin', isAuthenticated(['superadmin']), (req, res) => {
    // Redirect to the superadmin dashboard
    res.redirect('/superadmin/dashboard');
  });
app.get("/superadmin/profile",isAuthenticated(['superadmin']), (req, res) => {
    res.render('superadmin/profile',{ title: 'Profile - Super Admin - Profile  || Election Pro', });
});
app.get("/superadmin/settings",isAuthenticated(['superadmin']), (req, res) => {
    res.render('superadmin/settings',{ title: 'Settings - Super Admin || Election Pro' });
});

// ======================= Admin Routes For Frontend ================================
 app.get("/admin/dashboard",isAuthenticated(['admin']), (req, res) => {
    res.render('admin/dashboard',{ title: 'Admin - Dashboard || Election Pro' }); 
});
app.get('/admin', isAuthenticated(['admin']), (req, res) => {
    // Redirect to the superadmin dashboard
    res.redirect('/admin/dashboard');
  });

//================== Api Routes For Web Only SuperAdmin & Admin //====================
const superadminRoute = require('./routes/superadminRoute');
app.use('/api/superadmin',apiKeyMiddleware,superadminRoute);

//================== Api Routes For Both Web & App //====================
const bothRoute = require('./routes/bothRoute');
app.use('/api/all',apiKeyMiddleware, bothRoute);

const authRoutes = require('./routes/authRoute');
app.use('/api/auth', apiKeyMiddleware,authRoutes); // Login With Role Web+App

const dataRoutes = require('./routes/dataRoutes');
app.use('/api/data',apiKeyMiddleware,dataRoutes); // All Data Load

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin',apiKeyMiddleware,adminRoute);

const userRoute = require('./routes/userRoute');
app.use('/api/user',apiKeyMiddleware,userRoute);


//================== Routes Api For Mobile Application //===================




// ============ Listening To The Port //=============
app.listen(PORT,HOST, () => {
    console.log('Project :- CBK-Technologies');
    console.log(`\x1b[31mBacked Api Is Running On => http://${HOST}:${PORT}\x1b[0m`);
    console.log('Developed By. Lomash Rishi');
  });
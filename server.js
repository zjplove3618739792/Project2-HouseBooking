
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const bookingRouter = require('./controllers/booking')

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');


const applicationsController = require('./controllers/applications.js');


const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);

app.get('/', (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // Redirect logged-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not logged in
    res.render('index.ejs');
  }
});





app.use('/applications', applicationsController);
app.use('/auth', authController);
app.use(isSignedIn); // add here
app.use('/users/:userId/applications', applicationsController);
// app.use('/users/booking', bookingRouter);
app.get("/users/booking", (req, res) => {
  res.render("/views/index.ejs");
});


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

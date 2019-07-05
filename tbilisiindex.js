require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// Module allows use of session
const session = require('express-session');

// Imports passport local strategy 
const passport = require('./config/passportConfig');
// module for flash messages 
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const methodOverride = require('method-override');
// const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');

// This is only used by the session store
const db = require('./models');

const app = express();

// This line makes the session use sequelize to write session data to a postgres table
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
});

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.set('layout extractScripts', true);
app.use(helmet());
app.use(methodOverride('_method'));

// Configures express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
})); 

// Use this line once to set up the store table
sessionStore.sync();

// Starts the flash middleware
app.use(flash());

// Link passport to the express session
// Must be below session
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mapbox({
    accessToken: process.env.MAPBOX_PUBLIC_KEY
})

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/map', function(req,res) {

  geocodingClient.forwardGeocode({
    query: "Tblisi,Georgia"
}).send().then(function(response) {
    let results = response.body.features.map(function(feature) {
        return feature.center
    })
    res.render('map', {results})
 })
})

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/location', require('./controllers/location')); 
app.use('/city', require('./controllers/city'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

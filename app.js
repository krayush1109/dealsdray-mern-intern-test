require('dotenv').config({ path: './.env' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');

// database connection
var db = require('./models/db_connection');
// console.log(db);
db.connectDB();

var User_Collection = require('./models/user.schema');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// ------------- passport & session config -------------
const session = require('express-session');
const passport = require('passport');

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Session secret from environment variables
    resave: false, // Do not save session if unmodified
    saveUninitialized: true // Save uninitialized sessions
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User_Collection.serializeUser()); // Serialize user instance
passport.deserializeUser(User_Collection.deserializeUser()); // Deserialize user instance
// ------------- passport & session config -------------

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

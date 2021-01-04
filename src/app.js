const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');


// Security
const helmet = require('helmet');
const cors = require('cors');
require('dotenv/config');

// Authentication
const passport = require('passport');
require('./config/passport')(passport);

const auth = require('./api/auth');
const job = require('./api/job');
const user = require('./api/user')

const _env = process.env;
const app = express();

// View engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.use(helmet());
app.use(cors());

// Log request and response
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

// Store css, js and bootstrap
app.use(express.static(path.join(__dirname, '../views/public')));


app.use(session({
    secret: _env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', auth);
app.use('/job', job);
app.use('/user', user)

mongoose
    .connect(_env.DEV_DB, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .catch((err) => console.log(err));

let port = _env.PORT || _env.DEV_PORT;

app.listen(port, () => { console.log('Server started on port ' + port); });

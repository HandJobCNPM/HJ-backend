const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const job = require('./api/job');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);

// const auth = require('./api/auth');
// const user = require('./api/user');

dotenv.config();
const _env = process.env;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Log request and response
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(_env.DEV_DB, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .catch((err) => console.log(err));

let port = _env.PORT || _env.DEV_PORT;
app.use('/', job);

app.listen(port, () => { console.log('Server started on port ' + port); });

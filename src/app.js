const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);

const auth = require('./api/auth');
const user = require('./api/user');

dotenv.config();
const _env = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static('public'));
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(_env.DEV_DB, {useNewUrlParser: true})
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

let port = _env.PORT || _env.DEV_PORT;
app.use('/', auth, user);

app.listen(port, () => { console.log('Server started on port ' + port); });

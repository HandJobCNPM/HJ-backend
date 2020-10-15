const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const job = require('./api/job');
// const auth = require("./api/auth");
// const user = require("./api/user");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

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

mongoose
    .connect(_env.DEV_DB, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .catch((err) => console.log(err));

let port = _env.PORT || _env.DEV_PORT;
app.use('/', job);

app.listen(port, () => {});

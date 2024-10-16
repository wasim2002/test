const express = require('express');
require("dotenv").config();
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ApiError = require('./helpers/ApiError');
const app = express();

const Routes = require('./routes');

const bodyParser = require('body-parser');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.set('view engine','ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/', Routes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    if (req.accepts('json')) {
      return res.status(err.statusCode).json({
        result: {
          success: false,
          message: err.message
        },
        data: []
      });
    } else {
      res.status(err.statusCode).send(`<h1>Error: ${err.message}</h1>`);
    }
  }
  return res.status(500).json({
    result: {
      success: false,
      message: 'Internal Server Error'
    },
    data: []
  });
});

module.exports = app;

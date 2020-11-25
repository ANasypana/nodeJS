const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Error-classes
const NotFoundError = require('../../utils/errors/notFoundError');

const authRouter = require('../../routes/auth');
const usersRouter = require('../../routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use('*', (req, res, next) => {
  const error = new NotFoundError(
    `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
  );

  next(error);
});

// error handler
app.use((err, req, res, next) => {
  const {  message, statusCode } = err;
  const status = statusCode ? statusCode : 500;
  res.status(status).json({ message: message });
});

module.exports = app;

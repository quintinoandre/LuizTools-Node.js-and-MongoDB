const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());

const authenticationMiddleware = require('./middlewares/authenticationMiddleware');
app.use('/', indexRouter);
app.use('/users', authenticationMiddleware, usersRouter);

// error handler
app.use((err, req, res, next) => {
	console.error(err);

	res.sendStatus(err.status || 500); //! Internal Server Error
});

module.exports = app;

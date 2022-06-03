const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

global.authenticationMiddleware = () => {
  return (request, response, next) => {
    if (request.isAuthenticated() && require('./permissions')(request))
      return next();

    return response.redirect('/login?fail=true');
  };
};

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const reportsRouter = require('./routes/reports');

const app = express();

//autenticação
const { MONGO_CONNECTION, MONGO_STORE_SECRET } = process.env;

require('./auth')(passport);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_CONNECTION,
      ttl: 30 * 60, //30 minutos de sessão
      autoRemove: 'native',
    }),
    secret: MONGO_STORE_SECRET, //configure um segredo seu aqui
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //30 minutos de sessão
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use((request, response, next) => next(createError(404)));

// error handler
app.use((error, request, response, next) => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error', { title: 'Erro' });
});

module.exports = app;

const express = require('express');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const { doLogin, doLogout } = require('./authController');

const { MOVIES_API, CATALOG_API, PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

const options = {
	proxyReqPathResolver: ({ originalUrl }) => {
		return originalUrl;
	},
};

app.post('/login', doLogin);

app.post('/logout', doLogout);

const moviesServiceProxy = httpProxy(MOVIES_API, options);

const catalogServiceProxy = httpProxy(CATALOG_API, options);

app.use('/movies', moviesServiceProxy);

app.get(/cities|cinemas/i, catalogServiceProxy);

app.listen(PORT, () => {
	console.log(`API Gateway started at ${PORT}`);
});

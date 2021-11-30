const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { PORT, MS_NAME } = process.env;

let server = null;

async function start() {
	const app = express();

	app.use(helmet());

	app.use(morgan('dev'));

	app.get('/heath', (req, res, next) => {
		res.send(`The service ${MS_NAME} is running at ${PORT}`);
	});

	app.use((error, req, res, next) => {
		console.error(error);

		res.sendStatus(500); //! Internal Server Error
	});

	server = app.listen(PORT, () => {
		console.log(`The service ${MS_NAME} already started at ${PORT}!`);
	});
}

async function stop() {
	if (server) await server.close();

	return true;
}

module.exports = { start, stop };

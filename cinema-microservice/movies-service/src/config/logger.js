const winston = require('winston');
const path = require('path');

const { NODE_ENV } = process.env;

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.errors({ stack: true }),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: path.join(__dirname, '..', 'logs', 'error.log'),
			level: 'error',
		}),
		new winston.transports.File({
			filename: path.join(__dirname, '..', 'logs', 'info.log'),
			level: 'info',
		}),
	],
});

if (NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({ format: winston.format.simple() })
	);
}

module.exports = logger;

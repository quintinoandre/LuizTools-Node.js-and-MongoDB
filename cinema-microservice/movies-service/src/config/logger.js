const winston = require('winston');

const { NODE_ENV } = process.env;

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.errors({ stack: true }),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({ filename: 'logs.txt', level: 'error' }),
	],
});

if (NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({ format: winston.format.simple() })
	);
}

module.exports = logger;

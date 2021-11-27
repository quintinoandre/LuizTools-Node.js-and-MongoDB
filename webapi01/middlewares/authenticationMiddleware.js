const { findKey } = require('../models/keyModel');

module.exports = ({ headers }, res, next) => {
	const key = headers['authorization'];

	const apiKey = findKey(key.replace('ApiKey ', ''));

	if (apiKey && apiKey.enabled) return next();
	else res.sendStatus(401); //! Unauthorized
};

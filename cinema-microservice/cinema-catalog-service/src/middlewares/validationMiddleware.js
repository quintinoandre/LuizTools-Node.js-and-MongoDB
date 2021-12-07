const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

function validateToken({ headers }, res, next) {
	let token = headers['authorization'];

	if (!token) return res.sendStatus(401); //! Unauthorized

	token = token.replace('Bearer ', '');

	try {
		const { userId } = jwt.verify(token, SECRET);

		res.locals.userId = userId;

		next();
	} catch (err) {
		console.log(err);

		res.sendStatus(401); //! Unauthorized
	}
}

module.exports = { validateToken };

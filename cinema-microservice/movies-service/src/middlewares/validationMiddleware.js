const schema = require('../schemas/movieSchema');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

function validateMovies({ body }, res, next) {
	const { error } = schema.validate(body);

	if (error) {
		const { details } = error;

		return res.status(422).json(details.map((d) => d.message)); //! Unprocessable Entity
	}

	next();
}

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

module.exports = { validateMovies, validateToken };

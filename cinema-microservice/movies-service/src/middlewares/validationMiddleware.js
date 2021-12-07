const schema = require('../schemas/movieSchema');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const ADMIN_PROFILE = 1;

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
		const { userId, profileId } = jwt.verify(token, SECRET);

		res.locals.userId = userId;

		res.locals.profileId = profileId;

		next();
	} catch (err) {
		console.log(err);

		res.sendStatus(401); //! Unauthorized
	}
}

function validateAdmin(res, res, next) {
	const { locals } = res;

	const { profileId } = locals;

	if (parseInt(profileId) === ADMIN_PROFILE) next();
	else res.sendStatus(403); //! Forbidden
}

module.exports = { validateMovies, validateToken, validateAdmin };

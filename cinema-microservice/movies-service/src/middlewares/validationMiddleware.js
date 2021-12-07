const schema = require('../schemas/movieSchema');

function validateMovies({ body }, res, next) {
	const { error } = schema.validate(body);

	if (error) {
		const { details } = error;

		return res.status(422).json(details.map((d) => d.message)); //! Unprocessable Entity
	}

	next();
}

module.exports = { validateMovies };

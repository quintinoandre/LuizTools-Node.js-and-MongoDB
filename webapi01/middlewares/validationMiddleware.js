const userSchema = require('../models/userSchema');

httpMethods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

module.exports = ({ body, method }, response, next) => {
	const { POST, PUT } = httpMethods;

	if ([POST, PUT].includes(method)) {
		if (!body.name || !body.age)
			return response.status(422).json({ error: 'name and age are required!' });
		//! Unprocessable Entity
	}

	const { error } = userSchema.validate(body);

	if (error) return response.status(422).json({ error: error.details });
	//! Unprocessable Entity
	else next();
};

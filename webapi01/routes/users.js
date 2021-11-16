const express = require('express');
const router = express.Router();
const {
	findUsers,
	insertUser,
	updateUser,
	deleteUser,
	findUser,
} = require('../models/db');
const userSchema = require('../models/userSchema');

httpMethods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.json(findUsers()); //* OK
});

router.get('/:id', ({ params }, response) => {
	const { id } = params;

	response.json(findUser(id)); //* OK
});

const validationMiddleware = ({ body, method }, response, next) => {
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

router.post('/', validationMiddleware, ({ body }, response) => {
	const user = insertUser(body);

	response.status(201).json(user); //* Create
});

router.put('/:id', validationMiddleware, ({ params, body }, response) => {
	const { id } = params;

	const user = updateUser(id, body, true);

	response.status(200).json(user); //* OK
});

router.patch('/:id', ({ params, body }, response) => {
	const { id } = params;

	const user = updateUser(id, body, false);

	response.status(200).json(user); //* OK
});

router.delete('/:id', ({ params, body }, response) => {
	const { id } = params;

	const user = deleteUser(id);

	response.status(200).json(user); //* OK
});

module.exports = router;

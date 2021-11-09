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

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.json(findUsers()); //* OK
});

router.get('/:id', ({ params }, response) => {
	const { id } = params;

	response.json(findUser(id)); //* OK
});

router.post('/', ({ body }, response) => {
	const { error } = userSchema.validate(body);

	if (error) return response.status(422).json({ error: error.details }); //! Unprocessable Entity

	const user = insertUser(body);

	response.status(201).json(user); //* Create
});

router.put('/:id', ({ params, body }, response) => {
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

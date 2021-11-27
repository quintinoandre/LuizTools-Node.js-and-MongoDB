const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middlewares/validationMiddleware');
const {
	findUsers,
	insertUser,
	updateUser,
	deleteUser,
	findUser,
} = require('../models/userModel');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.json(findUsers()); //* OK
});

router.get('/:id', ({ params }, response) => {
	const { id } = params;

	response.json(findUser(id)); //* OK
});

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

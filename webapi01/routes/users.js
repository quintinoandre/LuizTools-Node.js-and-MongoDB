const express = require('express');
const router = express.Router();
const { findUsers, insertUser, updateUser, deleteUser } = require('../db');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.json(findUsers());
});

router.post('/', ({ body }, response) => {
	const user = insertUser(body);

	response.status(201).json(user);
});

router.put('/:id', ({ params, body }, response) => {
	const { id } = params;

	const user = updateUser(id, body);

	response.status(200).json(user);
});

router.delete('/:id', ({ params, body }, response) => {
	const { id } = params;

	const user = deleteUser(id);

	response.status(200).json(user);
});

module.exports = router;

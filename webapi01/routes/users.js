const express = require('express');
const router = express.Router();
const { findUsers, insertUser } = require('../db');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.json(findUsers());
});

router.post('/', ({ body }, response) => {
	const user = insertUser(body);

	response.statusCode(201).json(user);
});

module.exports = router;

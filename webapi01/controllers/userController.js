const {
	findUsers,
	insertUser,
	updateUser,
	deleteUser,
	findUser,
} = require('../models/userModel');

function getUsers(req, res, next) {
	res.json(findUsers());
}

module.exports = { getUsers };

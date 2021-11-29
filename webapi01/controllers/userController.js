const userModel = require('../models/userModel');

function getUsers(req, res, next) {
	res.json(userModel.findUsers());
}

function getUserById({ params }, response) {
	const { id } = params;

	response.json(userModel.findUser(id)); //* OK
}

function postUser({ body }, response) {
	const user = userModel.insertUser(body);

	response.status(201).json(user); //* Create
}

function putUser({ params, body }, response) {
	const { id } = params;

	const user = userModel.updateUser(id, body, true);

	response.status(200).json(user); //* OK
}

function patchUser({ params, body }, response) {
	const { id } = params;

	const user = userModel.updateUser(id, body, false);

	response.status(200).json(user); //* OK
}

function deleteUser({ params, body }, response) {
	const { id } = params;

	const user = userModel.deleteUser(id);

	response.status(200).json(user); //* OK
}

module.exports = {
	getUsers,
	getUserById,
	postUser,
	putUser,
	patchUser,
	deleteUser,
};

const { v4: generateId } = require('uuid');

global.users = [];

const findUsers = () => {
	return global.users;
};

const findUser = (id) => {
	return global.users.find((item) => item.id === id);
};

const insertUser = (user) => {
	user.id = generateId();

	global.users.push(user);
};

const updateUser = (id, user) => {
	return global.users.forEach((item, index, array) => {
		if (item.id === id) {
			user.id = id;

			array[index] = user;
		}
	});
};

const deleteUser = (id) => {
	return global.users.forEach((item, index, array) => {
		if (item.id === id) {
			array.splice(index, 1);
		}
	});
};

module.exports = { findUsers, findUser, insertUser, updateUser, deleteUser };

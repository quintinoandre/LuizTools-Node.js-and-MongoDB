const { v4: generateId } = require('uuid');
const fs = require('fs');

const FILE_PATH = require('path').join(__dirname, 'users.json');

const findUsers = () => {
	try {
		return require('./users.json');
	} catch (ex) {
		return [];
	}
};

const findUser = (id) => {
	return findUsers().find((item) => item.id === id);
};

const insertUser = (user) => {
	const users = findUsers();

	user.id = generateId();

	users.push(user);

	fs.writeFileSync(FILE_PATH, JSON.stringify(users));

	return user;
};

const updateUser = (id, user) => {
	const users = findUsers();

	users.forEach((item, index, array) => {
		if (item.id === id) {
			user.id = id;

			array[index] = user;
		}
	});

	fs.writeFileSync(FILE_PATH, JSON.stringify(users));

	return user;
};

const deleteUser = (id) => {
	const users = findUsers();

	users.forEach((item, index, array) => {
		if (item.id === id) {
			array.splice(index, 1);
		}
	});

	fs.writeFileSync(FILE_PATH, JSON.stringify(users));

	return id;
};

module.exports = { findUsers, findUser, insertUser, updateUser, deleteUser };

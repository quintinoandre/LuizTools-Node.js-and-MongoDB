const { hashSync } = require('bcryptjs');

function creatUser(username, password, email, callback) {
	const cryptoPassword = hashSync(password, 10);

	global.db
		.collection('users')
		.insertOne({ username, password: cryptoPassword, email }, callback);
}

module.exports = { creatUser };

const { hashSync } = require('bcryptjs');

function creatUser(username, password, email, callback) {
	const cryptoPassword = hashSync(password, 10);

	global.db
		.collection('users')
		.insertOne({ username, password: cryptoPassword, email }, callback);
}

function resetPassword(email, callback) {
	const { generatePassword } = require('./utils');

	const newPassword = generatePassword();

	const cryptoPassword = hashSync(newPassword, 10);

	global.db
		.collection('users')
		.updateOne(
			{ email },
			{ $set: { password: cryptoPassword } },
			(err, res) => {
				callback(err, res, newPassword);
			}
		);
}

module.exports = { creatUser, resetPassword, resetPassword };

const { connect } = require('../config/database');
const { compareSync } = require('bcryptjs');

async function getUser(email, password) {
	const db = await connect();

	const user = await db.collection('users').findOne({ email });

	if (!user) throw new Error('Wrong user and/or password!');

	const isValid = compareSync(password, user.password);

	if (!isValid) throw new Error('Wrong user and/or password!');

	return user;
}

async function blacklistToken(token) {
	const db = await connect();

	return db.collection('blacklist').insertOne({ _id: token });
}

async function checkBlacklist(token) {
	const db = await connect();

	const qtd =
		(await db.collection('blacklist').countDocuments({ _id: token })) > 0;

	return qtd > 0;
}

module.exports = { getUser, blacklistToken, checkBlacklist };

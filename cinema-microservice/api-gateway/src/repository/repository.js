const { connect } = require('../config/database');

async function getUser(email, password) {
	const db = await connect();

	const user = await db.collection('users').findOne({ email });

	if (!user) throw new Error('User not found!');

	//TODO: terminar depois

	return user;
}

module.exports = { getUser };

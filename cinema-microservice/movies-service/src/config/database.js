const { MongoClient } = requite('mongodb');

let client = null;

const { MONGO_CONNECTION, DATABASE } = process.env;

async function connect() {
	if (!client) client = new MongoClient(MONGO_CONNECTION);

	await client.connect();

	return client.db(DATABASE);
}

async function disconnect() {
	if (!client) return true;

	await client.close();

	client = null;

	return true;
}

module.exports = { connect, disconnect };

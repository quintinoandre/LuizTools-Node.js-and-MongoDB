//db.js
const ObjectId = require('mongodb').ObjectId;
const mongoClient = require('mongodb').MongoClient;

const { MONGODB_CONNECTION } = process.env;

function connectDatabase() {
	if (!global.connection)
		mongoClient
			.connect(MONGODB_CONNECTION, { useUnifiedTopology: true })
			.then((connection) => {
				global.connection = connection.db('aula02');

				console.log('Connected to MongoDB!');
			})
			.catch((error) => {
				console.log(error);

				global.connection = null;
			});
}

/* function findCustomers  (callback) {
	return global.connection
		.collection('customers')
		.find({})
		.toArray((error, docs) => {
			callback(error, docs);
		});
}; */

function findCustomers() {
	connectDatabase();

	return global.connection.collection('customers').find({}).toArray();
}

function findCustomer(id) {
	connectDatabase();

	const objectId = new ObjectId(id);

	return global.connection.collection('customers').findOne({ _id: objectId });
}

function insertCustomer(customer) {
	connectDatabase();

	return global.connection.collection('customers').insertOne(customer);
}

function updateCustomer(id, customer) {
	connectDatabase();

	const objectId = new ObjectId(id);

	return global.connection
		.collection('customers')
		.updateOne({ _id: objectId }, { $set: customer });
}

function deleteCustomer(id) {
	connectDatabase();

	const objectId = new ObjectId(id);

	return global.connection.collection('customers').deleteOne({ _id: objectId });
}

module.exports = {
	findCustomers,
	insertCustomer,
	updateCustomer,
	deleteCustomer,
	findCustomer,
};

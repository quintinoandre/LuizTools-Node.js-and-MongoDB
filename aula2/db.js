//db.js
const ObjectId = require('mongodb').ObjectId;
const mongoClient = require('mongodb').MongoClient;

mongoClient
	.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
	.then((connection) => {
		global.connection = connection.db('aula02');

		console.log('Connected to MongoDB!');
	})
	.catch((error) => console.log(error));

/* const findCustomers = (callback) => {
	return global.connection
		.collection('customers')
		.find({})
		.toArray((error, docs) => {
			callback(error, docs);
		});
}; */

const findCustomers = () => {
	return global.connection.collection('customers').find({}).toArray();
};

const insertCustomer = (customer) => {
	return global.connection.collection('customers').insertOne(customer);
};

const updateCustomer = (id, customer) => {
	const objectId = new ObjectId(id);

	return global.connection
		.collection('customers')
		.updateOne({ _id: objectId }, { $set: customer });
};

const deleteCustomer = (id) => {
	const objectId = new ObjectId(id);

	return global.connection.collection('customers').deleteOne({ _id: objectId });
};

module.exports = {
	findCustomers,
	insertCustomer,
	updateCustomer,
	deleteCustomer,
};

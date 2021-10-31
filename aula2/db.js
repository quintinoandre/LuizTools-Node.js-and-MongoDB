//db.js
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

module.exports = { findCustomers };

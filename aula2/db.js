//db.js
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(
	'mongodb://localhost:27017',
	{ useUnifiedTopology: true },
	(error, connection) => {
		if (error) return console.log(error);
		else {
			global.connection = connection.db('aula02');

			console.log('Connected');
		}
	}
);

module.exports = {};

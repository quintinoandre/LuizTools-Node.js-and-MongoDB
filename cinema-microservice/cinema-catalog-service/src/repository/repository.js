const { connect } = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllCities() {
	const db = await connect();

	return db
		.collection('cinemaCatalog')
		.find({})
		.project({ cidade: 1, uf: 1, pais: 1 })
		.toArray();
}

async function getMovieById(id) {
	const db = await connect();

	return db.collection('movies').findOne({ _id: new ObjectId(id) });
}

async function getMoviesPremieres() {
	const monthAgo = new Date();

	monthAgo.setMonth(-1);

	const db = await connect();

	return db
		.collection('movies')
		.find({ dataLancamento: { $gte: monthAgo } })
		.toArray();
}

module.exports = {
	getAllCities,
	getMovieById,
	getMoviesPremieres,
};

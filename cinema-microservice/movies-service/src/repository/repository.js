const { connect } = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllMovies() {
	const db = await connect();

	return db.collection('movies').find().toArray();
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

async function addMovie(movie) {
	const db = await connect();

	const result = await db.collection('movies').insertOne(movie);

	const _id = result.insertedId;

	return { ...movie, _id };
}

async function deleteMovie(id) {
	const db = await connect();

	return db.collection('movies').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
	getAllMovies,
	getMovieById,
	getMoviesPremieres,
	addMovie,
	deleteMovie,
};

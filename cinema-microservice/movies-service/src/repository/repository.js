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

	if (result.insertedId) {
		const _id = result.insertedId;

		return { ...movie, _id };
	}

	throw new Error('It was not possible to save the movie!');
}

module.exports = { getAllMovies, getMovieById, getMoviesPremieres, addMovie };

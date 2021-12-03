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

async function getCinemaByCityId(cityId) {
	const objCityId = new ObjectId(cityId);

	const db = await connect();

	const city = await db
		.collection('cinemaCatalog')
		.findOne({ _id: objCityId }, { projection: { cinemas: 1 } });

	return city.cinemas;
}

async function getMoviesByCinemaId(cinemaId) {
	const objCinemaId = new ObjectId(cinemaId);

	const db = await connect();

	const group = await db
		.collection('cinemaCatalog')
		.aggregate([
			{ $match: { 'cinemas._id': objCinemaId } },
			{ $unwind: '$cinemas' },
			{ $unwind: '$cinemas.salas' },
			{ $unwind: '$cinemas.salas.sessoes' },
			{
				$group: {
					_id: {
						titulo: '$cinemas.salas.sessoes.filme',
						_id: '$cinemas.salas.sessoes.idFilme',
					},
				},
			},
		])
		.toArray();

	return group.map((g) => g._id);
}

module.exports = { getAllCities, getCinemaByCityId, getMoviesByCinemaId };

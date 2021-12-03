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

	return db
		.collection('cinemaCatalog')
		.findOne({ _id: objCityId }, { projection: { cinemas: 1 } });
}

module.exports = { getAllCities, getCinemaByCityId };

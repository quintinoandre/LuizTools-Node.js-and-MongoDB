const {
	getAllCities,
	getCinemaByCityId,
	getMoviesByCinemaId,
} = require('./repository');
const { test, expect } = require('@jest/globals');

let cityId = null;
let cinemaId = null;

beforeAll(async () => {
	const cities = await getAllCities();

	cityId = cities[cities.length - 1]._id;

	const cinemas = await getCinemaByCityId(cityId);

	cinemaId = cinemas[0]._id;
});

test('getAllCities', async () => {
	const cities = await getAllCities();

	expect(Array.isArray(cities)).toBeTruthy();

	expect(cities.length).toBeTruthy();
});

test('getCinemaByCityId', async () => {
	const cinemas = await getCinemaByCityId(cityId);

	expect(Array.isArray(cinemas)).toBeTruthy();
});

test('getMoviesByCinemaId', async () => {
	const movies = await getMoviesByCinemaId(cinemaId);

	console.log(movies);

	expect(Array.isArray(movies)).toBeTruthy();

	expect(movies.length).toBeTruthy();
});

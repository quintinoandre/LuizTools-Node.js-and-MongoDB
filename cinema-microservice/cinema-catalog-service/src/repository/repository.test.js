const {
	getAllCities,
	getCinemaByCityId,
	getMoviesByCinemaId,
	getMoviesByCityId,
	getMovieSessionsByCityId,
} = require('./repository');
const { test, expect } = require('@jest/globals');

let cityId = null;
let cinemaId = null;
let movieId = null;

beforeAll(async () => {
	const cities = await getAllCities();

	cityId = cities[cities.length - 1]._id;

	const cinemas = await getCinemaByCityId(cityId);

	cinemaId = cinemas[0]._id;

	movieId = cinemas[0].salas[0].sessoes[0].idFilme;
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

	expect(Array.isArray(movies)).toBeTruthy();

	expect(movies.length).toBeTruthy();
});

test('getMoviesByCityId', async () => {
	const movies = await getMoviesByCityId(cityId);

	expect(Array.isArray(movies)).toBeTruthy();

	expect(movies.length).toBeTruthy();
});

test('getMovieSessionsByCityId', async () => {
	const moviesSessions = await getMovieSessionsByCityId(movieId, cityId);

	expect(Array.isArray(moviesSessions)).toBeTruthy();

	expect(moviesSessions.length).toBeTruthy();
});

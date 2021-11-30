const {
	getAllMovies,
	getMovieById,
	getMoviesPremieres,
} = require('./repository');
const { test, expect } = require('@jest/globals');

let testMovieId = null;

beforeAll(async () => {
	const movies = await getAllMovies();

	testMovieId = movies[0]._id;
});

test('getAllMovies', async () => {
	const movies = await getAllMovies();

	expect(Array.isArray(movies)).toBeTruthy();

	expect(movies.length).toBeTruthy();
});

test('getMovieById', async () => {
	const movie = await getMovieById(testMovieId);

	expect(movie).toBeTruthy();

	expect(movie._id).toEqual(testMovieId);
});

test('getMoviePremieres', async () => {
	const monthAgo = new Date();

	monthAgo.setMonth(-1);

	const movies = await getMoviesPremieres();

	expect(Array.isArray(movies)).toBeTruthy();

	expect(movies.length).toBeTruthy();

	expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(
		monthAgo.getTime()
	);
});

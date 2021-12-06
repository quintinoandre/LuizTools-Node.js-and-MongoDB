const {
	getAllMovies,
	getMovieById,
	getMoviesPremieres,
	addMovie,
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

test('addMovie', async () => {
	const movie = {
		titulo: 'Test Movie',
		sinopse: 'Movie Summary',
		duracao: 120,
		dataLancamento: new Date(),
		imagem: 'image.jpg',
		categorias: ['Aventura'],
	};

	const result = await addMovie(movie);

	expect(result).toBeTruthy();
});

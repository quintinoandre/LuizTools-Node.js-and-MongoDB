const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

const httpMethods = {
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE',
};

let app = null;

beforeAll(async () => {
	process.env.PORT = 3003;

	app = await server.start(movies, repositoryMock);
});

afterAll(async () => {
	await server.stop();
});

test(`${httpMethods.GET} /movie 200 OK`, async () => {
	const response = await request(app).get('/movies');

	expect(response.status).toEqual(200); //* OK

	expect(Array.isArray(response.body)).toBeTruthy();

	expect(response.body.length).toBeTruthy();
});

test(`${httpMethods.GET} /movies/:id 200 OK`, async () => {
	const testMovieId = '1';

	const response = await request(app).get(`/movies/${testMovieId}`);

	expect(response.status).toEqual(200); //* OK

	expect(response.body).toBeTruthy();
});

test(`${httpMethods.GET} /movies/:id 404 NOT FOUND`, async () => {
	const testMovieId = '-1';

	const response = await request(app).get(`/movies/${testMovieId}`);

	expect(response.status).toEqual(404); //! Not Found
});

test(`${httpMethods.GET} /movies/premieres 200 OK`, async () => {
	const response = await request(app).get('/movies/premieres');

	expect(response.status).toEqual(200); //* OK

	expect(Array.isArray(response.body)).toBeTruthy();

	expect(response.body.length).toBeTruthy();
});

test(`${httpMethods.POST} /movies/ 201 Created`, async () => {
	const movie = {
		titulo: 'Test Movie',
		sinopse: 'Test Summary',
		duracao: 120,
		dataLancamento: new Date(),
		imagem: 'image.jpg',
		categorias: ['Aventura'],
	};

	const response = await request(app)
		.post('/movies/')
		.set('Content-Type', 'application/json')
		.send(movie);

	expect(response.status).toEqual(201); //* OK

	expect(response.body).toBeTruthy();
});

test(`${httpMethods.DELETE} /movies/:id 204 No Content`, async () => {
	const response = await request(app).delete('/movies/1');

	expect(response.status).toEqual(204); //* No Content
});

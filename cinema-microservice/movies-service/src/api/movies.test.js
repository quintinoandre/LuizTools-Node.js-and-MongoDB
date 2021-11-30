const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const server = require('../server/server');
const movies = require('./movies');
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository');

const httpMethods = {
	GET: 'GET',
};

let app = null;

beforeAll(async () => {
	app = await server.start(movies, repositoryMock);
});

afterAll(async () => {
	await server.stop();
});

test(`${httpMethods.GET} /movie`, async () => {
	const response = await request(app).get('/movies');

	expect(response.status).toEqual(200); //* OK

	expect(Array.isArray(response.body)).toBeTruthy();

	expect(response.body.length).toBeTruthy();
});

test(`${httpMethods.GET} /movies/:id`, async () => {
	const testMovieId = '1';

	const response = await request(app).get(`/movies/${testMovieId}`);

	expect(response.status).toEqual(200); //* OK

	expect(response.body).toBeTruthy();
});

test(`${httpMethods.GET} /movies/premieres`, async () => {
	const response = await request(app).get('/movies/premieres');

	expect(response.status).toEqual(200); //* OK

	expect(Array.isArray(response.body)).toBeTruthy();

	expect(response.body.length).toBeTruthy();
});

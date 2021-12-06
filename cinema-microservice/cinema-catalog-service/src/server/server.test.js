const { test, expect } = require('@jest/globals');
const { start, stop } = require('./server');
const request = require('supertest');

const apiMock = jest.fn((app, repository) => {
	app.get('/error', (req, res, next) => {
		throw new Error('Mock Error!');
	});
});

test('Server Start', async () => {
	const app = await start(apiMock);

	expect(app).toBeTruthy();
});

test('Health Check', async () => {
	process.env.PORT = 3005;

	const app = await start(apiMock);

	const response = await request(app).get('/health');

	expect(response.status).toEqual(200); //* OK
});

test('Error Check', async () => {
	process.env.PORT = 3006;

	const app = await start(apiMock);

	const response = await request(app).get('/error');

	expect(response.status).toEqual(500); //! Internal Server Error
});

test('Server Stop', async () => {
	const isStopped = stop();

	expect(isStopped).toBeTruthy();
});

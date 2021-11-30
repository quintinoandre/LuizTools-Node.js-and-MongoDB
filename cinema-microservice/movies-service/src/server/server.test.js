const { test, expect } = require('@jest/globals');
const { start, stop } = require('./server');
const request = require('supertest');

const apiMock = jest.fn((app, repository) => true);

test('Server Start', async () => {
	const app = await start(apiMock);

	expect(app).toBeTruthy();
});

test('Health Check', async () => {
	process.env.PORT = 3001;

	const app = await start(apiMock);

	const response = await request(app).get('/health');

	expect(response.status).toEqual(200); //* OK
});

test('Server Stop', async () => {
	const isStopped = stop();

	expect(isStopped).toBeTruthy();
});

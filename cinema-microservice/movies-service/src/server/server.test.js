const { start, stop } = require('./server');
const request = require('supertest');

test('Server Start', async () => {
	const app = await start();

	expect(app).toBeTruthy();
});

test('Health Check', async () => {
	const app = await start();

	const response = await request(app).get('/health');

	expect(response.status).toEqual(200); //* OK
});

test('Server Stop', async () => {
	const isStopped = stop();

	expect(isStopped).toBeTruthy();
});

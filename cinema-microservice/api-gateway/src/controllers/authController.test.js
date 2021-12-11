const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const app = require('../server/index');
const request = require('supertest');
const repository = require('../repository/repository');
const { ObjectId } = require('mongodb');

const httpMethods = {
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE',
};

const loginOk = { email: 'contato@luiztools.com.br', password: '123456' };

const loginNOk = { email: 'contato@luiztools.com.br', password: '12345' };

let token = '';

const tokenBlacklist = new ObjectId().toHexString();

beforeAll(async () => {
	process.env.PORT = 4001;

	const response = await request(app)
		.post('/login/')
		.set('Content-Type', 'application/json')
		.send(loginOk);

	token = response.body.token;

	await repository.blacklistToken(tokenBlacklist);
});

afterAll(async () => {
	await app.close();
});

test(`${httpMethods.POST} /login/ 200 OK`, async () => {
	const response = await request(app)
		.post('/login/')
		.set('Content-Type', 'application/json')
		.send(loginOk);

	expect(response.status).toEqual(200); //* OK

	expect(response.body.token).toBeTruthy();
});

test(`${httpMethods.POST} /login/ 422 Unprocessable Entity`, async () => {
	loginOk.data = new Date();

	const response = await request(app)
		.post('/login/')
		.set('Content-Type', 'application/json')
		.send(loginOk);

	expect(response.status).toEqual(422); //! Unprocessable Entity
});

test(`${httpMethods.POST} /login/ 401 Unauthorized`, async () => {
	const response = await request(app)
		.post('/login/')
		.set('Content-Type', 'application/json')
		.send(loginNOk);

	expect(response.status).toEqual(401); //! Unauthorized
});

test(`${httpMethods.POST} /logout/ 200 OK`, async () => {
	const response = await request(app)
		.post('/logout/')
		.set('Content-Type', 'application/json')
		.set('authorization', `Bearer ${token}`);

	expect(response.status).toEqual(200); //* OK
});

test(`${httpMethods.POST} /logout/ 401 Unauthorized`, async () => {
	const response = await request(app)
		.post('/logout/')
		.set('Content-Type', 'application/json')
		.set('authorization', `Bearer ${token}1`);

	expect(response.status).toEqual(401); //! Unauthorized
});

test(`${httpMethods.POST} /logout/ 401 Unauthorized (blacklist)`, async () => {
	const response = await request(app)
		.post('/logout/')
		.set('Content-Type', 'application/json')
		.set('authorization', `Bearer ${tokenBlacklist}1`);

	expect(response.status).toEqual(401); //! Unauthorized
});

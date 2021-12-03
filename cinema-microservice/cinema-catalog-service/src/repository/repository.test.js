const { getAllCities } = require('./repository');
const { test, expect } = require('@jest/globals');

beforeAll(async () => {});

test('getAllCities', async () => {
	const cities = await getAllCities();

	expect(Array.isArray(cities)).toBeTruthy();

	expect(cities.length).toBeTruthy();
});

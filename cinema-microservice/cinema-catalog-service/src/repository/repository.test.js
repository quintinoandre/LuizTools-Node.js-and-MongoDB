const { getAllCities, getCinemaByCityId } = require('./repository');
const { test, expect } = require('@jest/globals');

let cityId = null;

beforeAll(async () => {
	const cities = await getAllCities();

	cityId = cities[0]._id;
});

test('getAllCities', async () => {
	const cities = await getAllCities();

	expect(Array.isArray(cities)).toBeTruthy();

	expect(cities.length).toBeTruthy();
});

test('getCinemaByCityId', async () => {
	const city = await getCinemaByCityId(cityId);

	console.log(city);

	expect(city).toBeTruthy();

	expect(Array.isArray(city.cinemas)).toBeTruthy();
});

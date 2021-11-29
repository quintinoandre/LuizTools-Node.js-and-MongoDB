const { test, expect } = require('@jest/globals');
const database = require('./database');

test('Connecting Database', async () => {
	const connection = await database.connect();

	expect(connection).toBeTruthy();
});

test('Disconnecting Database', async () => {
	const isDisconnected = await database.disconnect();

	expect(isDisconnected).toBeTruthy();
});

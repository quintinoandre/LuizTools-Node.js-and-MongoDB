const cinemaCatalog = require('./api/cinemaCatalog');
const repository = require('./repository/repository');
const { start } = require('./server/server');

(async () => {
	try {
		await start(cinemaCatalog, repository);
	} catch (error) {
		console.error(error);
	}
})();

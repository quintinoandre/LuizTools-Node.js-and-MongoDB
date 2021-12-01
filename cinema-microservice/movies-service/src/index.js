const movies = require('./api/movies');
const repository = require('./repository/repository');
const { start } = require('./server/server');

(async () => {
	try {
		await start(movies, repository);
	} catch (error) {
		console.error(error);
	}
})();

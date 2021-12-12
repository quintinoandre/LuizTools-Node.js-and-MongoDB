const {
	validateMovie,
	validateToken,
	validateAdmin,
} = require('../middlewares/validationMiddleware');
const logger = require('../config/logger');

module.exports = (
	app,
	{ getMoviesPremieres, getMovieById, getAllMovies, addMovie, deleteMovie }
) => {
	app.get('/movies/premieres', validateToken, async (rep, res, next) => {
		const movies = await getMoviesPremieres();

		res.json(movies);
	});

	app.get('/movies/:id', validateToken, async ({ params }, res, next) => {
		const { id } = params;

		const movie = await getMovieById(id);

		if (!movie) return res.sendStatus(404); //! Not Found

		res.json(movie);
	});

	app.get('/movies', validateToken, async (req, res, next) => {
		const movies = await getAllMovies();

		res.json(movies);
	});

	app.post(
		'/movies',
		validateToken,
		validateAdmin,
		validateMovie,
		async ({ body }, res, next) => {
			let { titulo, sinopse, duracao, dataLancamento, imagem, categorias } =
				body;

			const { locals } = res;

			const { userId } = locals;

			duracao = parseInt(duracao);

			dataLancamento = new Date(dataLancamento);

			const result = await addMovie({
				titulo,
				sinopse,
				duracao,
				dataLancamento,
				imagem,
				categorias,
			});

			logger.info(
				`User ${userId} added the movie ${result._id} at ${new Date()}`
			);

			res.status(201).json(result); //* Created
		}
	);

	app.delete(
		'/movies/:id',
		validateToken,
		validateAdmin,
		async ({ params }, res, next) => {
			const { id } = params;

			const { locals } = res;

			const { userId } = locals;

			const result = await deleteMovie(id);

			logger.info(`User ${userId} deleted the movie ${id} at ${new Date()}`);

			res.sendStatus(204); //* No Content
		}
	);
};

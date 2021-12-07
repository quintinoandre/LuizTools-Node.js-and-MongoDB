const {
	validateMovies,
	validateToken,
} = require('../middlewares/validationMiddleware');

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
		validateMovies,
		async ({ body }, res, next) => {
			let { titulo, sinopse, duracao, dataLancamento, imagem, categorias } =
				body;

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

			res.status(201).json(result); //* Created
		}
	);

	app.delete('/movies/:id', validateToken, async ({ params }, res, next) => {
		const { id } = params;

		const result = await deleteMovie(id);

		res.sendStatus(204); //* No Content
	});
};

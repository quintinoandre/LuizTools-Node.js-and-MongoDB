module.exports = (app, { getMoviesPremieres, getMovieById, getAllMovies }) => {
	app.get('/movies/premieres', async (rep, res, next) => {
		const movies = await getMoviesPremieres();

		if (!movies || !movies.length) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});

	app.get('/movies/:id', async ({ params }, res, next) => {
		const { id } = params;

		const movie = await getMovieById(id);

		if (!movie) return res.sendStatus(404); //! Not Found

		res.json(movie);
	});

	app.get('/movies', async (req, res, next) => {
		const movies = await getAllMovies();

		if (!movies || !movies.length) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});
};

module.exports = (app, { getMoviePremieres, getMovieById, getAllMovies }) => {
	app.get('/movies/premieres', async (rep, res, next) => {
		const movies = await getMoviePremieres();

		if (!movies || !movies.length) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});

	app.get('/movies/:id', ({ params }, res, next) => {
		const { id } = params;

		const movie = await getMovieById(id);

		if (!movie) return res.sendStatus(404); //! Not Found

		res.json(movie);
	});

	app.get('/movies', (req, res, next) => {
		const movies = await getAllMovies();

		if (!movies || !movies.length) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});
};

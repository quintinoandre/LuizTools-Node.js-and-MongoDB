module.exports = (
	app,
	{
		getAllCities,
		getMoviesByCityId,
		getMovieSessionsByCityId,
		getCinemaByCityId,
		getMoviesByCinemaId,
		getMovieSessionsByCinemaId,
	}
) => {
	app.get('/cities/:cityId/movies/:movieId', async ({ params }, res, next) => {
		const { movieId, cityId } = params;

		const sessions = await getMovieSessionsByCityId(movieId, cityId);

		if (!sessions) return res.sendStatus(404); //! Not Found

		res.json(sessions);
	});

	app.get('/cities/:cityId/movies', async ({ params }, res, next) => {
		const { cityId } = params;

		const movies = await getMoviesByCityId(cityId);

		if (!movies) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});

	app.get('/cities/:cityId/cinemas', async ({ params }, res, next) => {
		const { cityId } = params;

		const cinemas = await getCinemaByCityId(cityId);

		if (!cinemas) return res.sendStatus(404); //! Not Found

		res.json(cinemas);
	});

	app.get('/cities', async (rep, res, next) => {
		const cities = await getAllCities();

		res.json(cities);
	});

	app.get(
		'/cinemas/:cinemaId/movies/:movieId',
		async ({ params }, res, next) => {
			const { movieId, cinemaId } = params;

			const sessions = await getMovieSessionsByCinemaId(movieId, cinemaId);

			if (!sessions) return res.sendStatus(404); //! Not Found

			res.json(sessions);
		}
	);

	app.get('/cinemas/:cinemaId/movies', async ({ params }, res, next) => {
		const { cinemaId } = params;

		const movies = await getMoviesByCinemaId(cinemaId);

		if (!movies) return res.sendStatus(404); //! Not Found

		res.json(movies);
	});
};

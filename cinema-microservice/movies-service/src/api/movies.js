module.exports = (
	app,
	{ getMoviesPremieres, getMovieById, getAllMovies, addMovie }
) => {
	app.get('/movies/premieres', async (rep, res, next) => {
		const movies = await getMoviesPremieres();

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

		res.json(movies);
	});

	app.post('/movies', async ({ body }, res, next) => {
		let { titulo, sinopse, duracao, dataLancamento, imagem, categorias } = body;

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
	});
};

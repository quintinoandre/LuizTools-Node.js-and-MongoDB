const { ObjectId } = require('mongodb');

const cinemaCatalog = [
	{
		cidade: 'Gravataí',
		uf: 'RS',
		cinemas: [],
	},
	{
		cidade: 'Porto Alegre',
		uf: 'RS',
		pais: 'BR',
		cinemas: [
			{
				_id: new ObjectId('61a5286bf8943f587e1e01df'),
				nome: 'Cinemark Bourbon Ipiranga',
				salas: [
					{
						nome: 1,
						sessoes: [
							{
								data: new Date('2021-12-03T09:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01df'),
								filme: 'Vingadores: Guerra Infinita',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2021-12-03T11:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01df'),
								filme: 'Vingadores: Guerra Infinita',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2021-12-03T13:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01e0'),
								filme: 'Vingadores: Era de Ultron',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
					{
						nome: 2,
						sessoes: [
							{
								data: new Date('2021-12-03T09:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01e0'),
								filme: 'Vingadores: Era de Ultron',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2021-12-03T11:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01de'),
								filme: 'Vingadores: Ultimato',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2021-12-03T13:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01de'),
								filme: 'Vingadores: Ultimato',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
				],
			},
			{
				_id: new ObjectId(),
				nome: 'GNC Lindóia',
				salas: [
					{
						nome: 100,
						sessoes: [
							{
								data: new Date('2021-12-03T19:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01de'),
								filme: 'Vingadores: Ultimato',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
								],
							},
							{
								data: new Date('2021-12-03T11:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01de'),
								filme: 'Vingadores: Ultimato',
								valor: 25.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
							{
								data: new Date('2021-12-03T13:00:00Z'),
								idFilme: new ObjectId('61a5286bf8943f587e1e01e0'),
								filme: 'Vingadores: Era de Ultron',
								valor: 20.0,
								assentos: [
									{
										numero: 1,
										disponivel: true,
									},
									{
										numero: 2,
										disponivel: false,
									},
									{
										numero: 2,
										disponivel: true,
									},
								],
							},
						],
					},
				],
			},
		],
	},
];

function getAllCities() {
	return cinemaCatalog.map(({ pais, uf, cidade }) => {
		return {
			_id: new ObjectId('61a5286bf8943f587e1e01e0'),
			pais,
			uf,
			cidade,
		};
	});
}

function getCinemaByCityId(cityId) {
	if (cityId < 0) return null;

	return cinemaCatalog[cinemaCatalog.length - 1].cinemas;
}

function getMoviesByCinemaId(cinemaId) {
	if (cinemaId < 0) return null;

	return getCinemaByCityId().map((cinema) => {
		return {
			titulo: cinema.salas[0].sessoes[0].filme,
			_id: cinema.salas[0].sessoes[0].idFilme,
		};
	});
}

function getMoviesByCityId(cityId) {
	return getMoviesByCinemaId(cityId);
}

function getMovieSessionsByCityId(movieId, cityId) {
	if (movieId < 0 || cityId < 0) return null;

	return getCinemaByCityId().map((cinema) => {
		return {
			titulo: cinema.salas[0].sessoes[0].filme,
			_id: cinema.salas[0].sessoes[0].idFilme,
			cinema: cinema.nome,
			idCinema: cinema._id,
			sala: cinema.salas[0].nome,
			sessao: cinema.salas[0].sessoes[0],
		};
	});
}

function getMovieSessionsByCinemaId(movieId, cinemaId) {
	return getMovieSessionsByCityId(movieId, cinemaId);
}

module.exports = {
	getAllCities,
	getCinemaByCityId,
	getMoviesByCinemaId,
	getMoviesByCityId,
	getMovieSessionsByCityId,
	getMovieSessionsByCinemaId,
};

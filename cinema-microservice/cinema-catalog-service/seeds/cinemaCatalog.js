[
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
				_id: ObjectId(),
				nome: 'Cinemark Bourbon Ipiranga',
				salas: [
					{
						nome: 1,
						sessoes: [
							{
								data: ISODate('2021-12-03T09:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01df'),
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
								data: ISODate('2021-12-03T11:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01df'),
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
								data: ISODate('2021-12-03T13:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01e0'),
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
								data: ISODate('2021-12-03T09:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01e0'),
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
								data: ISODate('2021-12-03T11:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01de'),
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
								data: ISODate('2021-12-03T13:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01de'),
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
				_id: ObjectId(),
				nome: 'GNC Lindóia',
				salas: [
					{
						nome: 100,
						sessoes: [
							{
								data: ISODate('2021-12-03T19:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01de'),
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
								data: ISODate('2021-12-03T11:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01de'),
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
								data: ISODate('2021-12-03T13:00:00Z'),
								idFilme: ObjectId('61a5286bf8943f587e1e01e0'),
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

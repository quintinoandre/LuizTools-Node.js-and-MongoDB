const express = require('express');
const router = express.Router();
const { findAllUsers, countAll, TAMANHO_PAGINA } = require('../db');

/* GET home page. */
router.get(
	'/:pagina?',
	global.authenticationMiddleware(),
	function ({ user, params }, res, next) {
		const { username, profile } = user;

		const pagina = parseInt(params.pagina || '1');

		countAll((err, qtd) => {
			if (err) return console.log(err);

			const qtdPaginas = Math.ceil(qtd / TAMANHO_PAGINA);

			findAllUsers(pagina, (err, docs) => {
				if (err) return console.log(err);

				res.render('index', {
					title: username,
					docs,
					qtd,
					qtdPaginas,
					pagina,
					profile,
				});
			});
		});
	}
);

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function ({ query }, res, next) {
	const { fail } = query;

	if (fail) res.render('signup', { message: 'Falha no cadastro do usuário' });
	else res.render('signup', { message: null });
});

/* POST users */
router.post('/signup', function ({ body }, res, next) {
	const { creatUser } = require('../db');

	const { username, password, email } = body;

	creatUser(username, password, email, (err, result) => {
		if (err) return res.redirect('users/signup?fail=true');
		else {
			let text = 'Obrigado por se cadastrar (fulano), sua senha é {senha}';

			text = text.replace('(fulano)', username).replace('{senha}', password);

			require('../mail')(email, 'Cadastro realizado com sucesso!', text);

			res.redirect('/');
		}
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function ({ query }, res, next) {
	const { fail } = query;

	if (fail)
		res.render('signup', {
			title: 'Cadastro de Usuários',
			message: 'Falha no cadastro do usuário',
		});
	else res.render('signup', { title: 'Cadastro de Usuários', message: null });
});

/* POST users */
router.post('/signup', function ({ body }, res, next) {
	const { creatUser } = require('../db');

	const { username, password, email, profile } = body;

	creatUser(username, password, email, profile, (err, result) => {
		if (err) return res.redirect('users/signup?fail=true');
		else {
			const text = `Obrigado por se cadastrar ${username}, sua senha é ${password}`;

			require('../mail')(email, 'Cadastro realizado com sucesso!', text);

			res.redirect('/');
		}
	});
});

/* POST users */
router.post('/forgot', function ({ body }, res, next) {
	const { resetPassword } = require('../db');

	const { email } = body;

	resetPassword(email, (err, result, newPassword) => {
		if (result.matchedCount === 0) return res.redirect('/login?reset=true');
		else {
			const text = `Olá, sua nova senha é ${newPassword}. Sua senha antiga, não funciona mais!`;

			require('../mail')(email, 'Sua senha foi alterada!', text);

			res.redirect('/login?reset=true');
		}
	});
});

/* GET forgot */
router.get('/forgot', function (req, res, next) {
	res.render('forgot', { title: 'Esqueci minha Senha' });
});

module.exports = router;

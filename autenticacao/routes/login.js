const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', { title: 'Login', message: null });
});

router.get('/login', function ({ query }, res) {
	const { fail, reset } = query;

	if (fail)
		res.render('login', {
			title: 'Login',
			message: 'Usuário e/ou senha incorretos!',
			error: true,
		});
	else if (reset)
		res.render('login', {
			title: 'Login',
			message: 'A sua nova senha chegará no seu email em instantes!',
			error: false,
		});
	else res.render('login', { title: 'Login', message: null });
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/index',
		failureRedirect: '/login?fail=true',
	})
);

router.post('/logoff', function (req, res, next) {
	req.logOut();

	res.redirect('/login');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', { title: 'Login', message: null });
});

router.get('/login', function ({ query }, res) {
	const { fail } = query;

	if (fail) res.render('login', { message: 'Usuário e/ou senha incorretos!' });
	else res.render('login', { message: null });
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/index',
		failureRedirect: '/login?fail=true',
	})
);

module.exports = router;

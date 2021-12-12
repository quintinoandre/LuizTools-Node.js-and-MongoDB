const express = require('express');
const router = express.Router();

/* GET home page. */
router.get(
	'/',
	global.authenticationMiddleware(),
	function ({ user }, res, next) {
		res.render('index', { title: user.username });
	}
);

module.exports = router;

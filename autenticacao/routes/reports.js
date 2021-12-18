const express = require('express');
const router = express.Router();

/* GET reports */
router.get('/', global.authenticationMiddleware(), function (req, res, next) {
	res.render('reports', {});
});

module.exports = router;

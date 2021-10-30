var express = require('express');
var router = express.Router();

/* GET cadastro. */
router.get('/', function (req, res, next) {
	res.render('cadastro', {});
});

/* POST cadastro. */
router.post('/', function (req, res, next) {
	global.carros.push({
		marca: req.body.marca,
		modelo: req.body.modelo,
		ano: req.body.ano,
	});
	res.redirect('/');
});

module.exports = router;

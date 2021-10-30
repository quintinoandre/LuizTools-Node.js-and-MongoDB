var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('teste', { title: 'Node is Super Cool', numero: 10 });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { findCustomers } = require('../db');

/* GET home page. */
/* router.get('/', (req, res, next) => {
	const customers = findCustomers((error, docs) => {
		if (error) return console.log(error);

		console.log(docs);

		res.render('index', { title: 'Express' });
	});
}); */

/* GET home page. */
router.get('/', (req, res, next) => {
	findCustomers()
		.then((customers) => {
			console.log(customers);
			res.render('index', { title: 'Express' });
		})
		.catch((error) => console.log(error));
});

module.exports = router;

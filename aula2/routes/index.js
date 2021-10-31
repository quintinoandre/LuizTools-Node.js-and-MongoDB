const express = require('express');
const router = express.Router();
const { findCustomers, insertCustomer } = require('../db');

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
			res.render('index', { title: 'Express', customers });
		})
		.catch((error) => console.log(error));
});

router.get('/new', (request, response) => {
	response.render('customer', { title: 'Customer Registration' });
});

router.post('/new', ({ body }, response) => {
	if (!body.name)
		return response.redirect('/new?error=The name field is required');

	if (body.age && /[0-9]+/.test(body.age))
		return response.redirect('/new?error=The age field is numeric');

	const { name, city } = body;

	const age = parseInt(body.age);

	const state = body.state.length > 2 ? '' : body.state;

	insertCustomer({ name, age, city, state })
		.then((result) => response.redirect('/'))
		.catch((error) => console.log(error));
});

module.exports = router;

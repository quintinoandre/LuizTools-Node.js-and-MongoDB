const express = require('express');
const router = express.Router();
const {
	findCustomers,
	insertCustomer,
	findCustomer,
	updateCustomer,
	deleteCustomer,
} = require('../db');

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
		.catch((error) => {
			console.log(error);

			res.render('error', { message: 'Unable to list customers!', error });
		});
});

router.get('/new', (request, response) => {
	response.render('customer', { title: 'Customer Registration', customer: {} });
});

router.get('/edit/:customerId', ({ params }, response) => {
	const { customerId: id } = params;

	findCustomer(id)
		.then((customer) =>
			response.render('customer', { title: 'Registration Edition', customer })
		)
		.catch((error) => {
			console.log(error);

			res.render('error', {
				message: 'Unable to return customer data!',
				error,
			});
		});
});

router.get('/delete/:customerId', ({ params }, response) => {
	const { customerId: id } = params;

	deleteCustomer(id)
		.then((result) => response.redirect('/'))
		.catch((error) => {
			console.log(error);

			res.render('error', {
				message: 'Unable to delete customer!',
				error,
			});
		});
});

router.post('/new', ({ body }, response) => {
	if (!body.name)
		return response.redirect('/new?error=The name field is required!');

	if (body.age && !/[0-9]+/.test(body.age))
		return response.redirect('/new?error=The age field is numeric!');

	const { id, name, city } = body;

	const age = parseInt(body.age);

	const state = body.state.length > 2 ? '' : body.state;

	const customer = { name, age, city, state };

	const promise = id ? updateCustomer(id, customer) : insertCustomer(customer);

	promise
		.then((result) => response.redirect('/'))
		.catch((error) => {
			console.log(error);

			res.render('error', {
				message: 'Unable to save customer!',
				error,
			});
		});
});

module.exports = router;

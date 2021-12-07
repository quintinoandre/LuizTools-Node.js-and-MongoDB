const jwt = require('jsonwebtoken');

const { SECRET, EXPIRES } = process.env;

async function doLogin({ body }, res, next) {
	const { email, password } = body;

	if (email === 'contato@luiztools.com.br' && password === '123456') {
		const token = jwt.sign({ userId: 1 }, SECRET, {
			expiresIn: parseInt(EXPIRES),
		});

		res.json({ token });
	} else res.sendStatus(401); //! Unauthorized
}

async function validateToken({ headers }, res, next) {
	let token = headers['authorization'];

	if (!token) return res.sendStatus(401); //! Unauthorized

	token = token.replace('Bearer ', '');

	try {
		const { userId } = jwt.verify(token, SECRET);

		res.locals.userId = userId;

		next();
	} catch (err) {
		console.log(err);

		res.sendStatus(401); //! Unauthorized
	}
}

async function doLogout(req, res, next) {
	res.send('Logout!');
}

module.exports = { doLogin, doLogout, validateToken };

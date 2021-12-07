const jwt = require('jsonwebtoken');

const { SECRET, EXPIRES } = process.env;

async function doLogin({ body }, res, next) {
	const { email, password } = body;

	if (email === 'contato@luiztools.com.br' && password === '123456') {
		const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: EXPIRES });

		res.json({ token });
	} else res.sendStatus(401); //! Unauthorized
}

async function doLogout(req, res, next) {}

module.exports = { doLogin, doLogout };

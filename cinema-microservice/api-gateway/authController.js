const jwt = require('jsonwebtoken');

const { SECRET, EXPIRES } = process.env;

async function doLogin({ body }, res, next) {
	const { email, password } = body;

	if (email === 'contato@luiztools.com.br' && password === '123456') {
		//ADMIN
		const token = jwt.sign({ userId: 1, profileId: 1 }, SECRET, {
			expiresIn: parseInt(EXPIRES),
		});

		res.json({ token });
	} else if (email === 'luizfduartejr@gmail.com' && password === '123456') {
		//GUEST
		const token = jwt.sign({ userId: 2, profileId: 2 }, SECRET, {
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
		const { userId, profileId } = jwt.verify(token, SECRET);

		res.locals.userId = userId;

		res.locals.profileId = profileId;

		next();
	} catch (err) {
		console.log(err);

		res.sendStatus(401); //! Unauthorized
	}
}

async function doLogout(req, res, next) {
	const { locals } = res;

	const { userId } = locals;

	res.send(`Logout userId ${userId}`);
}

module.exports = { doLogin, doLogout, validateToken };

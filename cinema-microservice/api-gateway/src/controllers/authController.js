const jwt = require('jsonwebtoken');
const { getUser } = require('../repository/repository');

const { SECRET, EXPIRES } = process.env;

async function doLogin({ body }, res, next) {
	const { email, password } = body;

	try {
		const user = await getUser(email, password);

		const { _id: userId, profileId } = user;

		const token = jwt.sign({ userId, profileId }, SECRET, {
			expiresIn: parseInt(EXPIRES),
		});

		res.json({ token });
	} catch (err) {
		res.sendStatus(401); //! Unauthorized
	}
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

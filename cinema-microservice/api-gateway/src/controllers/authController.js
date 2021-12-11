const {
	getUser,
	checkBlacklist,
	blacklistToken,
} = require('../repository/repository');
const jwt = require('jsonwebtoken');

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

async function validateBlacklist({ headers }, res, next) {
	let token = headers['authorization'];

	if (!token) return next();

	token = token.replace('Bearer ', '');

	const isBlacklisted = await checkBlacklist(token);

	if (isBlacklisted) return res.sendStatus(401); //! Unauthorized

	next();
}

async function validateLoginSchema({ body }, res, next) {
	const schema = require('../schemas/login');

	const { error } = schema.validate(body);

	if (error) {
		const { details } = error;

		return res.status(422).json(details.map((d) => d.message)); //! Unprocessable Entity
	}

	next();
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

async function doLogout({ headers }, res, next) {
	let token = headers['authorization'];

	token = token.replace('Bearer ', '');

	await blacklistToken(token);

	res.sendStatus(200); //* OK
}

module.exports = {
	doLogin,
	doLogout,
	validateToken,
	validateBlacklist,
	validateLoginSchema,
};

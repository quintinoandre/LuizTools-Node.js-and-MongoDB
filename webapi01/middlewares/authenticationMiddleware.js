module.exports = ({ headers }, res, next) => {
	if (headers['authorization'] === '123') return next();
	else res.sendStatus(401); //! Unauthorized
};

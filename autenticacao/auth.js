const { compare } = require('bcryptjs');
const { Strategy } = require('passport-local');

module.exports = function (passport) {
	function findUser(username, callback) {
		global.db.collection('users').findOne({ username }, function (err, doc) {
			callback(err, doc);
		});
	}

	function findUserById(id, callback) {
		const { ObjectId } = require('mongodb');

		const _id = ObjectId(id);

		global.db.collection('users').findOne({ _id }, function (err, doc) {
			callback(err, doc);
		});
	}

	passport.serializeUser(function ({ _id }, done) {
		done(null, _id);
	});

	passport.deserializeUser(function (id, done) {
		findUserById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(
		new Strategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			(username, password, done) => {
				findUser(username, (err, user) => {
					if (err) return done(err);

					//usuário inexistente
					if (!user) return done(null, false);

					//comparando as senhas
					compare(password, user.password, (err, isValid) => {
						if (err) return done(err);

						if (!isValid) return done(null, false);

						return done(null, user);
					});
				});
			}
		)
	);
};

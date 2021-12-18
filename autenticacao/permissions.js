const ADMIN_PROFILE = '2';

function isAdmin(profile) {
	return profile === ADMIN_PROFILE;
}

module.exports = ({ user, originalUrl, method }) => {
	if (!user) return false;

	const { profile } = user;

	switch (originalUrl) {
		case '/':
			return true;
		case '/index':
			return true;
		case '/login':
			return true;
		case '/signup':
			return true;
		case '/reports':
			return isAdmin(profile);
		default:
			return false;
	}
};

const ADMIN_PROFILE = '2';

function isAdmin(profile) {
	return profile === ADMIN_PROFILE;
}

module.exports = ({ user, originalUrl, method }) => {
	if (!user) return false;

	const { profile } = user;

	const ORIGINAL_URL_REGEX = /\/(index\/?\d*|login|signup)/g;

	if (ORIGINAL_URL_REGEX.test(originalUrl)) return true;
	else if (originalUrl === '/reports') return isAdmin(profile);
	else return false;
};

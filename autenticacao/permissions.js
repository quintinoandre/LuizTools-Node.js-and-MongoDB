const ADMIN_PROFILE = '2';

function isAdmin(profile) {
  return profile === ADMIN_PROFILE;
}

module.exports = (request) => {
  const { user, originalUrl } = request;

  if (!user) return false;

  const { profile } = user;

  const ORIGINAL_URL_REGEX = /\/(index\/?\d*|login|signup)/g;

  if (ORIGINAL_URL_REGEX.test(originalUrl)) return true;

  if (originalUrl === '/reports') return isAdmin(profile);

  return false;
};

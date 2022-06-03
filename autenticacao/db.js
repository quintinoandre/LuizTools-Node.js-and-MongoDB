const { hashSync } = require('bcryptjs');

function creatUser(username, password, email, profile, callback) {
  const cryptoPassword = hashSync(password, 10);

  global.db
    .collection('users')
    .insertOne(
      { username, password: cryptoPassword, email, profile },
      callback
    );
}

function resetPassword(email, callback) {
  const { generatePassword } = require('./utils');

  const newPassword = generatePassword();

  const cryptoPassword = hashSync(newPassword, 10);

  global.db
    .collection('users')
    .updateOne(
      { email },
      { $set: { password: cryptoPassword } },
      (error, result) => {
        callback(error, result, newPassword);
      }
    );
}

function countAll(callback) {
  global.db.collection('users').countDocuments(callback);
}

const PAGE_SIZE = 5;

function findAllUsers(page, callback) {
  const totalSkip = (page - 1) * PAGE_SIZE;

  global.db
    .collection('users')
    .find()
    .skip(totalSkip)
    .limit(PAGE_SIZE)
    .toArray(callback);
}

module.exports = {
  PAGE_SIZE,
  creatUser,
  resetPassword,
  resetPassword,
  findAllUsers,
  countAll,
};

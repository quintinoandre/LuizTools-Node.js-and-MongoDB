const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', (request, response, next) => {
  return response.render('login', { title: 'Login', message: null });
});

router.get('/login', (request, response) => {
  const {
    query: { fail, reset },
  } = request;

  if (fail)
    return response.render('login', {
      title: 'Login',
      message: 'Usuário e/ou password incorretos',
      error: true,
    });

  if (reset)
    return response.render('login', {
      title: 'Login',
      message: 'A sua nova password chegará no seu email em instantes',
      error: false,
    });

  return response.render('login', { title: 'Login', message: null });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login?fail=true',
  })
);

router.post('/logout', (request, response, next) => {
  request.logOut();

  return response.redirect('/login');
});

module.exports = router;

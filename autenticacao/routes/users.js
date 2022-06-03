var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', (request, response, next) => {
  const {
    query: { fail },
  } = request;

  if (fail)
    return response.render('signup', {
      title: 'Registo de Usuários',
      message: 'Falha no registo do usuário',
    });

  return response.render('signup', {
    title: 'Registo de Usuários',
    message: null,
  });
});

/* POST users */
router.post('/signup', (request, response, next) => {
  const { creatUser } = require('../db');

  const {
    body: { username, password, email, profile },
  } = request;

  creatUser(username, password, email, profile, (error, result) => {
    if (error) return response.redirect('users/signup?fail=true');

    const text = `Obrigado por se registar ${username}, sua password é ${password}`;

    require('../mail')(email, 'Registo realizado com sucesso', text);

    return response.redirect('/');
  });
});

/* POST users */
router.post('/forgot', (request, response, next) => {
  const { resetPassword } = require('../db');

  const {
    body: { email },
  } = request;

  resetPassword(email, (error, result, newPassword) => {
    if (result.matchedCount === 0)
      return response.redirect('/login?reset=true');

    const text = `Olá, sua nova password é ${newPassword}. Sua password antiga, não funciona mais`;

    require('../mail')(email, 'Sua password foi alterada', text);

    return response.redirect('/login?reset=true');
  });
});

/* GET forgot */
router.get('/forgot', (request, response, next) => {
  return response.render('forgot', { title: 'Esqueci minha password' });
});

module.exports = router;

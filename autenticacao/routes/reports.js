const express = require('express');
const router = express.Router();

/* GET reports */
router.get(
  '/',
  global.authenticationMiddleware(),
  (request, response, next) => {
    return response.render('reports', { title: 'Relatórios' });
  }
);

module.exports = router;

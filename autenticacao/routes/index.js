const express = require('express');
const router = express.Router();
const { findAllUsers, countAll, PAGE_SIZE } = require('../db');

/* GET home page. */
router.get(
  '/:page?',
  global.authenticationMiddleware(),
  (request, response, next) => {
    const {
      user: { username: title, profile },
      params,
    } = request;

    const page = Number(params.page || '1');

    countAll((error, qty) => {
      if (error) return console.error(error);

      const pagesQty = Math.ceil(qty / PAGE_SIZE);

      findAllUsers(page, (error, docs) => {
        if (error) return console.error(error);

        return response.render('index', {
          title,
          docs,
          qty,
          pagesQty,
          page,
          profile,
        });
      });
    });
  }
);

module.exports = router;

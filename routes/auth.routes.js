const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.model');

// GET route ==> to display the sign form to users.
router.get('/signup', (req, res) => {
  res.render('auth/sign-up');
});

// POST route ==> to process the form data.
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((passwordHash) => User.create({ username, passwordHash }))
    .then((user) => {
      req.session.user = user;
      res.redirect('/');
    })
    .catch((error) => next(error));
});

router.get('/signin', (req, res) => {
    res.render('auth/sign-in');
});

router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
    .then((user) => {
        if (!user) {
            return res
            .status(400)
            .render('auth/login' );
        }
        req.session.user = user;
        return res.redirect('/');
    }).catch((err) => {
        next(err);
    });
})


module.exports = router;
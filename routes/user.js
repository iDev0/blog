const express = require('express');
const router = express.Router();
const passport = require('passport')
const {
  create,
  login,
  current
} = require('../controllers/user')


const checkAuth = passport.authenticate('jwt', { session : false})

// @route post /user/signup
// @desc register user
// @access Public
router.post('/signup', create)

// @route post /user/login
// @desc login user / return jwt
// @access Public
router.post('/login', login)

// @route get /user/current
// @desc read user info
// @access Private
router.get('/current', checkAuth, current)

module.exports = router

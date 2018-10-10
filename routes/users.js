var express = require('express');
var router = express.Router();
var authMiddleware = require('../utils/authMiddleware');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createuserorlogin', authMiddleware.checkSignUp, authMiddleware.checkSignIn);

router.get('/current-user', passport.authenticate('jwt', {session: false}), authMiddleware.successUser);
module.exports = router;

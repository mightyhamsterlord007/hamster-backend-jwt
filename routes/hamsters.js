var express = require('express');
var router = express.Router();

var hamsterController = require('../controllers/hamsterController');

var passport = require('passport');

/* GET users listing. */
// router.get('/getallhamsters', function(req, res, next) {

//   hamsterController
//     .find({})
//     .then(hamsters => {
//       res.json({
//         confirmation: 'success',
//         payload: hamsters
//       });
//     })
//     .catch(err => {
//       res.json({
//         confirmation: 'failure',
//         payload: err
//       });
//     })

// });

router.get('/getallhamsters', hamsterController.findHamsters);

router.post('/createhamster', function(req, res, next) {

  hamsterController
    .create(req.body)
    .then(hamster => {
      res.json({
        confirmation: 'success',
        payload: hamster
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        payload: err
      })
    })

});

router.put('/upvote', function(req, res, next) {

  hamsterController
    .updateVoteCount(req.body.id)
    .then(hamster => {
      res.json({
        confirmation: 'success',
        hamster 
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err 
      })
    })

});

router.get('/current-hamster', passport.authenticate('jwt', {session: false}), function(req, res) {
  console.log(req.user)
  res.json({
    id: req.user.id,
    title: req.user.title
  })
});

module.exports = router;

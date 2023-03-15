
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    visits: req.session.visits,
    name: req.session.name,
  });
});
module.exports = router;

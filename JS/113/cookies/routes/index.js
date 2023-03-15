var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    visits: req.visits,
    name: req.name,
  });
});
module.exports = router;

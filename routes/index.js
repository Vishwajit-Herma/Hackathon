var express = require('express');
var router = express.Router();
const userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

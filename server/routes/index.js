var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  // req.session.captcha = captcha.text;

  res.type('svg');
  console.log(captcha.text);
  res.status(200).send(captcha.data);
});

module.exports = router;

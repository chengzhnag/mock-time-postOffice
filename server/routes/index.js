var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var Record = require('../models/record.js');
const { sendEmail } = require('../utils/sendEmail');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text.toLocaleLowerCase();
  res.type('svg');
  res.status(200).send(captcha.data);
});

router.get('/getcaptcha', function (req, res) {
  res.status(200).send(req.session.captcha);
});

router.post('/extract', (req, res, next) => {
  let body = req.body;
  if (body.extract && body.receiptEmail) {
    Record.findOne({
      'extractCode': body.extract
    }, (err, data) => {
      if (err) {
        return res.send({
          success: false,
          statusCode: 0,
          message: `根据${body.extract}查询失败`
        })
      }
      body.subject = `时光邮局的提取码`;
      body.content = `
        未来的某一天 ( ${data.sendTime} ),
        你将可以在我们的时光邮局手动提取
        曾经的你, 或者是他, 或者是她,
        寄出的那封时光邮件
        提取码: ${data.extractCode}
        提取地址: http://hi2future.com/Mail/key
        
        欢迎访问http://hi2future.com, 写给未来的Someone
      `;
      sendEmail(body, suc => {
        return res.send({
          success: true,
          statusCode: 1,
          message: `发送提取码邮件成功`
        })
      }, error => {
        return res.send({
          success: false,
          statusCode: 0,
          message: `发送提取码邮件失败`,
          error: error
        })
      });
    });
  } else {
    return res.send({
      success: false,
      statusCode: 0,
      message: `缺少参数 ${body.extract ? '' : 'extract'} ${body.receiptEmail ? '' : 'receiptEmail'}`
    })
  }
})

module.exports = router;

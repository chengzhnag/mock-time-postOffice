var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var CronJob = require('cron').CronJob;
var Record = require('../models/record.js');

router.post('/', function (req, res, next) {
    let body = req.body;
    console.log(body);
    let date = new Date(body.date);
    try {
        new CronJob(date, function () {
            sendEmail(body, suc => {
                console.log('保存发送成功的记录到数据库');
            }, err => {
                console.log('保存发送失败的记录到数据库');
            });
        }, null, true, 'America/Los_Angeles');
    } catch (error) {
        return res.status(200).json({
            success: false,
            statusCode: 0,
            message: '创建定时发送任务失败'
        })
    }
    return res.status(200).json({
        success: true,
        statusCode: 1,
        message: '创建定时发送任务成功'
    })
});

function sendEmail(body, success, fail) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '1772591173@qq.com',
            pass: 'vnqddpydogiibdad' //授权码,通过QQ获取
        }
    });
    var mailOptions = {
        from: '1772591173@qq.com', // 发送者
        to: body.to, // 接受者,可以同时发送多个,以逗号隔开
        subject: body.title, // 标题
        //text: 'Hello world', // 文本
        html: body.content
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            fail && fail(err);
            return;
        }
        success && success(info);
    });
}

module.exports = router;

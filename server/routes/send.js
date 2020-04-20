var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var CronJob = require('cron').CronJob;
var Record = require('../models/record.js');

router.post('/', function (req, res, next) {
    let body = req.body;
    console.log(body);
    console.log(req.session);
    if (body.verificationCode == req.session.captcha) {
        delete body.verificationCode;
        // 把记录存进数据库
        new Record(body).save((error, datas) => {
            if (error) {
                return res.send({
                    success: false,
                    statusCode: 0,
                    message: '保存记录失败'
                })
            }
            try {
                // 创建定时任务
                let date = new Date(body.sendTime);
                new CronJob(date, function () {
                    // 发送
                    sendEmail(body, suc => {
                        // 发送成功后更新记录状态
                        console.log('suc: ', suc);
                        console.log('保存发送成功的记录到数据库');
                    }, err => {
                        console.log('保存发送失败的记录到数据库');
                    });
                }, null, true, 'America/Los_Angeles');

                return res.status(200).json({
                    success: true,
                    statusCode: 1,
                    message: '创建定时发送任务成功'
                })
            } catch (error) {
                return res.status(200).json({
                    success: false,
                    statusCode: 0,
                    message: '创建定时发送任务失败'
                })
            }
        })
    } else {
        return res.status(200).json({
            success: false,
            statusCode: 0,
            message: '验证码错误'
        })
    }
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
        to: body.receiptEmail, // 接受者,可以同时发送多个,以逗号隔开
        subject: `${body.name}通过时光邮局发送(https://www.hi2future.com/)`, // 标题
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

function updateRecord() {

}

module.exports = router;

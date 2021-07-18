var express = require('express');
var router = express.Router();
var CronJob = require('cron').CronJob;
var Record = require('../models/record.js');
const {
	sendEmail
} = require('../utils/sendEmail');
const {
	localDate
} = require('../utils/index');
const {
	v1: uuidv1
} = require('uuid');

router.post('/', (req, res, next) => {
	let body = req.body;
	// 把记录存进数据库
    body.extractCode = uuidv1();
    body.sendTime = localDate();
    new Record(body).save((error, datas) => {
        if (error) {
            return res.send({
                success: false,
                statusCode: 0,
                message: '保存记录失败',
                error: error
            })
        }
        try {
            // 创建定时任务
            var job = new CronJob('0 */2 * * * *', () => {
                // 发送
                body.subject = `${body.name}通过时光邮局发送( ${_config.domainName}/ )`;
                sendEmail(body, suc => {
                    // 发送成功后更新记录状态
                    updateRecord(datas);
                    console.log('保存发送成功的记录到数据库');
                }, err => {
                    console.log('保存发送失败的记录到数据库');
                });
            }, null, true, 'America/Los_Angeles');
            job.start();

            return res.status(200).json({
                success: true,
                statusCode: 1,
                message: '创建定时发送任务成功',
                data: datas
            })
        } catch (err) {
            return res.status(200).json({
                success: false,
                statusCode: 0,
                message: '创建定时发送任务失败',
                error: err
            })
        }
    })
});

module.exports = router;

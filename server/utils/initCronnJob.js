var CronJob = require('cron').CronJob;
var Record = require('../models/record.js');
const {
    sendEmail
} = require('./sendEmail');

(() => {
    Record.find({ status: 1 }, (err, data) => {
        if (err) return;
        data.forEach(item => {
            if (new Date(item['sendTime']) > new Date()) {
                createCron(item);
            }
        })
    })
})();



function createCron(body) {
    let date = new Date(body.sendTime);
    var job = new CronJob(date, () => {
        // 发送
        body.subject = `${body.name}通过时光邮局发送(${_config.domainName}/)`;
        sendEmail(body, suc => {
            // 发送成功后更新记录状态
            updateRecord(body);
            console.log('保存发送成功的记录到数据库');
        }, err => {
            console.log('保存发送失败的记录到数据库');
        });
    }, null, false, 'America/Los_Angeles');
    job.start();
}


function updateRecord(datas, success, fail) {
    Record.findByIdAndUpdate(datas._id, {
        status: 2
    }, (err, ret) => {
        if (err) {
            console.log('更新失败')
            fail && fail(err);
        } else {
            console.log('更新成功')
            success && success(ret);
        }
    })
}
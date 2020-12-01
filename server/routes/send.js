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
	if (body.verificationCode.toLocaleLowerCase() == req.session.captcha) {
		delete body.verificationCode;
		// 把记录存进数据库
		body.extractCode = uuidv1();
		// body.sendTime = localDate(body.sendTime);
		// body.createTime = localDate();
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
				console.log(body.sendTime);
				let date = new Date(body.sendTime);
				var job = new CronJob(date, () => {
					// 发送
					console.log('body.sendTime: ', body.sendTime);
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
	} else {
		if (req.session.captcha) {
			return res.status(200).json({
				success: false,
				statusCode: 0,
				message: '验证码错误'
			})
		} else {
			return res.status(200).json({
				success: false,
				statusCode: 0,
				message: '验证码过期, 请点击重新获取'
			})
		}
	}
});

router.get('/getcaptcha', function (req, res) {
	console.log(req.session);
	res.status(200).send(req.session.captcha);
});

/* function sendEmail(body, success, fail) {
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

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			fail && fail(err);
			return;
		}
		success && success(info);
	});
} */

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

module.exports = router;

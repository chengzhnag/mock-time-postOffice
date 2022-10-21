var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
const multer = require('multer')
var Record = require('../models/record.js');
const dtime = require('time-formater');
const {
	localDateStrap
} = require('../utils/index');
const {
	sendEmail
} = require('../utils/sendEmail');
const questionData = require('../utils/question.js');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '-' + uniqueSuffix + "." + fileFormat[fileFormat.length - 1])
	}
})

const upload = multer({ storage })

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

// 获取图形验证码图
router.get('/captcha', function (req, res) {
	var captcha = svgCaptcha.create();
	req.session.captcha = captcha.text.toLocaleLowerCase();
	res.type('svg');
	res.status(200).send(captcha.data);
});

// 获取图形验证码图相对的text文本
router.get('/getcaptcha', function (req, res) {
	res.status(200).send(req.session.captcha);
});

// 发送提取码
router.post('/extract', (req, res, next) => {
	let body = req.body;
	if (body.extract && body.receiptEmail) {
		Record.findOne({
			'extractCode': body.extract
		}, (err, data) => {
			if (data) {
				body.subject = `时光邮局的提取码`;
				body.content =
					`
					未来的某一天 ( ${dtime(data.sendTime).format('YYYY-MM-DD HH:mm:ss')} ), <br/>
					你将可以在我们的时光邮局手动提取<br/>
					曾经的你, 或者是他, 或者是她,<br/>
					寄出的那封时光邮件<br/>
					提取码: <span style="font-weight: bold;"> ${data.extractCode || body.extract} </span> <br/>
					提取地址: ${_config.domainName}/#/extract<br/>
					<br/>
					欢迎访问 ${_config.domainName}/ , 写给未来的Someone<br/>
				`;
				try {
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
				} catch (e) {
					console.log('e: ', e);
				}
			} else {
				return res.send({
					success: false,
					statusCode: 0,
					message: `根据${body.extract}查询失败`,
					error: err
				})
			}
		});
	} else {
		return res.send({
			success: false,
			statusCode: 0,
			message: `缺少参数 ${body.extract ? '' : 'extract'} ${body.receiptEmail ? '' : 'receiptEmail'}`
		})
	}
})

// 获取公开信列表
router.get('/getPublicLetter', function (req, res) {
	const {
		page = 1, pageSize = 10
	} = req.query;
	Record.count({
		isPublic: true
	}, (err, count) => {
		Record.find({
			isPublic: true
		})
			.skip((parseInt(page, 10) - 1) * parseInt(pageSize, 10))
			.limit(parseInt(pageSize, 10))
			.sort({
				'_id': -1
			})
			.exec((err, doc) => {
				try {
					if (!err && doc) {
						return res.send({
							success: true,
							statusCode: 1,
							totalCount: count,
							message: `获取列表数据成功`,
							data: copyAndDelete(doc, 'extractCode')
						})
					}
					return res.send({
						success: false,
						statusCode: 0,
						message: `获取列表数据失败`,
						error: err
					})
				} catch (e) {
					return res.send({
						success: false,
						statusCode: 0,
						message: `发生错误`,
						error: e
					})
				}
			})
	})
});

// 获取所有邮件列表不包括内容
router.get('/getAllLetter', function (req, res) {
	const {
		page = 1, pageSize = 10
	} = req.query;
	Record.count({}, (err, count) => {
		Record.find({})
			.skip((parseInt(page, 10) - 1) * parseInt(pageSize, 10))
			.limit(parseInt(pageSize, 10))
			.sort({
				'_id': -1
			})
			.exec((err, doc) => {
				try {
					if (!err && doc) {
						return res.send({
							success: true,
							statusCode: 1,
							totalCount: count,
							message: `获取列表数据成功`,
							data: copyAndDelete(doc, 'extractCode,content,isPublic,_id')
						})
					}
					return res.send({
						success: false,
						statusCode: 0,
						message: `获取列表数据失败`,
						error: err
					})
				} catch (e) {
					return res.send({
						success: false,
						statusCode: 0,
						message: `发生错误`,
						error: e
					})
				}
			})
	})
});

// 获取所有邮件列表包括内容
router.get('/getAllLetter_v2', function (req, res) {
	if (!req.session.loginTime) {
		return res.send({
			success: false,
			statusCode: 0,
			message: `未登录无法获取数据`,
		})
	}
	const {
		page = 1, pageSize = 10,
		receiptEmail,
		extractCode,
		status,
		name,
		isPublic,
	} = req.query;
	const params = {
		receiptEmail,
		extractCode,
		status,
		name,
		isPublic,
	};
	Object.keys(params).forEach(key => {
		if (!params[key]) {
			delete params[key];
		}
	});
	Record.count(params, (err, count) => {
		Record.find(params)
			.skip((parseInt(page, 10) - 1) * parseInt(pageSize, 10))
			.limit(parseInt(pageSize, 10))
			.sort({
				'_id': -1
			})
			.exec((err, doc) => {
				try {
					if (!err && doc) {
						return res.send({
							success: true,
							statusCode: 1,
							totalCount: count,
							message: `获取列表数据成功`,
							data: doc
						})
					}
					return res.send({
						success: false,
						statusCode: 0,
						message: `获取列表数据失败`,
						error: err
					})
				} catch (e) {
					return res.send({
						success: false,
						statusCode: 0,
						message: `发生错误`,
						error: e
					})
				}
			})
	})
});

// 管理员登录
router.post('/adminLogin', (req, res, next) => {
	const { account, password } = req.body;
	// 如果账号密码相同，登录成功，并且种session
	if (account === _config.adminAccount && password === _config.adminPassword) {
		req.session.loginTime = new Date().getTime();
		return res.send({
			success: true,
			statusCode: 1,
			message: `登录成功`,
			data: true
		})
	} else {
		return res.send({
			success: false,
			statusCode: 0,
			message: `账号密码出错，请重试`,
			data: false
		})
	}
})

// 通过提取码提取邮件
router.post('/byExtractGetEmail', (req, res, next) => {
	let body = req.body;
	console.log(body);
	if (body.extract) {
		Record.findOne({
			'extractCode': body.extract
		}, (err, data) => {
			if (data) {
				if (compareDate(data['sendTime'] || '')) {
					return res.send({
						success: true,
						statusCode: 1,
						message: `提取邮件成功`,
						data: data
					})
				}
				return res.send({
					success: false,
					statusCode: 0,
					isNotCome: true,
					message: `未到提取时间`,
					sendTime: data['sendTime']
				})
			}
			return res.send({
				success: false,
				statusCode: 0,
				message: `根据${body.extract}查询失败`,
				error: err
			})
		});
	} else {
		return res.send({
			success: false,
			statusCode: 0,
			message: `缺少参数 ${body.extract ? '' : 'extract'}`
		})
	}
})

// 获取所有问题
router.get('/getQuestion', function (req, res) {
	return res.send({
		success: true,
		statusCode: 1,
		message: `获取常见问题成功`,
		data: questionData
	})
});

// 获取配置文件中email
router.get('/getEmail', function (req, res) {
	return res.send({
		success: true,
		statusCode: 1,
		message: `获取成功`,
		data: _config.email
	})
});

// 图片上传
router.post('/profile', upload.single('photo'), function (req, res) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	return res.send({
		success: true,
		statusCode: 1,
		message: `图片上传成功`,
		data: req.file
	})
})

function copyAndDelete(data, field) {
	if (data && typeof data == 'object') {
		let _data = JSON.parse(JSON.stringify(data));
		_data.forEach(item => {
			field.split(',').forEach(sitem => {
				delete item[sitem];
			})
		})
		return _data;
	}
	return '';
}

function compareDate(date) {
	let result = false;
	if (date) {
		let strap = new Date(date).getTime();
		// let nowStrap = localDateStrap();
		let nowStrap = new Date().getTime();
		if (nowStrap >= strap) {
			result = true;
		}
	}
	return result;
}

module.exports = router;

var nodemailer = require('nodemailer');

const sendEmail = function (body, success, fail) {
	console.log('sendEmail: ', body);
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: _config.email,
            pass: _config.authCode //授权码,通过QQ获取
        }
    });
    var mailOptions = {
        from: _config.email, // 发送者
        to: body.receiptEmail, // 接受者,可以同时发送多个,以逗号隔开
        subject: body.subject, // 标题
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
}

module.exports = {
    sendEmail
};
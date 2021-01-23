var nodemailer = require('nodemailer');

const sendEmail = function (body, success, fail) {
    console.log('sendEmail: ', body);
    let random = getRandomNum_AB(0, _config.emails.length - 1);
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: _config.emails[random],
            pass: _config.authCodes[random] //授权码,通过QQ获取
        }
    });
    var mailOptions = {
        from: _config.emails[random], // 发送者
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

function getRandomNum_AB(min, max) {
    const num = Math.random() * (max - min + 1) + (min);
    const randomNum = Math.floor(num);
    return randomNum;
}

module.exports = {
    sendEmail
};
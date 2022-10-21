'use strict';

module.exports = {
	port: 3000,  // 端口号
	mongodbUrl: 'mongodb://localhost/zs',  // 数据库地址
	domainName: 'http://email.zsjustn.top', // 域名, 配置全局
	/* 
		邮箱地址, 采用的是qq邮箱, 如果需要配置自己的邮箱,
		需要登录qq邮箱进入设置, 开启POP3/SMTP服务. 具体可百度
	 */
	email: '1772591173@qq.com', //邮箱地址 
	authCode: 'eyebtxkwfciyjgfd',  // 授权码, qq邮箱配置获取
	sendPeopleName: '我就是嚣张啊 👻', // 发件人名称
	adminAccount: 'zs', // 管理员账号
	adminPassword: '123456', // 管理员密码
}

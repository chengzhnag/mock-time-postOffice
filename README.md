# mock-time-postOffice

> 本项目模拟[时光邮局](https://www.hi2future.com/) , 采用前后端分离模式, 适合新手入手Node.js的一个练手项目. ☞☞☞本人自己的[时光邮局](http://email.zsjustn.top/), 欢迎访问

> 技术栈
- Vue 前端
- Element-ui UI框架
- Node 后端
- Express 后端框架
- Mongodb 数据库

> 目录结构

```
public  // vue-cli3生成
server  // 服务端代码
src     // vue前端页面
```


---
## linux部署
1. 克隆代码到本地

```
git clone https://github.com/chengzhnag/mock-time-postOffice.git
```

2. 安装依赖

```
cd mock-time-postOffice
npm i
cd server
npm i
```

3. 修改接口地址

```
.env.development  // 开发
.env.production  // 生产
修改文件中的'VUE_APP_BASE_API'配置
ps: 后端接口默认端口3000
```

4. 运行

```
// mock-time-postOffice目录下运行
npm run build

// 本人使用的是linux环境, 使用PM2进行node项目部署

// pm2是一个进程管理工具,可以用它来管理你的node进程,并查看node进程的状态,当然也支持性能监控,进程守护,负载均衡等功能.

在PM2管理器中添加一个进程
项目所在根目录: /www/wwwroot/mock-time-postOffice/server/bin/  

启动文件名称: www

项目名称: 时光邮局 

添加映射: email.zsjustn.top

修改映射域名下的nginx配置, 添加以下代码
location / {
	proxy_pass http://127.0.0.1:3000;
}

```





> 结束语

喜欢这个项目的请点个Star, 谢谢

有任何不懂可以+v: 1772591173, 欢迎大家前来询问


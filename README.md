# mock-time-postOffice

本项目模拟[时光邮局](https://www.hi2future.com/) , 采用前后端分离模式, 适合新手入手Node.js的一个练手项目. ☞☞☞本人自己的[时光邮局](http://email.zsjustn.top/)（因备案问题无法访问了）, 欢迎访问

> 技术栈
- Vue 前端
- Element-ui UI框架
- Node 后端
- Express 后端框架
- Mongodb 数据库

## linux部署
1. 安装环境

部署该项目所需的环境 node + npm + git + pm2 + mongodb + nginx，请自行百度安装  
如果linux安装了宝塔，则大部分环境都可以直接在宝塔的软件管理面板中安装  

2. 克隆代码到服务器本地（假设是放在/www/wwwroot/目录下）
```
git clone https://github.com/chengzhnag/mock-time-postOffice.git
```

3. 安装依赖包
```
// 在/www/wwwroot/目录下执行命令
cd mock-time-postOffice
// 这里是安装vue前端静态页面的依赖包，由于使用了node-sass依赖包，需要翻墙或者其它方案解决，请自行处理
// 如果不需要修改前端页面的话，可以跳过本步骤
npm i
cd server
// 安装服务端使用的依赖包
npm i
```
**安装完依赖包之后，我们可以尝试一下开启服务，在/www/wwwroot/mock-time-postOffice/server目录下执行以下命令**
```
node ./bin/www
// 如果执行后显示数据库连接成功，则可以通过你的服务器 公网ip:3000 访问
// ps：3000是后端默认端口，服务器需要放行3000端口才可以访问，Ctrl + c 退出上面命令开启的服务
```

4. 通过pm2添加后台服务

```
pm2是一个进程管理工具,可以用它来管理你的node进程,并查看node进程的状态,当然也支持性能监控,进程守护,负载均衡等功能.

在PM2管理器中添加一个进程：

	项目所在根目录: /www/wwwroot/mock-time-postOffice/server/bin/  

	启动文件名称: www

	项目名称: 时光邮局 

添加进程后查看pm2上面是否显示有已经添加的进程，端口是3000，并且是正常运行状态

然后在pm2上面给该进程添加映射，就是给时光邮局准备的域名（例如我自己的：email.zsjustn.top）

	添加映射: email.zsjustn.top

添加映射成功后，我们这个时候可以通过域名:3000端口访问到我们的站点，所以我们要做的最后一步就是nginx反向代理到80默认端口  
ps：宝塔上新版本的pm2会在添加映射之后自动反向代理，可以根据直接通过域名能访问还是需要加3000端口才能访问区分。如果自动添加了反向代理，下面部分手动添加反向代理配置则不需要进行

如果是宝塔安装，添加映射后会默认在侧边栏网站tab中添加一个网站，然后点击域名找到配置文件，进行修改。 直接通过linux命令行安装的话，找到nginx配置文件进行修改  

添加以下代码
location / {
	proxy_pass http://127.0.0.1:3000;
}
还有就是静态文件也是需要加上代理的，css/js/img等，可以参考下面
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
    expires      30d;
    proxy_pass http://127.0.0.1:3000;
    error_log off;
    access_log off;
}

location ~ .*\.(js|css)?$
{
    expires      12h;
    proxy_pass http://127.0.0.1:3000;
    error_log off;
    access_log off; 
}
```


**顺便讲一下目录结构**

```
public  // vue-cli3生成的静态文件，存放了网站图标
server  // 服务端代码  nodejs后端
src     // vue前端页面

mock-time-postOffice/server/config/default.js // 后端配置文件，修改后请重启
```
如果需要调整一些页面上的显示，需要去上面的src目录下找到对应的页面文件，然后修改，修改完成后需要执行以下命令
```
// build完成后会把打包好的静态文件自动移动到server目录下的views目录和public目录
// 修改了前端页面或者后端配置的话，请在pm2中重启该服务，保证更新到了线上
npm run build
```


> 结束语

喜欢这个项目的请点个Star, 谢谢

有任何不懂可以+v: 1772591173, 欢迎大家前来询问


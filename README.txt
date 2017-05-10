第一步，准备工作
	npm init
	安装需要的包：express socket.io express-session ejs

	创建静态文件夹public ：jquery

	创建视图层文件夹views ：index.ejs    chat.ejs

	编写文档README

	注：这个小demo没有运用数据库

第二步，编写app.js所需要的包
	'use strict';
	const express = require('express');
	const app = express();

	//创建io   注意：   .Server 这个S是大写  还有.别忘记
	const http = require('http').Server(app);
	const io = require('socket.io')(http);

	//引入session 目的：记录登陆者姓名和ID，防止未登录就进入聊天室
	const session = require('express-session');
	//设置session，注意：session({})  提醒：具体作用还没有理清楚
	app.use(session({
		//secret不要拼错
		secret:'keyboard cat',
		resave:false,
		saveUninitialized:true
	}));

	//设置静态文件
	app.use(express.static('./public'));
	//引用模版引擎
	app.set('view engine','ejs');
	//设置users数组，替代数据库，存储用户名
	const users = [];

第三步，编写首页路由，并且渲染index页面
	1.
	app.get('/',(req,res,next)=>{
		console.log(req.sessionID);
		res.render('index');
	})

	2.创建index.ejs，并稍微写下样式

第四步，首页写入用户名之后，即昵称，点击进入聊天室之前，需要对昵称进行检查，成功过后才允许进入聊天室
	1.先检查是否昵称已经注册过，通过查找users数组来确定，如果昵称被占用，作出相应提醒

	2.再检查昵称是否为空，如果为空，作出相应提醒
	
	3.昵称不重复，也不唯恐，那么便将昵称推入users

	4.设置req.session.username，方便chat页面进行检验
	
	5.跳转chat页面

第五步，编写chat页面路由，并且渲染chat页面
	1.首先判断req.session.username是否存在，如果不存在，那么跳转首页

	2.渲染chat.ejs，并且传入req.session.username字典，帮助ejs引擎渲染页面

	3.创建chat.ejs，简单设置一下样式

第六步，核心步骤，分两部分互相对应。
	由服务器端 var io = require('socket.io')(http);  引出  
	浏览器端静态文件资源/socket.io/socket.io.js

	服务器设置: io.on("connection",function(socket){｝    
	浏览器设置:
	<script type="text/javascript" src="/socket.io/socket.io.js"></script>
	<script type="text/javascript"> var socket = io()    ...............   </script>;

	此时，服务器端和客户端均有socket对象，都拥有emit和on方法。
	emit方法发送自定义事件和内容，on方法监听自定义事件和内容，内容作为回调参数。
	从而产生实时交互效果。

最后，具体代码详情请看代码。页面样式有点简陋，望见谅。不见谅，你也没办法，哈哈！！！


	
	
	

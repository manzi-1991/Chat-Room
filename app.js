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

//----------------       中间件                 ------------------

//console.log(req.sessionID);只要访问，服务器便会返回一个ID，一直到绘画结束
//显示首页
app.get('/',(req,res,next)=>{
	console.log(req.sessionID);
	res.render('index');
})

//check页面
//当index.ejs点击进入聊天室后，先对昵称进行检查，如果是空白或者已经有过这个名字，作出相应的处理，然后回应再跳转chat页面
//这里没有用post，直接用get方法了
app.get('/check',(req,res,next)=>{
	console.log(req.sessionID);
	//其实，为了更好的控制进入人的名字，这里应该用正则进行匹配
	let username = req.query.username;
	//如果查找user数组，不等于-1，则意味着，再数组内存在这个用户
	if(users.indexOf(username) != -1){
		res.send('用户已经存在，请返回并重新填写昵称！');
		return;
	}
	//如果username是空的话，那么作出相应的处理
	if(!username){
		res.send('不好意思，您未填写昵称，请返回并填写昵称！');
		return;
	}
	//过滤掉重复名和空白名，把username加入users数组
	users.push(username)
	//记录session.username，跳转chat页面
	req.session.username = username;
	res.redirect('/chat');
})

//chat页面
app.get('/chat',(req,res,next)=>{
	//session有自己独有的ID
	console.log(req.sessionID);
	//这个页面必须保证req.session.username是存在的啦
	if(!req.session.username){
		//如果没有登录，那么跳转首页
		res.redirect('/');
		
	}
	//如果session存在的话，那么就渲染chat页面啦
	res.render('chat',{
		'username':req.session.username
	})
})

//监听io的连接情况和收取信息情况
io.on('connection',socket=>{
	console.log('有一个人连接上来了！')
	socket.on('chat',msg=>{
		//io.emit是广播功能，如果是socket，则是单对单
		io.emit('chat',msg);
	})
})





//监听3000窗口
http.listen(3000)

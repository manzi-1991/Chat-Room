��һ����׼������
	npm init
	��װ��Ҫ�İ���express socket.io express-session ejs

	������̬�ļ���public ��jquery

	������ͼ���ļ���views ��index.ejs    chat.ejs

	��д�ĵ�README

	ע�����Сdemoû���������ݿ�

�ڶ�������дapp.js����Ҫ�İ�
	'use strict';
	const express = require('express');
	const app = express();

	//����io   ע�⣺   .Server ���S�Ǵ�д  ����.������
	const http = require('http').Server(app);
	const io = require('socket.io')(http);

	//����session Ŀ�ģ���¼��½��������ID����ֹδ��¼�ͽ���������
	const session = require('express-session');
	//����session��ע�⣺session({})  ���ѣ��������û�û�������
	app.use(session({
		//secret��Ҫƴ��
		secret:'keyboard cat',
		resave:false,
		saveUninitialized:true
	}));

	//���þ�̬�ļ�
	app.use(express.static('./public'));
	//����ģ������
	app.set('view engine','ejs');
	//����users���飬������ݿ⣬�洢�û���
	const users = [];

����������д��ҳ·�ɣ�������Ⱦindexҳ��
	1.
	app.get('/',(req,res,next)=>{
		console.log(req.sessionID);
		res.render('index');
	})

	2.����index.ejs������΢д����ʽ

���Ĳ�����ҳд���û���֮�󣬼��ǳƣ��������������֮ǰ����Ҫ���ǳƽ��м�飬�ɹ�������������������
	1.�ȼ���Ƿ��ǳ��Ѿ�ע�����ͨ������users������ȷ��������ǳƱ�ռ�ã�������Ӧ����

	2.�ټ���ǳ��Ƿ�Ϊ�գ����Ϊ�գ�������Ӧ����
	
	3.�ǳƲ��ظ���Ҳ��Ψ�֣���ô�㽫�ǳ�����users

	4.����req.session.username������chatҳ����м���
	
	5.��תchatҳ��

���岽����дchatҳ��·�ɣ�������Ⱦchatҳ��
	1.�����ж�req.session.username�Ƿ���ڣ���������ڣ���ô��ת��ҳ

	2.��Ⱦchat.ejs�����Ҵ���req.session.username�ֵ䣬����ejs������Ⱦҳ��

	3.����chat.ejs��������һ����ʽ

�����������Ĳ��裬�������ֻ����Ӧ��
	�ɷ������� var io = require('socket.io')(http);  ����  ������˾�̬�ļ���Դ/socket.io/socket.io.js

	����������io.on("connection",function(socket){��    ���������<script type="text/javascript" src="/socket.io/socket.io.js"></script>
									<script type="text/javascript"> var socket = io();

	��ʱ���������˺Ϳͻ��˾���socket���󣬶�ӵ��emit��on������emit���������Զ����¼������ݣ�on���������Զ����¼������ݣ�������Ϊ�ص�����
	�Ӷ�����ʵʱ����Ч����

��󣬾�����������뿴���롣ҳ����ʽ�е��ª�������¡������£���Ҳû�취������������


	
	
	
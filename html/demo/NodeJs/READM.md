NodeJs/main.js     NodeJs/router.js   NodeJs/module/file.js   NodeJs/source/*  

文件的相关操作

路由处理

路由改造（图文混排）
	response.writeHead("Content-Type":"text/html;charset=utf-8");
	response.writeHead("Content-Type":"image.jpeg");
	由于上述两代码的不一致，我们需要做些改动？
		在路由里控制是文档加载还是图片加载，动态设置响应头
	加载过程是：
		拿到url，先解析到html文档，（再解析css、js等文件）分析文档中内容时有src属性会再次发起新请求，找到对应的url，再次解析

异常处理
	同步异常 
		try{}catch(err){}
	异步异常  
		在异步异常处直接处理,抛出错误，并关闭服务器（response.end("")）
	抛出异常
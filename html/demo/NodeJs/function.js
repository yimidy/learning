var http = require("http"),
	other_fn = require("./module/other_fn.js"); 


http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	if(request.url!=="/favicon.ico"){
		funname = "fn3";
		fn1(response);
		other_fn.fn2(response);
		other_fn[funname](response);
		response.end("");
	}
}).listen(8000);
console.log("Server is running at http://127.0.0.1:8000");

function fn1(res){
	res.write("我是fn1，内置函数！");
	res.write("<br/>");
}
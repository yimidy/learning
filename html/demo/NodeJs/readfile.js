/*readfile.js*/
var http = require("http"),
	file = require("./module/file");
var path = "./source/index.html";
http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	if(request.url!=="/favicon.ico"){
		function recall(data){
			response.write(data);
			response.write("<br/>");
			response.end("end");
		}
		file.readfile(path,recall);
		//file.readfileSync(path,response);
		console.log("主程序执行完毕！");
		//response.end("end");
	}
}).listen(8000);
console.log("Server is running at http://127.0.0.1:8000");

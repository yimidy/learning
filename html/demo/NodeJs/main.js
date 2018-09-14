/*main.js*/

var    http    =    require('http');
var    url    =    require('url');
var    router    =    require('./router');
http.createServer(function    (request,    response)    {
        if(request.url!=="/favicon.ico"){
                var  pathname = url.parse(request.url).pathname;
                pathname = pathname.replace(/\//,'');//替换掉前面的/
                try{
                	router[pathname](request,response);
                }catch(error){
                	console.log("同步异常");
                	console.log(error.toString());
                	response.write(error.toString());
                	response.end("");
                }
        		
        }
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/'); 



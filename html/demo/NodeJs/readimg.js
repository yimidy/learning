/*readimg.js*/

var    http    =    require('http');
var    img = require("./module/img");
http.createServer(function    (request,    response)    {
        response.writeHead(200,{"Content-Type":'image/jpeg'});
        if(request.url!=="/favicon.ico"){
        		function recall(data){
        			response.write(data,"binary");
        			response.end("");
        		}
              	img.readimg("./source/img6.jpeg",recall);
        }
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/'); 
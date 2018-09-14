/*router.js*/
var url = require("url");

var file = require("./module/file");
var path_r = "../source/login.html";//注意，错误路径
var path_w = "./source/register.html";
var path_img = "./source/img6.jpeg";
function getRecall(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	function recall(data){
		res.write(data);
		res.end("");
	}
	return recall;
}
module.exports = {
	login:function(req,res){
		recall = getRecall(req,res);
		//file.writefileSync(path_r,"今天8月22号...");
		file.readfile(path_r,recall);
	},
	register:function(req,res){
		recall = getRecall(req,res);
		//file.writefileSync(path_w,"刚刚淋了一场雨！");
		
		/*var rdata    =    url.parse(req.url,true).query;      
                                console.log(rdata);    
        if(rdata['email']!=undefined){  
            console.log(rdata['email']);      
                                }    */
		file.readfile(path_w,recall);
	},
	showimg:function(req,res){
		res.writeHead(200,{'Content-Type':"image/jpeg"});
		file.readimg(path_img,res);
	}
}
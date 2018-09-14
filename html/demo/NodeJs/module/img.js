/*img.js*/
var fs = require("fs");
module.exports = {
	readimg:function(path,rec){
		fs.readFile(path,"binary",function(err,file){
			if(err){
				console.log(err);
				return;
			}
			console.log("读入图片文件");
			rec(file);
		})
	}
}

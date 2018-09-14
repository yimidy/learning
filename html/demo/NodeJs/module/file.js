var  fs=  require('fs');
module.exports={
    readfile:function(path,recall){          //异步执行
        fs.readFile(path,function(err,data){
        	if(err){
        		console.log("异步异常"+err.toString());
        		recall("文件不存在！");
        		return;
        	}
        	console.log("异步读取文件完毕");
        	recall(data);
        });
        //console.log("异步方法执行完毕2");
    },
    readfileSync:function(path,res){      //同步读取
       var data = fs.readFileSync(path,"utf-8");
       res.write(data);
       console.log("同步读取文件完毕");
               
    },
    writefile:function(path,data){
    	fs.writeFile(path,data,function(err){
    		if(err){
    			console.log(err);
    			return;
    		}
    		console.log("异步写入文件完成");

    	})
    },
    writefileSync:function(path,data){
    	fs.writeFileSync(path,data);
    	console.log("同步写入文件完成");
    },
    readimg:function(path,res){
    	fs.readFile(path,"binary",function(err,file){
    		if(err){
    			console.log(err);
    			return;
    		}
    		console.log("读取图片文件");
    		res.write(file,"binary");
    		res.end("");
    	})
    }


}
function ajax(){
	var ajaxData = {
		url:arguments[0].url||'',
		type:arguments[0].type||'GET',
		data:arguments[0].data||null,
		dataType:arguments[0].dataType||'text',
		async:arguments[0].async||'true',
		contentType:arguments[0].contentType||'application/x-www-form-urlencoded',
		beforeSend:arguments[0].sendBefore||function(){},
		success:arguments[0].success||function(){},
		error:arguments[0].error||function(){}
	}
	ajaxData.beforeSend();
	var xhr = createXHR();//xhr.abort()可以取消当前异步请求
	xhr.responseType = ajaxData.dataType;
	xhr.onreadystatechange = function(){
		if(xhr.readystate == 4){
			try{
				if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				ajaxData.success();
				}else{
					ajaxData.error();
				}
			}catch{
				alert("超时");
			}
			
		}
	}
	xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
	xhr.setRequestHeader('content-Type',ajaxData.contentType);//xhr.getRequestHeader('content-Type')或xhr.getRequestHeaders()全部信息
	xhr.timeout = 1000;//超时时间设置为1s
	xhr.ontimeout = function(){

	}
	xhr.send(ajaxData.data);

}

function createXHR(){
	if(window.ActiveXObject){
		return new ActiveXObject('Microsoft.XMLHTTP');
	}else if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
}
function convertData(data){
  if( typeof data === 'object' ){
    var convertResult = "" ; 
    for(var c in data){ 
      convertResult+= c + "=" + data[c] + "&"; 
    } 
    convertResult=convertResult.substring(0,convertResult.length-1)
    return convertResult;
  }else{
    return data;
  }
}

function addURLParm(url,name,value){
	url += url.indexOf('?')==-1?'&':'?';
	url += encodeURIComponent(name)+'='+endcodeURIComponent(value);
	return url;
}

//js的使用格式
ajax({ 
  type:"POST", 
  url:"ajax.php", 
  dataType:"json", 
  data:{"val1":"abc","val2":123,"val3":"456"}, 
  beforeSend:function(){ 
    //some js code 
  }, 
  success:function(msg){ 
    console.log(msg) 
  }, 
  error:function(){ 
    console.log("error") 
  } 
})

//jquery的使用格式
$.ajax({ 
  type:"POST", 
  url:"ajax.php", 
  dataType:"json", 
  data:{"val1":"abc","val2":123,"val3":"456"}, 
  beforeSend:function(){ 
    //some js code 
  }, 
  success:function(msg){ 
    console.log(msg) 
  }, 
  error:function(){ 
    console.log("error") 
  } 
})

XHR对象
ajax实现通信的主要媒介
有一个限制，只能访问与包含它的页面位于同一个域下的资源
ajax可以跨域，url填写绝对路径即可，但跨域时：
	不能使用setRequestHeader()设置头部
	不能发送接收cookie
	调用getReauestHeaders()会返回空字符串

CORS（cross origin Resource sharing）
使用http头部让浏览器与服务器进行沟通，决定响应是否成功
请求头部：Origin:http://www.baidu.com
响应头部：Access-Control-Alloe-Origin:http://www.baidu.com 

透明服务器验证机制
向服务器发送Prefilghter Request
	origin
	Access-Control-Request-Method:
	Accept-Control-Request-Heasers:
服务器返回
	Access-Control-Allow-Origin:
	Access-Control-Allow-Method:
	Accept-Control-Allow-Heasers:
	Access-Control-Allow-Max-Age:

带凭据的请求
xhr.withCredentials:true;
服务器会返回
Access-Control-Alllow-Credentials:true;

get请求和post请求
1. 参数传递方式/url拼接/request body，但http协议没有严格规定，只是浏览器和服务器的一些设定导致
2. 参数大小/get小post大，但http协议没有要求，还是由于浏览器和服务器的配置参数
3. 安全问题/post比get安全些，但url拼接是明文传输，显示在浏览器的历史记录中，还可能在web日志中；header请求中的ready body里其实也能在开发者工具或抓包中找到，同样也是明文传输，但不会出现在浏览器历史记录中
4. 缓存问题，这里有一个幂等的概念，即浏览器打开这次记录回合上次内容一样，get是幂等的，有缓存效果，常应用在返回上一级或刷新；post不是幂等的，常应用在点赞等
5. 传输数据包问题，get传输1次数据包；post传输2次，第一次值传输头部，询问服务器可以接受请求吗，可以的话，在发送第二次，包含请求体

请求头
Accept
Accept-charset
Accept-coding
Accpet-language
connection
content-Type
Host
Referer
Cookie
xhr.setRequestHeader('','')
xhr.getRequestHeader('')或xhr.getRequestHeaders()

formData
表单数据序列化  XHR2中定义了formData数据类型
var form = new formData();
form,append('name','value');
或
var form = document.getElementById('form1');
xhr.send(new formData(form));

timeout
xhr.timeout = 1000;
xhr.ontimeout = function(){}

overrideMimeType
xhr.overrideMimeType('text/xml');//定义服务器返回MIME类型

进度事件
loadstart//加载开始
progess//进程
error//出现错误
abort//取消异步
load//加载完成
loadend//加载结束时或error，abort后触发
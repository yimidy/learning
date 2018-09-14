fetch('https://www.baidu.com/search/error.html')   //返回一个promise对象
	.then((res)=>{
		return res.text()  //返回一个promise对象
	})
	.then((res)=>{
		console.log(res)    //真正的结果，文本对象
	})



//GET请求+url传参+请求的头信息（数据类型）+强制带Cookie
fetch('https://www.baidu.com/search/error.html?id=123',{
	method:'GET',
	headers: new Headers({
		'Accept':'application/json'  // 通过头指定，获取的数据类型是JSON
	}) ,
	credentials:'include'//强制加入凭据头
}) 
	.then((res)=>{
		return res.json()
	})  
	.then((res)=>{
		console.log(res)
	})



//POST请求+body传参+请求的头信息（内容类型）
fetch('https://www.baidu.com/search/error.html',{
	method:'POST'，
	body: new URLSearchParams([['id',1],['class',2]]).toString(),//请求参数
	headers: new Headers({
		'Content-type':'application/x-www-form-urlencoded' // 指定提交方式为表单提交(因为POST提交过程一般为表单提交，而默认是text/plain;charset=UTF-8)
	})
})  



//fetch的封装
function _fetch(url, data, method,options) {
    const body = o2s(data);
    let params = {
        method: method,
    };
    if (method === 'GET') { // 如果是GET请求，拼接url
        url += '?' + body;
    } else {
         params.body=body
    }
    if(options.cookie!=undefined){
        params.credentials='include'
    }
    if(options.headers!=undefined && typeof options.headers=="object"){
        params.headers=new Headers(options.headers);
    }else{
        params.headers=new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    }
    fetch(url, params).then(r => options.dataType=="text"?r.text():r.json()).then(r => r);
}

function o2s(obj, arr = [], idx = 0) {
    for (let item in obj) {
        arr[idx++] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
}
function get(url, data,options) {
    return _fetch(url, data, 'GET',options);
}

function post(url, data,options) {
    return _fetch(url, data, 'POST',options);
}
post("/api/test",{title:"标题"},{
    dataType:"json",
    cookie:true,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }  
});

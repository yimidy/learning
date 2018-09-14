//ajax轮询
function ajax_lunxun(){

	setInterval(function(){
		$.ajax({
			url: '' ,
			success: function(){

			}
		});
	},3000)

}

//iframe轮询
function iframe_lunxun(){

	setInterval(function () {
        $("#logs").append("[data: " + $($("#frame").get(0).contentDocument).find("body").text() + " ]<br/>");
        $("#frame").attr("src", "${pageContext.request.contextPath}/communication/user/ajax.mvc?timed=" + new Date().getTime());
        // 延迟1秒再重新请求
        window.setTimeout(function () {
                window.frames["polling"].location.reload();
            }, 1000);
    }, 5000);

}
唯一不同的是当一个请求没有响应返回数据的情况下，下一个请求也将开始，这时候前面的请求将被停止。
//web worker轮询
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
---------------------------------------------------------------------------------------------------------------------------------------
//ajax长轮询，comet
function ajax_longlx(){

		$.ajax({
                url: "${pageContext.request.contextPath}/communication/user/ajax.mvc",
                data: {"timed": new Date().getTime()},
                dataType: "text",
                timeout: 5000,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $("#state").append("[state: " + textStatus + ", error: " + errorThrown + " ]<br/>");
                            if (textStatus == "timeout") { // 请求超时
                                    ajax_longlx(); // 递归调用
                                
                                // 其他错误，如网络错误等
                                } else { 
                                    ajax_longlx();
                                }
                        },
                success: function (data, textStatus) {
                            $("#state").append("[state: " + textStatus + ", data: { " + data + "} ]<br/>");
                            
                            if (textStatus == "success") { // 请求成功
                                ajax_longlx();
                            }
                        }
            });
              
                
	
}
上面这段代码就是才有Ajax的方式完成长连接，主要优点就是和服务器始终保持一个连接。如果当前连接请求成功后，将更新数据并且继续
创建一个新的连接和服务器保持联系。如果连接超时或发生异常，这个时候程序也会创建一个新连接继续请求。这样就大大节省了服务器和
网络资源，提高了程序的性能，从而也保证了程序的顺序。



现代的浏览器都支持跨域资源共享（Cross-Origin Resource Share，CORS）规范，该规范允许XHR执行跨域请求，因此基于脚本的和基于iframe
的技术已成为了一种过时的需要。

把Comet做为反向Ajax的实现和使用的最好方式是通过XMLHttpRequest对象，该做法提供了一个真正的连接句柄和错误处理。当然你选择经由HTTP
长轮询使用XMLHttpRequest对象（在服务器端挂起的一个简单的Ajax请求）的Comet模式，所有支持Ajax的浏览器也都支持该种做法。
---------------------------------------------------------------------------------------------------------------------------------------
//iframe长连接
function iframe_longlx(){

	setInterval(function () {
         var url = "${pageContext.request.contextPath}/communication/user/ajax.mvc?timed=" + new Date().getTime();
         var $iframe = $('<iframe id="frame" name="polling" style="display: none;" src="' + url + '"></iframe>');
         $("body").append($iframe);
                
         $iframe.load(function () {
                $("#logs").append("[data: " + $($iframe.get(0).contentDocument).find("body").text() + " ]<br/>");
                  $iframe.remove();
             });
    }, 5000);

}
每个请求都有自己独立的一个iframe，当这个iframe得到响应的数据后就把数据push到当前页面上。使用此方法已经类似于ajax的异步交互了，
这种方法也是不能保证顺序的、比较耗费资源、而且总是有一个加载的条在地址栏或状态栏附件（当然要解决可以利用htmlfile，Google的攻
城师们已经做到了，网上也有封装好的lib库），但客户端实现起来比较简单。



function iframePolling() {
        var url = "${pageContext.request.contextPath}/communication/user/ajax.mvc?timed=" + new Date().getTime();
        ar $iframe = $('<iframe id="frame" name="polling" style="display: none;" src="' + url + '"></iframe>');
        $("body").append($iframe);
        
        $iframe.load(function () {
            $("#logs").append("[data: " + $($iframe.get(0).contentDocument).find("body").text() + " ]<br/>");
            $iframe.remove();
                
                // 递归
                iframePolling();
        });
}    
   
 这种方式虽然保证了请求的顺序，但是它不会处理请求延时的错误或是说很长时间没有返回结果的请求，它会一直等到返回请求后才
 能创建下一个iframe请求，总会和服务器保持一个连接。和以上轮询比较，缺点就是消息不及时，但保证了请求的顺序。

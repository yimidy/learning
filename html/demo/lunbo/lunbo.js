var container = document.getElementsByClassName("lunbo")[0];
var box = document.getElementsByClassName("box")[0];
var obj = box.children[0];
var list = document.getElementsByClassName("list")[0];
var width = window.getComputedStyle ? window.getComputedStyle(obj,null).width : obj.currentStyle.width; 
box.appendChild(obj.cloneNode(true));

var timer = null;
var num = box.children.length;
var count = 0;
timer = setInterval(autoplay,2000);



	box.onmouseover= function(){
		clearInterval(timer);
		var st;
		list.onclick = function(e){
			e = e||event;
			pauseEvent(e);
			clearInterval(timer);
			[].slice.call(list.children).forEach(function(value,index,arr){
				console.log(e.target == value)
				if(e.target == value){
					count = index;
					move(".box",index);
				}
			})
		}
		box.onmousedown= function(e){
			console.log("down")
			e = e||event;
			var _x = e.clientX;
			console.log(_x)
			box.onmousemove = function(e){
				//console.log("move")
				e = e||event;
				pauseEvent(e);
				var x = e.clientX;
				st = x - _x; 
				//console.log("st "+st)
			}
		}
		box.onmouseup = function(){
			console.log("up");
			console.log(st);
			console.log(count);
			if(st>50){ if(count==0){count = 3;box.style.left = -4*width.slice(0,width.length-2)+"px";}else{count--;}}//right
			if(st<-50){if(count==4){count = 1;box.style.left = "0px";}else{count++;}}	
			move(".box",count); 
		}
	}
	
	box.onmouseout = function(){
		timer = setInterval(autoplay,3000);
	}



	

function autoplay(){
	count++;
	if(count>num-1){
		box.style.left = 0;
		count = 1;
	}
	move(".box",count);
}
function move(obj,count){
	var s = -count*width.slice(0,width.length-2);
	console.log( s)
	$(obj).animate({left:s+"px"},500,"swing")

}
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}






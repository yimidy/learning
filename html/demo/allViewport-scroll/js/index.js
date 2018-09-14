/*index.js*/
//仿腾讯页面效果插件
function tencent(obj) {

    var height = obj.height; //显示的高度
    var width = obj.width; //显示的宽度
    var position = 1; //默认显示第一个
    var index = obj.index || 7; //总的个数
    var didscoll = true; //是否可以执行动画
    var speed = obj.speed || 800; //下滑动画速度
    var bgscorespeed1 = 50; //第一行背景滑动速度
    var init1 = 0; //  第一行背景初始滑动距离
    var bgscorespeed2 = 30; //第一行背景滑动速度
    var init2 = 0; //  第一行背景初始滑动距离
    var bgscorespeed3 = 60; //第一行背景滑动速度
    var init3 = 0; //  第一行背景初始滑动距离
    var bgroute1 = 50; //背景圆旋转速度
    var initroute1 = 0; // 背景初始圆旋转离角度

    var pressedKey = {};
    pressedKey[36] = "top"; // home
    pressedKey[38] = "up"; // upward arrow
    pressedKey[40] = "down"; // downward arrow
    pressedKey[33] = "up"; // page up
    pressedKey[34] = "down"; // page down
    pressedKey[35] = "bottom"; // end

    //滑动执行的事件
    var scrollFunc = function(e) {
        if(didscoll) {
            didscoll = false;
            e = e || window.event;
            if(e.wheelDelta) { //IE/Opera/Chrome 
                if(e.wheelDelta == 120) {
                    //向上滚动事件 
                    if(position > 1) {
                        position = position - 1;
                        if(position==1){
                            gotoone();
                        }
                    }
                } else {
                    //向下滚动事件 
                    if(position < index) {
                        position = position + 1;
                        if(position==2){
                            gototwo();
                        }
                    }
                }
            } else if(e.detail) {
                //Firefox 
                if(e.detail == -3) {
                    //向上滚动事件<br> 
                    if(position > 1) {
                        position = position - 1;
                        if(position==1){
                            gotoone();
                        }
                    }
                } else {
                    //向下滚动事件<br> 
                    if(position < index) {
                        position = position + 1;
                        if(position==2){
                            gototwo();
                        }
                    }
                }
            } else if(e.type == "keydown") {
                if(pressedKey[e.which]) {
                    e.preventDefault();
                    if(pressedKey[e.which] == "up") {
                        if(position > 1) {
                            position = position - 1;
                            if(position==1){
                               gotoone();
                            }
                        }
                    } else if(pressedKey[e.which] == "down") {
                        if(position < index) {
                            position = position + 1;
                            if(position==2){
                               gototwo();
                            }
                        }
                    }
                }

            }

            /*  使用动画延时中的回调函数解决连续监听鼠标滚动事件问题
                                 鼠标滚动事件连续触发,使用变量控制是否调用相应事件       */
            $(".box").animate({
                top: -(position - 1) * height
            }, speed, function() {
                didscoll = true;
            });
            //改变圆点当前位置
            circleposition();

        }

    };
    //绑定事件
    if(document.addEventListener) {
        //adding the event listerner for Mozilla 
        document.addEventListener("DOMMouseScroll ", scrollFunc, false);
        $(document).bind("keydown", scrollFunc);
    }
    //IE/Opera/Chrome 
    window.onmousewheel = scrollFunc; //document.onmousewheel = scrollFunc

    //添加右边圆点
    var circle = function() {
        var divs = "";
        for(var i = 0; i < index; i++) {
            if(i == 0) {
                divs += "<div class='right-circle-item on'></div>";
            } else {
                divs += "<div class='right-circle-item'></div>";
            }
        }
        $(".right-circle").html("");
        $(".right-circle").append(divs);
    }

    circle(); //调用创建右边右边圆点

    //初始化css
    var initcss = function() {
        var rightHeight = $(".right-circle").height();

        $(".item").css({
            "height": height,
            "width": width
        });
        $(".box").css({
            "height": height * index,
            "top": -(position - 1) * height
        });

        $(".right-circle").css({
            "margin-top": -rightHeight / 2
        });

        //获取背景的后半部分
        var back = $(".back");
        for(var i = 0; i < back.length; i++) {
            var left = $(back[i]).css("left");
            left = parseInt(left.substr(0, left.length - 2)) + width + "px";
            $(back[i]).css("left", left);
        }

    }

    initcss(); //调用初始化css

    //第一行背景滑动和背景圆旋转

    var huadong1 = function() {
        init1 = init1 + 1;
        if(init1 == width) {
            init1 = 0;
        }
        $(".row1").css("left", -init1 + "px")

        initroute1 = initroute1 + 2;
        if(initroute1 == 360) {
            initroute1 = 0;
        }
        $(".route1").css({
            "-ms-transform": "rotate(" + initroute1 + "deg)",
            "-moz-transform": "rotate(" + initroute1 + "deg)",
            "-webkit-transform": "rotate(" + initroute1 + "deg)",
            "-o-transform": "rotate(" + initroute1 + "deg)",
            "transform": "rotate(" + initroute1 + "deg)"
        });
    }

    setInterval(huadong1, bgscorespeed1);
    
    //第二行背景滑动

    var huadong2 = function() {
        init2 = init2 + 1;
        if(init2 == width) {
            init2 = 0;
        }
        $(".row2").css("left", -init2 + "px")

    }

    setInterval(huadong2, bgscorespeed2);
    
    
    //第三行背景滑动

    var huadong3 = function() {
        init3 = init3 + 1;
        if(init3 == width) {
            init3 = 0;
        }
        $(".row3").css("left", -init3 + "px")

    }

    setInterval(huadong3, bgscorespeed3);
    
    
    //背景划出效果
    var gototwo=function(){
        $(".bg").css({
            "-ms-transform":"translate(-25%)rotate(-45deg)scale(2,2)",
            "-moz-transform":"translate(-25%)rotate(-45deg)scale(2,2)",
            "-webkit-transform":"translate(-25%)rotate(-45deg)scale(2,2)",
            "-o-transform":"translate(-25%)rotate(-45deg)scale(2,2)",
            "transform":"translate(-25%)rotate(-45deg)scale(2,2)"
        });
    }
    
    var gotoone=function(){
        $(".bg").css({
            "-ms-transform":"translate(0%)rotate(0deg)scale(1,1)",
            "-moz-transform":"translate(0%)rotate(0deg)scale(1,1)",
            "-webkit-transform":"translate(0%)rotate(0deg)scale(1,1)",
            "-o-transform":"translate(0%)rotate(0deg)scale(1,1)",
            "transform":"translate(0%)rotate(0deg)scale(1,1)"
        });
    }
    
    

    //切换右侧圆点当前位置
    var circleposition = function() {
        var circle = $(".right-circle .right-circle-item");
        if(circle.hasClass("on")) {
            circle.removeClass("on");
        }
        $(".right-circle .right-circle-item:nth-child(" + position + ")").addClass('on');
    }

}

$(function() {
    tencent({
        height: $(window).height(),
        width: $(window).width(),
        index: 3, //总的个数
    });

});
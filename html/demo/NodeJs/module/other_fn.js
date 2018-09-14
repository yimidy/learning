module.exports = {
	fn2:function(res){
		res.write("我是fn2，外部引入函数!");
		res.write("<br/>");
	},
	fn3:function(res){
		res.write("我是fn3，外部引入函数!");
		res.write("<br/>");
	}
}
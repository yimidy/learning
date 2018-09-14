module.exports = {
	login:function(req,res){
		res.write("我是login页面");
		res.write("<br/>");
	},
	register:function(req,res){
		res.write("我是register页面");
		res.write("<br/>");
	}
}
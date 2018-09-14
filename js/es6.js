//let
{
	console.log(a);//a is not defined
	let a = 6;
	let a = 7;//a has already been declaed
}
	console.log(a);//a is not defined


//const
{
	const str = "yidu";
	str = 'yihao';//assignment to constant variable
	const person = { name: 'yidu'};
	person.name = 'yihao';
	person = {name: 'yihao'};//assignment to constant variable
}
	console.log(str);//str is not defined


//class类
class Person{
	constructor(name){
		this.name = name;
	}
	say(){

	}
	static name(){ //静态方法
		return 'xxx';//可以认为是静态变量
	}
}
//继承的实现
class Mam extends Person{
	constructor(name,food){
		super(name,food);//必须放在构造器的额第一行，代表调用父类构造方法
		this.food = food;
	}
	eat(){
		console.log(this.food);
	}
}



//set
var set = new Set();
set.add(1);
set.add(2);
set.delete(2);
set.clear();
set.size();
var keys = set.keys();//返回一个迭代器
for(var k of keys){
	console,log(k);
}
var values = set.values();//返回一个迭代器
for(var k of values){
	console,log(k);
}
var entries = set.entries();//返回一个迭代器
for(var k of entries){
	console,log(k);
}

//数组去重的问题
var arr = [1,2,4,4,3,1,1,2];
fuction fn(arr){
	var map = {};
	var newArr = arr.filter(function(item,index){
		if(!map[item]){
			map[item] = true;
			return item;
		}
	});
	reurn newArr;
}

function fn(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        if(newArr.indexOf(arr[i]) === -1){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

function fn(arr){
    var s = new Set(arr);
    return Array.from(s);
}
fn(arr);


//Array返回只出现一次的元素
    var arr = [1,2,3,4,1,1,1];
    function fn(arr){
        var newArr = [];
        for(var i = 0; i < arr.length; i++){
            if(arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])){
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    fn(arr);

//map
var m = new Map();
m.set('a',1);
m.set('b',2);
m.get('a');
m.delete('a');


//箭头函数
()=>{}//只有一个参数时，()可省略；运算单行时，{}可省略
()=>()//=>后使用小括号() 表示将结果作为返回值
//this指向调用它的对象，但箭头函数会改变默认指定的this对象
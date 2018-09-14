var obj = {
	a:1,
	b:2
};

/*console.log(Object.isExtensible(obj));
obj.c = 3;
console.log(obj.c);


Object.preventExtensions(obj);
console.log(Object.isExtensible(obj));
obj.d = 4;
console.log(obj.d);*/

/*console.log(Object.isSealed(obj));
obj.c = 3;
console.log(obj.c);
delete obj.a;
console.log(obj.a);
obj.b = 22;
console.log(obj.b);

Object.seal(obj);
console.log(Object.isSealed(obj));
obj.d = 3;
console.log(obj.d);
delete obj.b;
console.log(obj.b);
obj.c = 33;
console.log(obj.c);*/

console.log(Object.isFrozen(obj));
obj.c = 3;
console.log(obj.c);
delete obj.a;
console.log(obj.a);
obj.b = 22;
console.log(obj.b);

Object.freeze(obj);
console.log(Object.isFrozen(obj));
obj.d = 3;
console.log(obj.d);
delete obj.b;
console.log(obj.b);
obj.c = 33;
console.log(obj.c);



	var obj = {a :1,b:2,c:3};
    	Object.defineProperties(obj,{
       		"a":{configurable:false,enumerable :true},
       		"b":{configurable:false,enumerable :true},
       		"c":{configurable:false,enumerable :true}
    	});
	Object.preventExtensions(obj);

	
	var obj = Object.create({},{
        	"a":{value :1,congigurable :false,enumerable :true,writeable: true},
        	"b":{value :2,congigurable :false,enumerable :true,writeable: true},
        	"c":{value :3,congigurable :false,enumerable :true,writeable: true}
    	});
	Object.preventExtensions(obj);


 	function deepFreeze(o){
        var prop,propKey;
        Object.freeze(o);//首先冻结第一层对象
        for(propKey in o){
            prop = o[propKey];
            if(!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
                continue;//终止本次轮询，进入下一次轮询
            }
            deepFreeze(prop);//递归
        }
    }
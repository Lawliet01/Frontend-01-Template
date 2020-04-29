# 每周总结可以写在这里

# 第三周学习总结

## 0423学习总结
1、JS浮点数问题刨析
参考：https://jsfiddle.net/pLh8qeor/19/
检查数字正负
```
function check(zero){
	if(1/zero === Infinity){
		return 1;
	}
	if(1/zero === -Infinity){
		return -1;
	}
}
function sign(number){
	return number / Math.abs(number);
}

```

2、Javascript语法
* 树和优先级
* 对象
  a.b
  a[b]         动态获取属性，相当于反射
  super.b      只能在构造函数中使用
  super['b']
  new.target   只能在构造函数中使用，判断一个对象是否根据new关键字创建的
* Expression
  * 对象成员
  * 对象创建
  * 函数调用
    * foo()
	* super()
	* foo()['b']
	* foo().b
  * Left Handside & Right Handside
    * 等号左边永远是一个Reference类型
	* eg:  foo() = 1     foo()["a"] = 1   new foo = 1
    * Update Expression
	* Unary单位运算符  
	  * delete a.b
	  * void *
	  * typeof null function
* Reference 
* Boxing & Unboxing
  * String  Number Boolean Symbol  undefined null
  * 7中基本类型 中的4种可以包装成对象
  * Boxing之后的基本对象可以通过typeof判断，转其他类型规则也不一样
  * Unboxing
    * 1+ {}
	* 1 + {toString(){return 2}}
	* 1 + {toString(){return "2"}}
	* 1 + {valueOf(){return 2}, toString(){return 2}}
	* 1 + {valueOf(){return 2}, toString(){return "2"}}
	* 1 + {valueOf(){return {}}, toString(){return "2"}}
	* 1 + {valueOf(){return 2}, toString(){return "3"}, [Symbol.toPrimitive](){ return 4}}
	* 1 + {valueOf(){return 2}, toString(){return "3"}, [Symbol.toPrimitive](){ return "4"}}
  
```
// 如何判断一个对象是否根据new关键字创建的
function foo(){
	console.log(this);
}
var fakeObject = {};
Object.setPrototypeOf(fakeObject, foo.prototype);
fakeObject.constructor = foo;
foo.apply(fakeObject);
fakeObject instanceof foo;

// super的使用
class Parent{
	constructor(){
		this.a = 1;
	}
}
class Child extends Parent{
	constructor(){
	    // 调用super关键字之前一定先要执行super方法
		super();
		console.log(super.a);
	}
}

// string template

var name = "Alex";
function foo(){
	console.log(arguments);
}
foo `Hello ${name}`;

var name = "Alex";
function foo(){
	console.log("outer....");
	console.log(arguments);
	return function(){
		console.log("inner....");
		console.log(arguments);
	}
}
foo() `Hello ${name}`;

// new的优先级考虑
function cl1(s){
	console.log("cl1:"+s)
}
function cl2(s){
	console.log("cl2:"+s);
	return cl1;
}
new cl2 //直接返回cl1哦
new (cl2)
new new cl2()

// 函数调用
class foo {
	constructor(){
		this.b = 1;
	}
}
new foo()['b'];
foo["b"] = function(){}
new (foo["b"])

// Update Expression - LeftHandside - no LineTerminator
var a = 1, b =2, c =3;
a
++
b
++
c

// 立即执行函数 IIFE Immediately invoked function expression
for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	button.onclick = function(){
		console.log(i);
	}
}

for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	+ function(i){
		button.onclick = function(){
			console.log(i);
		}
	}(i)
}
for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	void function(i){
		button.onclick = function(){
			console.log(i);
		}
	}(i)
}

// StringToNumber
function convertStringToNumber(str){
	var chars = str.split('');
	var number = 0;
	for(var i = 0; i < chars.length; i ++){
		number *= 10;
		number += chars[i].codePointAt(0) - '0'.codePointAt(0);
		
	}
	return number;
}
```



## 0425学习总结

1、Completion
* Completion Record
  * [[type]]: normal, break, continue, return or throw
  * [[value]]: Types
  * [[target]]: label
* 作用域
  * Block BlockStatement
  * Iteration      作用域在block之外
	* for in
	* for of       generate
* 声明
  1、有var一定要写在function范围内
  2、不要在类似with的block中写var
2、对象
* ObjectAPI/Grammar
  * {}.[] Object.defineProperty
  * Object.create / Object.setPrototypeOf / Object.getPrototypeOf
  * new / class / extends
  * new / function / prototype
* Function Object

## JS 标准里面有哪些对象是我们无法实现的，都有哪些特性

* Function Object

  * [[call]] 视为函数Function
  
  * [[Construct]] 可以被new 操作符调用，根据new的规则返回对象
  
* Array Object

  * Property == length
  设置对象的length属性，根据length的变化对对象进行操作
  
  newLength > length 用空扩充数组
  
  ewLength < length 截取数组

* String Object

string的length是不可写不可配的。

* Arguments Object

[[callee]] 视为函数参数对对象，伪数组 caller

* Object

[[Get]] property被访问时调用 get

[[Set]] property被赋值时调用 set

[[GetPrototypeOf]] 对应getPrototypeOf方法 获取对象原型

[[SetPrototypeOf]] 对应setPrototypeOf方法 设置对象原型

[[GetOwnProperty]] getOwnPropertyDescriptor 获取对象私有属性的描述列表

[[HasProperty]] hasOwnProperty 私有属性判断

[[IsExtensible]] isExtensible对象是否可扩展

[[PreventExtensions]] preventExtension控制对象是否可以添加属性

[[DefineOwnProperty]] defineProperty 定义对象属性

[[Delete]] delete 操作符

[[OwnPropertyKeys]] Object.keys() Object.entries() Object.values()

[[Call]] 能够调用call

* Module Namespece

[[Module]] 视为一个引入的模块
[[Exports]] 视为一个导出的模块
# 总结


## Dev工具

* Server
	* build： webpack babel vue jsx postcss
	* watch: fsevent
	* mock
	* http: ws
* Client:
	* debugger: vscode devtool
	* source map
	

### 理解


* fsevent
> 监听文件的变化  

* vscode debugger的原理：
> node 开了一个websocket，相当于server，vscode作为一个client，通过server与node交流  

* ws
> websocket  

* source map
> loader的第二个返回值可以返回source map  

### 实践：

* 实现一个watch tool
1. 利用fsevent观察文件的变化
2. 改变的时候执行webpack打包
3. 用http-server host 打包出来的结果
 

## 测试工具

* 实践：手动将HTML parser测试完毕


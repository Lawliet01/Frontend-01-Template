# 总结


## 工具链

* 把工具链串起来（使用yeoman）
> 把前面的component、test、webpack等串起来  
->
1. 与用户交互,调整选项
2. 把固定文件（如webpack.config、package.json、以及一些JS文件）通过this.fs.copyTpl复制到ouput中
3. 利用this.npmInstall把需要的依赖下载下来

## 发布系统


3个文件
> publish-tool  
> publish-server  
> server  

* publish-tool调接口让publish server给server发布文件


### 理解流

* 可以通过data、end事件去拼接body
* 使用pipe(pipe是一种快捷的写法)

```
req.pipe(writeStream)
```
* 等同于
```
req.on("data", chunk=>{
	writeStream.write(chunk)
})

req.on("end", chunk => {
	writeStream.end(chunk)
})
```


### 实践

#### 上传猫的图片：

* publish-tool
1. 读取图片的信息（用于写content-length）
2. 创建request
3. 创建一个readStream，流式读取图片
4. 通过pipe把readStream放入request中，发送request

* publish-server
1. 读取res的文件名
2. 创建一个writeStream，流式写入文件
3. 把request 通过pipe导到writeStream中
* 注意事项：要监听end事件，才开始返回，否则流处理会提前结束，图片只渲染半张。

* server
1. 用express初始化一个server

#### 上传多个文件

* publish-tool （添加压缩步骤）
1. 建立一个request
2. 使用archive包压缩文件夹（这会创建一个流）
3. 通过pipe把流数据导到request中，发送request


* publish-server（添加解压步骤）
1. 读取res的文件名
2. 使用unzipper包创建一个writeStream
3. 把request通过pipe导入writeStream中






















#45-前端训练营
# 总结


## 手势种类
* tap
* pan
> panstart panmove panend  
* flick
* press
> press pressstart pressend  



## 手势的实现

1. 融合touch和mouse
* 抽象出一个函数，在适当的时机调用这个函数
* touch event要使用changedTouches属性，使用touch属性在end的时候接收不到

2. 处理多个事件(多指的时候)
* 设置一个全局对象
* 在eventstart的时候给这个对象的一个属性赋值event context
* 在eventend的时候记得要delete这个对象
* 然后在调用抽象的函数中时候把对象context传进去

3. 判断环境
* 通过document.ontouchstart

4. 判断事件类型
> isPan  
> istap  
> isflick  
> ispress  
* 通过他们的关系判断，在抽象的函数中去判断
* 然后给context中有对应的属性赋值表示是否触发这些事件


5. 派发事件
> 使用自定义事件  
* [Creating and triggering events - Developer guides | MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)



## 合并到轮播图

1. 轮播要滚动前new三个animation，每个图片一个animation，然后加到timeline上播放

2. 添加手势
_JSX上_
* 在render函数中添加事件
* 通过配置enableGesture属性来在元素上添加手势 
* 通过配置on属性来允许直接在元素上添加手势事件

* 在start事件发送的时候停止animation
* 获取当前element的translate
* pan事件拖动动画
* stop的时候使用animation恢复动画













#45-前端训练营
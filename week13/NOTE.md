# 总结


## Proxy

* proxy可以改变object的行为
* proxy一般只在库和框架中使用，业务代码中不使用。

* 训练：
> 使用proxy实现数据的双向绑定  

* 实现过程：
1. 给object构造一个proxy
2. 这个proxy的get会对未添加reactive的属性添加reactive，以及收集当前使用的了哪些属性（usedReactivites），在get完成依赖收集
3. effect函数会再每次结束的前收集对应的handlers，收集到一个map中。
4. 因而，给proxy修改数据的时候，会检查handlers对应的对象中存储的handler collection，把这里面的handler执行一遍。
5. 完成数据的绑定。

## Range

* 训练：
> 把一个box插入到文字中  

* 实现过程：
1. 把所有文字组合成一个range的数组
2. 拖拉的时候判断鼠标与哪一个range最近
3. 插到这个range前面

## 组件化

* 组件的组成部分
> Properties  
> Methods  
> Inherit  
> Attribute  
> Config&state  
> Event  
> Lifecycle  
> children  

* attribute 强调描述性
* property强调从属关系


* 训练：一个轮播的API设计
* state
> activeIndex  
* property
> loop time imgList color forwatd  
* attribute
> startIndex loop time imglist color forward  
* children
* event
> change click hover swipe resize dbclick  
* method
> next() prev() goto() play() stop()  
* config






















#45-前端训练营
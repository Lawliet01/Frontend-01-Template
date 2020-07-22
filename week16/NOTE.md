## 总结


## 训练1: 使用SFC的方法来创建组件

* 自己写一个loader（通过loader把SFC转为JS）

* 步骤：
1. 在webpack里配置一个loader （如myloader.js）
```
      {
        test:/\.view$/,
        use: {
          loader: require.resolve("./myloader.js")
        }
      }
```

2. loader里面通过parse source(状态机解析SFC代码)，生成AST：
```
parser.parseHTML(source)

```

3. 然后对于生成的ast做处理
4. 最后返回一个输出JS代码

## 训练2: 写一个动画组件

* 一个Timeline对象用来管理所有的动画：
> add  
> start  
> stop  
> tick  

* Animation构造器生成不同种类的动画
> DistanceAnimation  
> ColorAnimation  



















#45-前端训练营
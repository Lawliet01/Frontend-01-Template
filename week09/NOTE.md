# 每周总结可以写在这里

## 重学CSS动画

1. Animation 的属性以及@keyframe的使用
* Animation的属性包含：
> animation-name  
> animation-duration  
> animation-timing-function:  
> animation-delay:  
> animation:infinite;  
> animation-direction:alternate  
* 例子：
> animation：example 5s linear 2s infinite alterante  

* @keyfame例子
```
@keyframes name{
    from {background-color:red}
    to {background-color:yellow}
 }
```

2. transition属性
* 包含：
> transition-property  
> transition-duration  
> transition-timing-function  
> transition-delay  
* 例子
>  transition：width 2s ease-in-out；  

3. cubic-bezier曲线：
* 参考：https://cubic-bezier.com/#.33,-0.73,.49,.91

4. 渲染与颜色：
* HSL与HSV的区别。
* 固定纯度、明度，只换色调可以实现老师上课所举的例子。

5. 形状：
> border  
> box-shadow  
> border-radius  
* 不要使用CSS特性做形状
* 使用data uri+svg做形状。

## 重学HTML

1. SGML&DTD
* 参考https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

2. HTML语义：
* 通过分析维基百科的例子来学习HTML语义

3. node的类型：
* 12种(括号里面为noteType)
> Node.Element_Node(1)  
> Node.ATTRIBUTE_NODE(2)  
> Node.TEXT_NODE(3)  
> Node.CDATA_SECTION_NODE(4)  
> Node.ENTITY_REFERENCE_NODE(5)  
> Node.ENTITY_NODE(6)  
> Node.PROCESSING_INSTRUCTION_NODE(7)  
> Node.COMMENT_NODE(8)  
> Node.DOCUMENT_NODE(9)  
> Node.DOCUMENT_TYPE_NODE(10)  
> Node.DOCUMENT_FRAGMENT_NODE(11)  
> Node.NOTATION_NODE(12)  

4. 字符引用
* &#161;
* &amp;
* &lt;
* &quot;
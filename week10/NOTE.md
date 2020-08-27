
# HTML

* SGML&DTD
* HTML语义（根据维基百科来分析）
* 合法元素
> Element: <tagname></tagname>  
> Text: text  
> Comment: <!— comments —>  
> DocumentType <!Doctype html>  
> ProcessingInstruction <?a !?>  
> CDATA: <!CDATA[]>  


* 字符引用
> &#161  
> &amp  
> %lt  
> &quot  


## 重学DOM

DOM分类
> DOM Tree  
> Events  
> Range  
> Traversal  


* 导航类操作
> parentNode  
> childNodes  
> firstChild  
> lastChild  
> nextSibling  
> previousSibling  
* childNodes会实时的变化，是living connection。

* 修改操作
> appendChild  
> insertBefore  
> removeChild  
> replaceChild  
* 一个元素二次插入的时候，第一次插入的位置会自动被移除

* event
> 捕获与冒泡  
-> 通过addEventListener的第三个参数可以设置


## Range

* Range API
* 需要精确操作元素的时候、或要操作海量节点的时候，使用rangeAPI

-> 必要
> var range = new Range()  
> range.setStart(element, 9)  
> range.setEnd(element, 4)  
> var range = document.getSelecttion().getRangeAat(0)  
-> 快捷
> range.setStartBefore  
> range.setEndBefore  
> range.setStartAfter  
> range.setEndAfter  
> range.selectNode  
> range.selectNodeContents  

* 通过range可以在文本与文本之间插入
> var fragment = range.extractContents  
> range.insertNode(document.createTextNode("aaa"))  



**CSSOM**
* HTML能做的，DOM都能做
* 用CSS能做的在CSSOM都能做
* CSSOM可以加伪元素、改伪元素样式

* document.styleSheets

* CSSStyleSheet 的 一些方法：
> document.styleSheets[0].cssRules  
> document.styleSheets[0].insertRule("p {color: pink}", 0)  
> document.styleSheet[0].removeRule(0)   

* CSSRule的值
> CSSStyleRule  
> CSSCharsetRule  
> CSSImportRule  
> CSSMediaRule  
> CSSFontFaceRule  
> CSSPageRule  
> CSSPageRule  
> CSSNamespaceRule  
> CSSKeyframesRule  
> CSSKeyframesRule  
> CSSSupportRule  

* window.getComputedStyle


**data协议**

* data:image/svg+xml
* data:text/css, p%7Bcolor:blue%7D
> 这个可以在stylesheet里面的link直接用  



**CSSOM view**

* window.open
* window.scrollX
* window.scrollY
* element.scrollTop
* element.scrollLeft

* element.getClientRects()返回的是一个数组，多少个行盒就有多少个元素（inline元素会产生多个行盒）
* element.getBoundingClientRect() 返回的是最外层的rect。

* window.innerHeight
* window.innerWidth
* window.outerWidth
* window.inner

* window.devicePixelRatio(物理像素与实际像素的比值)








#45-前端训练营
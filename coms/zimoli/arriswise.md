替换已知函数中的方向属性(left,top,width,height,x,y等)，生成转置函数。
如：
```javascript
var 水平方向操作 = function(elem,event){
    var top = event.clientY - elem.offsetTop;
};
var 垂直方向操作 = function(elem,event){
    var left = event.clientX - elem.offsetLeft;
};
等同于:
var 垂直方向操作 = arriswise(水平方向操作,arguments);
```
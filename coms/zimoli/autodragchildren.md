子项拖拽工具，两种用法可配合使用
```javascript
// 启用元素内的拖拽排序
autodragchildren(元素, 子项过滤器, function(fromIndex,toIndex){
    // 此回调函数可用于处理数据，也可以什么都不做
    // 如果返回false 元素位置将不被调换
});
// 对已捕获的事件启用拖拽
autodragchildren.hook(event, target/*用于向用户展示拖拽效果的元素*/,function (接收拖拽的元素/*此元素应具有 allowdrop 属性*/)  {
});
```
更具体的用法可参考代码 [](https://github.com/yunxu1019/qfy/blob/master/page/home/edit.js)
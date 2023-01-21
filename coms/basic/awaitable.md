把一个类似Image对象转换成可以被`await`的对象，即附加一个then方法，当onload事件触发或complete属性为真时完成。
如：
```javascript
    var img = new Image;
    img.src = 图像路径;
    await awaitable(img); // 等待加载完成
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(img,0,0); // 此时已可以直接绘制
```
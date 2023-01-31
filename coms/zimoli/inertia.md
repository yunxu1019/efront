非线性减速插值工具，可用于用户的滚动或拖动操作平滑停止
```javascript
    var f = inertia(function(a){
        // 一个参数或多个参数，都应为有限的数值，未对其他情况进行测试或排错
        console.log(a);
    });
    f(2);
    await new Promise(ok=>setTimeout(ok,20));
    f(2);
    f.smooth(function(){
        // 结束时的回调，可不传入
    }, 最小可用速度/*高维空间中参数向量的模，可不传入*/);
```
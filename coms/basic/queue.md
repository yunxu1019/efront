依次传入数组中的数据，执行可能生成Promise的函数，类似如下代码：
```javascript
    for await(func());
    或:
    for (){await func();}
```
用法如下：
```javascript
queue.call(数组,func,最大并发数);
```
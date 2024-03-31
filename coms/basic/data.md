用于简化网络请求的封装。在浏览器环境中正常可用，nodejs环境下目前仅部分功能可用，且与浏览器有出入。

## 配置

在nodejs环境中暂不能从xml数据中查询子节点的数据，传入的选择器将干扰最终得到的数据
```javascript
    // 请求名与请求方法、请求路径的映射关系，双层结构
    // 每个请求名将生成一个接口对象(apiObj)
    //    基础路径 头信息?:
    //        请求的标识1(requestId): 方法1 路径1
    //        请求的标识2(requestId): 方法2 路径2
    //        请求的标识3(requestId): 方法3 路径2
    data.setConfig(requestMap)
    // 在浏览器环境中可传入相对路径，nodejs环境中暂未测试
    data.loadConfig(configUrl)
```
* 前边两个方法都是把配置加载到全局，下面的方法将生成一个新的请求工具，但生成的功能只有请求网络的功能，返回结果不会包装成周期存储的实例

```javascript
    data.enrich(requestMap);
    data.enrich(configUrl);
```

## 请求网络
* 不使用`await`时返回结果是周期存储的数据实例，网络请求后会用返回的数据填充这个实例。
* 使用`await`时结果是返回的数据。
```javascript
    data.fromURL(url)
    data.postURL(url,params)
    data.fromApi(apiObj)
    data.from(自动识别参数类型)
    // 以上几个方法均可以用 await 等待请求的结果
    await data.from(...);
```

## 周期存储

当sessionStorage和localStorage可用时，可将数据的生命周期延长
如果rememberWithStorage传入false，不延长
否则，如果!!rememberWithStorage为false，只存储到sessionStorage
否则，即!!rememberWithStorage为true，存储到localStorage
* 在nodejs环境中记忆周期未做延长，程序退出即消失
```javascript
    var instance1 = data.getInstance(instanceId);
    data.setInstance(instanceId,obj2,rememberWithStorage?);
    obj2的数据将同步到instance1
    这两个方法可以在不同作用域中同步数据，也可用于页面或组件传参
```

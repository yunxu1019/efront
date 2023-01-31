网络请求工具
```javascript
    var xhr = await cross(请求方法,请求路径,头信息).send(数据);
    console.log(xhr.response) // 已对不存在response属性的浏览器做兼容，可放心使用
```
默认会通过当前服务器转发请求，请求结果会附加跨域头信息，可以通过`cross.addDirect`指定免转发的服务器
如：
```javascript
    cross.addDirect('efront.cc');
    或:
    cross.addDirect(/efront\.cc$/);
```
对于无服务器项目或不使用efront做为服务器的项目，也可以通过`cross.setHost`指定用以转发的服务器，如：
```javascript
    cross.setHost('efront.cc');
```
可以用efront的编译开关区分生成环境和测试环境，如:
```javascript
    cross.setHost('efront.cc');
    // <!--
    // 这里的代码会在live命令中生效
    // 会在build命令中移除
    cross.setHost('localhost');
    // -->
```
# efront 兼容性说明
* `coms/basic_`目录的代码均为非标准实现，如果你要兼容低版本的运行环境，尽量避免使用高级的功能
* 已知在转换成低版本代码后与高级版本有区别的语法如下：
1.  ```javascript
    class ... extends Array {...} 
    ```
    因为如果增加一级原型，数组的特性便会消失，`efront`暂时并没有实现完美的降级方案，未来实现的可能性也不大。类似语句经`typescript`转换后新定义的方法会丢失, `efront` 在降级编译期使用 `class ... extends Array2 {...}` 进行替换，`Array2`会将定义的方法挂载到新生成的对象上。

2. ```javascript
    async function () {
        await ...;
        arguments; // typescript 转换后arguments对象的内容有误
    }
    // 或
    function* (){
        yield ...;
        arguments;
    }
    ```
    这不是一个难解决的问题，应该只是`typescript`已发现但不愿解决的问题。`efront`在降级编译时临时使用变量重命名的方法对代码中的`arguments`进行替换使其内容与原生高级代码一致。

3. ```javascript
    Object.keys
    Object.create
    Array.prototype.map
    Array.prototype.forEach
    Array.prototype.filter
    Array.prototype.indexOf
    String.prototype.trim// 不同的支持环境实现不一致，大厂对空格的理解不一致
    Function.prototype.bind
    ```
    以上几个方法`ie9+`系列浏览器已支持，但`ie8`及以下版本不支持，如果没有指定`--no-polyfill`参数`efront`在降级编译期会使用`[]map.js`中提供的方法进行修补，这些方法会在加载器检测到浏览器不支持`[].map`时进行初始化
4. ```javascript
    Object.assign
    Array.prototype.fill
    ```
    以上两个原生方法`ie`系列浏览器均不支持，由于经常被`efront`开发者使用，在降级编译期，如果没有指定`--no-polyfill`参数，将由`efront`处理成替代品，当前的处理方案如下：
    ```javascript
    Object.assign // 由 extend 替代，见 ../basic/extend.js
    Array.prototype.fill //..将按使用的目的进行不同的替换
    Array(3).fill(0) // 类似这种的将变成[0,0,0]一个常量数组
    var [a,b,c]=Array(3).fill(0).map((_,i)=>i+1) // 类似这种用于生成常量并赋值的，将直接变成赋值语句 var a=1,b=2,c=3
    Array(3).fill(a)// 类似这种非常量的，将由类似 ArrayFill(3,a) 的语句替换
    ```
5. ```javascript
    Promise
    Promise.prototype.then
    Promise.prototype.catch
    Promise.all
    Promise.race
    Promise.reject
    Promise.resolve
    ```
    `Promise`对象也是`ie`系列浏览器均不支持的。`efront`实现的`Promise`与原生的特性并不一致，仅在运行环境不支持的时候进行替代。比如由`.then`触发的方法与`setTimeout`触发的方法执行的先后顺序会与高级的运行环境有所区别，但也会保持在当前语境执行后再执行相关的语句。以上没有提到的`Promise`相关的方法均不支持，如`Promise.prototype.finally`，如果您使用了这些缺失的特性，就只能自己实现或找类似[core-js](https://github.com/zloirock/core-js)的库填充了
6. ```javascript
    obj.if
    obj.catch
    obj.for
    ```
    类似这种用`.`取属性的语句，由于属性名与`js`的保留字一样，`ie6`等浏览器会报错，但您可以在`efront`提供的环境中放心使用。因为`efront`本身就会把取属性的语句处理掉。
7. `ie8`及以下浏览器中存在的一些与现代`js`标准不同的特性，`efront`提供的组件可能不兼容，在处理为这类环境进行应用开发时，应避免使用。
    ```javascript
    Object.defineProperty(...);
    ({
        get a(){},
        set a(){}
    });
    class {
        get a(){}
        set a(){}
    }
    ```
    `ie8`及以下浏览器对`Object.defineProperty`支持的不好或根本不支持，`efront`暂时没有实现这类功能的兼容方案。如果您要兼容相应的环境，请暂时避免使用相关的语句，也不要使用使用了这些特性的库。
    ```javascript
    Array.prototype.slice.call(objNodeList,...)
    ```
    `ie8`及以下浏览器不支持`this`指向`NodeList`等dom对象，而当前`efront`和内部使用的`typescript`转换的代码都没有处理这一细节，所以暂时不要在dom操作相关的语句中使用高级语法，以避免转换后的代码出问题。
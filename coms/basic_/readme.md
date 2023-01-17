# efront 兼容性说明
* `coms/basic_`目录的代码均为非标准实现，如果你要兼容低版本的运行环境，尽量避免使用高级的功能
* 当前的`efront`进行代码降级时用到了`typescript`，所以下文有些问题的描述会误伤`typescript`，不用觉得奇怪。
* 已知在转换成低版本代码后与高级版本有区别的语法如下：
1.  ```javascript
    class ... extends Array {...} 
    ```
    因为如果增加一级原型，数组的特性便会消失，`efront`暂时并没有实现完美的降级方案，未来实现的可能性也不大。类似语句经`typescript`转换后新定义的方法会丢失, `efront` 在降级编译期使用 `class ... extends Array2 {...}` 进行替换，`Array2`会将定义的方法挂载到新生成的对象上。

2. ```javascript
    import(...)
    ```
    用`import(...)`导入的结果，efront不会主动包装一层Promise，如果你在模块的根作用域中中使用了`await`，返回结果就是一个`Promise`的实例，否则你在导入的文件内导出了什么，这个`import(...)`的结果就是什么。如果你不确定导入文件的内容，不盲目使用`import(...).then(...)`这类的方法，可以使用`await import(...)`等待导入完成。
3. ```javascript
    (function (a){
        if (a === void 0) a = 1;
        a = 1;
        console.log(arguments[0])// 1
    }(0));
    (function (a){"use strict"
        if (a === void 0) a = 1;
        a = 1;
        console.log(arguments[0])// 0
    }(0));
    (function (a = 1){
        a = 1;
        console.log(arguments[0])// 0
    }(0));
    ```
    非严格模式且没有默认值的`arguments`是会被代码中的语句改掉的，而其他两种情况不会。`efront`和`typescript`在把默认值赋值的语句移动到函数体内时，都没有处理这一细节，即原来只读的`arguments`可能被函数内的语句改掉。`efront`内提供的一些组件，可能也会有一部分有因此而无法降级使用的问题，如果您发现了相关的问题，可以向我反馈，我会尽快处理。

4. ```javascript
    async function () {
        await ...;
        arguments;
    }
    // 或
    function* (){
        yield ...;
        arguments;
    }
    ```
    `typescript` 转换这两类新型函数后，`arguments`对象的内容有误。这不是一个难解决的问题，应该只是`typescript`已发现但不愿解决的问题。`efront`在降级编译时临时使用变量重命名的方法对代码中的`arguments`进行替换使其内容与原生高级代码一致。

5. ```javascript
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
6. ```javascript
    Array.prototype.fill
    Array(3).fill(0) // 类似这种的将变成[0,0,0]一个常量数组
    var [a,b,c]=Array(3).fill(0).map((_,i)=>i+1) // 类似这种用于生成常量并赋值的，将直接变成赋值语句 var a=1,b=2,c=3
    Array(3).fill(a)// 类似这种非常量的，将由类似 ArrayFill(3,a) 的语句替换
    ```
    `Array(...).fill(...).map(...)`这种写法经常被`efront`开发者用来生成自增赋值序列，并且非所有运行环境都支持，所以包括其它显式用到`Array.prototype.fill`的几种写法都会被替换。为了目标代码的性能考虑，这种替换在自动常量化之前就要执行，所以不再支持用`polyfill`的开关进行关闭。如果要关闭，请使用参数`--no-autoeval`将自动常量化的功能一同关闭。

7. ```javascript
    Object.assign
    ```
    Object.assign,`ie`系列浏览器均不支持，由于经常被`efront`开发者使用，在降级编译期，如果没有指定`--no-polyfill`参数，将由`efront`处理成替代品[extend](../basic/extend.js)
8. ```javascript
    Promise
    Promise.prototype.then
    Promise.prototype.catch
    Promise.all
    Promise.race
    Promise.reject
    Promise.resolve
    ```
    `Promise`对象也是`ie`系列浏览器均不支持的。`efront`实现的`Promise`与原生的特性并不一致，仅在运行环境不支持的时候进行替代。比如由`.then`触发的方法与`setTimeout`触发的方法执行的先后顺序会与高级的运行环境有所区别，但也会保持在当前语境执行后再执行相关的语句。以上没有提到的`Promise`相关的方法均不支持，如`Promise.prototype.finally`，如果您使用了这些缺失的特性，就只能自己实现或找类似[core-js](https://github.com/zloirock/core-js)的库填充了
9.  ```javascript
    obj.if
    obj.catch
    obj.for
    ```
    类似这种用`.`取属性的语句，由于属性名与`js`的保留字一样，`ie6`等浏览器会报错，但您可以在`efront`提供的环境中放心使用。因为`efront`本身就会把取属性的语句处理掉。
10. `ie8`及以下浏览器中存在的一些与现代`js`标准不同的特性，`efront`提供的组件可能不兼容，在处理为这类环境进行应用开发时，应避免使用。
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
    `ie8`及以下浏览器不支持call`NodeList`等dom对象，而当前`efront`和内部使用的`typescript`转换的代码都没有处理这一细节，所以暂时不要在dom操作相关的语句中使用类似`[...aaa]`,`{...aaa}`,`function(...args){}`的高级语法，以避免转换后的代码出问题。
    ```javascript
    var div = document.createElement("div");
    div.innerHTML = `<abcd><span></span></abcd>`;
    console.log(div.innerHTML); // <SPAN></SPAN>
    ```
    `ie8`及以下浏览器无法正确地通过`innerHTML`属性设置自定义标签，`efront`提供的大部分组件都使用了这一特性，`efront`示例项目中[ie8.js](../../apps/kugou/ie8.js)可以实现`ie8`上设置`innerHTML`的适配，但不能保证样式正常，对于`ie7`及以下的浏览器，就暂时别用`efront`提供的与元素相关的组件了。
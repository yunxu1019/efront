# efront compatibility instructions
* The code for the directory `coms/basic_` is all non-standard implementations. If you want to be compatible with lower versions of the runtime environment, try to avoid using advanced features as much as possible
* 3.x and previous versions of `efront` used `typescript` for code downgrade, so the description of some issues in the following text may accidentally harm `typescript`, so it's not surprising.
* The syntax that is known to differ from advanced versions after conversion to lower version code is as follows:
1.  ```javascript
    class ... extends Array {...} 
    ```
    Because if one level of prototype is added, the characteristics of the array will disappear, and `efront` has not yet implemented a perfect downgrade plan, and the possibility of future implementation is also unlikely. After similar statements are converted by `typescript`, the newly defined methods will be lost. `efront` uses `class extends Array2 {...}` will be replaced, and `Array2` will mount the defined method to the newly generated object.

2. ```javascript
    import(...)
    ```
    The result imported with `import (...)`, efront will not actively wrap a layer of Promise. If you use `await` in the root scope of the module, the returned result is an instance of `Promise`. Otherwise, what you export in the imported file will be the result of this `import(...)`. If you are unsure about the content of the imported file and do not blindly use methods such as `import(...).then (...)`, you can use `await import(...)` to wait for the import to complete.

3. ```javascript
    import.meta
    import.meta.url
    import.meta.resolve()
    new.target
    ```
    If the above features are used, the compilation can be successful, but it is inconsistent with the content of the native high-level code. Where `import.meta.url` will be the relative path (excluding` file:///... `), and does not include `?` or `#`. the `new.target` will always be `undefined` and should not be used as much as possible.

4. ```javascript
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
    `arguments` that are not in strict mode and do not have default values will be changed by statements in the code, while the other two cases will not. When the `efront` and `typescript` move the default value assignment statement into the function body, they do not handle this detail, that is, the original read-only `arguments` may be changed by the statement inside the function. Some of the components provided in efront may also have issues that prevent them from being downgraded for use. If you find any related issues, please feel free to provide feedback to me and I will handle them as soon as possible.

5. ```javascript
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
    After converting these two types of new functions with `typescript`, the content of the `arguments` object is incorrect. This is not a difficult problem to solve, it should just be a problem that `typescript` has discovered but is unwilling to solve. During downgrade compilation, use variable renaming to temporarily replace the `arguments` in the code to make its content consistent with the native high-level code.

6. ```javascript
   async function(data){
        var reg = /abc/ig,res;
         // If concurrent calls are required, a new object needs to be copied here
        reg = new RegExp(reg.source, reg.flags)
        while(res = reg.exec(data)){
            await ...;
        }
   }
   ```
    Because `efront` extracts regular expressions, the same regular expression has only one singleton object globally. If you want to use it concurrently, please temporarily copy an instance before use.

7. ```javascript
    Object.keys
    Object.create
    Array.prototype.map
    Array.prototype.forEach
    Array.prototype.filter
    Array.prototype.indexOf
    String.prototype.trim// Inconsistent implementation in different support environments, and inconsistent understanding of whitespace by major manufacturers
    Function.prototype.bind
    ```
    The above methods are supported by the `ie9+` series of browsers, but not by the 'ie8' and the following versions. If the `--no-polyfill` parameter is not specified, the methods provided in `[]map.js` will be used to patch during the downgrade compile time. These methods will be initialized when the loader detects that the browser does not support `[].map`

8. ```javascript
    Array.prototype.fill
    Array(3).fill(0) // Similar to this will become a constant array of [0,0,0]
    var [a,b,c]=Array(3).fill(0).map((_,i)=>i+1) // Similar to those used to generate constants and assign values, they will directly become assignment statements: var a=1,b=2,c=3
    Array(3).fill(a)// A statement similar to ArrayFill(3, a) will replace a very large quantity like this
    ```
    `Array(...).fill(...).map(...)`  is often used by `efront` developers to generate self increasing assignment sequences, and not all runtime environments support it. Therefore, several other writing methods that explicitly use `Array.prototype.fill` will be replaced. For the sake of the performance of the Object code, this replacement must be executed before the automatic constant. Therefore, the switch `polyfill` is no longer supported. If you want to turn off, please use the parameter `--no-autoeval` to turn off the automatic constant function together.

9. ```javascript
    Object.assign
    ```
    Object.assign and `ie` series browsers are not supported. Because they are often used by `efront` developers, during the downgrade Compile time period, if the '--no-polyfill' parameter is not specified, `efront` will be processed as a substitute [extend](../basic/extend.js)

10. ```javascript
    Promise
    Promise.prototype.then
    Promise.prototype.catch
    Promise.all
    Promise.race
    Promise.reject
    Promise.resolve
    ```
    The `Promise` object is also not supported by the IE series of browsers. The `Promise` implemented by `efront` is not consistent with the native features and is only replaced when the runtime environment does not support it. For example, the execution order of methods triggered by `.then` and `setTimeout` may differ from the advanced runtime environment, but they will also remain executed in the current context before executing the relevant statements. The `Promise` related methods not mentioned above are not supported, such as `Promise.prototype.finally`. If you use these missing features, you can only implement them yourself or find similar [core js](https://github.com/zloirock/core-js). The library is filled with

11.  ```javascript
    obj.if
    obj.catch
    obj.for
    ```
    Similar to this. As the attribute name is the same as the Reserved word of 'js', the browser such as `ie6` will report an error, but you can use it safely in the environment provided by `efront`. Because `efront` itself will process statements that retrieve attributes.

12. There are some features in `IE8` and below browsers that are different from modern 'js' standards, and the components provided by `efront` may not be compatible. When developing applications for such environments, it is important to avoid using them.
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
    `IE8` and below browsers do not support `Object.defineProperty` well or at all, and there is currently no compatibility solution for `efront` to implement this type of function. If you want to be compatible with the corresponding environment, please temporarily avoid using related statements and do not use libraries that use these features.

    ```javascript
    Array.prototype.slice.call(objNodeList,...)
    ```
    `IE8` and below browsers do not support dom objects such as 'NodeList' to call, and the current `efront` and previously used `typescript` conversion code do not handle this detail. Therefore, do not use high-level syntax such as `[...aaa]`, `{...aaa}` , and `function (...args) {}` in dom operation related statements temporarily to avoid problems with the converted code.

    ```javascript
    var div = document.createElement("div");
    div.innerHTML = `<abcd><span></span></abcd>`;
    console.log(div.innerHTML); // <SPAN></SPAN>
    ```
    `IE8` and below browsers cannot correctly set custom labels through the `innerHTML` attribute, and most of the components provided by `efront` use this feature. In the `efront` example project, [ie8.js](../../apps/kugou/ie8.js) can achieve the adaptation of setting `innerHTML` on `ie8`, but it cannot guarantee the normal style. For browsers under `ie7` and below, do not use the components related to elements provided by `efront` temporarily.
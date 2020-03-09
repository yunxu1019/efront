
# efront 思想
1. 每个文件只导出一份数据，这一份数据可以是 number,string,function,object,bigint,null,undefined 中的任意一种
2. 文件名即变量名，在其他文件中引用当前文件导出的变量，只要使用当前文件的文件名（不含后缀）即可
3. 无环形引用（相互调用：a引用b，b引用a；首尾引用：a引用b，b引用...c，c引用a）
4. 减少异步io的时间，应用启动过程只加载有用代码，启动完成后等待用户操作的同时预加载下一步的代码
5. 版本局部更新，异步加载的每一份代码拥有一个独立的版本号，在版本信息无变化时不重复加载

# 基本命令（适用于windows）

##    1. 下载安装
efront 运行在nodejs环境下，请在安装nodejs环境后使用[https://nodejs.org](https://nodejs.org)。
从npm全局安装efront

```bat
npm install -g efront
```

##    2. 创建项目

```bat
set app=PROJECT_NAME
efront init
```
其中`PROJECT_NAME`为你的项目的名称

##    3. 开发环境启动

如果80端口不可用，请修改http_port环境变量

```bat
set HTTP_PORT=8080
```
开启本机服务，在访问端口时不对代码进行压缩

```bat
efront test
```

##    4. 压缩编译项目
默认将编译输出的目标代码保存到public目录
可以把public目录的代码发布到任意服务器上
```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront public
```
其中`PUBLIC_PATH`为发布路径

* 如果是要发布在服务器上，不建议使用以`.html`结尾的方式发布，将异步加载的代码写入独立的文件

* 如果要导出本地可以访问的项目，可以设置一个以`.html`结尾的项目名，将异步加载的代码合并到首页文件

```bat
set app=PROJECT_NAME.html
```

* 如果要导出组件，可以设置一个以`.js`结尾的项目名
```bat
set app=PROJECT_NAME.js
```
* 目前版本的efront提供对 commonjs中的require语法和es6中的import语法 的不完全支持（不支持异步环形调用），对于符合要求的相关项目，可以进行编译发布。
* 如果要发布含有require语法的组件，并希望将组件及所有依赖项合并输出，那么可以将上面的`efront public`替换为`efront publish`

##    5.生产环境启动
开启本机服务器，并在访问端口时压缩输出
```bat
efront start
```

##    6.Watch模式
监测文件变化，自动编译更新的部分并输出到指定目录
```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront watch
```

##    7.启动Demo，可以在浏览器查看效果
```bat
efront demo
```

##   8.组件库举例服务器，可以在浏览器查看一级组件
```bat
efront docs
```

##   9.直接将当前目录作为服务器目录
```
efront
```


# 目录说明

01. _envs 环境配置存放位置
02. apis 对外公开的接口，可通过https post方式访问
03. apps 静态app页面通过get或post方式访问
04. coms 组件库
05. public 静态资源发布目录，用于存放编译的目标文件

# 配置项说明
 * `APP` 应用名，影响最终生成应用的路径和默认的源文件路径
 * `PAGE_PATH` 页面文件所存放的根路径，默认为`./apps`
 * `COMM_PATH` 组件文件所存放的根路径，如果存在多个，可以用 `,` 分割，可以使用 `:` 指定为`efront`所提供的组件的路径，默认为`./coms`
 * `PUBLIC_PATH` 发布的目标根路径，最终生成的代码路径为`PUBLIC_PATH\APP`，如果此项被指定为`PAGE_PATH`，efront将禁用发布功能，在执行`efront start`后，可以通过浏览器访问压缩版本的代码
 * `PUBLIC_EXTT` 发布的目标代码的扩展名，默认无扩展名
 * `PAGE` 页面文件存放的路径，默认为应用名`APP`
 * `COMM` 组件文件存放的路径，默认为应用名加efront默认组件库`APP,zimoli`
 * `PREFIX` 发布时指定组件className前缀，默认无前缀

# 功能选项
* efront 启动的服务器，默认提供跨域中转的功能，可以在index.html的头部脚本中设置`window.cross_host='https://somehost/'`指定一个具体的efront服务器实例供cross方法使用
* efront 默认禁用了首页的缓存功能，如果要启用，可以在头部script中加入 `window.preventCache=false;`
* efront 默认禁止在iframe中运行，如果要开启，可以在头部script中加入 `window.PREVENT_FRAMEWORK_MODE=false;`
* efront 默认的初始化脚本是`zimoli('/main');`，可以在body标签上加上`main-path=...`属性指定初始化脚本的路径
* efront 默认将`page_path`指向的路径中的`.ts,.js,.less,.html`文件识别为页面文件，可以在index.html加上`<script src='libpath/*' type=deleteoncompile></script>`，其中`libpath/*`指向静态文件的路径，efront编译过程将识别并做出正确的处理

# 注意事项
* efront 为组件生成的较长的 `className` 选择器 (含中划线，如`.comm-button`)可能会发生变化，如果要为嵌入的组件设置样式，可以使用 efront 为其生成的较短的 `className` 选择器 (不含中划线`-`，如`.button`)
* efront 将不在首字符位置的`$`识别为快捷分割符，以便以变量名的方式引入多级文件夹中的模块，文件命名时不要在文件名的中间位置使用`$`符号

# efront 对比angular/react/vue

* efront 是一个开发环境，不是一个依赖库，同时efront提供了浏览器模式的组件库 `zimoli` ，该组件库以离散功能的方式提供，允许使用但不强制使用任何一项。
* 这里只摆事实，不做评价。类似vue官方“贬低他人抬高自己”的行为不为efront所齿。
* 后文web部分的对比，使用efront环境下的`zimoli`组件库作为参考

## 表面参数对比

| 对比项\框架 | angular  | react    | vue   | efront/(zimoli) |
|--|--|--|--|--|
Hello World 目标代码 | &gt;30kb | &gt;30kb | ≈20kb;| ≈1kb;
开发语言             | ts/html/less/sass/scss | jsx/css/js/ts/html | vue/html/css/js | js/html/less/ts
导出组件依赖项|angular|react|vue|无
官方路由 | angular-router | react-router | vue-router | zimoli
跨域实现 | 配置浏览器或服务器 | 配置浏览器或服务器| 配置浏览器或服务器 | 开发环境内置
代码加载方案 | 一次加载/或访问时加载 | 一次加载/或访问时加载 | 一次加载/或访问时加载 | 依赖加载/自动预加载/动态路径访问时加载 
跳转传参 | 略 | 略 | 略 | go(pagepath,&nbsp;params)
异步对象传参 | 略 | 略 | 略 | cast(target,&nbsp;data) <br/> care(target,&nbsp;handle)

## 层级对比

1. angular 1~9

* root
    * --module
        * --component
        * --component
    * --module
        * --component
        * --component

2. react

* root
    * --component
    * --component

3. vue

* root 
    * --component
    * --component

4. efront/lib
    * --component
    * --component
    * --component


## 语法对比
1. 条件结构
```html
<!-- angular 1.x -->
<component1 ng-if="expression" ></component1>
<!-- angular 2+ -->
<component1 *ngIf="expression" ></component1>
 ``` 

```jsx
// react render() 中使用jsx 语法
render(){
    return expression ? <Component1></Component1> : null
}
```
```html
<!-- vue 以 v- 开头--> 
<component1 v-if="expression"></component1>
```


```html
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-if="expression"> </component1>
<!-- 或者 -->
<component1 v-if="expression"> </component1>
<!-- 或者任意前缀 -->
<component1 x-if="expression"> </component1>
<!-- 下文中以ng-开头的efront说明都可以修改前缀 -->
```

2. 循环结构
```html
<!-- angular 1.x -->
<component1 ng-repeat="(item,index) in expression" ></component1>
<!-- angular 1.x -->
<component1 ng-repeat="item in expression" ></component1>
<!-- angular 2+ 结构语法 -->
<component1 *ngFor="let item of expression;let index=index" ></component1>
<!-- angular 2+ 指令语法 -->
<component1 ngFor [ngForOf]="expression" let-item let-index></component1>
 ``` 

```jsx
// react render() 中使用map语法
render(){
    return expression.map((item,index)=><Copoment1></Component1>)
}
```
```html
<!-- vue 以 v- 开头--> 
<component1 v-for="(item,index) in expression"></component1>
<!-- vue 以 v- 开头--> 
<component1 v-for="item in expression"></component1>
```


```html
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-repeat="(item,index) in expression"></component1>
<component1 v-for="(item,index) in expression"></component1>
<component1 ng-repeat="item in expression"></component1>
<component1 v-for="item in expression"></component1>

```

3. 数据绑定

```html
<!-- angular 1.x -->
<component1 ng-bind="expression" ></component1>
<image ng-src="expression" />
<!-- angular 2+ -->
<component1 [innerText]="expression" ></component1>
<image [src]="expression" />
<!-- angular 1+ -->
<component1 >{{expression}}</component1>
<image src="{{expression}}" />
 ``` 

```jsx
// react render() 使用jsx 语法
render(){
    return <Component1> { expression } </Component1>
}
```
```html
<!-- vue 以 v- 开头--> 
<component1 >{{expression}}</component1>
<image v-bind:src="expression" />
<image :src="expression" />
```


```html
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-bind="expression"></component1>
<image _src="expression" />
<image .src="expression" />
<image :src="expression" />
<image @src="expression" />
```

4. 双向/逆向/事件绑定

```html
<!-- angular 1.x -->
<input ng-model="expression" />
<button ng-click="expression" ></button>
<!-- angular 2+ -->
<component1 [ngModel]="expression" ></component1>
<component1 (click)="expression" ></component1>
```

```jsx
// react render() 使用jsx 语法
render(){
    return <Component1 onClick={expression}> </Component1>
}
```
```html
<!-- vue 以 v- 开头--> 
<component1 v-model="expression" ></component1>
<component1 v-on:click="expression" ></component1>

```


```html
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-model="expression"></component1>
<component1 ng-click="expression"></component1>
```

5. 定义web组件
```typescript
//  angular 1.x 
 var app=angular.module("modulename");
 app.directive("component-name",[
     "$rootScope",//依赖项
     function($rootScope){
        return {
            restrict: 'E',//元素
            restrict: 'A',//属性
            transclude: true,//内容
            replace: true,//是否替换
            template:"<template-string></template-string>",//模板字符串
            template:function(elem,attr){//模板构造方法
            },
            templateUrl:"...",//模板路径
            scope:{//私有参数
                paramKey1:"=",//双向绑定
                paramKey1:"=?",//可以无逆向
                paramKey1:"@",//字符串参数
            },
            compile(elem,attr,trans){
                //自定义编译器
                return function(scope,elem,attr,ctrl,transclude){};
            },
            link(scope,elem,attr,ctr,transclude){
                // 编译器更底层的方法
            },
        };
 }]);
//  angular 2+ 
@Component({
    template:'',
    templateUrl:'',
    stylesUrl:[],
    styles:[],
})
class ComponentName implements OnChanges,AfterViewInit,OnInit,OnDestroy{
    @Input() params1,
    @Input() params2,
    @Output() event1,
    @Output() event2,
    constructor(){
    }
    ngOnInit(){
        // 初始化
    }
    ngOnDestroy(){
        // 销毁
    }
    ngOnChanges(){
        // 参数变化时触发
    },
    ngAfterViewInit(){
        // 渲染完成后触发
    }
}
```

```jsx
// react render() 使用jsx 语法
import React, { Component } from 'react';
import { render } from 'react-dom';

class ComponentName extends Component {
    constructor(props){}
    componentWillMount(){}
    componentDidMount(){}
    componentWillReceiveProps(){}
    shouldComponentUpdate(){}
    componentWillUpdate(){}
    componentDidUpdate(){}
    componentWillUnmount(){}
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}
```
```html
<!-- vue --> 
<template>
    <component><component>
</template>
<script>
   var component = Vue.component("component-name",{/* config*/});
    export default component;
<script>
<style></style>
```


```javascript
// efront/(zimoli) 使用 render(element,scope)功能

var htmlFileData={toString(){
    // 如果有同名的html文件，将自动生成类似的代码
    // 渲染前的一次性绑定可以在这里进行
    return `<btn></btn>文件内容${i18n.key1}`;
}};
var i18n={key1:value1};

function main(elem){
    // 构造方法
    // 可以使用已挂载或未挂载的元素
    // 可以使用传入的元素或者创建一个新的元素；
    elem = elem || document.createElement("div");
    elem.innerHTML = htmlFileData;
    onappend(elem,function(event){
        // 挂载之后触发，必要时可以绑定
    });
    onremove(elem,function(event){
        // 移除之前触发，必要时可以绑定
    });
    var scope = {
        // html内使用的内容要在这里出现
        btn: button, // 内部组件可以在渲染前重命名，以简化html中的tagName，方便在局部语境中编写和阅读
    };
    render(elem,scope);// 如果不使用，导出原生组件
    // 如果存在同名的less文件，编译时自动绑定
    return elem // 如果不传出，原有的元素不会被替换
}
```

# efront 对比angular/react/vue

* efront 是一个开发环境，不是一个依赖库，同时efront提供了浏览器模式的组件库 `zimoli` ，该组件库以离散功能的方式提供，允许使用但不强制使用任何一项。
* 这里只摆事实，不做评价。类似某e官方“贬低他人抬高自己”的行为不为efront所齿。
* 后文web部分的对比，使用efront环境下的`zimoli`组件库作为参考

## 表面参数对比

| 对比项\框架          | efront/(zimoli)                                                        | angular                            | react                            | vue                            |
| -------------------- | ---------------------------------------------------------------------- | ---------------------------------- | -------------------------------- | ------------------------------ |
| Hello World 目标代码 | ≈1kb;                                                                  | &gt;30kb                           | &gt;30kb                         | ≈30kb;                         |
| 开发环境启动时间     | ≈0s;                                                                   | &gt;2s                             | &gt;2s                           | >2s                            |
| 开发语言             | js/html/less                                                          | ts/html/less/sass/scss             | jsx/css/js/ts/html               | html/css/js                    |
| 导出组件依赖项       | 无                                                                     | angular                            | react                            | vue                            |
| 官方路由             | zimoli，使用前无需注册路径                                             | angular-router, 使用前需要注册路径 | react-router, 使用前需要注册路径 | vue-router, 使用前需要注册路径 |
| 跨域实现             | 开发环境内置                                                           | 配置浏览器或服务器                 | 配置浏览器或服务器               | 配置浏览器或服务器             |
| 代码加载方案         | 依赖加载/自动预加载/手动预加载`preapre('/page/path');` / 动态路径访问时加载 | 一次加载/或访问时加载              | 一次加载/或访问时加载            | 一次加载/或访问时加载          |
| 跳转传参             | `go`(pagepath,&nbsp;params)                                            | 略                                 | 略                               | 略                             |
| 异步对象传参         | `cast`(target,&nbsp;data) &#013;&#010; `care`(target,&nbsp;handle)     | 略                                 | 略                               | 略                             |

## 架构对比

### 1. efront/zimoli

efront环境下，用户在隔离的环境中直接操作或创建dom元素，zimoli/render负责元素之间的组装和绑定。

### 2.  angular 1~9

angular1将视图和逻辑隔离，js可通过更新scope上的数据以达到更新视图的目的，用户在视图上的输入可通过绑定关系自动同步到scope，后angular2+将scope抽象为typescript的class的实例，其实际用途不变。angular自身的逻辑维护的是数据与视图的绑定关系。

### 3.  react

react 通过虚拟dom与视图保持同步，每次渲染前，通过用户逻辑重构虚拟dom，react则维护虚拟dom与视图的同步。

### 4.  vue

vue使用Object.defineProperty进行数据绑定，与angular通过事件绑定的机制有所区别，但也是将视图与逻辑隔离，维护数据与视图的绑定关系。


## 语法对比

### 1. 条件结构

```xml
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-if="expression"> </component1>
<!-- 或者 -->
<component1 v-if="expression"> </component1>
<!-- 或者任意前缀 -->
<component1 x-if="expression"> </component1>
<!-- 下文中以ng-开头的efront说明都可以修改前缀 -->
```

```xml
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

```xml
<!-- vue 以 v- 开头--> 
<component1 v-if="expression"></component1>
```

### 2. 循环结构

```xml
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-repeat="(item,index) in expression"></component1>
<component1 v-for="(item,index) in expression"></component1>
<component1 ng-repeat="item in expression"></component1>
<component1 v-for="item in expression"></component1>
```

```xml
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

```xml
<!-- vue 以 v- 开头--> 
<component1 v-for="(item,index) in expression"></component1>
<!-- vue 以 v- 开头--> 
<component1 v-for="item in expression"></component1>
```

### 3. 数据绑定

```xml
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-bind="expression"></component1>
<!--  efront/(zimoli) 使用 render(element,scope)功能 设置 js对象属性 element[key]=value -->
<image _src="expression" />
<image .src="expression" />
<image :src="expression" />
<!--  efront/(zimoli) 使用 render(element,scope)功能 设置 元素属性 element.setAttribute(key,value) -->
<image src_="expression" />
<image src.="expression" />
<image src:="expression" />
<image src@="expression" />
```

```xml
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

```xml
<!-- vue 以 v- 开头--> 
<component1 >{{expression}}</component1>
<image v-bind:src="expression" />
<image :src="expression" />
```

### 4. 双向/逆向/事件绑定

```xml
<!-- efront/(zimoli) 使用 render(element,scope)功能 -->
<component1 ng-model="expression"></component1>
<component1 ng-click="expression"></component1>
<component1 @click="expression"></component1>
<component1 v-on:click="expression"></component1>
```


```xml
<!-- angular 1.x -->
<input ng-model="expression" />
<button ng-click="expression" ></button>
<!-- angular 2+ -->
<component1 [(ngModel)]="expression" ></component1>
<component1 (click)="expression" ></component1>
```

```jsx
// react render() 使用jsx 语法
render(){
    return <Component1 onClick={expression}> </Component1>
}
```

```xml
<!-- vue 以 v- 开头-->
<component1 v-model="expression" ></component1>
<component1 v-on:click="expression" ></component1>
<component1 @click="expression" ></component1>
```

### 5. 定义web组件

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
    <component></component>
</template>
<script>
    var component = {
        created(){},
        mounted(){},
        beforeDestroy(){},
        destroyed(){},
        render(){},
        data(){
            return {};
        },
        props:{},
        watch:{},
        methods:{},
        components:{
            component:compoment1
        }
    };
    export default component;
</script>
<style></style>
```


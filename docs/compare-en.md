# efront vs. angular/react/vue

* `efront` is a development environment, not a dependency library. Additionally, `efront` provides a browser mode component library called 'zimoli', which is provided in a discrete functionality manner and allows for but does not enforce the use of any item.

* Here we only present the facts and do not make any evaluations. The behavior of a certain official "belittling others and elevating oneself" is not criticized by efront.
* For the comparison of the web section in the following text, use the `zimoli` component library in the efront environment as a reference

## 表面参数对比

| Comparison item\framework          | efront/(zimoli)                                                             | angular                            | react                            | vue                            |
| -------------------- | --------------------------------------------------------------------------- | ---------------------------------- | -------------------------------- | ------------------------------ |
| Hello World object code | ≈1kb;                                                                       | &gt;30kb                           | &gt;30kb                         | ≈30kb;                         |
| Development environment startup time     | ≈0s;                                                                        | &gt;2s                             | &gt;2s                           | >2s                            |
| development language             | js/html/less                                                                | ts/html/less/sass/scss             | jsx/css/js/ts/html               | html/css/js                    |
| Export Component Dependencies       | 无                                                                          | angular                            | react                            | vue                            |
| Official routing             | zimoli，No need to register a path before use                                                  | angular-router, Path registration is required before use | react-router, Path registration is required before use | vue-router, Path registration is required before use |
| Cross domain implementation             | Built in development environment                                                                | Configure browser or server                 | Configure browser or server               | Configure browser or server             |
| Code loading scheme         | Dependency loading/Automatic preloading/Manual preloading`preapre('/page/path');` / Load on dynamic path access | One load/Or load on access              | One load/Or load on access            | One load/Or load on access          |
| Jump to pass parameters             | `go`(pagepath,&nbsp;params)                                                 | ignore                                 | ignore                               | ignore                             |
| Asynchronous Object Parameter Transfer         | `cast`(target,&nbsp;data) &#013;&#010; `care`(target,&nbsp;handle)          | ignore                                 | ignore                               | ignore                             |

## Architecture Comparison

### 1. efront/zimoli

In the efront environment, users directly operate or create dom elements in an isolated environment, and zimoli/render is responsible for assembly and binding between elements.

### 2.  angular 1~9

Angular1 isolates the view and logic, and JS can update the view by updating the data on the scope. The user's input on the view can be automatically synchronized to the scope through binding relationships. Angular2+abstracts the scope as an instance of a class in typescript, and its actual purpose remains unchanged. Angular's own logic maintains the binding relationship between data and views.

### 3.  react

React maintains synchronization with the view through the virtual dom. Before each rendering, the virtual dom is reconstructed through user logic, while React maintains synchronization between the virtual dom and the view.

### 4.  vue

Vue uses Object. defineProperty for data binding, which is different from the mechanism of event binding in regular, but it also isolates views from logic and maintains the binding relationship between data and views.

## grammatical comparison

### 1. conditional construct

```xml
<!-- efront/(zimoli) with render(element,scope) -->
<component1 ng-if="expression"> </component1>
<!-- or -->
<component1 v-if="expression"> </component1>
<!-- Or any prefix -->
<component1 x-if="expression"> </component1>
<!-- In the following text, the prefix can be modified for the prefix that starts with 'ng-' -->
```

```xml
<!-- angular 1.x -->
<component1 ng-if="expression" ></component1>
<!-- angular 2+ -->
<component1 *ngIf="expression" ></component1>
 ```

```jsx
// react render() Using jsx syntax in
render(){
    return expression ? <Component1></Component1> : null
}
```

```xml
<!-- vue Start with 'v-' --> 
<component1 v-if="expression"></component1>
```

### 2. 循环结构

```xml
<!-- efront/(zimoli) with render(element,scope) -->
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
<!-- angular 2+ structural grammar -->
<component1 *ngFor="let item of expression;let index=index" ></component1>
<!-- angular 2+ directive syntax -->
<component1 ngFor [ngForOf]="expression" let-item let-index></component1>
 ```

```jsx
// react render() Using map syntax in
render(){
    return expression.map((item,index)=><Copoment1></Component1>)
}
```

```xml
<!-- vue Start with 'v-' --> 
<component1 v-for="(item,index) in expression"></component1>
<!-- vue Start with 'v-' --> 
<component1 v-for="item in expression"></component1>
```

### 3. Data binding

```xml
<!-- efront/(zimoli) with render(element,scope)  -->
<component1 ng-bind="expression"></component1>
<!--  efront/(zimoli) with render(element,scope) Set JS object properties element[key]=value -->
<image _src="expression" />
<image .src="expression" />
<image :src="expression" />
<!--  efront/(zimoli) with render(element,scope) Set Element Attributes element.setAttribute(key,value) -->
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
// react render() Using jsx syntax
render(){
    return <Component1> { expression } </Component1>
}
```

```xml
<!-- vueStart with 'v-' --> 
<component1 >{{expression}}</component1>
<image v-bind:src="expression" />
<image :src="expression" />
```

### 4. two-way/reverse/Event binding

```xml
<!-- efront/(zimoli) with render(element,scope) -->
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
// react render() Using jsx syntax
render(){
    return <Component1 onClick={expression}> </Component1>
}
```

```xml
<!-- vue Start with 'v-' -->
<component1 v-model="expression" ></component1>
<component1 v-on:click="expression" ></component1>
<component1 @click="expression" ></component1>
```

### 5. Define web components

```javascript
// efront/(zimoli) with render(element,scope)

var htmlFileData={toString(){
    // If there is an HTML file with the same name, similar code will be automatically generated
    // The one-time binding before rendering can be done here
    return `<btn>${i18n`Content`}</btn>`;
}};

function main(elem){
    // Construction method
    // You can use mounted or unmounted elements
    // You can use the incoming element or create a new one;
    elem = elem || document.createElement("div");
    elem.innerHTML = htmlFileData;
    onappend(elem,function(event){
        // Triggered after mounting, can be bound if necessary
    });
    onremove(elem,function(event){
        // Remove the previous trigger and bind it if necessary
    });
    watch(elem, {
        // `propname` Refers to the propname in<element: propname=propvalue></element>
        propname(current_value, previous_value){
            // Tasks after parameter changes
        }
    });
    var scope = {
        // The content used in the HTML should appear here
        btn: button, // Internal components can be renamed before rendering to simplify tagName in HTML and facilitate writing and reading in local contexts
    };
    render(elem,scope);// If not used, export native components
    // If there is a less file with the same name, it will be automatically bound during compilation
    return elem //If not transmitted, the original elements will not be replaced
}
```

```typescript
//  angular 1.x
 var app=angular.module("modulename");
 app.directive("component-name",[
     "$rootScope",//依赖项
     function($rootScope){
        return {
            restrict: 'E',//Element
            restrict: 'A',//Attribute
            transclude: true,// Content
            replace: true,
            template:"<template-string></template-string>",
            template:function(elem,attr){//Template construction method
            },
            templateUrl:"...",
            scope:{//Private parameters
                paramKey1:"=",//two way
                paramKey1:"=?",//No reverse is possible
                paramKey1:"@",//String parameter
            },
            compile(elem,attr,trans){
                //Custom compiler
                return function(scope,elem,attr,ctrl,transclude){};
            },
            link(scope,elem,attr,ctr,transclude){
                // Compiler's lower level methods
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
    @Input() params1;
    @Input() params2;
    @Output() event1;
    @Output() event2;
    constructor(){
    }
    ngOnInit(){
        // initialization
    }
    ngOnDestroy(){
        // Destruction
    }
    ngOnChanges(){
        // Triggered when parameter changes
    }
    ngAfterViewInit(){
        // Trigger after rendering is completed
    }
}
```

```jsx
// react render() Using jsx syntax
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


列表工具，比ng-repeat或v-for的优势在于，它内置了大数据量的高效展示算法。
```html
    <!-- 语法与 ng-repeat 或 v-for 类似，前缀随意 -->
    <list efront-src="item in items" >
        <div>
            <span -bind="item.name"></span>
            <span -bind="item.silasiladi"></span>
        </div>
    </list>
```
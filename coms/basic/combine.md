组合工具，把传入的数组队列进行组合，列出所有可能出现的情况
如：
```javascript
    var 数组1=[1,2,3];
    var 数组2=[10,20];
    var 数组3=["字符串1","字符串二"];
    var 组合结果 = combine(数组1,数组2,数组3);
    组合结果 如下:
    [
        [1,10,"字符串1"],
        [1,10,"字符串二"],
        [1,20,"字符串1"],
        [1,20,"字符串二"],
        [2,10,"字符串1"],
        [2,10,"字符串二"],
        [2,20,"字符串1"],
        [2,20,"字符串二"],
        [3,10,"字符串1"],
        [3,10,"字符串二"],
        [3,20,"字符串1"],
        [3,20,"字符串二"]
    ]
```
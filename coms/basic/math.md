# 数学公式生成工具
在2023年及以后的浏览器(Chrome109, Firefox1, Safari5.1, ...)中可用
受支持的浏览器参考 [https://developer.mozilla.org/zh-CN/docs/Web/MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML)
使用方法有如下两种：
1. 直接传入解析结构
```javascript
// 运算符或函数用大括号的对象表式层级，运算符或函数名放在对象的属性名位置，参数放在属性值的位置
var obj={
    "*":["左边","右边"],
};
// 勾股定理可以表示为如下形式
var obj={
    "=":[
        {"+":[
            {"**": ["a",2]},
            {"**": ["b",2]}
        ]},
        {            "**":["c",2] }
    ]
};
// 海伦-秦九韶公式可以表式为如下形式
var obj = {
    "=": [
        "S",
        {
            "sqrt": {
                "*": [
                    "p",
                    { "-": ["p", "a"] },
                    { "-": ["p", "b"] },
                    { "-": ["p", "c"] }
                ]
            }
        }
    ]
}
math(obj)
```

2. 以数学公式的js表达式做为模板直接生成
```mathscript
// 勾股定理可以表示为如下形式
math`a**2+b**2=c**2`
// 海伦-秦九韶公式可以表式为如下形式
math`S=sqrt(p*(p-a)*(p-b)*(p-c))`
```
这种方法经过efront编译后会自动转换成上一种方法中的解析形式

## 常用语法及函数名如下
* 加法
```mathscript
    1+2
```
```math
    1+2
```
* 减法
```mathscript
    1-2
```
```math
    1-2
```
* 加减，正负，
```mathscript
    a +- 2;
    a -+ 2;
    +-a;
    -+a;
    // 分开写将识别为运算符加正负号
    a + -2;
    a - +2;
```
```math
    a +- 2;
    a -+ 2;
    +-a;
    -+a;
    a + -2;
    a - +2;
```
* 乘法
```mathscript
    1*2
    a*b
    2*a
```
```math
    1*2
    a*b
    2*a
```
```mathscript
// 默认用`*`会自动转成`×`或`·`或省略
// 如果自动生成的符号不符合预期
// 可以使用`mul(a,b)`以强制生成`×`
// `Mul(a,b)`生成`·`
// `MUL(a,b)`不显示乘号
mul(a,b),Mul(a,b),MUL(a,b)
```
```math
mul(a,b),Mul(a,b),MUL(a,b)
```
* 分数
```mathscript
 分子/分母
```
```math
    分子/分母
```
* 以除号表示除法
```mathscript
    div(被除数,除数)
```
```math
    div(被除数,除数)
```
* 绝对值
```mathscript
    abs(a)
```
```math
    abs(a)
```
* 阶乘： n!
```mathscript
    n!
```
```math
    n!
```
* 幂
```mathscript
    底数 ** 指数
```
```math
    底数 ** 指数
```
* 平方根
```mathscript
    sqrt(底数)
```
```math
    sqrt(底数)
```
* 高次根式
```mathscript
  root(底数,指数)
```
```math
  root(底数,指数)
```
* 函数
```mathscript
    f(x)=x**2
    f'(x)=2*x
```
```math
    f(x)=x**2
    f'(x)=2*x
```

* 三角函数
```mathscript
sin(theta);
sin(theta,2);
sin(theta**2);
sin(theta)**2;
```
```math
sin(theta);
sin(theta,2);
sin(theta**2);
sin(theta)**2;
```

* 向量
```mathscript
    //vector(向量名,横坐标,纵坐标,竖坐标)
    vector(A,x,y)
    //坐标可以不传入
    vector(A)
```
```math
    vector(A,x,y)
    vector(A)
```
* 下标
```mathscript
    a[n]
    a[n+1]
    a_n
    a_(n+1) 
```
```math
    a[n]
    a[n+1]
    a_n
    a_(n+1) 
```
* 极限
```mathscript
    limit(公式主体,变量,目标)
    // 可以用 Infinity表示无穷大
    limit(1/n,n,+Infinity)
```
```math
    limit(公式主体,变量,目标)
    limit(1/n,n,+Infinity)
```

* 积分
```mathscript
integral(表达式,下界,上界)
```
```math
integral(表达式,下界,上界)
```
* 级数
```mathscript
sigma(公式主体,n=1,+Infinity)
series(公式主体,n=1,+Infinity)
```
```math
sigma(公式主体,n=1,+Infinity)
series(公式主体,n=1,+Infinity)
```
* 矩阵
```mathscript
    [1,2;3,4]
```
```math
    [1,2;3,4]
```
* 左除
```mathscript
    [1,2;3,4] \ [5;6]
```
```math
    [1,2;3,4]\[5;6]
```
* 转置
```mathscript
    [1,2;3,4]'
```
```math
    [1,2;3,4]'
```
* 离子
```mathscript
    H[+], O[2-]
```
```math
    H[+], O[2-]
```

* 无限小数
```mathscript
// 循环节
0.3.;// 三分之一
0.142857.;// 七分之一
0.142.857142.;//七分之一
0.142.857142;//七分之一
```
```math
0.3.;// 三分之一
0.142857.;// 七分之一
0.142.857142.;//七分之一
0.142.857142;//七分之一
```
```mathscript
// 省略号，如果末尾出现多于一个小数点，这些小数点将被追加到数值结尾
0.3...
3444..
66....
```
```math
0.3...
3444..
66....
```
* 科学计数法
```mathscript
    1e3;
    1e-3;
    1.3.e3;
    a*1.3e3
```
```math
    1e3;
    1e-3;
    1.3.e3;
    a*1.3e3
```
* 虚数
```mathscript
    1+2i;
    1+2.3i;
    2+3e10k;
    3e10j;
```
* 方程组
```mathscript
    group(
        a+1=b;
        a+b=3;
    )
```
```math
    group(
        a+1=b,
        a+b**2=3
    )
```
* 标号
```mathscript
    tab(1); // 带小括号的数字
    tab(circle,1,2,3,10); // 带圆圈的数字
    tab(roman,1); //罗马数字
    tab(roman,3888); //罗马数字
    group(// 方程组中使用
        x+y=10 tab(circle,1),
        x*y=25 tab(circle,2)
    )
```
```math
    tab(1);
    tab(circle,1,2,3,10);
    tab(roman,1);
    tab(roman,3888);
    group(
        x+y=10 tab(circle,1),
        x*y=25 tab(circle,2)
    )
```
* 角
```mathscript
    corner(1);
    corner(A);
    corner(BAC);
```
```math
    corner(1);
    corner(A);
    corner(BAC);
```
* 对数
```mathscript
    log(x,2);
    log(x,e);
    ln(x);
```
```math
    log(x,2);
    log(x,e);
    ln(x);
```

## 希腊字母对照表如下
按此表中的英文单词命名的变量将自动转换为希腊字母
```javascript
    alpha: "α",    Alpha: "Α",
    beta: "β",    Beta: "Β",
    gamma: "γ",    Gamma: "‌Γ",
    delta: "δ‌",    Delta: "Δ",
    epsilon: "ε",    Epsilon: "Ε",
    zeta: "ζ‌",    Zeta: "Ζ",
    eta: "η‌",    Eta: "Η",
    theta: "θ",    Theta: "Θ",
    iota: "ι",    Iota: "Ι",
    kappa: 'κ',    Kappa: 'Κ',
    lambda: 'λ‌',    Lambda: '‌Λ',
    mu: 'μ',    Mu: 'Μ',
    nu: 'ν',    Nu: 'Ν',
    xi: 'ξ‌',    Xi: '‌Ξ',
    omicron: 'ο',    Omicron: 'Ο',
    pi: 'π‌',    Pi: '‌Π',
    rho: 'ρ',    Rho: 'Ρ',
    sigma: 'σ',    Sigma: 'Σ',
    tau: 'τ',    Tau: 'Τ',
    upsilon: 'υ',    Upsilon: 'Υ',
    phi: 'φ',    Phi: 'Φ',
    chi: 'χ‌',    Chi: 'Χ',
    psi: 'ψ',    Psi: 'Ψ',
    omega: 'ω',    Omega: '‌Ω',
```
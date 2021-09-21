// 首次无hash访问：无hashchange触发，正赏加载首页
// 无hash刷新：无hashchange触发，正常加载首页
// 第二次无hash访问：打开上次访问的页面，触发一次hashchange事件

// 首次带hash访问：吃掉hash(可能触发也可能不触发hashchange)，加载首页，无hashchange事件
// 带hash刷新：已加载的页面刷新，无hashchange事件
// 第二次带hash访问：吃掉hash(可能触发也可能不触发hashchange)，加载上次访问的页面，触发一次hashchange事件
// 初始化时将location.hash保存到zimoli.inithash

// hashchange事件主动触发，进入hashchange指向的路径
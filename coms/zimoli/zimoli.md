# 紫茉莉
默认不支持带hash打开页面，但您可以在主页面或您指定的初始化脚本中切换到hash指向的页面，这样可以让一些写在主文件中的配置项按序加载。
```javascript
    zimoli(pathname, params) // 跳转
    zimoli.getInitPath()// 返回页面加载时的hash路径在当前历史中指向的路径
    zimoli.switch(historyName, targetElement, homePath) // 切换历史及目标挂载元素
    zimoli() // 切换历史后初始化
    zimoli.clearHistory() // 清空历史
    zimoli.register(pathname) // 注册通用路由
    zimoli.enableTouchBack() // 开启滑动后退
```
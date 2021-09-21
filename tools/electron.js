/*

// 用编辑器的开发者工具加载些文件
// 可以使用如下方式加载
eval(fs.readFileSync("d:\\work\\efront\\tools\\electron.js").toString())
("http://localhost/","d:\\work\\efront\\tools\\reload.js");

*/
function run(url, preload) {
    var electron = require("electron");
    var { BrowserWindow } = electron.BrowserWindow ? electron : electron.remote;
    var window = new BrowserWindow({
        width: 800, height: screen.height, show: false,
        webPreferences: {
            // 支持node
            nodeIntegration: true,
            //缩放级别
            zoomFactor: 1.0,
            //使用原生的window.open
            nativeWindowOpen: true,
            //允许跨域资源
            webwebSecurity: true,
            preload
        }
    });
    window.showInactive();
    window.on('closed', () => {
        window = null
    });
    window.setMenu(null);
    // 加载远程URL
    window.webContents.openDevTools();
    window.setAlwaysOnTop(true);
    window.loadURL(url);
    window.setPosition(innerWidth, 0);
}
module.exports = run;
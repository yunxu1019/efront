/*

// 用编辑器的开发者工具加载些文件
// 可以使用如下方式加载
eval(fs.readFileSync("d:\\work\\efront\\tools\\electron.js").toString())("http://localhost/")

*/
function run(url) {
    var electron = require("electron");
    var { BrowserWindow } = electron.BrowserWindow ? electron : electron.remote;
    var window = new BrowserWindow({ width: 800, height: screen.height, show: false });
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
function main(url) {
    var electron = require("electron");
    var { BrowserWindow } = electron.BrowserWindow ? electron : electron.remote;
    var window = new BrowserWindow({
        width: 800, height: 800, show: false,
        webPreferences: {
            // 支持node
            nodeIntegration: true,
            //缩放级别
            zoomFactor: 1.0,
            //使用原生的window.open
            nativeWindowOpen: true,
            //允许跨域资源
            webwebSecurity: true,
        }
    });
    window.showInactive();
    window.on('closed', () => {
        window = null
    });
    window.setMenu(null);
    // 加载远程URL
    // window.webContents.openDevTools();
    window.setAlwaysOnTop(true);
    window.loadURL("http://efront.cc/zimoli/");
    // window.setPosition(innerWidth, 0);
}

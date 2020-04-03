if (require("cluster").isWorker) return;
if (/node(\.exe)?$/i.test(process.argv0)) return require("child_process").spawn("electron", [__filename], { shell: true });
var electron = require("electron");
var { app, BrowserWindow } = electron;
var createWindow = function () {
    var window = new BrowserWindow({
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            nativeWindowOpen: true
        }
    });
    var bounds_key = "--electron-saved-bounds";
    var saveBounds = function (bounds_key, bounds) {
        localStorage.setItem(bounds_key, JSON.stringify(bounds));
    };
    var loadBounds = function (bounds_key) {
        return JSON.parse(localStorage.getItem(bounds_key));
    };
    with (window) {
        webContents.openDevTools();
        loadURL("http://localhost");
        webContents.executeJavaScript(`(${loadBounds}("${bounds_key}"))`, function (bounds) {
            setBounds(bounds);
            showInactive();
        });
        on("resize", function () {
            webContents.executeJavaScript(`-${saveBounds}("${bounds_key}",${JSON.stringify(getBounds())})`);
        });
        on("move", function () {
            webContents.executeJavaScript(`-${saveBounds}("${bounds_key}",${JSON.stringify(getBounds())})`);
        });
    }
}
app.once("ready", createWindow);
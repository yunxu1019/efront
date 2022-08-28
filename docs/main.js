zimoli.clearHistory();
zimoli('/loader');
contextmenu(document, function (event) {
    if (!window.require) return;
    return menuList(null, [
        {
            "name": "开发者选项",
            do() {
                window.require("electron").ipcRenderer.send("window", "open-dev-tools");
                window.resizeBy(400, 0);
            }
        }
    ]);
})
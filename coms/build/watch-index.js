// Eclipse中 Window -> Preferences -> General -> Workspace
// 勾选Refresh using native hooks or polling和Refresh on access
var memery = require("../efront/memery");
memery.IN_WATCH_MODE = true;
require("./reloadListeners").run();
require("./watch");
// Eclipse中 Window -> Preferences -> General -> Workspace
// 勾选Refresh using native hooks or polling和Refresh on access
process.env.IN_WATCH_MODE = true;
process.env.WATCH_PORT = process.env.WATCH_PORT || 0;
require("../build/reloadListeners").run();
require("../build/watch");
var a, n = "",
    contextMenuFactory = {
        getContextMenuEventTimeStamp: function (e) {
            return n
        },
        setContextMenuEvent: function (e) {
            a = e,
                n = e.timeStamp
        },
        getContextMenuEvent: function (e) {
            return a
        }
    };
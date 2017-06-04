var window=this;
function on(k) {
    var handler_path = k + "handlers";
    var on_event_path = "on" + k;
    function addhandler(element, handler) {
        if (element[handler_path]) {
            element[handler_path].push(handler);
        } else {
            element[handler_path] = element[on_event_path] ? [element[on_event_path], handler] : [handler];
            element[on_event_path] = function (e) {
                if(!e)e=window.event;
                var broadcasts = this[handler_path];
                for (var cx = 0, dx = broadcasts.length; cx < dx; cx++) {
                    broadcasts[cx].call(this, e);
                }
            };
        }
    }
    return addhandler;
}
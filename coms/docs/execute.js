var component;
var execute = function (commName, then, logpad) {
    component && remove(component);
    if (!commName) return;
    window[commName] = null;
    delete modules[commName];
    var logs = [];
    var log = function () {
        var [color, type, text, ...extra] = arguments;
        if (text instanceof Error) text = text.message;
        window.console.log.apply(window.console, [].slice.call(arguments, 1));
        logs.push([color, type, text, ...extra]);
        if (logpad) logpad.innerHTML = logs.slice(logs.length > 10 ? logs.length - 10 : 0).map(msg => {
            var [color, type] = msg;
            return `<div style="color:${color}">${type} ${msg.map(m => {
                if (m instanceof Object) {
                    try {
                        m = JSON.stringify(m, null, ' ').replace(/[\r\n]+/g, '<br/>').replace(/\s/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    } catch (e) {
                        return String(m);
                    }
                }
                return String(m);
            }
            ).join(' ')
                }</div>`
        }).join("");
    };
    var console = {
        log: log.bind('#333', ''),
        error: log.bind('#f00', '错误'),
        info: log.bind("#26f", '提示'),
        warn: log.bind("#fc0", '警告'),
    };
    window.onerror = a => console.error(a);
    window.console.info(i18n`加载 ${commName}!`);

    init(commName, function (comm) {
        window[commName] = function () {
            remove(component);
            try {
                component = isFunction(comm) ? comm.apply(null, arguments) : createElement(comm);
                // component && appendChild(page, component);
            } catch (e) {
                console.error(e);
            }
            return component;
        };
        component = comm instanceof Function ? comm() : comm;
        then instanceof Function && then(component, logs);
    }, { console });
};
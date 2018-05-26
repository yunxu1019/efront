var component;
var execute = function (commName, then) {
    component && remove(component);
    if (!commName) return;
    console.info(`load ${commName}!`);
    window[commName] = null;
    delete modules[commName];
    init(commName, function (comm) {
        window[commName] = function () {
            remove(component);
            try {
                component = isFunction(comm) ? comm.apply(null, arguments) : createElement(comm);
                // component && appendChild(page, component);
            } catch (e) {
            }
            return component;
        };
        try {
            component = createElement(comm);
            // component && appendChild(page, component);
        } catch (e) {

        }
        then && then(component);
    });
};
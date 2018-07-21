
function cless(commFactory, styleSheet, className) {
    var style = createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
        style.styleSheet.cssText = styleSheet;
    } else {
        style.innerHTML = styleSheet
    }
    appendChild(document.getElementsByTagName("head")[0], style);
    if (isFunction(commFactory)) {
        var result = function () {
            var commRelease = commFactory.apply(this || null, arguments);
            if (commRelease) {
                try {
                    addClass(commRelease, className);
                } catch (e) {
                    console.error(e, "bindClassNameError");
                }
            }
            return commRelease;
        };
        result.prototype = commFactory.prototype;
        keys(commFactory).map(k => result[k] = commFactory[k]);
        return result;
    }
    if (commFactory) {
        try {
            addClass(commFactory, className);
        } catch (e) {
            console.error(e, "bindClassNameError");
        }
    }
    return commFactory;
}
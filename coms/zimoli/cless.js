
function cless(commFactory, styleSheet, className) {
    var style = createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
        style.styleSheet.cssText = styleSheet;
    } else {
        style.innerHTML = styleSheet
    }
    className = className + " " + className.replace(/^.*?(\w*?)\-\w*?$/g, "$1");
    appendChild(document.getElementsByTagName("head")[0], style);
    if (commFactory instanceof Promise) {
        return commFactory.then(function (result) {
            return cless(result, styleSheet, className);
        });
    }
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
    if (isNode(commFactory)) {
        try {
            addClass(commFactory, className);
        } catch (e) {
            console.error(e, "bindClassNameError");
        }
    } else if (isString(commFactory)) {
        var template = document.createElement("div");
        template.innerHTML = commFactory;
        [].forEach.call(template.children, function (child) {
            addClass(child, className);
        });
        commFactory = template.innerHTML;
    }
    return commFactory;
}

function create(commFactory, className) {
    if (commFactory instanceof Promise) {
        return commFactory.then(function (result) {
            return create(result, className);
        });
    }
    if (isFunction(commFactory)) {
        var result = function () {
            var commRelease = commFactory.apply(result, arguments);
            if (commRelease) {
                commRelease = create(commRelease, className);
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
function cless(commFactory, innerCss, className) {
    var stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.savedText = innerCss;
    innerCss = color.transform(innerCss);
    if (stylesheet.styleSheet) {
        stylesheet.styleSheet.cssText = innerCss;
    } else {
        stylesheet.innerHTML = innerCss;
    }
    appendChild(document.getElementsByTagName("head")[0], stylesheet);
    return create(commFactory, className);
}

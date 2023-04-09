"use strict";
var _create = function (commFactory, className, _invoke) {
    if (!className) return commFactory;
    if (commFactory instanceof Promise) {
        return commFactory.then(function (result) {
            return _invoke(result, className, _invoke);
        });
    }
    if (isFunction(commFactory)) {
        var result = function () {
            var commRelease = commFactory.apply(this || result, arguments);
            if (commRelease) {
                commRelease = _invoke(commRelease, className, _invoke);
            }
            return commRelease;
        };
        result.prototype = commFactory.prototype;
        commFactory.className = className;
        keys(commFactory).map(k => result[k] = commFactory[k]);
        result.call = function (context, ...args) {
            if (!isEmpty(context)) var release = commFactory.apply(context, args);
            else release = commFactory.apply(result, args);
            if (release) release = _invoke(release, className, _invoke);
            return release;
        };
        if ({}.hasOwnProperty.call(commFactory, 'toString')) {
            result.toString = function () {
                return _invoke(commFactory.toString(), className, _invoke);
            };
        }
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
var head = document.getElementsByTagName("head")[0];
function cless(commFactory, innerCss, className) {
    if (innerCss) {
        var stylesheet = document.createElement("style");
        //<!-- stylesheet.setAttribute("scope",className) -->
        stylesheet.type = "text/css";
        stylesheet.savedText = innerCss;
        if (stylesheet.styleSheet) {
            stylesheet.styleSheet.cssText = innerCss;
        } else {
            stylesheet.innerHTML = innerCss;
        }
        appendChild(head, stylesheet);
    }
    return _create(commFactory, className, _create);
}

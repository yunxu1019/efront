var $ = function (selector) {
    if (isString(selector)) {
        var isHtml = /^\s*</.test(selector);
        if (isHtml) {
            return xml.parse(selector);
        }
        return document.querySelectorAll(selector);
    } else if (isFunction(selector)) {
        setTimeout(selector);
    }
};
extend($, {
    ajax: function ({ url, dataType }) {
        // url = url.replace(/\?|$/, `?pass_ticket=${accountFactory.getPassticket()}&`);
        var xhr = cross("get", url, {
            "Referer": "https://wx2.qq.com/",
            "Origin": "https://wx2.qq.com"
        });
        if (dataType === "script") {
            xhr.done(function (xhr) {
                new Function(xhr.responseText)();
            });
        }
        xhr.done(function () {
            render.digest();
        });
        return xhr;
    },
})
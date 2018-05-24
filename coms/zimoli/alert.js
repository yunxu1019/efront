var styles = {
    log: "#2a53cd",
    info: "#228B22",
    warn: "#dd6a16",
    error: "#dc352e"
};
var _text = function (color, parameters) {
    var window = createElement(div);
    var fontSize = Math.max(innerWidth, innerHeight) / 20;
    if (fontSize < 10) {
        fontSize = 10;
    }
    var singleHeight = fontSize * 1.6 | 0;
    css(window, `width:100%;height:${singleHeight}px;line-height:${singleHeight}px;top:50%;margin-top:-${singleHeight >> 1}px;left:0;right:0;font-size:${fontSize}px;background-color:${color};position:absolute;color:#fff;text-align:center;`);
    text(window, [].slice.call(parameters, 0).join(", "));
    return window;
};
function alert() {
    var color, text, autoclose = true, onclose;
    var color_reg = /^#(?:\w6|\w3)$/;
    [].map.call(arguments, function (arg) {
        switch (typeof arg) {
            case "string":
                if (!text) {
                    text = arg;
                } else if (color_reg.test(text)) {
                    color = text;
                    text = arg;
                } else if (text in styles) {
                    color = styles[text];
                    text = arg;
                } else if (arg in styles) {
                    color = styles[arg];
                } else if (color_reg.test(arg)) {
                    color = arg;
                }
                break;
            case "boolean":
            case "number":
                autoclose = arg;
                break;
            case "function":
                onclose = arg;
        }
    });
    var elem;

    if (color_reg.test(color)) {
        elem = _text(color, text);
    } else {
        elem = _text(styles.log, arguments);
    }
    var _onclose = function (event) {
        if (onclose) {
            onclose.call(this, event);
        }
        if (close_timer) clearTimeout(close_timer);
    }
    onremove(elem, _onclose);
    if (autoclose) {
        if (autoclose === true) {
            autoclose = text.length * 200 + 400;
        } else if (autoclose < 100) {
            autoclose = autoclose * 1000;
        }
        var close_timer = setTimeout(function () {
            remove(elem);
        }, autoclose);
    }
    popup(elem);
    return elem;
}
for (var k in styles) {
    alert[k] = new Function(`return this(${JSON.stringify(styles[k])},arguments);`);
}

var styles = {
    blue: "#2a83cd",
    green: "#228B22",
    orange: "#fdca86",
    red: "#cc352e"
};
styles.success = styles.pass = styles.green;
styles.info = styles.blue;
styles.error = styles.danger = styles.red;
styles.warn = styles.orange;
styles.default = '#000a';
var alerts = [];
var clean = Cleanup(alerts);
var build = function () {
    var sum = 0;
    alerts.forEach(function (elem) {
        if (elem.offsetTop !== sum) {
            elem.style.top = fromOffset(sum);
        };
        sum += elem.offsetHeight;
    });
};
var fontSize = 16;
var singleHeight = fontSize * 3.125 | 0;
var _text = function (bgcolor, parameters) {
    var box = div();
    css(box, `top:${fromPixel(alerts.length ? Math.max.apply(Math, alerts.map(e => e.offsetTop + e.children[0].offsetHeight)) : 0)};height:0;line-height:${fromPixel(singleHeight - 20)};left:0;right:0;font-size:${fromPixel(fontSize)}; transition: all 0.2s ease-out;position:absolute;text-align:center;`);
    box.innerHTML = `<div style='width: 720px;white-space:pre-wrap;max-width:100%;display:inline-block;height:auto;padding:${fromPixel(10)} ${fromPixel(20)};background-color:${bgcolor};color:${color.pair(bgcolor, 1)};'>${[].slice.call(parameters, 0).join(", ")}</div>`;
    box.initialStyle = `margin:-${fromPixel(singleHeight)} auto;opacity:0;`;
    return box;
};
function alert() {
    var clr = String(isString(this) && this || styles.default), text, autoclose = true, onclose;
    [].map.call(arguments, function (arg) {
        switch (typeof arg) {
            case "string":
            case "object":
                arg = String(arg);
                if (!text) {
                    text = arg;
                } else if (color.isColor(text)) {
                    clr = text;
                    text = arg;
                } else if (text in styles) {
                    clr = styles[text];
                    text = arg;
                } else if (arg in styles) {
                    clr = styles[arg];
                } else if (color.isColor(arg)) {
                    clr = arg;
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

    if (color.isColor(clr)) {
        elem = _text(clr, [text]);
    } else {
        elem = _text(styles.log, [text]);
    }
    var _onclose = function (event) {
        if (onclose) {
            onclose.call(this, event);
        }
        clean(this);
        build();
        if (close_timer) clearTimeout(close_timer);
    }
    onremove(elem, _onclose);
    var close_timer;
    var waitclose = function (autoclose, deltaTime) {
        if (autoclose) {
            if (autoclose === true) {
                autoclose = text.length * 160 + deltaTime;
            } else if (autoclose < 100) {
                autoclose = autoclose * 1000;
            }
            close_timer = setTimeout(function () {
                remove(elem);
            }, autoclose);
        }
    };
    waitclose(autoclose, 400)
    elem.setText = function (content, timeout = true) {
        var c = elem.children[0];
        c.innerHTML = content;
        text = content;
        if (timeout) {
            clearTimeout(close_timer);
            waitclose(timeout, -100);
        }
    };
    alerts.push(elem);
    popup(elem);
    return elem;
}
for (var k in styles) {
    alert[k] = new Function(`return this.apply(${JSON.stringify(styles[k])},arguments);`);
}

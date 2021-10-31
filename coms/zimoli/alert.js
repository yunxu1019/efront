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
styles.default = '#000';
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
    css(box, `top:${fromPixel(alerts.length ? Math.max.apply(Math, alerts.map(e => e.offsetTop + e.children[0].offsetHeight)) : 0)};height:0;line-height:${fromPixel(singleHeight - 20)};left:0;right:0;font-size:${fromPixel(fontSize)}; transition: all 0.2s ease-out;position:absolute;color:#fff;text-align:center;`);
    box.innerHTML = `<div style='width: 720px;white-space:pre-wrap;max-width:100%;display:inline-block;height:auto;padding:${fromPixel(10)} ${fromPixel(20)};background-color:${bgcolor};color:${color.pair(bgcolor)};'>${[].slice.call(parameters, 0).join(", ")}</div>`;
    box.initialStyle = `margin:-${fromPixel(singleHeight)} auto;opacity:0;`;
    return box;
};
function alert() {
    var color = String(isString(this) && this || styles.default), text, autoclose = true, onclose;
    var color_reg = /^#(?:\w{6}|\w{3})$/;
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
        elem = _text(color, [text]);
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
    alerts.push(elem);
    popup(elem);
    return elem;
}
for (var k in styles) {
    alert[k] = new Function(`return this.apply(${JSON.stringify(styles[k])},arguments);`);
}

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
styles.default = '#323436';
var fontSize = 16;
var singleHeight = fontSize * 3.125 | 0;
var container = document.createElement('alert-container');
css(container, 'top:0;height:0;left:0;right:0;transition:all 0.2s ease-out;position:absolute;')
var _text = function (elem, bgcolor, parameters) {
    var box = elem || document.createElement('div');
    css(box, `background-color:${bgcolor};color:${color.pair(bgcolor, 1)};`);
    box.innerHTML = [].slice.call(parameters, 0).join(", ");
    box.initialStyle = `margin-top:-${fromPixel(singleHeight)};`;
    return box;
};
function alert() {
    var clr = String(isString(this) && this || styles.default), text, autoclose = true, onclose;
    var setArg = function (args) {
        text = '';
        autoclose = true;
        for (var arg of args) switch (typeof arg) {
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
    };
    setArg(arguments);
    var waitclose = function (autoclose, deltaTime) {
        if (close_timer) clearTimeout(close_timer);
        if (autoclose) {
            if (autoclose === true) {
                autoclose = text && text.length * 160 + deltaTime;
            } else if (autoclose < 100) {
                autoclose = autoclose * 1000;
            }
            close_timer = setTimeout(function () {
                remove(elem);
            }, autoclose);
        }
    };
    var setContent = function (elem) {
        if (color.isColor(clr)) {
            elem = _text(elem, clr, [text]);
        } else {
            elem = _text(elem, styles.log, [text]);
        }
        if (!container.parentNode) popup(container);
        if (!elem.parentNode) appendChild(container, elem);
        waitclose(autoclose, 400);
        return elem;
    };
    var elem = setContent();
    var _onclose = lazy(function (event) {
        if (onclose) {
            onclose.call(this, event);
        }
        if (close_timer) clearTimeout(close_timer);
    });
    on('removed')(elem, function () {
        if (!container.children.length) remove(container);
    });
    onremove(elem, _onclose);
    var close_timer;
    elem.setText = function () {
        setArg(arguments);
        setContent(elem);
    };
    return elem;
}
for (var k in styles) {
    alert[k] = new Function(`return this.apply(${JSON.stringify(styles[k])},arguments);`);
}

var styles = {
    log: "#2a53cd",
    info: "#228B22",
    warn: "#dd6a16",
    error: "#dc352e"
};
var alerts = [];
var clean = Cleanup(alerts);
var build = function () {
    var sum = 0;
    alerts.forEach(function (elem) {
        if (parseInt(elem.style.top) !== sum);
        elem.style.top = sum + "px";
        sum += elem.offsetHeight;
    });
};
var _text = function (color, parameters) {
    var box = createElement(div);
    var fontSize = 16 * renderPixelRatio;
    var boxWidth = 720 * renderPixelRatio;
    if (boxWidth > innerWidth) {
        boxWidth = +innerWidth;
    }
    var singleHeight = fontSize * 2.6 | 0;
    css(box, `width:${boxWidth}px;margin-left:-${boxWidth >> 1}px;transition:all 0.1s ease-out;left:50%;height:${singleHeight}pt;line-height:${singleHeight}pt;font-size:${fontSize}px;background-color:${color};position:absolute;color:#fff;text-align:center;`);
    text(box, [].slice.call(parameters, 0).join(", "));
    box.initialStyle = `margin-top:-${singleHeight}px;opacity:0;`;
    return box;
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
    build();
    popup(elem);
    return elem;
}
for (var k in styles) {
    alert[k] = new Function(`return this(${JSON.stringify(styles[k])},arguments);`);
}

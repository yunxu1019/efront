// 早上梦到我的小学同学，我知道那不是真的她。
// 因为真的她长什么样，我已十分模糊了。
// 梦中的她只是集合了我所有喜欢过的人的优点，然后被扣上了她的身份和名字。
// 然而，当她没带手机充电线，我想要把充电线借给她时，看到她那厌恶的眼神。
// 我知道，那是真的厌恶，不是调皮。
// 离开时，她为了避开我，还故意将她的物品托付给另一个男的。
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
    remove(box.childNodes);
    appendChild(box, parameters);
    box.initialStyle = `margin-top:-${fromPixel(singleHeight)};`;
    return box;
};
function alert() {
    var clr = String(isString(this) && this || styles.default), text, autoclose = true, onclose;
    var fade = [];
    var setArg = function (args) {
        text = '';
        fade = [];
        autoclose = true;
        for (var arg of args) switch (typeof arg) {
            case "object":
                if (isNode(arg)) {
                    fade.push(arg);
                    continue;
                }
            case "string":
                arg = String(arg);
                if (!text && !fade.length) {
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
                else {
                    fade.push(arg);
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
            }, +autoclose);
        }
    };
    var setContent = function (elem) {
        var t = [text];
        if (fade.length) t.push(...fade);
        if (color.isColor(clr)) {
            elem = _text(elem, clr, t);
        } else {
            elem = _text(elem, styles.log, t);
        }
        Promise.resolve().then(function () {
            if (!isMounted(container)) popup(container);
        });
        if (!isMounted(elem)) appendChild(container, elem);
        waitclose(autoclose, 900);
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

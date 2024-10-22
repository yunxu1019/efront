var _label = document.createElement("span");
var track = document.createElement("div");
track.className = "track";
_label.className = "label";

var btn = document.createElement("button");
btn.tabIndex = 0;
function button(texter, type) {
    var tracker = track.cloneNode();
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
        if (_texter.tagName) {
            var button = _texter;
            if (button.childNodes.length) {
                if (button.childNodes.length === 1 && button.childNodes[0].nodeType !== 1) {
                    _texter = _label.cloneNode();
                    _texter.appendChild(button.childNodes[0]);
                    button.appendChild(_texter);
                }
                appendChild.before(button.childNodes[0], tracker);
            } else {
                appendChild(button, tracker);
            }
        }
    } else {
        _texter = _label.cloneNode();
        if (isString(texter)) {
            if (!type) {
                texter = texter.replace(/#\w*/, function (w) {
                    if (/^#([a-f\d]{3,4}){1,2}$/.test(w)) {
                        type = w;
                    }
                    else type = w.slice(1);
                    return '';
                }).trim();
            }
            html(_texter, texter);
        }
    }
    if (!button) {
        button = btn.cloneNode();
        appendChild(button, tracker, _texter);
    }
    bindAccesskey(button);
    patchHover(button);
    button.setText = function (_text) {
        if (_text && _text.length === 2) {
            addClass(button, "space");
        } else {
            removeClass(button, "space");
        }
        html(_texter, _text);
        bindAccesskey(button);
    };
    button.getText = function () {
        return html(_texter);
    };
    if (texter && texter.length === 2) {
        addClass(button, "space");
    } else {
        removeClass(button, "space");
    }
    if (type) {
        if (parseFloat(type)) {
            var size = isFinite(type) ? type + "px" : type;
            css(button, `height:${size};`);
        }
        else if (color.isColor(type)) {
            var c = color.format(type);
            if (button.getAttribute('type') === 'anchor' || button.tagName === 'A') {
                css(button, { color: c })
            }
            else {
                var b = color.pair(c);
                css(button, { background: c, color: b });
            }
        }
        else if (isString(type)) button.setAttribute("type", type);
    }
    return button;
};
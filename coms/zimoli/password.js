
function password() {
    var element = div();
    var capslock = null, numhide = null;
    bind('keydown')(element, function (event) {
        var which = event.which;
        switch (which) {
            case 144/*numlock*/:
                if (numhide !== null) numhide = !numhide; break;
            case 20/*capslock*/: if (capslock !== null) capslock = !capslock; break;
        }
        if (!numhide && /^Numpad/.test(event.code) && which !== 13) {
            numhide = which < 96;
        }
        if (which >= 65 && which <= 90) {
            var key = event.key;
            capslock = event.shiftKey ^ (key >= "A" && key <= "Z");
        }
        updatetips();
    });
    var saved_value = element.value = "";
    var savedKeyCodes = [];
    element.innerHTML = "<tips></tips><input type=password /><text><insert></insert></text><holder></holder>";
    var [tips, _input, text, holder] = element.children;
    var textNode = document.createTextNode('');
    text.insertBefore(textNode, text.firstChild);
    var build = function () {
        element.value = String.fromCharCode(...savedKeyCodes);
        if (!savedKeyCodes.length && element.placeholder) {
            element.appendChild(holder);
            holder.innerText = element.placeholder;
        } else {
            holder.parentNode === element && element.removeChild(holder);
        }
        textNode.nodeValue = savedKeyCodes.map(e => "●").join("");
    };
    bind('focus')(element, function () {
        capslock = null;
        numhide = null;
        updatetips();
    });
    bind('blur')(element, function () {
        capslock = null;
        numhide = null;
        updatetips();
    })
    var updatetips = function () {
        var tip = [];
        if (capslock) {
            tip.push(i18n`大写锁定已打开`);
        }
        if (numhide) {
            tip.push(i18n`数字键盘已关闭`);
        }
        tips.innerText = tip.join(', ');
    }
    element.onfocus = function () {
        addClass(element, 'focus');
        saved_value = element.value;
        build();
        _input.focus();
    };
    _input.onblur = function () {
        removeClass(element, 'focus');
        if (saved_value !== element.value) {
            dispatch(this, "change");
        }
    };
    input(_input);
    element.type = "text";
    element.nodrag = true;
    element.tabIndex = 0;
    element.onkeydown = function (event) {
        switch (event.keyCode) {
            case 8: // backspace
                savedKeyCodes.pop();
                build();
                break;
            case 13: // enter
                break;
            case 20: // capslock
                break;
            case 229:// ime-mode
                break;
            default:
        }
    };
    var keyPressFired = false, inputFired = false;
    element.oninput = function (event) {
        if (keyPressFired) return;
        var keyCode = event.data.charCodeAt(0);
        inputFired = true;
        if (keyCode !== 8 && keyCode !== 13) {
            savedKeyCodes.push(keyCode);
        }
        build();
    };
    element.onmousedown = function () {
        if (!element.disabled) element.focus();
    };
    element.onkeypress = function (event) {
        if (inputFired) return;
        keyPressFired = true;
        if (event.keyCode !== 8 && event.keyCode !== 13) {
            savedKeyCodes.push(event.keyCode);
        }
        build();
    };
    element.onappend = function () {
        build();
    };
    element.setValue = function (value) {
        savedKeyCodes.splice(0, savedKeyCodes.length);
        savedKeyCodes.push.apply(savedKeyCodes, String(value || "").split("").map(a => a.charCodeAt(0)));
        build();
    };
    return element;
}
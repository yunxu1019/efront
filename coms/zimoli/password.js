function password() {
    var element = div();
    var saved_value = element.value = "";
    var savedKeyCodes = [];
    element.innerHTML = "<input type=password /><insert></insert><holder></holder>";
    var [_input, insert, holder] = element.children;
    var text = document.createTextNode("");
    element.insertBefore(text, _input);
    var build = function () {
        element.value = String.fromCharCode(...savedKeyCodes);
        if (!savedKeyCodes.length && element.placeholder) {
            element.appendChild(holder);
            holder.innerText = element.placeholder;
            element.insertBefore(insert, holder);
        } else {
            holder.parentNode === element && element.removeChild(holder);
            element.appendChild(insert);
        }
        text.nodeValue = savedKeyCodes.map(e => "●").join("");
        element.scrollLeft = insert.offsetLeft + 2;
    };
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
    }
    element.type = "text";
    element.tabIndex = 0;
    // element.contentEditable = true;
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
    element.onkeyup = function () {
        build();
    };
    element.onkeypress = function (event) {
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
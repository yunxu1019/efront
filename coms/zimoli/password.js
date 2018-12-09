function password() {
    var element = div();
    var saved_value = element.value = "";
    var savedKeyCodes = [];
    element.innerHTML = "<input/><insert></insert><holder></holder>";
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
        text.nodeValue = "●".repeat(savedKeyCodes.length);
        element.scrollLeft = insert.offsetLeft + 2;
    };
    element.onfocus = function () {
        saved_value = element.value;
        build();
        _input.focus();
    };
    _input.onblur = function () {
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
            case 20: // capslock
                break;
            default:

        }
    };
    element.onkeyup = function () {
        build();
    };
    element.onkeypress = function (event) {
        savedKeyCodes.push(event.keyCode);
        build();
    };
    element.onappend = function () {
        build();
    };
    return element;
}
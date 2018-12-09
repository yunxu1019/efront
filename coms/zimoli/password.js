function password() {
    var element = div();
    var saved_value = element.value = "";
    var savedKeyCodes = [];
    var build = function () {
        element.value = String.fromCharCode(...savedKeyCodes);
        if (!savedKeyCodes.length && element.placeholder) {
            element.innerHTML = "<insert></insert><holder>" + element.placeholder + "</holder>";
            return;
        }
        element.innerHTML = "●".repeat(savedKeyCodes.length) + "<insert></insert>";
        element.scrollLeft = element.children[0].offsetLeft + 2;
    };
    element.onfocus = function () {
        saved_value = element.value;
    };
    element.onblur = function () {
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
    element.onkeypress = function (event) {
        savedKeyCodes.push(event.keyCode);
        build();
    };
    element.onappend = function () {
        build();
    };
    return element;
}
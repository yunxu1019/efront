var toHex = lazy(function (event) {
    var data = this.$scope.data;
    data.splice(0, data.length);
    this.innerText.replace(/[a-f\d]{2}/g, function (a) {
        a = parseInt(a, 16);
        data.push(a);
    });
    dispatch(this, 'change');
}, 60);
var insert = function (s, char) {
    if (s) {
        var t = document.createTextNode(char);
        var f = s.firstChild;
        s.insertBefore(t, f);
        var e = document.createElement('a');
        e.appendChild(f);
        this.insertBefore(e, s);
    }
    else {
        document.execCommand("insertHTML", true, `<a>${char}</a>`);
    }
};
var filterKey = function (event) {
    var { keyCode } = event;
    var char;
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
        return;
    }
    if (keyCode > 32 && keyCode < 45) {
        return;
    }
    var selection = document.getSelection();
    if (selection.focusNode === this) {
        var s = selection.focusNode.children[selection.focusOffset - 1];
    } else {
        var s = selection.focusNode;
        while (s && s.parentNode !== this) s = s.parentNode;
    }
    for (var cx = 0, dx = this.children.length; cx < dx; cx++) {
        var c = this.children[cx];
        if (c === s) break;
    }
    if (keyCode === 8) {
        if (!s) return;
        event.preventDefault();
        if (s.nextSibling) {
            if (s.nextSibling.innerText === '_') {
                this.removeChild(s.nextSibling);
            }
            else {
                this.removeChild(s.nextSibling);
            }
        }
        this.removeChild(s);
        return;
    }
    if (keyCode === 46) {
        return;
    }
    event.preventDefault();
    if (keyCode > 64 && keyCode < 71) {
        char = String.fromCharCode('a'.charCodeAt(0) + keyCode - 65);
    }
    else if (keyCode > 95 && keyCode < 106) {
        char = keyCode - 96;
    }
    else if (keyCode > 46 && keyCode < 57) {
        char = keyCode - 47;
    }
    else {
        return;
    }
    insert.call(this, s, char);
    if (cx % 2 === 1) {
        var n = document.createElement('a');
        n.innerHTML = '_';
        this.insertBefore(n, this.children[cx + 2]);
        selection.setBaseAndExtent(this.children[cx + 1], 1, this.children[cx + 1], 1);
    }
    else {
        var c = this.children[cx + 2];
        if (c && c.innerText === "_") {
            this.removeChild(c);
        }
    }
};
var fromHex = function () {

};


function HexEditor(element) {
    if (!isElement(element)) {
        element = document.createElement("hex-editor");
    }
    on("input")(element, toHex);
    on("keydown")(element, filterKey);
    var scope = {
        data: []
    };
    render(element, scope);
    element.setAttribute("spellcheck", false);
    element.contentEditable = true;
    return element;
}
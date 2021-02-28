var setSide = function (side) {
    side = String(side).toLowerCase();
    for (var s of `left top right bottom`.split(/\s/)) {
        if (s === side) {
            if (!this.hasAttribute(s)) {
                this.setAttribute(s, '');
            }
        } else if (this.hasAttribute(s)) {
            this.removeAttribute(s);
        }
    }
};
function rhomb(s) {
    var e;
    if (!isElement(s)) e = document.createElement('rhomb');
    else e = s;
    e.setSide = setSide;
    if (isString(e)) {
        e.setAttribute(s, '');
    }
    return e;
}
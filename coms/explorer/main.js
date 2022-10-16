var rect = document.createElement('rect');
rect.setAttribute('insert', '');
var touchitems = null;
var selectRected = lazy(function (lattice) {
    var selected = [];
    if (touchitems) for (var m of touchitems) {
        var file = m.$scope.d;
        file.selected = overlap(m, rect);
        if (file.selected) selected.push(file);
    }
    lattice.$scope.selected = selected;
    render.refresh();
});
var dragger = null;
var touch = {
    start(e) {
        /**
         * @type {Element}
         */
        var t = this;
        var a = this.$scope.toActive(e);
        touchitems = this.querySelectorAll("item");
        if (a && this.$scope.selected.indexOf(a.$scope.d) >= 0) {
            dragger = e;
            if (!drag.target) drag(this.$scope.selected.length === 1 ? a : this.querySelectorAll(".focused"), e);
            return;
        }
        var pos = getScreenPosition(t.parentNode);
        var pos2 = getScreenPosition(t.previousElementSibling);
        rect.limit = [pos.left + pos.clientLeft, Math.max(pos.top, pos2.bottom + 1)];
        rect.event = e;
        rect.setAttribute('style', '');
        css(rect, { left: e.clientX - pos.left - t.clientLeft, top: e.clientY - t.clientTop, width: 0, height: 0 })
    },
    move(e) {
        if (!onclick.preventClick) return;
        if (dragger) {
            var tiped = null;
            for (var c of touchitems) {
                var d = c.$scope.d;
                if (d.isfolder && !d.selected && overpos(c, e)) {
                    if (!c.hasAttribute('dropping')) {
                        if (!drag.tip) {
                            var t = document.createElement('dragtip');
                            drag.tip = t;
                            drag.target.appendChild(t);
                            drag.target.style.zIndex = zIndex(0) + 2;
                            css(t, {
                                display: "bock",
                                padding: "6px 10px",
                                height: "auto",
                                background: "#fff",
                                border: "1px solid #666",
                                fontSize: '14px',
                                lineHeight: 1,
                                top: '100%',
                                whiteSpace: 'nowrap',
                                position: "absolute",
                            });
                        }
                        css(drag.tip, 'display:block');
                        drag.tip.innerHTML = `<b style="color:#169;font-weight:400">移动到</b> ${c.$scope.d.name}`;
                        c.setAttribute('dropping', '');
                    }
                    tiped = c;
                }
                else {
                    c.removeAttribute('dropping');
                }
            }
            if (!tiped && drag.tip) css(drag.tip, 'display:none');
            return;
        }
        if (e.type !== 'mousemove') return;
        if (!rect.parentNode) {
            appendChild.insert(this.parentNode, rect, this);
            resize(rect, rect.event);
        }
        e.moveLocked = true;
        selectRected(rect.nextElementSibling);
    },
    async end(e) {
        touchitems = null;
        if (dragger) {
            delete drag.tip;
            dragger = null;
            var p = this.querySelector("[dropping]");
            if (p) {
                p.removeAttribute("dropping");
                var $scope = this.$scope;
                var base = $scope.pathlist.concat(p.$scope.d.name).join("/");
                for (var s of $scope.selected) {
                    await $scope.mov(s, base + "/" + s.name);
                }
                $scope.open();
            }
        }
        remove(rect);
    },
};
var moveFocus = function (delta) {
    var { selected, data } = this.$scope;
    var index, targetIndex;
    var boxCount = this.group;
    if (typeof delta === 'string') switch (delta) {
        case "left":
            index = data.indexOf(selected[selected.length > 1 ? 1 : 0]);
            targetIndex = index - 1;
            if (targetIndex < 0) targetIndex = 0;
            break;
        case "right":
            index = data.indexOf(selected[selected.length > 1 ? selected.length - 2 : selected.length - 1]);
            targetIndex = index + 1;
            break;
        case "up":
            index = data.indexOf(selected[selected.length > 1 ? 1 : 0]);
            if (index >= boxCount) targetIndex = index - boxCount;
            else targetIndex = index;
            break;
        case "down":
            index = data.indexOf(selected[selected.length > 1 ? selected.length - 2 : selected.length - 1]);
            targetIndex = index + boxCount;
            if (targetIndex >= data.length) targetIndex = data.length - 1;
            break;

    }
    for (var s of selected) {
        s.selected = false;
    }
    var d = data[targetIndex];
    if (d) d.selected = true, this.$scope.selected = [d];
    render.refresh();
};

var bindkey = function (lattice) {
    for (var key of "up,down,right,left".split(",")) {
        on("keydown.only." + key)(lattice, moveFocus.bind(lattice, key));
    }
};
async function ondrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    this.$scope.uploadAll(files);
}
function main() {
    var page = document.createElement('explorer');
    page.innerHTML = template;
    moveupon(page.querySelector('lattice'), touch);
    var scope = new explorer$Explorer;
    renderWithDefaults(page, scope);
    bind('drop')(scope.listview, ondrop);
    bindkey(scope.listview);
    contextmenu(scope.listview, explorer$context);

    return page;
}
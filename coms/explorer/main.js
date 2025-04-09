var rect = document.createElement('rect');
rect.setAttribute('insert', '');
var touchitems = null;
var selectRected = on("resize")(rect, function () {
    var lattice = this.nextElementSibling;
    if (!lattice) return;
    var selected = [];
    if (touchitems) for (var m of touchitems) {
        var file = $scoped.get(m).d;
        file.selected = overlap(m, rect);
        if (file.selected) selected.push(file);
    }
    $scoped.get(lattice).selected = selected;
    render.refresh();
});
var dragger = null;
var touch = {
    start(e) {
        /**
         * @type {Element}
         */
        var t = this;
        var start = () => {
            var ts = $scoped.get(t);
            var a = ts.toActive(e);
            var as = $scoped.get(a);
            touchitems = t.querySelectorAll("fileitem");
            if (a && ts.selected.indexOf(as.d) >= 0) {
                dragger = e;
                if (!drag.target) drag(ts.selected.length === 1 ? a : t.querySelectorAll(".focused"), e);
                return;
            }
            var pos = getScreenPosition(t.parentNode);
            var pos2 = getScreenPosition(t.previousElementSibling);

            rect.limit = [pos.left + t.parentNode.clientLeft, Math.max(pos.top, pos2.bottom + 1)];
            rect.event = e;
            rect.setAttribute('style', '');
            css(rect, { left: e.clientX - pos.left - t.clientLeft, top: e.clientY - t.clientTop, width: 0, height: 0 })
        };
        if (/^touch/.test(e.type)) {
            touch.ing = setTimeout(function () {
                if (onclick.preventClick) return;
                start();
            }, 600);
        }
        else {
            start();
        }

    },
    move(e) {
        if (!onclick.preventClick) return;
        if (dragger) {
            var tiped = null;
            for (var c of touchitems) {
                var d = $scoped.get(c).d;
                if (d.isfolder && !d.selected && overpos(c, e)) {
                    if (!c.hasAttribute('dropping')) {
                        if (!drag.tip) {
                            var t = document.createElement('dragtip');
                            drag.tip = t;
                            drag.shadow.appendChild(t);
                            drag.shadow.style.zIndex = zIndex(0) + 2;
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
                        drag.tip.innerHTML = `<b style="color:#169;font-weight:400">移动到</b> ${d.name}`;
                        c.setAttribute('dropping', '');
                    }
                    tiped = c;
                }
                else {
                    c.removeAttribute('dropping');
                }
            }
            if (!tiped && drag.tip) css(drag.tip, 'display:none');
            e.moveLocked = 2;
            return;
        }
        if (e.type !== 'mousemove') return;
        if (!rect.parentNode) {
            appendChild.insert(this.parentNode, rect, this);
            resize(rect, rect.event);
        }
        e.moveLocked = true;
    },
    async end(e) {
        touchitems = null;
        clearTimeout(touch.ing);
        if (dragger) {
            delete drag.tip;
            dragger = null;
            var p = this.querySelector("[dropping]");
            if (p) {
                p.removeAttribute("dropping");
                var $scope = $scoped.get(this);
                var ps = $scoped.get(p);
                var base = $scope.pathlist.concat(ps.d.name).join("/");
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
    var { selected, data } = $scoped.get(this);
    var index, targetIndex;
    var boxCount = this.group;
    if (delta === 'home') targetIndex = 0;
    else if (delta === 'end') targetIndex = data.length - 1;
    else if (delta === 'pagedown') {
        if (data.length <= boxCount) {
            targetIndex = data.length - 1;
        }
        else {
            index = data.indexOf(selected[selected.length - 1]);
            var e = this.getLastVisibleElement(0);
            if (e) targetIndex = data.indexOf($scoped.get(e).d);
            else targetIndex = data.length - 1;
            targetIndex = (targetIndex / boxCount | 0) * boxCount + index % boxCount;
            if (targetIndex >= data.length) targetIndex = data.length - 1;
        }
    }
    else if (delta === 'pageup') {
        if (data.length <= boxCount) {
            targetIndex = 0;
        }
        else {
            var f = this.getFirstVisibleElement();
            var index = data.indexOf(selected[0]);
            if (!f) targetIndex = 0;
            else if ($scoped.get(f).d !== selected[0]) {
                targetIndex = index + ((data.indexOf($scoped.get(f).d) - index) / boxCount | 0) * boxCount;
            }
            else {
                var e = this.getLastVisibleElement(0);
                var fi = data.indexOf($scoped.get(f).d);
                var ei = data.indexOf($scoped.get(e).d);
                targetIndex = fi - ((ei - fi) / boxCount | 0) * boxCount;

            }
            if (targetIndex < 0) targetIndex = index % boxCount;
        }

    }
    else if (!selected.length) {
        targetIndex = /left|^up/.test(delta) ? data.length - 1 : 0;
    }
    else if (typeof delta === 'string') switch (delta) {
        case "left":
            index = data.indexOf(selected[0]);
            if (selected.length > 1) { targetIndex = index; break }
            targetIndex = index - 1;
            if (targetIndex < 0) targetIndex = 0;
            break;
        case "right":
            index = data.indexOf(selected[selected.length - 1]);
            if (selected.length > 1) { targetIndex = index; break }
            targetIndex = index + 1;
            if (targetIndex >= data.length) targetIndex = data.length - 1;
            break;
        case "up":
            index = data.indexOf(selected[0]);
            if (selected.length > 1) { targetIndex = index; break }
            if (data.length <= boxCount) targetIndex = 0;
            else if (index >= boxCount) targetIndex = index - boxCount;
            else targetIndex = index;
            break;
        case "down":
            index = data.indexOf(selected[selected.length - 1]);
            if (selected.length > 1) { targetIndex = index; break }
            targetIndex = index + boxCount;
            if (data.length <= boxCount) targetIndex = data.length - 1;
            else {
                if (targetIndex >= data.length) targetIndex = data.length - 1;
                if ((targetIndex / boxCount | 0) === (index / boxCount | 0)) targetIndex = index;
            }
            break;

    }
    for (var s of selected) {
        s.selected = false;
    }
    var d = data[targetIndex];
    if (d) d.selected = true, $scoped.get(this).selected = [d];
    this.setFocus(targetIndex);
    render.refresh();
};

var bindkey = function (lattice) {
    for (var key of "up,down,right,left,pagedown,pageup,home,end".split(",")) {
        on("keydown.only." + key)(lattice, moveFocus.bind(lattice, key));
    }
};
async function ondrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    $scoped.get(this).uploadAll(files);
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
    on("pointerdown")(scope.listview, function () {
        if (document.activeElement !== scope.listview) scope.listview.focus();
    })
    onmounted(scope.listview, function () {
        scope.listview.focus();
    });

    return page;
}
var methods = {
    startMarquee(sp) {
        if (sp.scrollWidth <= sp.clientWidth) return;
        sp.mq = setInterval(function () {
            clearInterval(sp.mq);
            sp.mq = setInterval(function () {
                var scrollLeft = sp.scrollLeft;
                sp.scrollLeft += 1;
                if (sp.scrollLeft === scrollLeft) sp.scrollLeft = 0;
            }, 16);
        }, 400);
        sp.setAttribute("marquee", '');
        sp.scrollLeft = sp.clientWidth;
    },
    stopMarquee(sp) {
        clearInterval(sp.mq);
        sp.removeAttribute("marquee");
        sp.scrollLeft = 0;
    },
    hasName(name) {
        for (var d of this.data) if (d.name === name && !d.cut) return true;
        return false;
    }
};
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
async function uploadAll(files) {
    var $scope = this;
    var dist = $scope.pathlist.join("/");
    await queue.call(files, function (f) {
        return $scope.upload(f, dist);
    });
    $scope.open();
}
async function ondrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    uploadAll.call(this, files);
}
function main() {
    var page = document.createElement('explorer');
    page.innerHTML = template;
    moveupon(page.querySelector('lattice'), touch);
    var scope = extendIfNeeded({
        pathlist: [],
        selected: [],
        data: [],
        icons: {
            file: shapes$file,
            folder: shapes$folder,
        },
        load(p) { return [] },
        async open(p) {
            if (p) {
                if (!p.isfolder) {
                    return;
                }
                this.pathlist.push(p.name);
            }
            p = "/" + this.pathlist.join("/").replace(/^\/|\/$/g, '');
            var files = await this.load(p);
            if (files) this.data = files.sort(function (a, b) {
                return sortname(a.name, b.name);
            }).sort(function (a, b) {
                return b.isfolder - a.isfolder;
            });
            this.selected = [];
        },
        delete() { alert("无法删除！") },
        mov() { alert("无法移动！") },
        copy() { alert("无法复制！") },
        rename() { alert("无法重命名！") },
        upload() { alert("添加失败！") },
        uploadAll,
        toActive(e) {
            var plattice = this.listview;
            return getTargetIn(e => e.parentNode && e.parentNode.parentNode === plattice, e.target);
        },
        unsetActive(event, file) {
            if (onclick.preventClick) return;
            var e = this.toActive(event);
            if (!e) return;
            if (file.selected === 1) {
                file.selected = true;
                return;
            }
            for (var s of this.selected) {
                s.selected = s === file;
            }
            this.selected = [file];
        },
        setActive(event, file) {
            var e = this.toActive(event);
            if (!e || !file.selected) {
                if (!event.ctrlKey) {
                    for (var s of this.selected) {
                        s.selected = false;
                    }
                    this.selected = [];
                }
            }
            if (e && !file.selected) {
                file.selected = 1;
                if (this.selected.indexOf(file) < 0) this.selected.push(file);
            }
            this.listview.setFocus(e && e.parentNode);
        },
    }, methods);
    renderWithDefaults(page, scope);
    bind('drop')(scope.listview, ondrop);
    contextmenu(scope.listview, explorer$context);

    return page;
}
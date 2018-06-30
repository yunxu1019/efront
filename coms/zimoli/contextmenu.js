function contextmenu(target, menu) {
    on("contextmenu")(target, function (event) {
        event.preventDefault();
        css(menu, {
            position: "absolute",
        });
        menu.tabIndex = 0;
        popup(menu);
        menu.focus();
        var { offsetWidth, offsetHeight } = menu;
        var left = event.clientX, top = event.clientY;
        if (offsetWidth + left > innerWidth) {
            left = left - offsetWidth;
        }
        if (left < 0) {
            left = 0;
        }
        if (offsetHeight + top > innerHeight) {
            top = top - offsetHeight;
        }
        if (top < 0) {
            top = 0;
        }
        css(menu, {
            left: left + "px",
            top: top + "px"
        });
        onmousedown(menu, e => e.preventDefault());
        onblur(menu, e => remove(menu));
    });
}
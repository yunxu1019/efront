var _mask = createElement(div);
css(_mask, "width:100%;height:100%;position:fixed;background-color:rgba(0,0,0,0.1)");

function mask(onclose) {
    var msk = createElement(_mask);
    onmousewheel(msk, function (event) {
        event.preventDefault();
    });
    ontouchmove(msk, function (event) {
        event.preventDefault();
    });
    appendChild(document.body, msk);
    onclick(msk, function () {
        if (!isFunction(onclose) || onclose() !== false)
            remove(msk);
    });
    return msk;
}
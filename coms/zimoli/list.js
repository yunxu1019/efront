// 中文编码 utf8
var _slider = createElement(div);
/**
 * 
 * @param {Boolean|Array|Function} generator 
 */
function list(generator) {
    var list = div();
    list.autoFix = true;
    var saved_index, saved_ratio;
    onappend(list, function () {
        if (saved_index !== void 0) scrollTo(saved_index, saved_ratio);
    });
    var childrenMap = {};
    scrollTo = function (index, ratio) {
        if (!list.isMounted) {
            saved_index = index, saved_ratio = ratio;
            return;
        }
        var offsetBottom = 0, offsetTop = 0, offset = +index || 0;
        while (offsetBottom - offsetTop <= list.offsetHeight) {
            var item = childrenMap[offset];
            if (!item) {
                item = generator(offset, ratio);
                childrenMap[offset] = item;
                appendChild(list, item);
            }
            if (++offset - index > 3000) throw new Error("多于3000个元素需要绘制！");
            if (!offsetTop) {
                offsetTop = item.offsetTop || 1;
            }
            offsetBottom = item.offsetTop + item.offsetHeight;
        }
        for (var k in childrenMap) {
            if (!(k <= offset && k >= index)) {
                remove(childrenMap[k]);
                delete childrenMap[k];
            }
        }
    };
    list.go = scrollTo;
    return list;
}
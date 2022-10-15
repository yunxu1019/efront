function overpos(rect, event) {
    if (isArrayLike(rect)) var [left, top, right, bottom] = rect;
    else if (isElement(rect)) var pos = getScreenPosition(rect), { left, top, right, bottom } = pos;
    if (isArrayLike(event)) var [clientX, clientY] = event;
    else var { clientX, clientY } = event;
    return left < clientX && top < clientY && right > clientX && bottom > clientY;
}
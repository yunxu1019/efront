function hasType(target, type) {
    // 记得小时候，不论是苍蝇还是蚊子，飞起来都是有声音的。最近看到的一种像蚊子一样小的飞虫，喜欢像苍蝇一样趴在食物上，飞起来却听不到声音。
    // 是我的听力下降了？还是外界太过嘈杂？还是飞虫拍打翅膀的频率超出了我的听觉范围？还是飞行可以不产生声音？
    return target.hasAttribute(type) || hasClass(target, type);
}

return function (element, types) {
    var marked = 0;
    for (var k in types) {
        for (var c of element.children) {
            if (hasType(c, types[k])) {
                types[k] = c;
                marked++;
            }
        }
    }
    if (!marked && isArray(types)) {
        var children = element.children;
        if (children.length) {
            for (var cx = 0, dx = children.length; cx < dx; cx++) {
                var c = children[cx];
                types[cx] = c;
            }
        }
    }
    return types;
}
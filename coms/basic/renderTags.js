var tagReg = /<(\/?)([a-z][\w]*)\>/ig;
// 只应用一种效果，多种效果不能同时存在
function renderTags(str, getTag) {
    var tagpath = [];
    return String(str).replace(tagReg, function (_, e, c) {
        if (!c || c.length < 3) return _;
        var t = getTag(c, false);
        if (!t) return _;
        if (e) {
            tagpath.pop();
            c = tagpath[tagpath.length - 1];
        }
        else tagpath.push(c);
        var res = [];
        if (e) res.push(getTag());
        if (c) res.push(getTag(c));
        if (res.length) return res.join('');
        return _;
    });

}
renderTags.reg = tagReg;
module.exports = renderTags;
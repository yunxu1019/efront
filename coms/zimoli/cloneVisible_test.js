var html = `<div style="border:5px dashed;line-height:40px;text-align:center;text-shadow:1px 3px 0 red;color:#ff3;text-indent:20px">
abc
<input style="width:10px;height:10px;-webkit-appearance:none"/>
<span style="writing-mode:vertical-rl;letter-spacing:12px">
书生<br/>意气
</span>
</div>`;
var ele = div();
css(ele, "width:100px;height:100px;position:relative;background-color:#223223;overflow:hidden;border-radius:100px;")
ele.innerHTML = html;
function cloneVisible_test() {
    setTimeout(function () {
        var clone = cloneVisible(ele);
        css(clone, "left:100px;top:100px;position:absolute;z-index:10");
        appendChild(document.body, clone);
        window.e1 = ele.querySelector("input");
        window.e2 = clone.querySelector("input");
        var s1 = window.s1 = getComputedStyle(e1);
        var s2 = window.s2 = getComputedStyle(e2);
        for (var k in s1) {
            if (s1[k] !== s2[k] && !/cssText/.test(k)) {
                console.warn(k, 'src:', s1[k], 'dst:', s2[k]);
            }
        }
    });
    return ele;
}
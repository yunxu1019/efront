function main() {
    var html = document.createElement("table");
    html.innerHTML = cloneVisible_test;
    var [td1, td2, td3] = html.children[2].children[0].children;
    var ele=td1.children[0]
    setTimeout(function () {
        var clone = cloneVisible(ele);
        appendChild(td2, clone);
        ele.with ? ele.with.push(clone) : ele.with = [clone];
        var e1 = window.e1 = ele.querySelector("input");
        var e2 = window.e2 = clone.querySelector("input");
        var s1 = window.s1 = getComputedStyle(e1);
        var s2 = window.s2 = getComputedStyle(e2);
        for (var k in s1) {
            if (s1[k] !== s2[k] && !/cssText/.test(k)) {
                console.warn(k, 'src:', s1[k], 'dst:', s2[k]);
            }
        }

        html2canvas(ele, { backgroundColor: "rgba(0,0,0,0)" }).then(function (e) {
            appendChild(td3, e);
        });
    });
    return html;
}
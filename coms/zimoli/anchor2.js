function anchor2(label, href) {
    var a = document.createElement("a");
    a.href = href || "";
    a.href = "";
    if (isString(label)) {
        a.innerHTML = label;
    } else {
        appendChild(a, label);
    }
    return a;
}
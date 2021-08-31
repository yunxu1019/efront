function main(e = document.createElement("deepnav")) {
    if (!e.children.length) e.innerHTML = template;
    else e.children[0].setAttribute("navitem", '');
    list(e, 'x');
    return e;
}
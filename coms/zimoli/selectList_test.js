var page = div();
page.innerHTML = selectList_test;
render(page, {
    select,
    select2() {
        var sel = document.createElement("select");
        return sel;
    },
    options600: new Array(600).fill(0).map((_, a) => a),
    options6000: new Array(60000).fill(0).map((_, a) => a)
});
function main() {
    return page;
}
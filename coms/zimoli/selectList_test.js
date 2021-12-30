var page = div();
page.innerHTML = selectList_test;
render(page, {
    select,
    options600: new Array(599).fill(0).map((_, a) => a),
    options6000: new Array(6000).fill(0).map((_, a) => a)
});
function main() {
    return page;
}
titlebar("添加到我的收藏");
var page = div();
console.log(page);
page.innerHTML = add;
render(page, {
    type: "1",
    titlebar,
    field,
    btn: button,
    select
});
function main() {
    return page;
}
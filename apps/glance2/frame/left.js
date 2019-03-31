var page = div();
page.innerHTML = left;
render(page, {
    menu
});
function main() {
    console.log(page);
    return page;
}
var page = div();
page.innerHTML = form_test;
render(page, {
    form
});
function main() {
    return page;
}
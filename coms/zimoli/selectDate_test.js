var page = div();
page.innerHTML = selectDate_test;
render(page, {
    input(element) {
        select(element, selectDate());
        return element;
    }
})
function main() {
    return page;
}
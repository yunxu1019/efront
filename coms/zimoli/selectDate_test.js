var page = div();
page.innerHTML = selectDate_test;
render(page, {
    select(element) {
        console.log(selectDate);
        select(element, selectDate());
        return element;
    }
})
function main() {
    return page;
}
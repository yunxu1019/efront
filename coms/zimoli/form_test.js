var page = div();
page.innerHTML = form_test;
render(page, {
    form
});
function main() {
    var f = page.querySelector('form');
    console.log(f.onsubmit)
    f.onsubmit = e => e.preventDefault();
    return page;
}
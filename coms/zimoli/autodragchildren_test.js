function main() {
    var page = div();
    page.innerHTML = autodragchildren_test;
    var body = page.querySelector("tbody");
    autodragchildren(body, body);
    var list = page.querySelector("list");
    autodragchildren(list, list);
    return page;
}
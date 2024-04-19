function main() {
    var page = grid([0, [0, 50, [0, 33.3333, 66.6667]]]);
    css(page, "width:500px;height:400px;background:#f2f080;");
    page.editable = true;
    page.reshape();
    console.log(page.children.length)
    return page;
}
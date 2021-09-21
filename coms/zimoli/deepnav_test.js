function main() {
    var page = div();
    page.innerHTML = template;
    render(page, {
        deepnav,
        items: [
            "互联网",
            "深圳疼",
            "扣扣",
            "空间",
            "音乐",
            "刘若英",
            "后来",
            "更多",
        ]
    });
    return page;
}
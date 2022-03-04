function main() {
    var page = document.createElement('user-api');
    page.innerHTML = template;
    renderWithDefaults(page, {
        apilist: ["查询", "添加", "删除", "登录"].map(a => {
            var [name, path] = a.split(' ');
            return { name };
        }),
        xlist: menu,
    })
    page.$scope.apilist[1].actived = true;
    console.log(page.$scope)
    return page;
}
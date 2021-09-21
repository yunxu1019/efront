function main() {
    var page = view();
    page.innerHTML = home;
    var $scope = {
        data: {
            title: '反馈',
            content: '',
        },
        send() {
            data.from('add', {
                _id: `efront:${+new Date}`,
                content: this.data.content
            });
        },
    };
    renderWithDefaults(page, $scope);
    page.dragTarget = page.children[0];
    resize.on(page);
    return page;
}
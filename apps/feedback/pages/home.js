function main() {
    function loadlist() {
        data.from("load-list", { selector: { userid: user.id } }, function (data) {
            $scope.items.unshift.apply($scope.items, data);
        });
    }
    var user = data.getInstance("efrontuser");

    var page = view();
    page.innerHTML = home;

    var $scope = {
        data: {
            title: '反馈',
            content: '',
        },
        user,
        items: [],
        send() {
            if (!this.data.content.trim()) return alert.error("无法发送空信息！");
            var d = {
                _id: `efront:${+new Date}`,
                userid: this.user.id,
                content: this.data.content,
            };
            this.items.push(d);
            data.from('add', d).loading_promise.then(function (a) {
                d.loaded = true;
            });
        },
    };
    if (!user.id) {
        data.from("ip", function (response) {
            var id = response.data + "-" + (+new Date / 1000 | 0).toString(32);
            data.patchInstance("efrontuser", { id }, true);
            loadlist();
        });
    } else {
        loadlist();
    }
    renderWithDefaults(page, $scope);
    resize.on(page, page.children[0]);
    return page;
}
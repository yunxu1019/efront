
function tree_test() {
    var banner = tree();
    banner.setData([
        {
            tab: 1,
            name: "一级目录"
        },
        {
            tab: 2,
            name: "二级目录"
        },
        {
            tab: 2,
            name: "二级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 4,
            name: "四级目录"
        },
        {
            tab: 4,
            name: "四级目录"
        },
        {
            tab: 5,
            name: "五级目录"
        },
        {
            tab: 1,
            name: "一级目录"
        },
        {
            tab: 1,
            name: "一级目录"
        },
        {
            tab: 2,
            name: "二级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 4,
            name: "四级目录"
        },
        {
            tab: 4,
            name: "四级目录"
        },
        {
            tab: 5,
            name: "五级目录"
        },
        {
            tab: 1,
            name: "一级目录"
        },
        {
            tab: 1,
            name: "一级目录"
        },
        {
            tab: 2,
            name: "二级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },
        {
            tab: 3,
            name: "三级目录"
        },

    ]);
    setTimeout(function () {
        banner.go(0);
        test_scroll(banner);
    })
    return banner;
}

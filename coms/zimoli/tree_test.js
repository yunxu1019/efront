var data1 = random([
    {
        name: "一级目录${inc}"
    }
], 20);
var data2 = random([{
    name: "一级目录${inc}",
    children: [
        {
            name: "二级目录${inc}",
            children: [
                {
                    name: "三级目录${inc}"
                }
            ]
        },
    ]
}
], 20)

function tree_test() {
    var banner = tree();
    banner.setData(data2);
    setTimeout(function () {
        banner.go(0);
        test_scroll(banner);
    })
    return banner;
}

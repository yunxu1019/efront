
var data1 = random([
    {
        name: "一级目录${inc}"
    }
], 2);
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
], 2)

function tree_test() {
    var banner = tree();
    banner.setData(data2);
    css(banner, {
        overflow: 'hidden',
        padding: 0,
        height: 260
    });
    return banner;
}

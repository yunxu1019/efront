var layer = layer$glance({
    left: '/frame/left',
    main: "/dashboard/main",
    top: "/frame/top"
});
css("*,*:before,*:after", {
    'box-sizing': 'border-box'
})
function main() {
    return layer;
}
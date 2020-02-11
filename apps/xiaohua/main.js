var layer = layer$glance({
    left: '/frame/left',
    main: "/photo/list",
    top: "/frame/top"
});
config;
login();
css("*,:before,:after", 'box-sizing:border-box');
on("dragover")(window, e => e.preventDefault());

var main = function () {
    return layer;
};
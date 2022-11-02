var page = createVboxWithState(state);

var datas = data.from("singer-class", function (response) {
    var groups = {};
    response.map(a => {
        var { group } = a;
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(a);
    });
    return Object.keys(groups).map(k => groups[k]);
});
var $scope = {
    datas,
    group: padding,
    padding,
    bg,
    song,
    go,
};
page.innerHTML = keywords;
render(page, $scope);
function main() {
    return page;
}
var page = createVboxWithState(state);
page.innerHTML = view;
var scope = {
    go,
    src: [],
    lattice
};
render(page, scope);
once("append")(page, function () {
    kugou$kugouapi.fanxingList().done(function (response) {
        var res = JSON.parse(response.responseText);
        scope.src = res.data.list;
    });
});
function main() {
    return page;
}
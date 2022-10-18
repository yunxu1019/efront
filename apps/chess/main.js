var page = createElement(div);
var createBtn = button("创建房间");
var visitBtn = button("进入房间");
var gameNum = input();
appendChild(page, gameNum, visitBtn, createBtn);
onclick(createBtn, function () {
    api("/game/game", { type: "create", user_id }).success(function (response) {
        // 创建成功
        go("./game", {
            game_id: response.result,
            user_id: user_id
        });
    }).error(function (error) {
        // 创建失败
        alert(error);
    });
});
onclick(visitBtn, function () {
    var game_id = gameNum.value;
    api("/game/game", { type: "join", user_id, game_id }).success(function (response) {
        go("./game", {
            game_id,
            user_id
        });
    }).error(function (error) {
        alert(error);
    });
});
var user_id = +new Date + Math.random();
function main() {
    return page;
}
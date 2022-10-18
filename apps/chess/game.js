var page = createElement(div);
var game_id, user_id, user_color;

var current_cell = null;
var chessmen_cells = "車馬相仕帥仕相馬車砲砲兵兵兵兵兵卒卒卒卒卒炮炮車馬象士將士象馬車"
    .split("")
    .map(function (n, i) {
        var cell = button();
        onclick(cell, function () {
            var step = null;
            if (cell === current_cell) {
                removeClass(current_cell, "checked");
                current_cell === null;
            } else if (current_cell) {
                // 已选择过要走的棋子
                var req = function () {
                    api("/game/game", { game_id, user_id, step: [current_cell.index, cell.index], type: "detect" }).success(function () {
                    }).error(function (error) {
                        alert(error);
                    });
                    current_cell && removeClass(current_cell, "checked");
                    current_cell = null;
                };
                var step_count, delta_step;
                if (cell.col === current_cell.col) {
                    step_count = cell.row - current_cell.row;
                    delta_step = 8;
                } else if (cell.row === current_cell.row) {
                    step_count = cell.col - current_cell.col;
                    delta_step = 1;
                } else {
                    //不正确的操作
                    return;
                }
                if (step_count < 0) {
                    step_count = -step_count;
                    delta_step = -delta_step;
                }

                if (cell.chessman === null) {
                    // 移棋
                    req();
                } else if (step_count === 1) {
                    if (cell.chessman === "") return;
                    if (
                        cell.chessman.power <= current_cell.chessman.power &&
                        !(/[帥將]/.test(current_cell.chessman.name) && /[兵卒]/.test(cell.chessman.name)) ||
                        /[兵卒]/.test(current_cell.chessman.name) && /[帥將]/.test(cell.chessman.name)
                    ) {
                        //可以吃
                        req();
                    }
                } else if (/[炮砲]/.test(current_cell.chessman.name)) {
                    //隔子吃子
                    var chessman_count = 0;
                    var chessman_index = current_cell.index;
                    for (var cx = 1, dx = step_count - 1; cx < dx; cx++) {
                        chessman_index += delta_step;
                        if (chessmen_cells[chessman_index].chessman !== null) {
                            chessman_count++;
                        }
                    }
                    if (chessman_count === 1) {
                        req();
                    }
                } else {
                    // ...
                    console.log(cell.chessman);
                }
            } else {
                switch (cell.chessman) {
                    case "":
                        //翻棋
                        if (cell.chessman === "") {
                            api("/game/game", { game_id, user_id, step: [cell.index], type: "detect" }).success(function (xhr) {
                            }).error(function (error) {
                                alert(error);
                            });
                        }
                        break;
                    case null:
                        //无棋
                        break;
                    default:
                        //选棋
                        current_cell && removeClass(current_cell, "checked");
                        current_cell = cell;
                        addClass(current_cell, "checked");
                }
            }
        });
        cell.index = i;
        cell.col = i % 8;
        cell.row = i / 8 | 0;
        cell.chessman = "";
        return cell;
    });
var game_id_elem = titlebar("").children[0];
var chessman_grid = createElement(div);
addClass(chessman_grid, "grid");
appendChild(chessman_grid, chessmen_cells);
appendChild(page, chessman_grid);
var watcher = null;
onremove(page, function () {
    watcher.onerror(function () { });
    watcher && watcher.abort();
    watcher = null;
    link_id = null;
    clearTimeout(clock_timer);
});
var link_id;
function watch() {
    watcher && watcher.abort();
    watcher = api("/game/game", { type: "watch", game_id, link_id: link_id }).success(function (response) {
        var result = response.result || {};
        if (result.link_id) {
            link_id = result.link_id;
            watch();
        } else if (result instanceof Array) {
            result.forEach(function (res) {
                switch (res.type) {
                    case "reconnect":
                        watch();
                        break;
                    case "update":
                        update(res.message)
                        watch();
                        break;
                    case "end":
                        alert("游戏结束！");
                        break;
                }
            });
        }
    }).error(function (error) {
        alert(error);
        go("main");
    });
}
onappend(page, function () {
    current_cell = null;
    watch();
});
var player1_elem = createElement(div), player2_elem = createElement(div);
appendChild(page, player1_elem, player2_elem);
var clock_timer = 0;
function clock() {
    var elem = clock.elem;
    var label_text = text(elem).replace(/(\d+)(?=秒)/, d => +d - 1);
    text(elem, label_text);
    if (/[^\d]0秒/.test(label_text)) {
        alert(clock.timeout_text || "时间到！");
        history.back();
    } else {
        clock_timer = setTimeout(clock, 1000);
    }
}
function update(game) {
    var {
        first_color = "",
        second_color = "",
        first_user,
        player_id,
        current_player_id,
        grid
    } = game;
    clearTimeout(clock_timer);
    if (current_player_id === user_id) {
        // 等待当前用户操作
        clock.elem = player1_elem;
        clock.timeout_text = "时间到，您未在规定的时间内下棋！"
    } else {
        clock.elem = player2_elem;
        clock.timeout_text = "时间到，对方未在规定的时间内下棋！"
        // 等待对方操作
    }
    if (first_user) {
        user_color = first_user === user_id ? first_color : second_color;
        if (user_color === "红") {
            css(player1_elem, "border-left:16px solid red;");
            css(player2_elem, "border-left:16px solid black;");
        } else if (user_color === "黑") {
            css(player2_elem, "border-left:16px solid red;");
            css(player1_elem, "border-left:16px solid black;");
        } else {
            css(player1_elem, "border-left:none;");
            css(player2_elem, "border-left:none;");
        }
        text(player1_elem, `当前用户(${first_user === user_id ? "先手:" + first_color : "后手:" + second_color})：${user_id || ""}, ${current_player_id === user_id ? "还有60秒" : "等待中..."}`);
        text(player2_elem, `对战用户(${first_user === user_id ? "后手:" + second_color : "先手:" + first_color})：${user_id === player_id ? game.user_id : player_id}, ${current_player_id === user_id ? "等待中..." : "还有60秒"}`);
    }
    clock();
    if (isArray(game.grid)) {
        for (var cx = 0, dx = grid.length; cx < dx; cx++) {
            var chessman = grid[cx];
            chessmen_cells[cx].chessman = chessman;
            if (chessman instanceof Object) {
                text(chessmen_cells[cx].children[1], chessman.name);
                css(chessmen_cells[cx], `background-color:${chessman.color === "红" ? "red" : "black"};color:white;`)
            } else if (chessman === "") {
                text(chessmen_cells[cx].children[1], '〇');
                css(chessmen_cells[cx], `background-color:rgb(128,64,0);color:white;`)
            } else {
                text(chessmen_cells[cx].children[1], "");
                css(chessmen_cells[cx], `background-color:rgb(128,64,0);color:white;`)
            }
        }
    }

}
function main(game) {
    game_id = game.game_id;
    user_id = game.user_id;
    text(game_id_elem, `房间号：${game_id}`);
    update(game);
    return page;
}
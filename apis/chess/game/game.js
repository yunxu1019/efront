"use multithreading";
var games = {}, games_count = 0, games_count_limit = 10;
var power_queue = "帥將仕士相象馬馬車車砲炮兵卒";
var chessmen = "車馬相仕帥仕相馬車砲砲兵兵兵兵兵卒卒卒卒卒炮炮車馬象士將士象馬車"
    .split("")
    .map((n, i) => new Chessman(n, i));
/**
 * 棋子
 * @param {string} name 棋名
 * @param {number} index 棋序号
 */
function Chessman(name, index) {
    this.name = name;
    this.color = index < 16 ? "红" : "黑";
    this.power = (power_queue.length - power_queue.indexOf(name) - 1) / 2 | 0;
}
Chessman.prototype = {
    toString() {
        return this.color + this.name;
    }
};
/**
 * 棋局
 */
function Game() {
    this.init();
}
Game.prototype = {
    //游戏初始化
    init() {
        if (games_count >= games_count_limit) {
            throw new Error(i18n`服务器已满！`);
        }
        games_count++;
        this.autoComplete();
        var id = Date.now();
        if (id in games) {
            throw new Error(i18n`当前并发量大，请重试！`);
        }
        this.id = id;
        games[id] = this;
        this.source = chessmen.slice(0);
        this.grid = chessmen.map(() => "");
    },
    //按线性坐标读取棋子
    getChessman(index) {
        return this.grid[index];
    },
    //按线性坐标放置棋子
    setChessman(index, chessman) {
        this.grid[index] = chessman;
    },
    //读取行坐标
    getRow(index) {
        return index / 8 | 0;
    },
    //读取列坐标
    getCol(index) {
        return index % 8;
    },
    //比较棋子大小
    compare(chessman1, chessman2) {
        return chessman1.power - chessman2.power;
    },
    //翻棋
    detect(index) {
        var chessman = this.getChessman(index);
        if (chessman === undefined) {
            throw new Error(i18n`目标位置不存在！`);
        }
        if (chessman !== "") {
            throw new Error(i18n`已经翻过这个位置`);
        }
        var source = this.source;
        var chessman = source.splice(source.length * Math.random() | 0, 1)[0];
        if (!this.first_color) {
            this.first_color = chessman.color;
            this.second_color = chessman.color === "红" ? "黑" : "红";
        }
        this.setChessman(index, chessman);
        return chessman;
    },
    //走棋
    step(color, point1, point2) {
        if (point1 === point2) {
            //翻棋
            this.detect(point1);
            return this.getChessman(point1);
        }
        var chessman1 = this.getChessman(point1);
        var chessman2 = this.getChessman(point2);
        if (chessman2 === undefined) {
            throw new Error(i18n`目标位置不存在！`);
        } else if (chessman1 === undefined) {
            throw new Error(i18n`起始位置不存在！`);
        }
        if (!chessman1) {
            throw new Error(i18n`起始位置不存在可操作棋子！`);
        }
        if (chessman1.color !== color) {
            throw new Error(i18n`您只能操作自己的棋子！`);
        }
        var step_count, step_delta;
        if (this.getCol(point1) === this.getCol(point2)) {
            //横向走棋
            step_count = this.getRow(point2) - this.getRow(point1);
            step_delta = 1;
        } else if (this.getRow(point1) === this.getRow(point2)) {
            //纵向走棋
            step_count = this.getCol(point1) - this.getCol(point2);
            step_delta = 8;
        } else {
            throw new Error(i18n`起始位置和目标位置应该在同一直线上！`);
        }
        if (step_count < 0) {
            step_delta = -step_delta;
            step_count = -step_count;
        }
        if (chessman2 === null) {
            //移棋
            if (step_count !== 1) {
                throw new Error(i18n`一次只能走一个格子！`);
            }
            this.setChessman(point1, null);
            this.setChessman(point2, chessman1);
        } else {
            //吃子
            if (chessman2.color === color) {
                throw new Error(i18n`不能吃自己的棋子！`);
            }
            if (step_count === 1) {
                //吃相临子
                if (chessman2 === "") {
                    throw new Error(i18n`不能吃相临位置未翻开的棋子！`);
                }
                if (/[兵卒]/.test(chessman1.name)) {
                    if (!/[帥將]/.test(chessman2.name)) {
                        throw new Error(i18n`兵卒只能吃將帥！`);
                    }
                    this.setChessman(point1, null);
                    this.setChessman(point2, chessman1);
                } else {
                    if (/[帥將]/.test(chessman1.name) && /[兵卒]/.test(chessman2.name)) {
                        throw new Error(i18n`將帥不能吃兵卒！`);
                    }
                    var delta_power = this.compare(chessman1, chessman2);
                    if (delta_power > 0) {
                        //可以吃
                        this.setChessman(point1, null);
                        this.setChessman(point2, chessman1);
                    } else if (delta_power === 0) {
                        //兑子
                        this.setChessman(point1, null);
                        this.setChessman(point2, null);
                    } else {
                        //不可以吃
                        throw new Error(i18n`无法吃比自己大的子`);
                    }
                }
            } else if (/砲炮/.test(chessman1.name)) {
                //翻子吃子
                if (chessman2 === null) {
                    throw new Error(i18n`不可以移动到远处的位置！`);
                }
                var chessman_count = 0;
                var temp_index = point1;
                for (var cx = 1; cx < step_count - 1; cx++) {
                    temp_index += step_delta;
                    if (this.getChessman(temp_index) !== null) {
                        chessman_count++;
                    }
                }
                if (chessman_count < 1) {
                    throw new Error(i18n`至少翻过一个子才能吃远处的子！`);
                } else if (chessman_count > 1) {
                    throw new Error(i18n`最多翻过一个子去吃远处的子！`);
                }
                this.setChessman(point1, null);
                this.setChessman(point2, chessman1);
            } else {
                throw new Error(i18n`非法操作！`);
            }
        }
    },
    //自动终止游戏
    autoComplete() {
        var that = this;
        clearTimeout(this.autoComplete_timer);
        this.autoComplete_timer = setTimeout(() => this.destroy(), 120 * 1000);
    },
    //终止游戏
    destroy() {
        games_count--;
        delete games[this.id];
        clearTimeout(this.autoComplete_timer);
        this.broadcast("end");
        clearTimeout(this.broadcast_timmer);
    },
    //广播当前游戏进展
    broadcast_timmer: 0,
    broadcast(type, message) {
        clearTimeout(this.broadcast_timmer);
        var extraPromise = this.extraPromise || {};
        for (var k in extraPromise) {
            if (extraPromise[k] instanceof Array) {
                var [ok, oh] = extraPromise[k];
                try {
                    if (ok instanceof Function) {
                        ok([{ type, message }]);
                    }
                } catch (e) {
                    oh(e);
                }
                extraPromise[k] = null;
            } else if (extraPromise[k] instanceof Object) {
                var extra = extraPromise[k];
                var timeStamp = extra.timeStamp;
                if (new Date - timeStamp > 6000) {
                    delete extraPromise[k];
                } else {
                    extra.queue.push({
                        type, message
                    });
                }
            } else {
                extraPromise[k] = {
                    timeStamp: +new Date,
                    queue: [{
                        type, message
                    }]
                };
            }
        }
        this.broadcast_timmer = setTimeout(() => this.broadcast("reconnect"), 15000);
    },
    getInfo() {
        return {
            player_id: this.player_id,
            user_id: this.user_id,
            user_count: this.extraUsers_count,
            grid: this.grid,
            second_color: this.second_color,
            current_player_id: this.current_player_id,
            first_color: this.first_color,
            first_user: this.first_user
        };
    }
}

/**
 * 对外接口
 */
module.exports = function ({ type, game_id, user_id, link_id, step }) {
    switch (type) {
        case "create":
            //创建房间
            //新建游戏
            var game = new Game();
            game.user_id = user_id;
            game.extraPromise = {
            };
            game.extraUsers_count = 0;
            return game.id;
        case "watch":
            //观战
            if (!game_id) {
                //没有棋局信息
                game_ids = Object.keys(games);
                game_id = game_ids[game_ids.length * Math.random() | 0];
            }
            var game = games[game_id];
            if (!game) {
                throw new Error(i18n`棋局不存在！`);
            }
            var extraPromise = game.extraPromise;
            if (!link_id) {
                if (game.extraUsers_count >= 500) {
                    throw new Error(i18n`房间观战人数已满！`);
                }
                link_id = Date.now() + ":" + ++game.extraUsers_count;
                extraPromise[link_id] = null;
                game.broadcast("update", game.getInfo());
                return { game_id, link_id };
            }
            if (extraPromise[link_id] instanceof Array) {
                throw new Error(i18n`无效的连接标识`);
            } else if (extraPromise[link_id] instanceof Object) {
                var extra = extraPromise[link_id];
                extraPromise[link_id] = null;
                return extra.queue;
            }
            return new Promise(function (ok, oh) {
                extraPromise[link_id] = [ok, oh];
            });
        case "step":
        case "detect":
            //下棋
            var game = games[game_id];
            if (!game) {
                throw new Error(i18n`棋局不存在！`);
            }
            if (!(step instanceof Array)) {
                throw new Error(i18n`参数异常！`);
            }
            game.autoComplete();
            if (!game.player_id) {
                throw new Error(i18n`缺少棋手！`);
            }
            if (game.current_player_id !== user_id) {
                throw new Error(i18n`现在不该您操作！`);
            }

            switch (step.length) {
                case 1:
                    // 翻棋
                    game.detect(step[0]);
                    break;
                case 2:
                    // 移棋
                    game.step(game.first_user === user_id ? game.first_color : game.second_color, step[0], step[1]);
                    break;
            }
            game.current_player_id = user_id === game.user_id ? game.player_id : game.user_id;
            game.broadcast("update", game.getInfo());
            break;
        case "giveup":
        //投降
        case "join":
            //第二个用户加入，开局
            var game = games[game_id];
            if (!game) {
                throw new Error(i18n`房间不存在！`);
            }
            game.autoComplete();
            if (user_id === game.user_id) {
                //和自己下棋，暂不处理
            } else {
                game.player_id = user_id;
                game.first_user = game.current_player_id = Math.random() > .5 ? game.player_id : game.user_id;
            }
            // return game.player_id;
            break;
        case "quit":
        //退出
    }
}
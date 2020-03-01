console.log("西瓜视频");
var _signature = "kW-zdAAgEB57JMUoHGvgvJFvs2AAM9D";
data.loadConfig(efrontURI + 'ixigua.json');
function follow(roomId = 171493, unfollow) {
    var room = data.from("room-info", { _signature, roomId });
    return room.loading_promise.then(function () {
        if (!room.text) return;
        var json = JSON.parse(room.text);
        var { anchorInfo } = json || {};
        if (anchorInfo) {
            data.from("is-followed", {
                anchor_id: anchorInfo.id
            }).loading_promise.then(function (res) {
                if (res.data) return console.log("跳过", anchorInfo.name, roomId);
                return data.from(unfollow ? "unfollow" : "follow", {
                    ToUserId: anchorInfo.id,
                    _signature
                }).loading_promise
                    .then(function (res) {
                        console.log(anchorInfo.name, roomId);
                    });
            }).catch(function () {

            });
        }
    });
}

function sendGift() {
    data.from("send-gift", {
        RoomID: "6799273621991721732",
        GiftID: 794,
        Count: 1,
        AnchorID: "2502117767781981",
    });
}

if (!sessionStorage.id) {
    sessionStorage.id = 238;
}
function run() {
    var id = +sessionStorage.id;
    if (id > 171493) return;
    follow(id++).then(run).catch(run);
    sessionStorage.id = id;
}
for (var i = 0; i < 100; i++)run();
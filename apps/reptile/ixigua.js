console.log("西瓜视频");
var _signature = "blSUNAAgEBGEH-JoDPVngm5UlCAADAF";
data.loadConfig(efrontURI + 'ixigua.json');

function follow(roomId = 171493, unfollow) {
    var room = data.from("room-info", { _signature, roomId });
    return room.loading_promise.then(function () {
        if (!room.text) return;
        var json = JSON.parse(room.text);
        var { anchorInfo } = json || {};
        if (anchorInfo) {
            return data.from(unfollow ? "unfollow" : "follow", {
                ToUserId: anchorInfo.id,
                _signature
            }).loading_promise.then(function (res) {
                console.log(anchorInfo.name, roomId);
            }).catch(function () {

            });
        }
    });
}

if (!sessionStorage.id) {
    sessionStorage.id = 2555;
}
function run() {
    var id = +sessionStorage.id;
    if (id > 1000000) return;
    follow(id++).then(run).catch(run);
    sessionStorage.id = id;
}
for(var i=0;i<10;i++)run();

// console.log(room);
data.loadConfig("api.yml");
user.loginPath = '/auth/login';
var token = data.getSource('authorization');
if (token) {
    user.login({});
}
setInterval(function () {
    var auth = data.getSource('authorization');
    if (!auth) return;
    var auth1 = encode62.timeupdate(auth);
    if (auth1 !== auth) data.setSource("authorization", auth1);
    user.token = auth1;
}, 2000);
login();
var layer = layer$glance({
    left: "frame$left",
    top: 'frame$top'
});
function main() {
    return layer;
}
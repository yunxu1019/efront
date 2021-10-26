if (data.getSource('authorization')) {
    zimoli("/home/main");
}
else {
    zimoli("/auth/login");
}
data.loadConfig("api.yml");
setInterval(function () {
    var auth = data.getSource('authorization');
    if (!auth) return;
    var auth1 = encode62.timeupdate(auth);
    if (auth1 !== auth) data.setSource("authorization", auth1);
}, 2000);

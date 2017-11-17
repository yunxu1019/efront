function countPage({ path }, { message }) {
    return new Promise(function (ok, oh) {
        message.count({
            path: path || "/",
            isupdate: false
        }, function (count) {
            ok(count);
        });
    });
}
module.exports = countPage;
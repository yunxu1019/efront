var zimoli = common;
css("html", `position:absolute;height:100%;width:100%;background: url(images/background.jpg) no-repeat 50%;background-size:cover;`);
function main() {
    $http.injector = function (url, data) {
        url = url.replace(/(?:\?(.*?))?$/, `?$1&lang=zh_CN&pass_ticket=${encodeURIComponent(accountFactory.getPassticket())}`);
        return {
            url,
            data
        }
    }
    zimoli()

}
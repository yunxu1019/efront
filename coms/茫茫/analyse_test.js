var require = window.require;
var fs, path;
var document = window.document;
function test(url) {
    var data = fs.readFileSync(url);
    data = String(data);
    var res = analyse(data);
}
function testblog(blog) {
    var __dirname = "/blog";
    test(path.join(__dirname, blog));
}
function testxml(dirname) {
    var datas = [];
    fs.readdirSync(dirname).forEach(k => {
        var p = path.join(dirname, k);
        var data = fs.readFileSync(p).toString().replace(/\<([\w]+)([^\>]*)\/\>/g, "<$1$2></$1>");
        var div = document.createElement("p");
        div.innerHTML = data;
        var title = div.querySelector("[alias]").getAttribute("alias");
        var content = [title];
        div.querySelectorAll("[comparision]").forEach(a => {
            var t = a.getAttribute("comparision");
            content.push(t);
            datas.push(content.join("\r\n"))
        })
    });
    datas.forEach(analyse);
}
function testcode(dir) {
    var dirname = dir;
    fs.readdirSync(dirname).forEach(function (a) {
        var p = path.join(dirname, a);
        var data = fs.readFileSync(p).toString();
        analyse(data);
    });
}
function analyse_test(text) {
    if (!require) return console.log(i18n`请在electron中打开`);
    fs = require("fs");
    path = require("path");
    if (text) return analyse(text);
    if (document) testxml("/book/金山打字");
    // testcode("/work/efront/coms/basic");

    testblog("炒面.txt");
    testblog("医者.txt");
    testblog("五行阴阳.txt");
    testblog("你真的需要教育吗.txt");
    testblog("3岁.txt");
}
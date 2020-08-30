var path = require("path");
var fs = require("fs");
var emojipath = path.join(__dirname, "../data/qq_emoji/");
var names = fs.readdirSync(emojipath);
var files = names.map(f => path.join(emojipath, f));
var datas = {};
files.map(f => fs.readFileSync(f).toString("base64")).forEach((s, i) => {
    var name = names[i];
    var id = /^(\d+)(.*?)$/.exec(name);
    name = id[1].padStart(3, '0') + id[2];
    datas[name] = s;
});
var res = {};
Object.keys(datas).forEach(k => {
    res[k] = datas[k];
});
fs.writeFileSync(path.join(__dirname, "../apps/feedback/emoji.json"), JSON.stringify(datas, null, 4));
var commbuilder = require("./commbuilder"),
    pagebuilder = commbuilder;
var cconbuilder = require("./iconbuilder");
var indexbuilder = require("./getfile");
var fs = require("fs");
var path = require("path");
var dest_folder_root = path.join(__dirname, "../public");
var packer = module.exports = function (appname) {
    page_packer()
    var
        page,
        coms,
        cons,
        index,
        colors,
        dest;
    page && page_packer(page);
    coms && comm_packer(coms);
    cons && ccon_packer(cons, colors);
    index && index_packer(index);
};
//页面文件可能会有多级文件夹
var page_packer = function (src, dst) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isFile()) {
        if(!/\.[jt]sx?$/i.test(src))return;
        try {
            var buff = pagebuilder(fs.readFileSync(src), path.basename(src), src, []);
            dst && fs.writeFileSync(dst, buff);
        } catch (e) {
            console.error(`${src} =>|| ${dst} !`);
        }
        return;
    }
    if (!fs.existsSync(dst)) mkdirSync(dst);
    fs.readdirSync(src).forEach(function (name) {
        page_packer(path.join(src, name), dst && path.join(dst, name.replace(/\.js$/, "")));
    });
};
//组件文件只有一级文件夹
var comm_packer = function (src, dst) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isFile()) {
        if(!/\.[jt]sx?$/i.test(src))return;
        try {
            var buff = commbuilder(fs.readFileSync(src), path.basename(src), src, []);
            if (src.match(/main\.js$/i)) {
                buff = buff.toString().replace(/(["'`])post\1/i, '$1get$1');
            }
            dst && fs.writeFileSync(path.join(dst, path.basename(src).replace(/\.js$/, "")), buff);
        } catch (e) {
            console.error(`${src} =>|| ${dst} !`);
        }
        return;
    }
    if (!fs.existsSync(dst)) mkdirSync(dst);
    fs.readdirSync(src).forEach(function (name) {
        comm_packer(path.join(src, name), dst);
    });
};
//图标//colors是数组
var ccon_packer = function (src, dst, colors) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isFile()) {
        try {
            var base = cconbuilder(fs.readFileSync(src));
            dst && fs.writeFileSync(dst, base);
        } catch (e) {
            console.error(`${src} =>|| ${dst} !`);
        }
        colors instanceof Array && colors.forEach(function (color) {
            try {
                var buff = cconbuilder.color(base, color);
                dst && fs.writeFileSync(dst + "." + color.toString(16) + ".png", buff);
            } catch (e) {
                console.error(`${src} =>|| ${dst} ${color.toString(16)}!`);
            }
        });
        return;
    }
    if (!fs.existsSync(dst)) mkdirSync(dst);
    fs.readdirSync(src).forEach(function (name) {
        ccon_packer(path.join(src, name), dst && path.join(dst, name.replace(/\.png$/, "")), colors);
    });
};

var index_packer = function (src, dst) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isFile()) {
        try {
            var buff = indexbuilder(src);
            buff = buff.toString().replace(/(["'`])post\1/i, '$1get$1');
            dst && fs.writeFileSync(dst, buff);
        } catch (e) {
            console.error(`${src} =>|| ${dst}!`, e);
        }
        return;
    }
    if (!fs.existsSync(dst)) mkdirSync(dst);
    "index.html,index.htm".split(",").forEach(function (name) {
        index_packer(path.join(src, name), path.join(dst, name));
    });
};
var clear = function (dest, clear_anyway = false) {
    if (!fs.existsSync(dest)) return console.error(`dest does't exist:${dest}`);
    if (!clear_anyway) {
        if (fs.statSync(dest).isFile()) return console.error(`clear failed:${dest}`);
        if (path.relative(dest_folder_root, dest).startsWith("..")) return console.error(`can only clear driectories in ${dest_folder_root}!`);
        return clear(dest, true);
    }
    if (fs.statSync(dest).isFile()) return fs.unlinkSync(dest);
    fs.readdirSync(dest).forEach(function (name) {
        clear(path.join(dest, name), true);
    });
    fs.rmdirSync(dest);
};
function mkdirSync(dir){
    if(fs.existsSync(dir))return;
    var dirs=dir.replace(/[\\\/]+$/).split(/[\\\/]+/);
    var mked=dirs.shift();
    while(fs.existsSync(mked)){
        mked=path.join(mked,dirs.shift());
    }
    while(dirs.length){
        fs.mkdirSync(mked);
        mked=path.join(mked,dirs.shift());
    }
    fs.mkdirSync(mked);
}
Object.assign(packer, {
    page: page_packer,
    comm: comm_packer,
    ccon: ccon_packer,
    index: index_packer,
    clear
});
var memery = require('./memery');
var path = require("path");
var fs = require('fs');
var cwd = process.cwd();
var dirs = [cwd];
while (cwd !== path.dirname(cwd)) {
    cwd = path.dirname(cwd);
    dirs.push(cwd);
}
dirs = dirs.map(a => path.join(a, 'node_modules')).concat(dirs);
dirs.push(path.join(__dirname, '../..'));
dirs = dirs.filter(f => {
    f = path.normalize(f);
    if (dirs[f]) return false;
    dirs[f] = true;
    return fs.existsSync(f);
});
var loaded = Object.create(null);
var findex = {
    coffeescript: ["/package.json"]
};
async function findlib(coffee) {
    if (loaded[coffee]) return loaded[coffee];
    var package = await detectWithExtension(coffee, findex[coffee] || ["/package.json", '/index.js', "/" + coffee + '.js'], dirs);
    if (!package) {
        throw new Error(i18n`无法找到可用的${coffee}支持库`);
    }
    if (/\.json$/.test(package)) package = path.dirname(package);
    try {
        loaded[coffee] = require(package)
    } catch (e) {
        throw e;
    }
    return loaded[coffee];
}
function typescript(t, data, filename) {
    var opts = { noEmitHelpers: true, target: 'esnext' }
    if (/x$/.test(filename)) opts.jsx = memery.JSX;
    return t.transpile(data, opts);
}
function coffeescript(c, data) {
    return c.compile(data);
}
async function coffee(filename, data) {
    if (/\.ts$|\.[tj]sx$/i.test(filename)) {
        return typescript(await findlib("typescript"), data, filename);
    }
    if (/\.coffee$/i.test(filename)) {
        return coffeescript(await findlib('coffeescript'), data);
    }
    var extname = path.extname(filename);
    if (!extname) var info = i18n`无扩展名的`;
    else info = i18n`扩展名为${extname}的`;
    throw new Error(i18n`不支持编译${info}文件`);
}

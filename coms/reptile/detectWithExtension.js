var path = require("path");
var fs = require("fs").promises;
var $split = require("../basic/$split");
var str2array = require("../basic/str2array");
async function detectWithExtension(filenames, extensions = [""], folders = [""]) {
    if (typeof filenames === 'string') filenames = str2array(filenames);
    if (typeof extensions === 'string') extensions = str2array(extensions);
    if (typeof folders === 'string') folders = str2array(folders);
    if (extensions === null) {
        extensions = [""];
    }
    if (folders === null) folders = [""];
    extensions = [].concat(extensions);
    filenames = filenames.map(f => $split(f).join('/')).map(filename => {
        var tempname = filename.replace(/[#\?][\s\S]*$/, '');
        var params = filename.slice(tempname.length);
        return [tempname, params];
    });

    var findedFolder = null;
    for (var folder of folders) for (var [tempname, params] of filenames) for (var ext of extensions) {
        var f = tempname + ext;
        if (folder) f = path.join(folder, f);
        f = path.normalize(f);
        try {
            var stats = await fs.stat(f);
            if (stats.isFile()) {
                f = await fs.realpath(f);
                return f + params;
            }
            if (!findedFolder) findedFolder = f + params;
        } catch { }
    }
    if (!findedFolder) throw new Error(i18n`路径<gray>${filenames}</gray>不存在`);
    return findedFolder;
}
module.exports = detectWithExtension;
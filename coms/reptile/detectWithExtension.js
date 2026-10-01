var path = require("path");
var fs = require("fs").promises;
var $split = require("../basic/$split");
var str2array = require("../basic/str2array");
var colors = require('./colors');
var emptyExtensions = [""];
var emptyFolders = [""];
async function detect(filenames, extensions, folders) {
    if (typeof filenames === 'string') filenames = str2array(filenames);
    if (typeof extensions === 'string') extensions = str2array(extensions);
    if (typeof folders === 'string') folders = str2array(folders);
    if (!extensions) {
        extensions = emptyExtensions;
    }
    if (!folders) folders = emptyFolders;
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
                return [f + params, tempname, ext, folder];
            }
            if (!findedFolder) findedFolder = [f + path.sep + params, tempname, ext, folder];
        } catch { }
    }
    if (!findedFolder) throw new Error(`路径${filenames.map(f => colors.FgYellow + f[0] + colors.Reset).join(', ')}不存在`);
    return findedFolder;
}
async function detectWithExtension(filenames, extensions, folders) {
    var res = await detect(filenames, extensions, folders);
    return res[0];
}
detectWithExtension.detect = detect;
module.exports = detectWithExtension;
var memery = require("./memery");
var getEntryName = function (vars, commName) {
    var { ENTRY_NAME } = memery;
    if (ENTRY_NAME) for (var entry of ENTRY_NAME.trim().split(/\s*,\s*/)) {
        if (/\</.test(entry)) {
            if (!commName) continue;
            entry = entry.replace(/<(文件名|自动|auto|filename)>/ig, commName);
        }
        if (entry in vars) return entry;
    }
    if (!commName) return null;
    if (commName in vars) return commName;
    commName = commName.replace(/\-([a-z])/g, (_, a) => a.toUpperCase());
    if (commName in vars) return commName;
    commName = commName[0].toUpperCase() + commName.slice(1);
    if (commName in vars) return commName;
    return null;
}
module.exports = getEntryName;
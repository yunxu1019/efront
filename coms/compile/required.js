"use strict";
var scanner2 = require("../compile/scanner2");
var strings = require("../basic/strings");
function getRequired(data) {
    var code = scanner2(data);
    var { used, envs } = code;
    if (envs.require) var require = used.require;
    if (require instanceof Array) require.map(r => {
        if (r.next && r.next.type === code.SCOPED) {
            var s = r.next;
            var f = s.first;
            if (f && f.type === code.QUOTED && !f.length && /^[`'"]/.test(f.text)) {
                return strings.decode(f.text);
            }
        }
    })
    else require = [];
    return require;
}
module.exports = getRequired;
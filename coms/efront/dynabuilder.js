var path = require('path');
var memery = require("./memery");
var dynareg = /<script[^>]*>\s*\<\!\-\-[\s\S]*?\-\-\!?\>\s*\<\/script\>|\<([%\?]|script)(?:(?<=%)|(?:(?<=[\?])(?:php|jsp|asp))|(?<=\<script)[^\>]*?serverside[^\>]*\>)([\s\S]*?)(?:\<\/(?=script)\1\>|\1\>)/gi;
var seekreg = new RegExp(`^\\s*(?:\\=\\s*|return\\s+|)[^\\d\\s${punkreg.source.slice(1)}[^\\s${punkreg.source.slice(1)}*\\s*$`);
var commparse = commbuilder.parse;
var SError = function (msg) {
    this.message = msg;
};
SError.prototype.toString = function () {
    return this.message;
};
var prebuilds = {
    __efront: {
        toString() {
            return this.path;
        },
        path: path.join(__dirname, '../..'),
        version: require("../../package.json").version
    },
    Error: SError,
    req: null, res: null, request: null, response: null, context: null,
    remoteAddress: null, textplain: null, forbidden: null,
    db: null,
    i18n: null,
    readdata: server$readdata,
    checkAuth: server$checkAuth,
    clients: require("../server/clients")
};
var globals = Object.assign(Object.create(null), prebuilds, {
    __filename: '',
    __dirname: ''
});
function dynabuilder(buff, fileurl, filepath) {
    var that = this;
    var time = +new Date;
    var imported = [];
    var required = [];
    var data = String(buff).replace(dynareg, function (match, split, content) {
        if (/^\<\!\-\-/.test(match)) return match;
        if (!seekreg.test(content)) {
            var res = commparse.call(that, content, fileurl, filepath, memery.COMPRESS ? 2 : false, false);
            if (res.imported) for (var a of res.imported) {
                if (a in globals) continue;
                if (imported.indexOf(a) < 0) imported.push(a);
            }
            if (res.required) for (var a of res.required) {
                if (a in globals) continue;
                if (required.indexOf(a) < 0) required.push(a);
            }
            content = res.data;
        }
        if (split === '%') return `<%${content}%>`;
        return `<script serverside>${content}</script>`;
    });
    data = Buffer.from(data);
    data.time = new Date - time;
    data.imported = imported;
    data.required = required;
    return data;
}
dynabuilder.prebuilds = prebuilds;
dynabuilder.dynareg = dynareg;
dynabuilder.seekreg = seekreg;
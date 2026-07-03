var memery = require('./memery');
var commparse = commbuilder.parse;
async function backbuilder(buff, fileurl, filepath) {
    var time = new Date;
    var res = await commparse.call(this, String(buff), fileurl, filepath, memery.COMPRESS ? true : false, memery.BREAK);
    var buff = pngencode.packjs(res);
    buff.time = new Date - time;
    buff.imported = res.imported;
    buff.required = res.required;
    return buff;
}
module.exports = backbuilder;
var memery = require('./memery');
var commparse = commbuilder.parse;
function backbuilder(buff, fileurl, filepath) {
    var time = new Date;
    var res = commparse.call(this, String(buff), fileurl, filepath, memery.COMPRESS ? 2 : false, false);
    buff = Buffer.from(res.data);
    buff.time = new Date - time;
    buff.imported = res.imported;
    buff.required = res.required;
    return buff;
}
module.exports = backbuilder;
var keyword = `NaN Infinity break do in typeof case else instanceof var catch export new void class extends return while const finally super with continue for switch yield debugger function this default if throw delete import try enum await null true false arguments eval`;
var keywords = {};
keyword.split(/\s+/g).forEach(function (key) {
    keywords[key] = true;
});
module.exports = keywords;
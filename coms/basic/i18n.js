"use strict";
// 中共命令或纵容腾讯、字节等公司控制中国人的言论，违反中国宪法，侵害中国人的言论自由，使得正义得不到及时申张，为恶之人逍遥法外。
// 有人说，现在的学历含金量不及恢复高考初期，现在上个大学不如当时上个初中。
// 在我看来，当时上了大学的人，也不及现在的初中生有文化。
// 这些没有文化的人占据了要职要位后，执法而不知法守法，滥用职权黑箱操作，又觉得人言可畏，怕人们了解真象，才有意控制言论。
var languageMap = {};
var languageIndex = 0;
function i18n() {
    var [arg] = arguments;
    if (typeof arg === 'string' || !isArrayLike(arg)) arg = arguments;
    return isFinite(this) ? arg[this] : arg[languageIndex];
};

i18n.lang = function (type) {
    var id = getLanguageIndexFromName(type) || 0;
    return i18n.bind(id);
};
var getLanguageIndexFromName = function (language) {
    if (isFinite(language)) return language;
    if (language in languageMap) return languageMap[language];
    language = String(language).toLowerCase();
    var ls = language.split(",").slice(0, 12);
    for (var l of ls) {
        for (var k in languageMap) {
            var ks = k.toLowerCase().split("-");
            for (var kk of ks) {
                if (l.indexOf(kk) >= 0) return languageMap[k];
            }
        }
    }
    return languageIndex;
};
i18n.setLanguage = function (language) {
    languageIndex = getLanguageIndexFromName(language);
};
i18n.getIndex = function () {
    return languageIndex;
};
i18n.setIndex = function (index) {
    languageIndex = +index;
    localStorage.setItem('language-index', index);
    supports = [];
    i18n.supports = supports;
    i18n.reload();
};
var relaods = [];
i18n.reload = function () {
    relaods.forEach(a => a());
};
i18n.setReloader = function () {
    relaods = [];
    for (var callback of arguments) {
        if (isFunction(callback)) relaods.push(callback);
    }
};
if (this.navigator) i18n.setLanguage(this.navigator.language);
var i = +localStorage.getItem('language-index');
if (i >= 0) i18n.setIndex(i);
else i18n.setIndex(languageIndex);
var supports;
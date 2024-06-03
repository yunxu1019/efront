"use strict";
var languageMap = {};
var languageIndex = 0;
function i18n() {
    var [arg] = arguments;
    if (typeof arg === 'string' || !isArrayLike(arg)) arg = arguments;
    return arg[isFinite(this) ? this : languageIndex];
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
if (this.navigator) i18n.setLanguage(this.navigator.language);
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
i18n.addReloader = function () {
    for (var callback of arguments) {
        if (isFunction(callback)) relaods.push(callback);
    }
};
if (this.navigator) i18n.setLanguage(this.navigator.language);
var i = +localStorage.getItem('language-index');
if (i >= 0) i18n.setIndex(i);
else i18n.setIndex(languageIndex);
var supports;
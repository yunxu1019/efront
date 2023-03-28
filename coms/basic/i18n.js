"use strict";
var languageMap = {};
var languageIndex = 0;
function i18n() {
    return arguments[isFinite(this) ? this : languageIndex];
};
i18n.lang = function (type) {
    var id = getLanguageIndexFromName(type) || 0;
    return i18n.bind(id);
};
var getLanguageIndexFromName = function (language) {
    if (isFinite(language)) return language;
    if (language in languageMap) return languageMap[language];
    language = String(language).toLowerCase();
    for (var k in languageMap) {
        for (var kk of k.toLowerCase().split("-")) {
            if (language.indexOf(kk) >= 0) return languageMap[k];
        }
    }
    return languageIndex;
};
i18n.setLanguage = function (language) {
    languageIndex = getLanguageIndexFromName(language);
};
if (this.navigator) i18n.setLanguage(this.navigator.language);
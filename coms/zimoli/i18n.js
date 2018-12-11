var languageMap = {
    "zh": "zh-CN",
    "cn": "zh-CN",
    "en": "en-US",
    "us": "en-US"
};
var source = {
    "zh-CN": {
        name: '名称',
        password: "密码",
        is: "是",
        or: "或",
        incorrect: "错误的",
        ".": '。',
        "?": "？",
        "!": "！",
        ":": "：",
        "": {
            "是……的": [/是(.+?)的/, "$1"]
        }
    },
    "en-US": {

    },
    "am": {},
    "ar": {},
    "bg": {},
    "bn": {},
    "ca": {},
    "cs": {},
    "da": {},
    "de": {},
    "el": {},
    "en-GB": {},
    "es-419": {},
    "es": {},
    "et": {},
    "fa": {},
    "fake-bidi": {},
    "fi": {},
    "fil": {},
    "fr": {},
    "gu": {},
    "he": {},
    "hi": {},
    "hr": {},
    "hu": {},
    "id": {},
    "it": {},
    "ja": {},
    "kn": {},
    "ko": {},
    "lt": {},
    "lv": {},
    "ml": {},
    "mr": {},
    "ms": {},
    "nb": {},
    "nl": {},
    "pl": {},
    "pt-BR": {},
    "pt-PT": {},
    "ro": {},
    "ru": {},
    "sk": {},
    "sl": {},
    "sr": {},
    "sv": {},
    "sw": {},
    "ta": {},
    "te": {},
    "th": {},
    "tr": {},
    "uk": {},
    "vi": {},
    "zh-TW": {},
    "zh-HK": {},
};
var navagatorLanguage = navigator.language ||/** ie~-10 */navigator.userLanguage || navigator.systemLanguage;

var isAdjective = function () {

}
function i18n(message, _source = source) {
    var _search = _source[navagatorLanguage] || source[navagatorLanguage];
    var checkSpell = _search[""];
    var translated = message.replace(/([\s\w]*)([^\s\w]|^)/g, function (match, message, quote) {
        return message.toLowerCase().split(/\s+/).map(a => _search[a]).join("") + (_search[quote] || qoute || "");
    });
    for (var k in checkSpell) {
        var [reg, rep] = checkSpell[k];
        translated = translated.replace(reg, rep);
    }
    return translated;
};
i18n.new = i18n.local = function (_source) {
    var localSource = extend({}, source);
    if (arguments.length > 1) {
        Object.keys(source).forEach(function (language, cx) {
            var Base = function () {
            };
            Base.prototype = source[language];
            var _base = new Base;
            extend(_base, arguments[cx]);
            localSource[language] = _base;
        });
    } else {
        for (let k in _source) {
            let language = languageMap[k] || k;
            let Base = function () {
            };
            if (language in source) {
                Base.prototype = source[language];
                var _base = new Base;
                extend(_base, _source[k]);
                localSource[language] = _base;
            } else {
                throw new Error(`不支持的语言类型${k}`);
            }
        }
    };
    return function (a, source = localSource) {
        return i18n(a, source);
    }
};
i18n.setLanguage = function (language) {
    language = languageMap[language] || language;
    if (language in source) {
        return navagatorLanguage = language;
    }
    throw new Error(`不支持的语言类型${k}`);
};
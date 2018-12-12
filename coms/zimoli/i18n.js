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
        login: "登录",
        forgot: "忘记",
        now: "立即",
        register: "注册",
        is: "是",
        or: "或",
        incorrect: "错误的",
        ".": '。',
        "?": "？",
        "!": "！",
        ":": "：",
        "": {
            "a b": [/(\W|^)\s+(\W|$)/g, "$1$2"],
            "是……的": [/是(.+?)的/, "$1"],
            "……立即": [/^(.*?)立即/, "立即$1"]
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
var getAvailableLanguageName = function (k) {
    if (languageMap[k]) return languageMap[k];
    if (source[k]) return k;
    if (/^\w{2}\-\w{2}$/.test(k)) {
        var [a, b] = k.split("-");
        k = [a.toLowerCase(), b.toUpperCase()].join("-");
        if (k in source) return k;
    }
    if (k.toLowerCase() in source) return k;
    throw new Error(`不支持的语言类型${k}`);
};

try {
    var navagatorLanguage = getAvailableLanguageName(navigator.language ||/** ie~-10 */navigator.userLanguage || navigator.systemLanguage || navigator.browserLanguage || "zh-CN");
} catch (e) {
    var navagatorLanguage = "zh-CN";
    console.error(e);
}
var isAdjective = function () {

}
function i18n(message, _source = source) {
    if (!navagatorLanguage) return message;
    var _search = _source[navagatorLanguage] || source[navagatorLanguage];
    var checkSpell = _search[""];
    if (isArray(message)) {
        var args = arguments;
        if (message.length === 1) message = message[0];
        else return [].map.call(message, function (msg, cx) {
            return (cx > 0 ? args[cx] : "") + i18n(msg);
        }).join("");
    }
    var translated = message.replace(/([\s\w]*)([^\s\w]|$)/g, function (match, message, quote) {
        var result = (message && message.toLowerCase().split(/\s+/).map(a => _search[a] || (console.warn(`未翻译，语言：${navagatorLanguage}，信息：${a}`), a)).join(" ")) + (quote && _search[quote] || quote || "");
        return result.charAt(0).toUpperCase() + result.slice(1);
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
            let language = getAvailableLanguageName(k);
            let Base = function () {
            };
            Base.prototype = source[language];
            var _base = new Base;
            extend(_base, _source[k]);
            localSource[language] = _base;
        }
    };
    return function (a, source = localSource) {
        return i18n(a, source);
    }
};
i18n.loadSource = function (_source) {
    if (arguments.length > 1) {
        Object.keys(source).forEach(function (language, cx) {
            extend(source[language], arguments[cx]);
        });
    } else {
        for (let k in _source) {
            let language = getAvailableLanguageName(k);
            extend(source[language], _source[k]);
        }
    }
    return i18n;
};
i18n.setLanguage = function (language) {
    navagatorLanguage = getAvailableLanguageName(language);
    return i18n;
};
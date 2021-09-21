module.exports=([/*Thu Sep 09 2021 19:38:29 GMT+0800 (中国标准时间) by efront 2.39.2*/].map||function (f, t) {
        var s = this,
        l=s[2],
        r = [],
        c = 0,
        e=s[11],
        d = s[l];
        for (; c < d; c++)r[c] = f[e](t, c, s[c]);
        return r
    }).call([
/** 1 init */ [],
/** 2 $efront_string_slice */ "slice",
/** 3 $efront_string_length */ "length",
/** 4 $efront_string_split */ "split",
/** 5 $efront_string_concat */ "concat",
/** 6 $efront_string_apply */ "apply",
/** 7 $efront_string_revers */ "reverse",
/** 8 $efront_string_exec */ "exec",
/** 9 $efront_string_indexO */ "indexOf",
/** 10 $efront_string_string */ "string",
/** 11 $efront_string_join */ "join",
/** 12 $efront_string_call */ "call",
/** 13 $efront_string_export */ "exports",
/** 14 $efront_regexp__funct */ /^function[^\(]*?\(([^\)]+?)\)/,
/** 15 module */ [1631189738],
/** 16 RegExp */ RegExp,
/** 17 String */ String,
/** 18 $efront_string_NonAsc */ "NonAsciiIdentifierStart",
/** 19 $efront_string__ */ /** text */ "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
/** 20 $efront_string_NonAsc1 */ "NonAsciiIdentifierPart",
/** 21 $efront_string__1 */ /** text */ "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
/** 22 $efront_string_test */ "test",
/** 23 $efront_string_fromCh */ "fromCharCode",
/** 24 $efront_string_isDeci */ "isDecimalDigit",
/** 25 $efront_string_isHexD */ "isHexDigit",
/** 26 $efront_string_isOcta */ "isOctalDigit",
/** 27 $efront_string_isWhit */ "isWhiteSpace",
/** 28 $efront_string_isLine */ "isLineTerminator",
/** 29 $efront_string_isIden */ "isIdentifierStart",
/** 30 $efront_string_isIden1 */ "isIdentifierPart",
/** 31 esutils$lib$code.js */ [16,17,15,18,19,20,21,9,22,23,13,24,25,26,27,28,29,30,function(RegExp, String, module, $efront_string_NonAsc, $efront_string__, $efront_string_NonAsc1, $efront_string__1, $efront_string_indexO, $efront_string_test, $efront_string_fromCh, $efront_string_export, $efront_string_isDeci, $efront_string_isHexD, $efront_string_isOcta, $efront_string_isWhit, $efront_string_isLine, $efront_string_isIden, $efront_string_isIden1) {
    return function () {
        'use strict';
        var _a, _b;
        var Regex;
        Regex = (_a = {}, _a[$efront_string_NonAsc] = new RegExp($efront_string__), _a[$efront_string_NonAsc1] = new RegExp($efront_string__1), _a);
        function isDecimalDigit(ch) {
            return ch >= 48 && ch <= 57
        }
        function isHexDigit(ch) {
            return isDecimalDigit(ch) || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70
        }
        function isOctalDigit(ch) {
            return ch >= 48 && ch <= 55
        }
        function isWhiteSpace(ch) {
            return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && [
                5760,
                6158,
                8192,
                8193,
                8194,
                8195,
                8196,
                8197,
                8198,
                8199,
                8200,
                8201,
                8202,
                8239,
                8287,
                12288,
                65279
            ][$efront_string_indexO](ch) >= 0
        }
        function isLineTerminator(ch) {
            return ch === 10 || ch === 13 || ch === 8232 || ch === 8233
        }
        function isIdentifierStart(ch) {
            return ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch === 92 || ch >= 128 && Regex[$efront_string_NonAsc][$efront_string_test](String[$efront_string_fromCh](ch))
        }
        function isIdentifierPart(ch) {
            return ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57 || ch === 92 || ch >= 128 && Regex[$efront_string_NonAsc1][$efront_string_test](String[$efront_string_fromCh](ch))
        }
        module[$efront_string_export] = (_b = {}, _b[$efront_string_isDeci] = isDecimalDigit, _b[$efront_string_isHexD] = isHexDigit, _b[$efront_string_isOcta] = isOctalDigit, _b[$efront_string_isWhit] = isWhiteSpace, _b[$efront_string_isLine] = isLineTerminator, _b[$efront_string_isIden] = isIdentifierStart, _b[$efront_string_isIden1] = isIdentifierPart, _b)
    }()
}],
/** 32 global */ typeof global!=="undefined"?global:void 0,
/** 33 $efront_string_Map */ "Map",
/** 34 $efront_string_undefi */ "undefined",
/** 35 $efront_string___data */ "__data",
/** 36 $efront_string_protot */ "prototype",
/** 37 $efront_string_get */ "get",
/** 38 $efront_string_$ */ "$",
/** 39 $efront_string_hasOwn */ "hasOwnProperty",
/** 40 $efront_string_has */ "has",
/** 41 $efront_string_set */ "set",
/** 42 $efront_string_delete */ "delete",
/** 43 $efront_string_clear */ "clear",
/** 44 $efront_string_forEac */ "forEach",
/** 45 $efront_string_substr */ "substring",
/** 46 $efront_string_keys */ "keys",
/** 47 $efront_string_push */ "push",
/** 48 $efront_string_values */ "values",
/** 49 $efront_string_items */ "items",
/** 50 map.js */ [32,15,33,34,35,36,37,38,39,40,41,42,43,44,45,12,46,47,48,49,13,function(global, module, $efront_string_Map, $efront_string_undefi, $efront_string___data, $efront_string_protot, $efront_string_get, $efront_string_$, $efront_string_hasOwn, $efront_string_has, $efront_string_set, $efront_string_delete, $efront_string_clear, $efront_string_forEac, $efront_string_substr, $efront_string_call, $efront_string_keys, $efront_string_push, $efront_string_values, $efront_string_items, $efront_string_export) {
    return function () {
        'use strict';
        var Map;
        if (typeof global[$efront_string_Map] !== $efront_string_undefi) {
            Map = global[$efront_string_Map]
        } else {
            Map = function Map() {
                this[$efront_string___data] = {}
            };
            Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
                key = $efront_string_$ + key;
                if (this[$efront_string___data][$efront_string_hasOwn](key)) {
                    return this[$efront_string___data][key]
                }
            };
            Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
                key = $efront_string_$ + key;
                return this[$efront_string___data][$efront_string_hasOwn](key)
            };
            Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
                key = $efront_string_$ + key;
                this[$efront_string___data][key] = val
            };
            Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
                key = $efront_string_$ + key;
                return delete this[$efront_string___data][key]
            };
            Map[$efront_string_protot][$efront_string_clear] = function MapClear() {
                this[$efront_string___data] = {}
            };
            Map[$efront_string_protot][$efront_string_forEac] = function MapForEach(callback, thisArg) {
                var real, key;
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        key = real[$efront_string_substr](1);
                        callback[$efront_string_call](thisArg, this[$efront_string___data][real], key, this)
                    }
                }
            };
            Map[$efront_string_protot][$efront_string_keys] = function MapKeys() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push](real[$efront_string_substr](1))
                    }
                }
                return result
            };
            Map[$efront_string_protot][$efront_string_values] = function MapValues() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push](this[$efront_string___data][real])
                    }
                }
                return result
            };
            Map[$efront_string_protot][$efront_string_items] = function MapItems() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push]([
                            real[$efront_string_substr](1),
                            this[$efront_string___data][real]
                        ])
                    }
                }
                return result
            }
        }
        module[$efront_string_export] = Map
    }()
}],
/** 51 exports */ [1278],
/** 52 define */ typeof define!=="undefined"?define:void 0,
/** 53 Array */ Array,
/** 54 Object */ Object,
/** 55 Error */ Error,
/** 56 $efront_string_name */ "name",
/** 57 $efront_string_esshor */ "esshorten",
/** 58 $efront_string_descri */ "description",
/** 59 $efront_string_Shorte */ /** text */ "Shorten (mangle) names in JavaScript code",
/** 60 $efront_string_main */ "main",
/** 61 $efront_string_lib_es */ "lib/esshorten.js",
/** 62 $efront_string_versio */ "version",
/** 63 $efront_string_1_1_1 */ "1.1.1",
/** 64 $efront_string_engine */ "engines",
/** 65 $efront_string_node */ "node",
/** 66 $efront_string__0_6_0 */ ">=0.6.0",
/** 67 $efront_string_direct */ "directories",
/** 68 $efront_string_lib */ "lib",
/** 69 $efront_string__lib */ "./lib",
/** 70 $efront_string_mainta */ "maintainers",
/** 71 $efront_string_Yusuke */ /** text */ "Yusuke Suzuki",
/** 72 $efront_string_email */ "email",
/** 73 $efront_string_utatan */ "utatane.tea@gmail.com",
/** 74 $efront_string_web */ "web",
/** 75 $efront_string_http_g */ "http://github.com/Constellation",
/** 76 $efront_string_reposi */ "repository",
/** 77 $efront_string_type */ "type",
/** 78 $efront_string_git */ "git",
/** 79 $efront_string_url */ "url",
/** 80 $efront_string_http_g1 */ "http://github.com/estools/esshorten.git",
/** 81 $efront_string_depend */ "dependencies",
/** 82 $efront_string_estrav */ "estraverse",
/** 83 $efront_string__4_1_1 */ "~4.1.1",
/** 84 $efront_string_escope */ "escope",
/** 85 $efront_string__1_0_1 */ "~1.0.1",
/** 86 $efront_string_esutil */ "esutils",
/** 87 $efront_string__2_0_2 */ "~2.0.2",
/** 88 $efront_string_devDep */ "devDependencies",
/** 89 $efront_string_chai */ "chai",
/** 90 $efront_string__2 */ "*",
/** 91 $efront_string_common */ "commonjs-everywhere",
/** 92 $efront_string__0_9_7 */ "~0.9.7",
/** 93 $efront_string_jshint */ "jshint-stylish",
/** 94 $efront_string__2_0_1 */ "~2.0.1",
/** 95 $efront_string_gulp_m */ "gulp-mocha",
/** 96 $efront_string__2_1_3 */ "~2.1.3",
/** 97 $efront_string_gulp_j */ "gulp-jshint",
/** 98 $efront_string__1_11_ */ "~1.11.2",
/** 99 $efront_string_gulp */ "gulp",
/** 100 $efront_string__3_9_0 */ "~3.9.0",
/** 101 $efront_string_coffee */ "coffee-script",
/** 102 $efront_string__1_10_ */ "~1.10.0",
/** 103 $efront_string_licens */ "licenses",
/** 104 $efront_string_BSD */ "BSD",
/** 105 $efront_string_http_g2 */ "http://github.com/estools/esshorten/raw/master/LICENSE.BSD",
/** 106 $efront_string_script */ "scripts",
/** 107 $efront_string_gulp_t */ /** text */ "gulp travis",
/** 108 $efront_string_lint */ "lint",
/** 109 $efront_string_gulp_l */ /** text */ "gulp lint",
/** 110 $efront_string_unit_t */ "unit-test",
/** 111 $efront_string_gulp_t1 */ /** text */ "gulp test",
/** 112 esshorten$package.json */ [56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,22,107,108,109,110,111,function($efront_string_name, $efront_string_esshor, $efront_string_descri, $efront_string_Shorte, $efront_string_main, $efront_string_lib_es, $efront_string_versio, $efront_string_1_1_1, $efront_string_engine, $efront_string_node, $efront_string__0_6_0, $efront_string_direct, $efront_string_lib, $efront_string__lib, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_web, $efront_string_http_g, $efront_string_reposi, $efront_string_type, $efront_string_git, $efront_string_url, $efront_string_http_g1, $efront_string_depend, $efront_string_estrav, $efront_string__4_1_1, $efront_string_escope, $efront_string__1_0_1, $efront_string_esutil, $efront_string__2_0_2, $efront_string_devDep, $efront_string_chai, $efront_string__2, $efront_string_common, $efront_string__0_9_7, $efront_string_jshint, $efront_string__2_0_1, $efront_string_gulp_m, $efront_string__2_1_3, $efront_string_gulp_j, $efront_string__1_11_, $efront_string_gulp, $efront_string__3_9_0, $efront_string_coffee, $efront_string__1_10_, $efront_string_licens, $efront_string_BSD, $efront_string_http_g2, $efront_string_script, $efront_string_test, $efront_string_gulp_t, $efront_string_lint, $efront_string_gulp_l, $efront_string_unit_t, $efront_string_gulp_t1) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return _a = {}, _a[$efront_string_name] = $efront_string_esshor, _a[$efront_string_descri] = $efront_string_Shorte, _a[$efront_string_main] = $efront_string_lib_es, _a[$efront_string_versio] = $efront_string_1_1_1, _a[$efront_string_engine] = (_b = {}, _b[$efront_string_node] = $efront_string__0_6_0, _b), _a[$efront_string_direct] = (_c = {}, _c[$efront_string_lib] = $efront_string__lib, _c), _a[$efront_string_mainta] = [(_d = {}, _d[$efront_string_name] = $efront_string_Yusuke, _d[$efront_string_email] = $efront_string_utatan, _d[$efront_string_web] = $efront_string_http_g, _d)], _a[$efront_string_reposi] = (_e = {}, _e[$efront_string_type] = $efront_string_git, _e[$efront_string_url] = $efront_string_http_g1, _e), _a[$efront_string_depend] = (_f = {}, _f[$efront_string_estrav] = $efront_string__4_1_1, _f[$efront_string_escope] = $efront_string__1_0_1, _f[$efront_string_esutil] = $efront_string__2_0_2, _f), _a[$efront_string_devDep] = (_g = {}, _g[$efront_string_chai] = $efront_string__2, _g[$efront_string_common] = $efront_string__0_9_7, _g[$efront_string_jshint] = $efront_string__2_0_1, _g[$efront_string_gulp_m] = $efront_string__2_1_3, _g[$efront_string_gulp_j] = $efront_string__1_11_, _g[$efront_string_gulp] = $efront_string__3_9_0, _g[$efront_string_coffee] = $efront_string__1_10_, _g), _a[$efront_string_licens] = [(_h = {}, _h[$efront_string_type] = $efront_string_BSD, _h[$efront_string_url] = $efront_string_http_g2, _h)], _a[$efront_string_script] = (_j = {}, _j[$efront_string_test] = $efront_string_gulp_t, _j[$efront_string_lint] = $efront_string_gulp_l, _j[$efront_string_unit_t] = $efront_string_gulp_t1, _j), _a
}],
/** 113 esshorten$lib$map.js */ [32,15,33,34,35,36,37,38,39,40,41,42,43,44,45,12,46,47,48,49,13,function(global, module, $efront_string_Map, $efront_string_undefi, $efront_string___data, $efront_string_protot, $efront_string_get, $efront_string_$, $efront_string_hasOwn, $efront_string_has, $efront_string_set, $efront_string_delete, $efront_string_clear, $efront_string_forEac, $efront_string_substr, $efront_string_call, $efront_string_keys, $efront_string_push, $efront_string_values, $efront_string_items, $efront_string_export) {
    return function () {
        'use strict';
        var Map;
        if (typeof global[$efront_string_Map] !== $efront_string_undefi) {
            Map = global[$efront_string_Map]
        } else {
            Map = function Map() {
                this[$efront_string___data] = {}
            };
            Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
                key = $efront_string_$ + key;
                if (this[$efront_string___data][$efront_string_hasOwn](key)) {
                    return this[$efront_string___data][key]
                }
            };
            Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
                key = $efront_string_$ + key;
                return this[$efront_string___data][$efront_string_hasOwn](key)
            };
            Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
                key = $efront_string_$ + key;
                this[$efront_string___data][key] = val
            };
            Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
                key = $efront_string_$ + key;
                return delete this[$efront_string___data][key]
            };
            Map[$efront_string_protot][$efront_string_clear] = function MapClear() {
                this[$efront_string___data] = {}
            };
            Map[$efront_string_protot][$efront_string_forEac] = function MapForEach(callback, thisArg) {
                var real, key;
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        key = real[$efront_string_substr](1);
                        callback[$efront_string_call](thisArg, this[$efront_string___data][real], key, this)
                    }
                }
            };
            Map[$efront_string_protot][$efront_string_keys] = function MapKeys() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push](real[$efront_string_substr](1))
                    }
                }
                return result
            };
            Map[$efront_string_protot][$efront_string_values] = function MapValues() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push](this[$efront_string___data][real])
                    }
                }
                return result
            };
            Map[$efront_string_protot][$efront_string_items] = function MapItems() {
                var real, result;
                result = [];
                for (real in this[$efront_string___data]) {
                    if (this[$efront_string___data][$efront_string_hasOwn](real)) {
                        result[$efront_string_push]([
                            real[$efront_string_substr](1),
                            this[$efront_string___data][real]
                        ])
                    }
                }
                return result
            }
        }
        module[$efront_string_export] = Map
    }()
}],
/** 114 undefined */ [function() {
    return void 0
}],
/** 115 Number */ Number,
/** 116 $efront_string_esmang */ "esmangle",
/** 117 $efront_string_ECMASc */ /** text */ "ECMAScript code mangler / minifier",
/** 118 $efront_string_homepa */ "homepage",
/** 119 $efront_string_http_g3 */ "http://github.com/Constellation/esmangle.html",
/** 120 $efront_string_lib_es1 */ "lib/esmangle.js",
/** 121 $efront_string_bin */ "bin",
/** 122 $efront_string__bin_e */ "./bin/esmangle.js",
/** 123 $efront_string_1_0_1 */ "1.0.1",
/** 124 $efront_string_http_g4 */ "http://github.com/Constellation/esmangle.git",
/** 125 $efront_string__1_0_0 */ /** text */ "~ 1.0.0",
/** 126 $efront_string__1_1_0 */ "~1.1.0",
/** 127 $efront_string__1_5_0 */ "~1.5.0",
/** 128 $efront_string_source */ "source-map",
/** 129 $efront_string__0_1_3 */ "~0.1.33",
/** 130 $efront_string_escode */ "escodegen",
/** 131 $efront_string__1_3_2 */ "~1.3.2",
/** 132 $efront_string_option */ "optionator",
/** 133 $efront_string__0_3_0 */ "~0.3.0",
/** 134 $efront_string_esprim */ "esprima",
/** 135 $efront_string__1_1_1 */ "~1.1.1",
/** 136 $efront_string_grunt_ */ "grunt-contrib-jshint",
/** 137 $efront_string__0_8_0 */ "~0.8.0",
/** 138 $efront_string_grunt_1 */ "grunt-mocha-test",
/** 139 $efront_string__0_8_1 */ "~0.8.1",
/** 140 $efront_string_grunt_2 */ "grunt-contrib-copy",
/** 141 $efront_string__0_5_0 */ "~0.5.0",
/** 142 $efront_string_grunt_3 */ "grunt-contrib-clean",
/** 143 $efront_string_async */ "async",
/** 144 $efront_string__0_2_9 */ "~0.2.9",
/** 145 $efront_string_q */ "q",
/** 146 $efront_string__0_9_4 */ "~0.9.4",
/** 147 $efront_string_grunt_4 */ "grunt-cli",
/** 148 $efront_string__0_1_1 */ "~0.1.11",
/** 149 $efront_string_grunt */ "grunt",
/** 150 $efront_string__0_4_2 */ "~0.4.2",
/** 151 $efront_string_grunt_5 */ "grunt-update-submodules",
/** 152 $efront_string__0_2_1 */ "~0.2.1",
/** 153 $efront_string_grunt_6 */ "grunt-shell",
/** 154 $efront_string__0_6_1 */ "~0.6.1",
/** 155 $efront_string_clone */ "clone",
/** 156 $efront_string_http_g5 */ "http://github.com/Constellation/esmangle/raw/master/LICENSE.BSD",
/** 157 $efront_string_grunt_7 */ /** text */ "grunt travis",
/** 158 $efront_string_grunt_8 */ /** text */ "grunt lint",
/** 159 $efront_string_regres */ "regression-test",
/** 160 $efront_string_grunt_9 */ /** text */ "grunt test:regression",
/** 161 $efront_string_grunt_10 */ /** text */ "grunt test",
/** 162 $efront_string_build */ "build",
/** 163 $efront_string_grunt_11 */ /** text */ "grunt build",
/** 164 esmangle$package.json */ [56,116,58,117,118,119,60,120,121,122,62,123,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,124,81,86,125,57,126,82,127,84,85,128,129,130,131,132,133,134,135,88,89,90,136,137,138,139,140,141,142,143,144,145,92,91,146,147,148,149,150,151,152,153,154,155,103,104,156,106,22,157,108,158,159,160,110,161,162,163,function($efront_string_name, $efront_string_esmang, $efront_string_descri, $efront_string_ECMASc, $efront_string_homepa, $efront_string_http_g3, $efront_string_main, $efront_string_lib_es1, $efront_string_bin, $efront_string__bin_e, $efront_string_versio, $efront_string_1_0_1, $efront_string_engine, $efront_string_node, $efront_string__0_6_0, $efront_string_direct, $efront_string_lib, $efront_string__lib, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_web, $efront_string_http_g, $efront_string_reposi, $efront_string_type, $efront_string_git, $efront_string_url, $efront_string_http_g4, $efront_string_depend, $efront_string_esutil, $efront_string__1_0_0, $efront_string_esshor, $efront_string__1_1_0, $efront_string_estrav, $efront_string__1_5_0, $efront_string_escope, $efront_string__1_0_1, $efront_string_source, $efront_string__0_1_3, $efront_string_escode, $efront_string__1_3_2, $efront_string_option, $efront_string__0_3_0, $efront_string_esprim, $efront_string__1_1_1, $efront_string_devDep, $efront_string_chai, $efront_string__2, $efront_string_grunt_, $efront_string__0_8_0, $efront_string_grunt_1, $efront_string__0_8_1, $efront_string_grunt_2, $efront_string__0_5_0, $efront_string_grunt_3, $efront_string_async, $efront_string__0_2_9, $efront_string_q, $efront_string__0_9_7, $efront_string_common, $efront_string__0_9_4, $efront_string_grunt_4, $efront_string__0_1_1, $efront_string_grunt, $efront_string__0_4_2, $efront_string_grunt_5, $efront_string__0_2_1, $efront_string_grunt_6, $efront_string__0_6_1, $efront_string_clone, $efront_string_licens, $efront_string_BSD, $efront_string_http_g5, $efront_string_script, $efront_string_test, $efront_string_grunt_7, $efront_string_lint, $efront_string_grunt_8, $efront_string_regres, $efront_string_grunt_9, $efront_string_unit_t, $efront_string_grunt_10, $efront_string_build, $efront_string_grunt_11) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return _a = {}, _a[$efront_string_name] = $efront_string_esmang, _a[$efront_string_descri] = $efront_string_ECMASc, _a[$efront_string_homepa] = $efront_string_http_g3, _a[$efront_string_main] = $efront_string_lib_es1, _a[$efront_string_bin] = (_b = {}, _b[$efront_string_esmang] = $efront_string__bin_e, _b), _a[$efront_string_versio] = $efront_string_1_0_1, _a[$efront_string_engine] = (_c = {}, _c[$efront_string_node] = $efront_string__0_6_0, _c), _a[$efront_string_direct] = (_d = {}, _d[$efront_string_lib] = $efront_string__lib, _d), _a[$efront_string_mainta] = [(_e = {}, _e[$efront_string_name] = $efront_string_Yusuke, _e[$efront_string_email] = $efront_string_utatan, _e[$efront_string_web] = $efront_string_http_g, _e)], _a[$efront_string_reposi] = (_f = {}, _f[$efront_string_type] = $efront_string_git, _f[$efront_string_url] = $efront_string_http_g4, _f), _a[$efront_string_depend] = (_g = {}, _g[$efront_string_esutil] = $efront_string__1_0_0, _g[$efront_string_esshor] = $efront_string__1_1_0, _g[$efront_string_estrav] = $efront_string__1_5_0, _g[$efront_string_escope] = $efront_string__1_0_1, _g[$efront_string_source] = $efront_string__0_1_3, _g[$efront_string_escode] = $efront_string__1_3_2, _g[$efront_string_option] = $efront_string__0_3_0, _g[$efront_string_esprim] = $efront_string__1_1_1, _g), _a[$efront_string_devDep] = (_h = {}, _h[$efront_string_chai] = $efront_string__2, _h[$efront_string_grunt_] = $efront_string__0_8_0, _h[$efront_string_grunt_1] = $efront_string__0_8_1, _h[$efront_string_grunt_2] = $efront_string__0_5_0, _h[$efront_string_grunt_3] = $efront_string__0_5_0, _h[$efront_string_async] = $efront_string__0_2_9, _h[$efront_string_q] = $efront_string__0_9_7, _h[$efront_string_common] = $efront_string__0_9_4, _h[$efront_string_grunt_4] = $efront_string__0_1_1, _h[$efront_string_grunt] = $efront_string__0_4_2, _h[$efront_string_grunt_5] = $efront_string__0_2_1, _h[$efront_string_grunt_6] = $efront_string__0_6_1, _h[$efront_string_clone] = $efront_string__0_1_1, _h), _a[$efront_string_licens] = [(_j = {}, _j[$efront_string_type] = $efront_string_BSD, _j[$efront_string_url] = $efront_string_http_g5, _j)], _a[$efront_string_script] = (_k = {}, _k[$efront_string_test] = $efront_string_grunt_7, _k[$efront_string_lint] = $efront_string_grunt_8, _k[$efront_string_regres] = $efront_string_grunt_9, _k[$efront_string_unit_t] = $efront_string_grunt_10, _k[$efront_string_build] = $efront_string_grunt_11, _k), _a
}],
/** 165 isNaN */ isNaN,
/** 166 $efront_string_implem */ "implements",
/** 167 $efront_string_interf */ "interface",
/** 168 $efront_string_packag */ "package",
/** 169 $efront_string_privat */ "private",
/** 170 $efront_string_protec */ "protected",
/** 171 $efront_string_public */ "public",
/** 172 $efront_string_static */ "static",
/** 173 $efront_string_let */ "let",
/** 174 $efront_string_yield */ "yield",
/** 175 $efront_string_if */ "if",
/** 176 $efront_string_in */ "in",
/** 177 $efront_string_do */ "do",
/** 178 $efront_string_var */ "var",
/** 179 $efront_string_for */ "for",
/** 180 $efront_string_new */ "new",
/** 181 $efront_string_try */ "try",
/** 182 $efront_string_this */ "this",
/** 183 $efront_string_else */ "else",
/** 184 $efront_string_case */ "case",
/** 185 $efront_string_void */ "void",
/** 186 $efront_string_with */ "with",
/** 187 $efront_string_enum */ "enum",
/** 188 $efront_string_while */ "while",
/** 189 $efront_string_break */ "break",
/** 190 $efront_string_catch */ "catch",
/** 191 $efront_string_throw */ "throw",
/** 192 $efront_string_const */ "const",
/** 193 $efront_string_class */ "class",
/** 194 $efront_string_super */ "super",
/** 195 $efront_string_return */ "return",
/** 196 $efront_string_typeof */ "typeof",
/** 197 $efront_string_switch */ "switch",
/** 198 $efront_string_export1 */ "export",
/** 199 $efront_string_import */ "import",
/** 200 $efront_string_defaul */ "default",
/** 201 $efront_string_finall */ "finally",
/** 202 $efront_string_extend */ "extends",
/** 203 $efront_string_functi */ "function",
/** 204 $efront_string_contin */ "continue",
/** 205 $efront_string_debugg */ "debugger",
/** 206 $efront_string_instan */ "instanceof",
/** 207 $efront_string_eval */ "eval",
/** 208 $efront_string_argume */ "arguments",
/** 209 $efront_string_charCo */ "charCodeAt",
/** 210 $efront_string_isKeyw */ "isKeywordES5",
/** 211 $efront_string_isKeyw1 */ "isKeywordES6",
/** 212 $efront_string_isRest */ "isRestrictedWord",
/** 213 $efront_string_isIden2 */ "isIdentifierName",
/** 214 esutils$lib$keyword.js */ [1,15,166,167,168,169,170,171,172,173,174,3,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,42,197,198,199,200,201,202,203,204,205,206,207,208,209,29,30,13,210,211,212,213,function(require, module, $efront_string_implem, $efront_string_interf, $efront_string_packag, $efront_string_privat, $efront_string_protec, $efront_string_public, $efront_string_static, $efront_string_let, $efront_string_yield, $efront_string_length, $efront_string_if, $efront_string_in, $efront_string_do, $efront_string_var, $efront_string_for, $efront_string_new, $efront_string_try, $efront_string_this, $efront_string_else, $efront_string_case, $efront_string_void, $efront_string_with, $efront_string_enum, $efront_string_while, $efront_string_break, $efront_string_catch, $efront_string_throw, $efront_string_const, $efront_string_class, $efront_string_super, $efront_string_return, $efront_string_typeof, $efront_string_delete, $efront_string_switch, $efront_string_export1, $efront_string_import, $efront_string_defaul, $efront_string_finall, $efront_string_extend, $efront_string_functi, $efront_string_contin, $efront_string_debugg, $efront_string_instan, $efront_string_eval, $efront_string_argume, $efront_string_charCo, $efront_string_isIden, $efront_string_isIden1, $efront_string_export, $efront_string_isKeyw, $efront_string_isKeyw1, $efront_string_isRest, $efront_string_isIden2) {
    return function () {
        'use strict';
        var _a;
        var code = require(31);
        function isStrictModeReservedWordES6(id) {
            switch (id) {
            case $efront_string_implem:
            case $efront_string_interf:
            case $efront_string_packag:
            case $efront_string_privat:
            case $efront_string_protec:
            case $efront_string_public:
            case $efront_string_static:
            case $efront_string_let:
                return true;
            default:
                return false
            }
        }
        function isKeywordES5(id, strict) {
            if (!strict && id === $efront_string_yield) {
                return false
            }
            return isKeywordES6(id, strict)
        }
        function isKeywordES6(id, strict) {
            if (strict && isStrictModeReservedWordES6(id)) {
                return true
            }
            switch (id[$efront_string_length]) {
            case 2:
                return id === $efront_string_if || id === $efront_string_in || id === $efront_string_do;
            case 3:
                return id === $efront_string_var || id === $efront_string_for || id === $efront_string_new || id === $efront_string_try;
            case 4:
                return id === $efront_string_this || id === $efront_string_else || id === $efront_string_case || id === $efront_string_void || id === $efront_string_with || id === $efront_string_enum;
            case 5:
                return id === $efront_string_while || id === $efront_string_break || id === $efront_string_catch || id === $efront_string_throw || id === $efront_string_const || id === $efront_string_yield || id === $efront_string_class || id === $efront_string_super;
            case 6:
                return id === $efront_string_return || id === $efront_string_typeof || id === $efront_string_delete || id === $efront_string_switch || id === $efront_string_export1 || id === $efront_string_import;
            case 7:
                return id === $efront_string_defaul || id === $efront_string_finall || id === $efront_string_extend;
            case 8:
                return id === $efront_string_functi || id === $efront_string_contin || id === $efront_string_debugg;
            case 10:
                return id === $efront_string_instan;
            default:
                return false
            }
        }
        function isRestrictedWord(id) {
            return id === $efront_string_eval || id === $efront_string_argume
        }
        function isIdentifierName(id) {
            var i, iz, ch;
            if (id[$efront_string_length] === 0) {
                return false
            }
            ch = id[$efront_string_charCo](0);
            if (!code[$efront_string_isIden](ch) || ch === 92) {
                return false
            }
            for (i = 1, iz = id[$efront_string_length]; i < iz; ++i) {
                ch = id[$efront_string_charCo](i);
                if (!code[$efront_string_isIden1](ch) || ch === 92) {
                    return false
                }
            }
            return true
        }
        module[$efront_string_export] = (_a = {}, _a[$efront_string_isKeyw] = isKeywordES5, _a[$efront_string_isKeyw1] = isKeywordES6, _a[$efront_string_isRest] = isRestrictedWord, _a[$efront_string_isIden2] = isIdentifierName, _a)
    }()
}],
/** 215 $efront_string_code */ "code",
/** 216 $efront_string_keywor */ "keyword",
/** 217 esutils$lib$utils.js */ [51,1,215,216,function(exports, require, $efront_string_code, $efront_string_keywor) {
    return function () {
        'use strict';
        exports[$efront_string_code] = require(31);
        exports[$efront_string_keywor] = require(214)
    }()
}],
/** 218 $efront_string_amd */ "amd",
/** 219 $efront_string_Assign */ "AssignmentExpression",
/** 220 $efront_string_ArrayE */ "ArrayExpression",
/** 221 $efront_string_ArrayP */ "ArrayPattern",
/** 222 $efront_string_ArrowF */ "ArrowFunctionExpression",
/** 223 $efront_string_BlockS */ "BlockStatement",
/** 224 $efront_string_Binary */ "BinaryExpression",
/** 225 $efront_string_BreakS */ "BreakStatement",
/** 226 $efront_string_CallEx */ "CallExpression",
/** 227 $efront_string_CatchC */ "CatchClause",
/** 228 $efront_string_ClassB */ "ClassBody",
/** 229 $efront_string_ClassD */ "ClassDeclaration",
/** 230 $efront_string_ClassE */ "ClassExpression",
/** 231 $efront_string_Condit */ "ConditionalExpression",
/** 232 $efront_string_Contin */ "ContinueStatement",
/** 233 $efront_string_Debugg */ "DebuggerStatement",
/** 234 $efront_string_Direct */ "DirectiveStatement",
/** 235 $efront_string_DoWhil */ "DoWhileStatement",
/** 236 $efront_string_EmptyS */ "EmptyStatement",
/** 237 $efront_string_Expres */ "ExpressionStatement",
/** 238 $efront_string_ForSta */ "ForStatement",
/** 239 $efront_string_ForInS */ "ForInStatement",
/** 240 $efront_string_Functi */ "FunctionDeclaration",
/** 241 $efront_string_Functi1 */ "FunctionExpression",
/** 242 $efront_string_Identi */ "Identifier",
/** 243 $efront_string_IfStat */ "IfStatement",
/** 244 $efront_string_Litera */ "Literal",
/** 245 $efront_string_Labele */ "LabeledStatement",
/** 246 $efront_string_Logica */ "LogicalExpression",
/** 247 $efront_string_Member */ "MemberExpression",
/** 248 $efront_string_Method */ "MethodDefinition",
/** 249 $efront_string_NewExp */ "NewExpression",
/** 250 $efront_string_Object */ "ObjectExpression",
/** 251 $efront_string_Object1 */ "ObjectPattern",
/** 252 $efront_string_Progra */ "Program",
/** 253 $efront_string_Proper */ "Property",
/** 254 $efront_string_Return */ "ReturnStatement",
/** 255 $efront_string_Sequen */ "SequenceExpression",
/** 256 $efront_string_Switch */ "SwitchStatement",
/** 257 $efront_string_Switch1 */ "SwitchCase",
/** 258 $efront_string_ThisEx */ "ThisExpression",
/** 259 $efront_string_ThrowS */ "ThrowStatement",
/** 260 $efront_string_TrySta */ "TryStatement",
/** 261 $efront_string_UnaryE */ "UnaryExpression",
/** 262 $efront_string_Update */ "UpdateExpression",
/** 263 $efront_string_Variab */ "VariableDeclaration",
/** 264 $efront_string_Variab1 */ "VariableDeclarator",
/** 265 $efront_string_WhileS */ "WhileStatement",
/** 266 $efront_string_WithSt */ "WithStatement",
/** 267 $efront_string_YieldE */ "YieldExpression",
/** 268 $efront_string_isArra */ "isArray",
/** 269 $efront_string_toStri */ "toString",
/** 270 $efront_string__objec */ /** text */ "[object Array]",
/** 271 $efront_string_object */ "object",
/** 272 $efront_string_left */ "left",
/** 273 $efront_string_right */ "right",
/** 274 $efront_string_elemen */ "elements",
/** 275 $efront_string_params */ "params",
/** 276 $efront_string_defaul1 */ "defaults",
/** 277 $efront_string_rest */ "rest",
/** 278 $efront_string_body */ "body",
/** 279 $efront_string_label */ "label",
/** 280 $efront_string_callee */ "callee",
/** 281 $efront_string_param */ "param",
/** 282 $efront_string_id */ "id",
/** 283 $efront_string_superC */ "superClass",
/** 284 $efront_string_conseq */ "consequent",
/** 285 $efront_string_altern */ "alternate",
/** 286 $efront_string_expres */ "expression",
/** 287 $efront_string_init */ "init",
/** 288 $efront_string_update */ "update",
/** 289 $efront_string_ForOfS */ "ForOfStatement",
/** 290 $efront_string_proper */ "property",
/** 291 $efront_string_key */ "key",
/** 292 $efront_string_value */ "value",
/** 293 $efront_string_proper1 */ "properties",
/** 294 $efront_string_argume1 */ "argument",
/** 295 $efront_string_expres1 */ "expressions",
/** 296 $efront_string_discri */ "discriminant",
/** 297 $efront_string_cases */ "cases",
/** 298 $efront_string_block */ "block",
/** 299 $efront_string_handle */ "handlers",
/** 300 $efront_string_handle1 */ "handler",
/** 301 $efront_string_guarde */ "guardedHandlers",
/** 302 $efront_string_finali */ "finalizer",
/** 303 $efront_string_declar */ "declarations",
/** 304 $efront_string_Break */ "Break",
/** 305 $efront_string_Skip */ "Skip",
/** 306 $efront_string_parent */ "parent",
/** 307 $efront_string_replac */ "replace",
/** 308 $efront_string_path */ "path",
/** 309 $efront_string_wrap */ "wrap",
/** 310 $efront_string_ref */ "ref",
/** 311 $efront_string___curr */ "__current",
/** 312 $efront_string___leav */ "__leavelist",
/** 313 $efront_string_parent1 */ "parents",
/** 314 $efront_string_curren */ "current",
/** 315 $efront_string___exec */ "__execute",
/** 316 $efront_string___stat */ "__state",
/** 317 $efront_string_notify */ "notify",
/** 318 $efront_string_skip */ "skip",
/** 319 $efront_string___init */ "__initialize",
/** 320 $efront_string_visito */ "visitor",
/** 321 $efront_string_root */ "root",
/** 322 $efront_string___work */ "__worklist",
/** 323 $efront_string_traver */ "traverse",
/** 324 $efront_string_pop */ "pop",
/** 325 $efront_string_leave */ "leave",
/** 326 $efront_string_enter */ "enter",
/** 327 $efront_string_range */ "range",
/** 328 $efront_string_extend1 */ "extendedRange",
/** 329 $efront_string_attach */ /** text */ "attachComments needs range information",
/** 330 $efront_string_leadin */ "leadingComments",
/** 331 $efront_string_splice */ "splice",
/** 332 $efront_string_traili */ "trailingComments",
/** 333 $efront_string_1_5_1_ */ "1.5.1-dev",
/** 334 $efront_string_Syntax */ "Syntax",
/** 335 $efront_string_attach1 */ "attachComments",
/** 336 $efront_string_Visito */ "VisitorKeys",
/** 337 $efront_string_Visito1 */ "VisitorOption",
/** 338 $efront_string_Contro */ "Controller",
/** 339 estraverse$estraverse.js */ [52,51,53,54,114,55,203,218,13,34,82,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,36,269,12,270,39,271,3,272,273,274,275,276,277,278,279,280,208,281,282,283,22,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,65,308,309,310,47,311,312,313,314,315,316,317,318,189,319,320,321,322,323,324,325,326,77,327,328,329,330,331,332,62,333,334,335,336,337,338,function(define, exports, Array, Object, undefined, Error, $efront_string_functi, $efront_string_amd, $efront_string_export, $efront_string_undefi, $efront_string_estrav, $efront_string_Assign, $efront_string_ArrayE, $efront_string_ArrayP, $efront_string_ArrowF, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_ClassB, $efront_string_ClassD, $efront_string_ClassE, $efront_string_Condit, $efront_string_Contin, $efront_string_Debugg, $efront_string_Direct, $efront_string_DoWhil, $efront_string_EmptyS, $efront_string_Expres, $efront_string_ForSta, $efront_string_ForInS, $efront_string_Functi, $efront_string_Functi1, $efront_string_Identi, $efront_string_IfStat, $efront_string_Litera, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_Method, $efront_string_NewExp, $efront_string_Object, $efront_string_Object1, $efront_string_Progra, $efront_string_Proper, $efront_string_Return, $efront_string_Sequen, $efront_string_Switch, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_Variab, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_YieldE, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_hasOwn, $efront_string_object, $efront_string_length, $efront_string_left, $efront_string_right, $efront_string_elemen, $efront_string_params, $efront_string_defaul1, $efront_string_rest, $efront_string_body, $efront_string_label, $efront_string_callee, $efront_string_argume, $efront_string_param, $efront_string_id, $efront_string_superC, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_expres, $efront_string_init, $efront_string_update, $efront_string_ForOfS, $efront_string_proper, $efront_string_key, $efront_string_value, $efront_string_proper1, $efront_string_argume1, $efront_string_expres1, $efront_string_discri, $efront_string_cases, $efront_string_block, $efront_string_handle, $efront_string_handle1, $efront_string_guarde, $efront_string_finali, $efront_string_declar, $efront_string_Break, $efront_string_Skip, $efront_string_parent, $efront_string_replac, $efront_string_node, $efront_string_path, $efront_string_wrap, $efront_string_ref, $efront_string_push, $efront_string___curr, $efront_string___leav, $efront_string_parent1, $efront_string_curren, $efront_string___exec, $efront_string___stat, $efront_string_notify, $efront_string_skip, $efront_string_break, $efront_string___init, $efront_string_visito, $efront_string_root, $efront_string___work, $efront_string_traver, $efront_string_pop, $efront_string_leave, $efront_string_enter, $efront_string_type, $efront_string_range, $efront_string_extend1, $efront_string_attach, $efront_string_leadin, $efront_string_splice, $efront_string_traili, $efront_string_versio, $efront_string_1_5_1_, $efront_string_Syntax, $efront_string_attach1, $efront_string_Visito, $efront_string_Visito1, $efront_string_Contro) {
    return function (root, factory) {
        'use strict';
        if (typeof define === $efront_string_functi && define[$efront_string_amd]) {
            define([$efront_string_export], factory)
        } else if (typeof exports !== $efront_string_undefi) {
            factory(exports)
        } else {
            factory(root[$efront_string_estrav] = {})
        }
    }(this, function (exports) {
        'use strict';
        var _a, _b, _c;
        var Syntax, isArray, VisitorOption, VisitorKeys, BREAK, SKIP;
        Syntax = (_a = {}, _a[$efront_string_Assign] = $efront_string_Assign, _a[$efront_string_ArrayE] = $efront_string_ArrayE, _a[$efront_string_ArrayP] = $efront_string_ArrayP, _a[$efront_string_ArrowF] = $efront_string_ArrowF, _a[$efront_string_BlockS] = $efront_string_BlockS, _a[$efront_string_Binary] = $efront_string_Binary, _a[$efront_string_BreakS] = $efront_string_BreakS, _a[$efront_string_CallEx] = $efront_string_CallEx, _a[$efront_string_CatchC] = $efront_string_CatchC, _a[$efront_string_ClassB] = $efront_string_ClassB, _a[$efront_string_ClassD] = $efront_string_ClassD, _a[$efront_string_ClassE] = $efront_string_ClassE, _a[$efront_string_Condit] = $efront_string_Condit, _a[$efront_string_Contin] = $efront_string_Contin, _a[$efront_string_Debugg] = $efront_string_Debugg, _a[$efront_string_Direct] = $efront_string_Direct, _a[$efront_string_DoWhil] = $efront_string_DoWhil, _a[$efront_string_EmptyS] = $efront_string_EmptyS, _a[$efront_string_Expres] = $efront_string_Expres, _a[$efront_string_ForSta] = $efront_string_ForSta, _a[$efront_string_ForInS] = $efront_string_ForInS, _a[$efront_string_Functi] = $efront_string_Functi, _a[$efront_string_Functi1] = $efront_string_Functi1, _a[$efront_string_Identi] = $efront_string_Identi, _a[$efront_string_IfStat] = $efront_string_IfStat, _a[$efront_string_Litera] = $efront_string_Litera, _a[$efront_string_Labele] = $efront_string_Labele, _a[$efront_string_Logica] = $efront_string_Logica, _a[$efront_string_Member] = $efront_string_Member, _a[$efront_string_Method] = $efront_string_Method, _a[$efront_string_NewExp] = $efront_string_NewExp, _a[$efront_string_Object] = $efront_string_Object, _a[$efront_string_Object1] = $efront_string_Object1, _a[$efront_string_Progra] = $efront_string_Progra, _a[$efront_string_Proper] = $efront_string_Proper, _a[$efront_string_Return] = $efront_string_Return, _a[$efront_string_Sequen] = $efront_string_Sequen, _a[$efront_string_Switch] = $efront_string_Switch, _a[$efront_string_Switch1] = $efront_string_Switch1, _a[$efront_string_ThisEx] = $efront_string_ThisEx, _a[$efront_string_ThrowS] = $efront_string_ThrowS, _a[$efront_string_TrySta] = $efront_string_TrySta, _a[$efront_string_UnaryE] = $efront_string_UnaryE, _a[$efront_string_Update] = $efront_string_Update, _a[$efront_string_Variab] = $efront_string_Variab, _a[$efront_string_Variab1] = $efront_string_Variab1, _a[$efront_string_WhileS] = $efront_string_WhileS, _a[$efront_string_WithSt] = $efront_string_WithSt, _a[$efront_string_YieldE] = $efront_string_YieldE, _a);
        function ignoreJSHintError() {
        }
        isArray = Array[$efront_string_isArra];
        if (!isArray) {
            isArray = function isArray(array) {
                return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
            }
        }
        function deepCopy(obj) {
            var ret = {}, key, val;
            for (key in obj) {
                if (obj[$efront_string_hasOwn](key)) {
                    val = obj[key];
                    if (typeof val === $efront_string_object && val !== null) {
                        ret[key] = deepCopy(val)
                    } else {
                        ret[key] = val
                    }
                }
            }
            return ret
        }
        function shallowCopy(obj) {
            var ret = {}, key;
            for (key in obj) {
                if (obj[$efront_string_hasOwn](key)) {
                    ret[key] = obj[key]
                }
            }
            return ret
        }
        ignoreJSHintError(shallowCopy);
        function upperBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length];
            i = 0;
            while (len) {
                diff = len >>> 1;
                current = i + diff;
                if (func(array[current])) {
                    len = diff
                } else {
                    i = current + 1;
                    len -= diff + 1
                }
            }
            return i
        }
        function lowerBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length];
            i = 0;
            while (len) {
                diff = len >>> 1;
                current = i + diff;
                if (func(array[current])) {
                    i = current + 1;
                    len -= diff + 1
                } else {
                    len = diff
                }
            }
            return i
        }
        ignoreJSHintError(lowerBound);
        VisitorKeys = (_b = {}, _b[$efront_string_Assign] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_ArrayE] = [$efront_string_elemen], _b[$efront_string_ArrayP] = [$efront_string_elemen], _b[$efront_string_ArrowF] = [
            $efront_string_params,
            $efront_string_defaul1,
            $efront_string_rest,
            $efront_string_body
        ], _b[$efront_string_BlockS] = [$efront_string_body], _b[$efront_string_Binary] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_BreakS] = [$efront_string_label], _b[$efront_string_CallEx] = [
            $efront_string_callee,
            $efront_string_argume
        ], _b[$efront_string_CatchC] = [
            $efront_string_param,
            $efront_string_body
        ], _b[$efront_string_ClassB] = [$efront_string_body], _b[$efront_string_ClassD] = [
            $efront_string_id,
            $efront_string_body,
            $efront_string_superC
        ], _b[$efront_string_ClassE] = [
            $efront_string_id,
            $efront_string_body,
            $efront_string_superC
        ], _b[$efront_string_Condit] = [
            $efront_string_test,
            $efront_string_conseq,
            $efront_string_altern
        ], _b[$efront_string_Contin] = [$efront_string_label], _b[$efront_string_Debugg] = [], _b[$efront_string_Direct] = [], _b[$efront_string_DoWhil] = [
            $efront_string_body,
            $efront_string_test
        ], _b[$efront_string_EmptyS] = [], _b[$efront_string_Expres] = [$efront_string_expres], _b[$efront_string_ForSta] = [
            $efront_string_init,
            $efront_string_test,
            $efront_string_update,
            $efront_string_body
        ], _b[$efront_string_ForInS] = [
            $efront_string_left,
            $efront_string_right,
            $efront_string_body
        ], _b[$efront_string_ForOfS] = [
            $efront_string_left,
            $efront_string_right,
            $efront_string_body
        ], _b[$efront_string_Functi] = [
            $efront_string_id,
            $efront_string_params,
            $efront_string_defaul1,
            $efront_string_rest,
            $efront_string_body
        ], _b[$efront_string_Functi1] = [
            $efront_string_id,
            $efront_string_params,
            $efront_string_defaul1,
            $efront_string_rest,
            $efront_string_body
        ], _b[$efront_string_Identi] = [], _b[$efront_string_IfStat] = [
            $efront_string_test,
            $efront_string_conseq,
            $efront_string_altern
        ], _b[$efront_string_Litera] = [], _b[$efront_string_Labele] = [
            $efront_string_label,
            $efront_string_body
        ], _b[$efront_string_Logica] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_Member] = [
            $efront_string_object,
            $efront_string_proper
        ], _b[$efront_string_Method] = [
            $efront_string_key,
            $efront_string_value
        ], _b[$efront_string_NewExp] = [
            $efront_string_callee,
            $efront_string_argume
        ], _b[$efront_string_Object] = [$efront_string_proper1], _b[$efront_string_Object1] = [$efront_string_proper1], _b[$efront_string_Progra] = [$efront_string_body], _b[$efront_string_Proper] = [
            $efront_string_key,
            $efront_string_value
        ], _b[$efront_string_Return] = [$efront_string_argume1], _b[$efront_string_Sequen] = [$efront_string_expres1], _b[$efront_string_Switch] = [
            $efront_string_discri,
            $efront_string_cases
        ], _b[$efront_string_Switch1] = [
            $efront_string_test,
            $efront_string_conseq
        ], _b[$efront_string_ThisEx] = [], _b[$efront_string_ThrowS] = [$efront_string_argume1], _b[$efront_string_TrySta] = [
            $efront_string_block,
            $efront_string_handle,
            $efront_string_handle1,
            $efront_string_guarde,
            $efront_string_finali
        ], _b[$efront_string_UnaryE] = [$efront_string_argume1], _b[$efront_string_Update] = [$efront_string_argume1], _b[$efront_string_Variab] = [$efront_string_declar], _b[$efront_string_Variab1] = [
            $efront_string_id,
            $efront_string_init
        ], _b[$efront_string_WhileS] = [
            $efront_string_test,
            $efront_string_body
        ], _b[$efront_string_WithSt] = [
            $efront_string_object,
            $efront_string_body
        ], _b[$efront_string_YieldE] = [$efront_string_argume1], _b);
        BREAK = {};
        SKIP = {};
        VisitorOption = (_c = {}, _c[$efront_string_Break] = BREAK, _c[$efront_string_Skip] = SKIP, _c);
        function Reference(parent, key) {
            this[$efront_string_parent] = parent;
            this[$efront_string_key] = key
        }
        Reference[$efront_string_protot][$efront_string_replac] = function replace(node) {
            this[$efront_string_parent][this[$efront_string_key]] = node
        };
        function Element(node, path, wrap, ref) {
            this[$efront_string_node] = node;
            this[$efront_string_path] = path;
            this[$efront_string_wrap] = wrap;
            this[$efront_string_ref] = ref
        }
        function Controller() {
        }
        Controller[$efront_string_protot][$efront_string_path] = function path() {
            var i, iz, j, jz, result, element;
            function addToPath(result, path) {
                if (isArray(path)) {
                    for (j = 0, jz = path[$efront_string_length]; j < jz; ++j) {
                        result[$efront_string_push](path[j])
                    }
                } else {
                    result[$efront_string_push](path)
                }
            }
            if (!this[$efront_string___curr][$efront_string_path]) {
                return null
            }
            result = [];
            for (i = 2, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i) {
                element = this[$efront_string___leav][i];
                addToPath(result, element[$efront_string_path])
            }
            addToPath(result, this[$efront_string___curr][$efront_string_path]);
            return result
        };
        Controller[$efront_string_protot][$efront_string_parent1] = function parents() {
            var i, iz, result;
            result = [];
            for (i = 1, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i) {
                result[$efront_string_push](this[$efront_string___leav][i][$efront_string_node])
            }
            return result
        };
        Controller[$efront_string_protot][$efront_string_curren] = function current() {
            return this[$efront_string___curr][$efront_string_node]
        };
        Controller[$efront_string_protot][$efront_string___exec] = function __execute(callback, element) {
            var previous, result;
            result = undefined;
            previous = this[$efront_string___curr];
            this[$efront_string___curr] = element;
            this[$efront_string___stat] = null;
            if (callback) {
                result = callback[$efront_string_call](this, element[$efront_string_node], this[$efront_string___leav][this[$efront_string___leav][$efront_string_length] - 1][$efront_string_node])
            }
            this[$efront_string___curr] = previous;
            return result
        };
        Controller[$efront_string_protot][$efront_string_notify] = function notify(flag) {
            this[$efront_string___stat] = flag
        };
        Controller[$efront_string_protot][$efront_string_skip] = function () {
            this[$efront_string_notify](SKIP)
        };
        Controller[$efront_string_protot][$efront_string_break] = function () {
            this[$efront_string_notify](BREAK)
        };
        Controller[$efront_string_protot][$efront_string___init] = function (root, visitor) {
            this[$efront_string_visito] = visitor;
            this[$efront_string_root] = root;
            this[$efront_string___work] = [];
            this[$efront_string___leav] = [];
            this[$efront_string___curr] = null;
            this[$efront_string___stat] = null
        };
        Controller[$efront_string_protot][$efront_string_traver] = function traverse(root, visitor) {
            var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
            this[$efront_string___init](root, visitor);
            sentinel = {};
            worklist = this[$efront_string___work];
            leavelist = this[$efront_string___leav];
            worklist[$efront_string_push](new Element(root, null, null, null));
            leavelist[$efront_string_push](new Element(null, null, null, null));
            while (worklist[$efront_string_length]) {
                element = worklist[$efront_string_pop]();
                if (element === sentinel) {
                    element = leavelist[$efront_string_pop]();
                    ret = this[$efront_string___exec](visitor[$efront_string_leave], element);
                    if (this[$efront_string___stat] === BREAK || ret === BREAK) {
                        return
                    }
                    continue
                }
                if (element[$efront_string_node]) {
                    ret = this[$efront_string___exec](visitor[$efront_string_enter], element);
                    if (this[$efront_string___stat] === BREAK || ret === BREAK) {
                        return
                    }
                    worklist[$efront_string_push](sentinel);
                    leavelist[$efront_string_push](element);
                    if (this[$efront_string___stat] === SKIP || ret === SKIP) {
                        continue
                    }
                    node = element[$efront_string_node];
                    nodeType = element[$efront_string_wrap] || node[$efront_string_type];
                    candidates = VisitorKeys[nodeType];
                    current = candidates[$efront_string_length];
                    while ((current -= 1) >= 0) {
                        key = candidates[current];
                        candidate = node[key];
                        if (!candidate) {
                            continue
                        }
                        if (!isArray(candidate)) {
                            worklist[$efront_string_push](new Element(candidate, key, null, null));
                            continue
                        }
                        current2 = candidate[$efront_string_length];
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue
                            }
                            if ((nodeType === Syntax[$efront_string_Object] || nodeType === Syntax[$efront_string_Object1]) && $efront_string_proper1 === candidates[current]) {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], $efront_string_Proper, null)
                            } else {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], null, null)
                            }
                            worklist[$efront_string_push](element)
                        }
                    }
                }
            }
        };
        Controller[$efront_string_protot][$efront_string_replac] = function replace(root, visitor) {
            var _a;
            var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
            this[$efront_string___init](root, visitor);
            sentinel = {};
            worklist = this[$efront_string___work];
            leavelist = this[$efront_string___leav];
            outer = (_a = {}, _a[$efront_string_root] = root, _a);
            element = new Element(root, null, null, new Reference(outer, $efront_string_root));
            worklist[$efront_string_push](element);
            leavelist[$efront_string_push](element);
            while (worklist[$efront_string_length]) {
                element = worklist[$efront_string_pop]();
                if (element === sentinel) {
                    element = leavelist[$efront_string_pop]();
                    target = this[$efront_string___exec](visitor[$efront_string_leave], element);
                    if (target !== undefined && target !== BREAK && target !== SKIP) {
                        element[$efront_string_ref][$efront_string_replac](target)
                    }
                    if (this[$efront_string___stat] === BREAK || target === BREAK) {
                        return outer[$efront_string_root]
                    }
                    continue
                }
                target = this[$efront_string___exec](visitor[$efront_string_enter], element);
                if (target !== undefined && target !== BREAK && target !== SKIP) {
                    element[$efront_string_ref][$efront_string_replac](target);
                    element[$efront_string_node] = target
                }
                if (this[$efront_string___stat] === BREAK || target === BREAK) {
                    return outer[$efront_string_root]
                }
                node = element[$efront_string_node];
                if (!node) {
                    continue
                }
                worklist[$efront_string_push](sentinel);
                leavelist[$efront_string_push](element);
                if (this[$efront_string___stat] === SKIP || target === SKIP) {
                    continue
                }
                nodeType = element[$efront_string_wrap] || node[$efront_string_type];
                candidates = VisitorKeys[nodeType];
                current = candidates[$efront_string_length];
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue
                    }
                    if (!isArray(candidate)) {
                        worklist[$efront_string_push](new Element(candidate, key, null, new Reference(node, key)));
                        continue
                    }
                    current2 = candidate[$efront_string_length];
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue
                        }
                        if (nodeType === Syntax[$efront_string_Object] && $efront_string_proper1 === candidates[current]) {
                            element = new Element(candidate[current2], [
                                key,
                                current2
                            ], $efront_string_Proper, new Reference(candidate, current2))
                        } else {
                            element = new Element(candidate[current2], [
                                key,
                                current2
                            ], null, new Reference(candidate, current2))
                        }
                        worklist[$efront_string_push](element)
                    }
                }
            }
            return outer[$efront_string_root]
        };
        function traverse(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string_traver](root, visitor)
        }
        function replace(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string_replac](root, visitor)
        }
        function extendCommentRange(comment, tokens) {
            var target;
            target = upperBound(tokens, function search(token) {
                return token[$efront_string_range][0] > comment[$efront_string_range][0]
            });
            comment[$efront_string_extend1] = [
                comment[$efront_string_range][0],
                comment[$efront_string_range][1]
            ];
            if (target !== tokens[$efront_string_length]) {
                comment[$efront_string_extend1][1] = tokens[target][$efront_string_range][0]
            }
            target -= 1;
            if (target >= 0) {
                comment[$efront_string_extend1][0] = tokens[target][$efront_string_range][1]
            }
            return comment
        }
        function attachComments(tree, providedComments, tokens) {
            var _a, _b;
            var comments = [], comment, len, i, cursor;
            if (!tree[$efront_string_range]) {
                throw new Error($efront_string_attach)
            }
            if (!tokens[$efront_string_length]) {
                if (providedComments[$efront_string_length]) {
                    for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1) {
                        comment = deepCopy(providedComments[i]);
                        comment[$efront_string_extend1] = [
                            0,
                            tree[$efront_string_range][0]
                        ];
                        comments[$efront_string_push](comment)
                    }
                    tree[$efront_string_leadin] = comments
                }
                return tree
            }
            for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1) {
                comments[$efront_string_push](extendCommentRange(deepCopy(providedComments[i]), tokens))
            }
            cursor = 0;
            traverse(tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    comment = comments[cursor];
                    if (comment[$efront_string_extend1][1] > node[$efront_string_range][0]) {
                        break
                    }
                    if (comment[$efront_string_extend1][1] === node[$efront_string_range][0]) {
                        if (!node[$efront_string_leadin]) {
                            node[$efront_string_leadin] = []
                        }
                        node[$efront_string_leadin][$efront_string_push](comment);
                        comments[$efront_string_splice](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string_length]) {
                    return VisitorOption[$efront_string_Break]
                }
                if (comments[cursor][$efront_string_extend1][0] > node[$efront_string_range][1]) {
                    return VisitorOption[$efront_string_Skip]
                }
            }, _a));
            cursor = 0;
            traverse(tree, (_b = {}, _b[$efront_string_leave] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    comment = comments[cursor];
                    if (node[$efront_string_range][1] < comment[$efront_string_extend1][0]) {
                        break
                    }
                    if (node[$efront_string_range][1] === comment[$efront_string_extend1][0]) {
                        if (!node[$efront_string_traili]) {
                            node[$efront_string_traili] = []
                        }
                        node[$efront_string_traili][$efront_string_push](comment);
                        comments[$efront_string_splice](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string_length]) {
                    return VisitorOption[$efront_string_Break]
                }
                if (comments[cursor][$efront_string_extend1][0] > node[$efront_string_range][1]) {
                    return VisitorOption[$efront_string_Skip]
                }
            }, _b));
            return tree
        }
        exports[$efront_string_versio] = $efront_string_1_5_1_;
        exports[$efront_string_Syntax] = Syntax;
        exports[$efront_string_traver] = traverse;
        exports[$efront_string_replac] = replace;
        exports[$efront_string_attach1] = attachComments;
        exports[$efront_string_Visito] = VisitorKeys;
        exports[$efront_string_Visito1] = VisitorOption;
        exports[$efront_string_Contro] = Controller
    })
}],
/** 340 $efront_string_lastIn */ "lastIndexOf",
/** 341 $efront_string___ */ "__",
/** 342 $efront_string_0 */ "0",
/** 343 $efront_string_012345 */ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$",
/** 344 $efront_string_charAt */ "charAt",
/** 345 $efront_string_a */ "a",
/** 346 $efront_string_genera */ "generateNextName",
/** 347 $efront_string_deepCo */ "deepCopy",
/** 348 esshorten$lib$utility.js */ [53,54,16,114,51,268,36,269,12,270,340,341,39,271,342,343,4,3,344,9,45,345,346,347,function(Array, Object, RegExp, undefined, exports, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_lastIn, $efront_string___, $efront_string_hasOwn, $efront_string_object, $efront_string_0, $efront_string_012345, $efront_string_split, $efront_string_length, $efront_string_charAt, $efront_string_indexO, $efront_string_substr, $efront_string_a, $efront_string_genera, $efront_string_deepCo) {
    return function () {
        'use strict';
        var isArray, NameSequence, ZeroSequenceCache;
        isArray = Array[$efront_string_isArra];
        if (!isArray) {
            isArray = function isArray(array) {
                return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
            }
        }
        function deepCopy(obj) {
            function deepCopyInternal(obj, result) {
                var key, val;
                for (key in obj) {
                    if (key[$efront_string_lastIn]($efront_string___, 0) === 0) {
                        continue
                    }
                    if (obj[$efront_string_hasOwn](key)) {
                        val = obj[key];
                        if (typeof val === $efront_string_object && val !== null) {
                            if (val instanceof RegExp) {
                                val = new RegExp(val)
                            } else {
                                val = deepCopyInternal(val, isArray(val) ? [] : {})
                            }
                        }
                        result[key] = val
                    }
                }
                return result
            }
            return deepCopyInternal(obj, isArray(obj) ? [] : {})
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str) {
                if (num & 1) {
                    result += str
                }
            }
            return result
        }
        ZeroSequenceCache = [];
        function zeroSequence(num) {
            var res = ZeroSequenceCache[num];
            if (res !== undefined) {
                return res
            }
            res = stringRepeat($efront_string_0, num);
            ZeroSequenceCache[num] = res;
            return res
        }
        NameSequence = $efront_string_012345[$efront_string_split]('');
        function generateNextName(name) {
            var ch, index, cur;
            cur = name[$efront_string_length] - 1;
            do {
                ch = name[$efront_string_charAt](cur);
                index = NameSequence[$efront_string_indexO](ch);
                if (index !== NameSequence[$efront_string_length] - 1) {
                    return name[$efront_string_substr](0, cur) + NameSequence[index + 1] + zeroSequence(name[$efront_string_length] - (cur + 1))
                }
                --cur
            } while (cur >= 0);
            return $efront_string_a + zeroSequence(name[$efront_string_length])
        }
        exports[$efront_string_genera] = generateNextName;
        exports[$efront_string_deepCo] = deepCopy
    }()
}],
/** 349 esutils */ [1,function(require) {
    return require(217)
}],
/** 350 estraverse */ [1,function(require) {
    return require(339)
}],
/** 351 $efront_string__3 */ ".",
/** 352 $efront_string_optimi */ "optimistic",
/** 353 $efront_string_direct1 */ "directive",
/** 354 $efront_string_ecmaVe */ "ecmaVersion",
/** 355 $efront_string_identi */ "identifier",
/** 356 $efront_string_from */ "from",
/** 357 $efront_string_tainte */ "tainted",
/** 358 $efront_string_resolv */ "resolved",
/** 359 $efront_string_flag */ "flag",
/** 360 $efront_string_isWrit */ "isWrite",
/** 361 $efront_string_writeE */ "writeExpr",
/** 362 $efront_string___mayb */ "__maybeImplicitGlobal",
/** 363 $efront_string_READ */ "READ",
/** 364 $efront_string_WRITE */ "WRITE",
/** 365 $efront_string_RW */ "RW",
/** 366 $efront_string_isStat */ "isStatic",
/** 367 $efront_string_scope */ "scope",
/** 368 $efront_string_isRead */ "isRead",
/** 369 $efront_string_isRead1 */ "isReadOnly",
/** 370 $efront_string_isWrit1 */ "isWriteOnly",
/** 371 $efront_string_isRead2 */ "isReadWrite",
/** 372 $efront_string_identi1 */ "identifiers",
/** 373 $efront_string_refere */ "references",
/** 374 $efront_string_defs */ "defs",
/** 375 $efront_string_stack */ "stack",
/** 376 $efront_string_Parame */ "Parameter",
/** 377 $efront_string_Functi2 */ "FunctionName",
/** 378 $efront_string_Variab2 */ "Variable",
/** 379 $efront_string_Implic */ "ImplicitGlobalVariable",
/** 380 $efront_string_upper */ "upper",
/** 381 $efront_string_isStri */ "isStrict",
/** 382 $efront_string_global */ "global",
/** 383 $efront_string_raw */ "raw",
/** 384 $efront_string__use_s */ /** text */ "\"use strict\"",
/** 385 $efront_string__use_s1 */ /** text */ "'use strict'",
/** 386 $efront_string_taints */ "taints",
/** 387 $efront_string_dynami */ "dynamic",
/** 388 $efront_string_throug */ "through",
/** 389 $efront_string_variab */ "variables",
/** 390 $efront_string_variab1 */ "variableScope",
/** 391 $efront_string_functi1 */ "functionExpressionScope",
/** 392 $efront_string_direct2 */ "directCallToEvalScope",
/** 393 $efront_string_thisFo */ "thisFound",
/** 394 $efront_string_naming */ "naming",
/** 395 $efront_string___defi */ "__define",
/** 396 $efront_string_childS */ "childScopes",
/** 397 $efront_string_implic */ "implicit",
/** 398 $efront_string___clos */ "__close",
/** 399 $efront_string___reso */ "__resolve",
/** 400 $efront_string___dele */ "__delegateToUpperScope",
/** 401 $efront_string___defi1 */ "__defineImplicit",
/** 402 $efront_string___refe */ "__referencing",
/** 403 $efront_string___dete */ "__detectEval",
/** 404 $efront_string___dete1 */ "__detectThis",
/** 405 $efront_string___isCl */ "__isClosed",
/** 406 $efront_string_resolv1 */ "resolve",
/** 407 $efront_string_scope_ */ /** text */ "scope should be closed",
/** 408 $efront_string_target */ /** text */ "target should be identifier",
/** 409 $efront_string_isArgu */ "isArgumentsMaterialized",
/** 410 $efront_string_always */ /** text */ "always have arguments variable",
/** 411 $efront_string_isThis */ "isThisMaterialized",
/** 412 $efront_string_mangle */ "mangledName",
/** 413 $efront_string___$esc */ "__$escope$__",
/** 414 $efront_string_attach2 */ "attach",
/** 415 $efront_string_detach */ "detach",
/** 416 $efront_string_isUsed */ "isUsedName",
/** 417 $efront_string_scopes */ "scopes",
/** 418 $efront_string_attach3 */ "attached",
/** 419 $efront_string___get */ "__get",
/** 420 $efront_string_isScop */ "isScopeRequired",
/** 421 $efront_string_acquir */ "acquire",
/** 422 $efront_string_releas */ "release",
/** 423 $efront_string_isVari */ "isVariableScopeRequired",
/** 424 $efront_string_operat */ "operator",
/** 425 $efront_string__4 */ "=",
/** 426 $efront_string_ignore */ "ignoreEval",
/** 427 $efront_string_index */ "index",
/** 428 $efront_string_comput */ "computed",
/** 429 $efront_string_kind */ "kind",
/** 430 $efront_string_1_0_3 */ "1.0.3",
/** 431 $efront_string_Refere */ "Reference",
/** 432 $efront_string_Scope */ "Scope",
/** 433 $efront_string_ScopeM */ "ScopeManager",
/** 434 $efront_string_analyz */ "analyze",
/** 435 escope$escope.js */ [52,51,1,114,55,54,16,4,351,3,39,203,218,84,13,82,34,334,33,35,36,37,38,40,41,42,352,353,354,271,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,56,372,373,374,375,227,376,377,378,379,380,381,77,278,382,234,383,384,385,237,286,244,292,10,190,266,186,252,386,387,298,388,389,272,390,391,392,393,394,395,282,65,208,47,241,396,397,398,399,400,401,242,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,240,323,326,219,424,425,273,220,274,223,224,225,226,280,426,207,281,231,22,284,285,232,235,233,236,238,287,288,239,263,303,275,427,243,245,246,247,428,290,249,250,293,429,253,254,294,255,295,256,296,257,258,259,260,261,262,306,264,265,325,62,430,431,432,433,434,function(define, exports, require, undefined, Error, Object, RegExp, $efront_string_split, $efront_string__3, $efront_string_length, $efront_string_hasOwn, $efront_string_functi, $efront_string_amd, $efront_string_escope, $efront_string_export, $efront_string_estrav, $efront_string_undefi, $efront_string_Syntax, $efront_string_Map, $efront_string___data, $efront_string_protot, $efront_string_get, $efront_string_$, $efront_string_has, $efront_string_set, $efront_string_delete, $efront_string_optimi, $efront_string_direct1, $efront_string_ecmaVe, $efront_string_object, $efront_string_identi, $efront_string_from, $efront_string_tainte, $efront_string_resolv, $efront_string_flag, $efront_string_isWrit, $efront_string_writeE, $efront_string___mayb, $efront_string_READ, $efront_string_WRITE, $efront_string_RW, $efront_string_isStat, $efront_string_scope, $efront_string_isRead, $efront_string_isRead1, $efront_string_isWrit1, $efront_string_isRead2, $efront_string_name, $efront_string_identi1, $efront_string_refere, $efront_string_defs, $efront_string_stack, $efront_string_CatchC, $efront_string_Parame, $efront_string_Functi2, $efront_string_Variab2, $efront_string_Implic, $efront_string_upper, $efront_string_isStri, $efront_string_type, $efront_string_body, $efront_string_global, $efront_string_Direct, $efront_string_raw, $efront_string__use_s, $efront_string__use_s1, $efront_string_Expres, $efront_string_expres, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_catch, $efront_string_WithSt, $efront_string_with, $efront_string_Progra, $efront_string_taints, $efront_string_dynami, $efront_string_block, $efront_string_throug, $efront_string_variab, $efront_string_left, $efront_string_variab1, $efront_string_functi1, $efront_string_direct2, $efront_string_thisFo, $efront_string_naming, $efront_string___defi, $efront_string_id, $efront_string_node, $efront_string_argume, $efront_string_push, $efront_string_Functi1, $efront_string_childS, $efront_string_implic, $efront_string___clos, $efront_string___reso, $efront_string___dele, $efront_string___defi1, $efront_string_Identi, $efront_string___refe, $efront_string___dete, $efront_string___dete1, $efront_string___isCl, $efront_string_resolv1, $efront_string_scope_, $efront_string_target, $efront_string_isArgu, $efront_string_always, $efront_string_isThis, $efront_string_mangle, $efront_string___$esc, $efront_string_attach2, $efront_string_detach, $efront_string_isUsed, $efront_string_scopes, $efront_string_attach3, $efront_string___get, $efront_string_isScop, $efront_string_acquir, $efront_string_releas, $efront_string_isVari, $efront_string_Functi, $efront_string_traver, $efront_string_enter, $efront_string_Assign, $efront_string_operat, $efront_string__4, $efront_string_right, $efront_string_ArrayE, $efront_string_elemen, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_callee, $efront_string_ignore, $efront_string_eval, $efront_string_param, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_Contin, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_ForSta, $efront_string_init, $efront_string_update, $efront_string_ForInS, $efront_string_Variab, $efront_string_declar, $efront_string_params, $efront_string_index, $efront_string_IfStat, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_NewExp, $efront_string_Object, $efront_string_proper1, $efront_string_kind, $efront_string_Proper, $efront_string_Return, $efront_string_argume1, $efront_string_Sequen, $efront_string_expres1, $efront_string_Switch, $efront_string_discri, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_parent, $efront_string_Variab1, $efront_string_WhileS, $efront_string_leave, $efront_string_versio, $efront_string_1_0_3, $efront_string_Refere, $efront_string_Scope, $efront_string_ScopeM, $efront_string_analyz) {
    return function (factory, global) {
        'use strict';
        function namespace(str, obj) {
            var i, iz, names, name;
            names = str[$efront_string_split]($efront_string__3);
            for (i = 0, iz = names[$efront_string_length]; i < iz; ++i) {
                name = names[i];
                if (obj[$efront_string_hasOwn](name)) {
                    obj = obj[name]
                } else {
                    obj = obj[name] = {}
                }
            }
            return obj
        }
        if (typeof define === $efront_string_functi && define[$efront_string_amd]) {
            define($efront_string_escope, [
                $efront_string_export,
                $efront_string_estrav
            ], function (exports, estraverse) {
                factory(exports, global, estraverse)
            })
        } else if (typeof exports !== $efront_string_undefi) {
            factory(exports, global, require(350))
        } else {
            factory(namespace($efront_string_escope, global), global, global[$efront_string_estrav])
        }
    }(function (exports, global, estraverse) {
        'use strict';
        var Syntax, Map, currentScope, globalScope, scopes, options;
        Syntax = estraverse[$efront_string_Syntax];
        if (typeof global[$efront_string_Map] !== $efront_string_undefi) {
            Map = global[$efront_string_Map]
        } else {
            Map = function Map() {
                this[$efront_string___data] = {}
            };
            Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
                key = $efront_string_$ + key;
                if (this[$efront_string___data][$efront_string_hasOwn](key)) {
                    return this[$efront_string___data][key]
                }
                return undefined
            };
            Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
                key = $efront_string_$ + key;
                return this[$efront_string___data][$efront_string_hasOwn](key)
            };
            Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
                key = $efront_string_$ + key;
                this[$efront_string___data][key] = val
            };
            Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
                key = $efront_string_$ + key;
                return delete this[$efront_string___data][key]
            }
        }
        function assert(cond, text) {
            if (!cond) {
                throw new Error(text)
            }
        }
        function defaultOptions() {
            var _a;
            return _a = {}, _a[$efront_string_optimi] = false, _a[$efront_string_direct1] = false, _a[$efront_string_ecmaVe] = 5, _a
        }
        function updateDeeply(target, override) {
            var key, val;
            function isHashObject(target) {
                return typeof target === $efront_string_object && target instanceof Object && !(target instanceof RegExp)
            }
            for (key in override) {
                if (override[$efront_string_hasOwn](key)) {
                    val = override[key];
                    if (isHashObject(val)) {
                        if (isHashObject(target[key])) {
                            updateDeeply(target[key], val)
                        } else {
                            target[key] = updateDeeply({}, val)
                        }
                    } else {
                        target[key] = val
                    }
                }
            }
            return target
        }
        function Reference(ident, scope, flag, writeExpr, maybeImplicitGlobal) {
            this[$efront_string_identi] = ident;
            this[$efront_string_from] = scope;
            this[$efront_string_tainte] = false;
            this[$efront_string_resolv] = null;
            this[$efront_string_flag] = flag;
            if (this[$efront_string_isWrit]()) {
                this[$efront_string_writeE] = writeExpr
            }
            this[$efront_string___mayb] = maybeImplicitGlobal
        }
        Reference[$efront_string_READ] = 1;
        Reference[$efront_string_WRITE] = 2;
        Reference[$efront_string_RW] = 3;
        Reference[$efront_string_protot][$efront_string_isStat] = function isStatic() {
            return !this[$efront_string_tainte] && this[$efront_string_resolv] && this[$efront_string_resolv][$efront_string_scope][$efront_string_isStat]()
        };
        Reference[$efront_string_protot][$efront_string_isWrit] = function isWrite() {
            return this[$efront_string_flag] & Reference[$efront_string_WRITE]
        };
        Reference[$efront_string_protot][$efront_string_isRead] = function isRead() {
            return this[$efront_string_flag] & Reference[$efront_string_READ]
        };
        Reference[$efront_string_protot][$efront_string_isRead1] = function isReadOnly() {
            return this[$efront_string_flag] === Reference[$efront_string_READ]
        };
        Reference[$efront_string_protot][$efront_string_isWrit1] = function isWriteOnly() {
            return this[$efront_string_flag] === Reference[$efront_string_WRITE]
        };
        Reference[$efront_string_protot][$efront_string_isRead2] = function isReadWrite() {
            return this[$efront_string_flag] === Reference[$efront_string_RW]
        };
        function Variable(name, scope) {
            this[$efront_string_name] = name;
            this[$efront_string_identi1] = [];
            this[$efront_string_refere] = [];
            this[$efront_string_defs] = [];
            this[$efront_string_tainte] = false;
            this[$efront_string_stack] = true;
            this[$efront_string_scope] = scope
        }
        Variable[$efront_string_CatchC] = $efront_string_CatchC;
        Variable[$efront_string_Parame] = $efront_string_Parame;
        Variable[$efront_string_Functi2] = $efront_string_Functi2;
        Variable[$efront_string_Variab2] = $efront_string_Variab2;
        Variable[$efront_string_Implic] = $efront_string_Implic;
        function isStrictScope(scope, block) {
            var body, i, iz, stmt, expr;
            if (scope[$efront_string_upper] && scope[$efront_string_upper][$efront_string_isStri]) {
                return true
            }
            if (scope[$efront_string_type] === $efront_string_functi) {
                body = block[$efront_string_body]
            } else if (scope[$efront_string_type] === $efront_string_global) {
                body = block
            } else {
                return false
            }
            if (options[$efront_string_direct1]) {
                for (i = 0, iz = body[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    stmt = body[$efront_string_body][i];
                    if (stmt[$efront_string_type] !== $efront_string_Direct) {
                        break
                    }
                    if (stmt[$efront_string_raw] === $efront_string__use_s || stmt[$efront_string_raw] === $efront_string__use_s1) {
                        return true
                    }
                }
            } else {
                for (i = 0, iz = body[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    stmt = body[$efront_string_body][i];
                    if (stmt[$efront_string_type] !== Syntax[$efront_string_Expres]) {
                        break
                    }
                    expr = stmt[$efront_string_expres];
                    if (expr[$efront_string_type] !== Syntax[$efront_string_Litera] || typeof expr[$efront_string_value] !== $efront_string_string) {
                        break
                    }
                    if (expr[$efront_string_raw] != null) {
                        if (expr[$efront_string_raw] === $efront_string__use_s || expr[$efront_string_raw] === $efront_string__use_s1) {
                            return true
                        }
                    } else {
                        if (expr[$efront_string_value] === 'use strict') {
                            return true
                        }
                    }
                }
            }
            return false
        }
        function Scope(block, opt) {
            var _a, _b, _c;
            var variable, body;
            this[$efront_string_type] = block[$efront_string_type] === Syntax[$efront_string_CatchC] ? $efront_string_catch : block[$efront_string_type] === Syntax[$efront_string_WithSt] ? $efront_string_with : block[$efront_string_type] === Syntax[$efront_string_Progra] ? $efront_string_global : $efront_string_functi;
            this[$efront_string_set] = new Map;
            this[$efront_string_taints] = new Map;
            this[$efront_string_dynami] = this[$efront_string_type] === $efront_string_global || this[$efront_string_type] === $efront_string_with;
            this[$efront_string_block] = block;
            this[$efront_string_throug] = [];
            this[$efront_string_variab] = [];
            this[$efront_string_refere] = [];
            this[$efront_string_left] = [];
            this[$efront_string_variab1] = this[$efront_string_type] === $efront_string_global || this[$efront_string_type] === $efront_string_functi ? this : currentScope[$efront_string_variab1];
            this[$efront_string_functi1] = false;
            this[$efront_string_direct2] = false;
            this[$efront_string_thisFo] = false;
            body = this[$efront_string_type] === $efront_string_functi ? block[$efront_string_body] : block;
            if (opt[$efront_string_naming]) {
                this[$efront_string___defi](block[$efront_string_id], (_a = {}, _a[$efront_string_type] = Variable[$efront_string_Functi2], _a[$efront_string_name] = block[$efront_string_id], _a[$efront_string_node] = block, _a));
                this[$efront_string_functi1] = true
            } else {
                if (this[$efront_string_type] === $efront_string_functi) {
                    variable = new Variable($efront_string_argume, this);
                    this[$efront_string_taints][$efront_string_set]($efront_string_argume, true);
                    this[$efront_string_set][$efront_string_set]($efront_string_argume, variable);
                    this[$efront_string_variab][$efront_string_push](variable)
                }
                if (block[$efront_string_type] === Syntax[$efront_string_Functi1] && block[$efront_string_id]) {
                    new Scope(block, (_b = {}, _b[$efront_string_naming] = true, _b))
                }
            }
            this[$efront_string_upper] = currentScope;
            this[$efront_string_isStri] = isStrictScope(this, block);
            this[$efront_string_childS] = [];
            if (currentScope) {
                currentScope[$efront_string_childS][$efront_string_push](this)
            }
            currentScope = this;
            if (this[$efront_string_type] === $efront_string_global) {
                globalScope = this;
                globalScope[$efront_string_implic] = (_c = {}, _c[$efront_string_set] = new Map, _c[$efront_string_variab] = [], _c)
            }
            scopes[$efront_string_push](this)
        }
        Scope[$efront_string_protot][$efront_string___clos] = function __close() {
            var _a;
            var i, iz, ref, current, node, implicit;
            if (!this[$efront_string_dynami] || options[$efront_string_optimi]) {
                for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i) {
                    ref = this[$efront_string_left][i];
                    if (!this[$efront_string___reso](ref)) {
                        this[$efront_string___dele](ref)
                    }
                }
            } else {
                if (this[$efront_string_type] === $efront_string_with) {
                    for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i) {
                        ref = this[$efront_string_left][i];
                        ref[$efront_string_tainte] = true;
                        this[$efront_string___dele](ref)
                    }
                } else {
                    for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i) {
                        ref = this[$efront_string_left][i];
                        current = this;
                        do {
                            current[$efront_string_throug][$efront_string_push](ref);
                            current = current[$efront_string_upper]
                        } while (current)
                    }
                }
            }
            if (this[$efront_string_type] === $efront_string_global) {
                implicit = [];
                for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i) {
                    ref = this[$efront_string_left][i];
                    if (ref[$efront_string___mayb] && !this[$efront_string_set][$efront_string_has](ref[$efront_string_identi][$efront_string_name])) {
                        implicit[$efront_string_push](ref[$efront_string___mayb])
                    }
                }
                for (i = 0, iz = implicit[$efront_string_length]; i < iz; ++i) {
                    node = implicit[i];
                    this[$efront_string___defi1](node[$efront_string_left], (_a = {}, _a[$efront_string_type] = Variable[$efront_string_Implic], _a[$efront_string_name] = node[$efront_string_left], _a[$efront_string_node] = node, _a))
                }
            }
            this[$efront_string_left] = null;
            currentScope = this[$efront_string_upper]
        };
        Scope[$efront_string_protot][$efront_string___reso] = function __resolve(ref) {
            var variable, name;
            name = ref[$efront_string_identi][$efront_string_name];
            if (this[$efront_string_set][$efront_string_has](name)) {
                variable = this[$efront_string_set][$efront_string_get](name);
                variable[$efront_string_refere][$efront_string_push](ref);
                variable[$efront_string_stack] = variable[$efront_string_stack] && ref[$efront_string_from][$efront_string_variab1] === this[$efront_string_variab1];
                if (ref[$efront_string_tainte]) {
                    variable[$efront_string_tainte] = true;
                    this[$efront_string_taints][$efront_string_set](variable[$efront_string_name], true)
                }
                ref[$efront_string_resolv] = variable;
                return true
            }
            return false
        };
        Scope[$efront_string_protot][$efront_string___dele] = function __delegateToUpperScope(ref) {
            if (this[$efront_string_upper]) {
                this[$efront_string_upper][$efront_string_left][$efront_string_push](ref)
            }
            this[$efront_string_throug][$efront_string_push](ref)
        };
        Scope[$efront_string_protot][$efront_string___defi1] = function __defineImplicit(node, info) {
            var name, variable;
            if (node && node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                name = node[$efront_string_name];
                if (!this[$efront_string_implic][$efront_string_set][$efront_string_has](name)) {
                    variable = new Variable(name, this);
                    variable[$efront_string_identi1][$efront_string_push](node);
                    variable[$efront_string_defs][$efront_string_push](info);
                    this[$efront_string_implic][$efront_string_set][$efront_string_set](name, variable);
                    this[$efront_string_implic][$efront_string_variab][$efront_string_push](variable)
                } else {
                    variable = this[$efront_string_implic][$efront_string_set][$efront_string_get](name);
                    variable[$efront_string_identi1][$efront_string_push](node);
                    variable[$efront_string_defs][$efront_string_push](info)
                }
            }
        };
        Scope[$efront_string_protot][$efront_string___defi] = function __define(node, info) {
            var name, variable;
            if (node && node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                name = node[$efront_string_name];
                if (!this[$efront_string_set][$efront_string_has](name)) {
                    variable = new Variable(name, this);
                    variable[$efront_string_identi1][$efront_string_push](node);
                    variable[$efront_string_defs][$efront_string_push](info);
                    this[$efront_string_set][$efront_string_set](name, variable);
                    this[$efront_string_variab][$efront_string_push](variable)
                } else {
                    variable = this[$efront_string_set][$efront_string_get](name);
                    variable[$efront_string_identi1][$efront_string_push](node);
                    variable[$efront_string_defs][$efront_string_push](info)
                }
            }
        };
        Scope[$efront_string_protot][$efront_string___refe] = function __referencing(node, assign, writeExpr, maybeImplicitGlobal) {
            var ref;
            if (node && node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                ref = new Reference(node, this, assign || Reference[$efront_string_READ], writeExpr, maybeImplicitGlobal);
                this[$efront_string_refere][$efront_string_push](ref);
                this[$efront_string_left][$efront_string_push](ref)
            }
        };
        Scope[$efront_string_protot][$efront_string___dete] = function __detectEval() {
            var current;
            current = this;
            this[$efront_string_direct2] = true;
            do {
                current[$efront_string_dynami] = true;
                current = current[$efront_string_upper]
            } while (current)
        };
        Scope[$efront_string_protot][$efront_string___dete1] = function __detectThis() {
            this[$efront_string_thisFo] = true
        };
        Scope[$efront_string_protot][$efront_string___isCl] = function isClosed() {
            return this[$efront_string_left] === null
        };
        Scope[$efront_string_protot][$efront_string_resolv1] = function resolve(ident) {
            var ref, i, iz;
            assert(this[$efront_string___isCl](), $efront_string_scope_);
            assert(ident[$efront_string_type] === Syntax[$efront_string_Identi], $efront_string_target);
            for (i = 0, iz = this[$efront_string_refere][$efront_string_length]; i < iz; ++i) {
                ref = this[$efront_string_refere][i];
                if (ref[$efront_string_identi] === ident) {
                    return ref
                }
            }
            return null
        };
        Scope[$efront_string_protot][$efront_string_isStat] = function isStatic() {
            return !this[$efront_string_dynami]
        };
        Scope[$efront_string_protot][$efront_string_isArgu] = function isArgumentsMaterialized() {
            var variable;
            if (this[$efront_string_type] !== $efront_string_functi) {
                return true
            }
            if (!this[$efront_string_isStat]()) {
                return true
            }
            variable = this[$efront_string_set][$efront_string_get]($efront_string_argume);
            assert(variable, $efront_string_always);
            return variable[$efront_string_tainte] || variable[$efront_string_refere][$efront_string_length] !== 0
        };
        Scope[$efront_string_protot][$efront_string_isThis] = function isThisMaterialized() {
            if (this[$efront_string_type] !== $efront_string_functi) {
                return true
            }
            if (!this[$efront_string_isStat]()) {
                return true
            }
            return this[$efront_string_thisFo]
        };
        Scope[$efront_string_mangle] = $efront_string___$esc;
        Scope[$efront_string_protot][$efront_string_attach2] = function attach() {
            if (!this[$efront_string_functi1]) {
                this[$efront_string_block][Scope[$efront_string_mangle]] = this
            }
        };
        Scope[$efront_string_protot][$efront_string_detach] = function detach() {
            if (!this[$efront_string_functi1]) {
                delete this[$efront_string_block][Scope[$efront_string_mangle]]
            }
        };
        Scope[$efront_string_protot][$efront_string_isUsed] = function (name) {
            if (this[$efront_string_set][$efront_string_has](name)) {
                return true
            }
            for (var i = 0, iz = this[$efront_string_throug][$efront_string_length]; i < iz; ++i) {
                if (this[$efront_string_throug][i][$efront_string_identi][$efront_string_name] === name) {
                    return true
                }
            }
            return false
        };
        function ScopeManager(scopes) {
            this[$efront_string_scopes] = scopes;
            this[$efront_string_attach3] = false
        }
        ScopeManager[$efront_string_protot][$efront_string___get] = function __get(node) {
            var i, iz, scope;
            if (this[$efront_string_attach3]) {
                return node[Scope[$efront_string_mangle]] || null
            }
            if (Scope[$efront_string_isScop](node)) {
                for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i) {
                    scope = this[$efront_string_scopes][i];
                    if (!scope[$efront_string_functi1]) {
                        if (scope[$efront_string_block] === node) {
                            return scope
                        }
                    }
                }
            }
            return null
        };
        ScopeManager[$efront_string_protot][$efront_string_acquir] = function acquire(node) {
            return this[$efront_string___get](node)
        };
        ScopeManager[$efront_string_protot][$efront_string_releas] = function release(node) {
            var scope = this[$efront_string___get](node);
            if (scope) {
                scope = scope[$efront_string_upper];
                while (scope) {
                    if (!scope[$efront_string_functi1]) {
                        return scope
                    }
                    scope = scope[$efront_string_upper]
                }
            }
            return null
        };
        ScopeManager[$efront_string_protot][$efront_string_attach2] = function attach() {
            var i, iz;
            for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i) {
                this[$efront_string_scopes][i][$efront_string_attach2]()
            }
            this[$efront_string_attach3] = true
        };
        ScopeManager[$efront_string_protot][$efront_string_detach] = function detach() {
            var i, iz;
            for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i) {
                this[$efront_string_scopes][i][$efront_string_detach]()
            }
            this[$efront_string_attach3] = false
        };
        Scope[$efront_string_isScop] = function isScopeRequired(node) {
            return Scope[$efront_string_isVari](node) || node[$efront_string_type] === Syntax[$efront_string_WithSt] || node[$efront_string_type] === Syntax[$efront_string_CatchC]
        };
        Scope[$efront_string_isVari] = function isVariableScopeRequired(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]
        };
        function analyze(tree, providedOptions) {
            var _a;
            var resultScopes;
            options = updateDeeply(defaultOptions(), providedOptions);
            resultScopes = scopes = [];
            currentScope = null;
            globalScope = null;
            estraverse[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function enter(node) {
                var _a, _b, _c, _d, _e;
                var i, iz, decl;
                if (Scope[$efront_string_isScop](node)) {
                    new Scope(node, {})
                }
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Assign]:
                    if (node[$efront_string_operat] === $efront_string__4) {
                        currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_WRITE], node[$efront_string_right], !currentScope[$efront_string_isStri] && node[$efront_string_left][$efront_string_name] != null && node)
                    } else {
                        currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_RW], node[$efront_string_right])
                    }
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_ArrayE]:
                    for (i = 0, iz = node[$efront_string_elemen][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___refe](node[$efront_string_elemen][i])
                    }
                    break;
                case Syntax[$efront_string_BlockS]:
                    break;
                case Syntax[$efront_string_Binary]:
                    currentScope[$efront_string___refe](node[$efront_string_left]);
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_BreakS]:
                    break;
                case Syntax[$efront_string_CallEx]:
                    currentScope[$efront_string___refe](node[$efront_string_callee]);
                    for (i = 0, iz = node[$efront_string_argume][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___refe](node[$efront_string_argume][i])
                    }
                    if (!options[$efront_string_ignore] && node[$efront_string_callee][$efront_string_type] === Syntax[$efront_string_Identi] && node[$efront_string_callee][$efront_string_name] === $efront_string_eval) {
                        currentScope[$efront_string_variab1][$efront_string___dete]()
                    }
                    break;
                case Syntax[$efront_string_CatchC]:
                    currentScope[$efront_string___defi](node[$efront_string_param], (_a = {}, _a[$efront_string_type] = Variable[$efront_string_CatchC], _a[$efront_string_name] = node[$efront_string_param], _a[$efront_string_node] = node, _a));
                    break;
                case Syntax[$efront_string_Condit]:
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    currentScope[$efront_string___refe](node[$efront_string_conseq]);
                    currentScope[$efront_string___refe](node[$efront_string_altern]);
                    break;
                case Syntax[$efront_string_Contin]:
                    break;
                case Syntax[$efront_string_Direct]:
                    break;
                case Syntax[$efront_string_DoWhil]:
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    break;
                case Syntax[$efront_string_Debugg]:
                    break;
                case Syntax[$efront_string_EmptyS]:
                    break;
                case Syntax[$efront_string_Expres]:
                    currentScope[$efront_string___refe](node[$efront_string_expres]);
                    break;
                case Syntax[$efront_string_ForSta]:
                    currentScope[$efront_string___refe](node[$efront_string_init]);
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    currentScope[$efront_string___refe](node[$efront_string_update]);
                    break;
                case Syntax[$efront_string_ForInS]:
                    if (node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab]) {
                        currentScope[$efront_string___refe](node[$efront_string_left][$efront_string_declar][0][$efront_string_id], Reference[$efront_string_WRITE], null, false)
                    } else {
                        currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_WRITE], null, !currentScope[$efront_string_isStri] && node[$efront_string_left][$efront_string_name] != null && node)
                    }
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_Functi]:
                    currentScope[$efront_string_upper][$efront_string___defi](node[$efront_string_id], (_b = {}, _b[$efront_string_type] = Variable[$efront_string_Functi2], _b[$efront_string_name] = node[$efront_string_id], _b[$efront_string_node] = node, _b));
                    for (i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___defi](node[$efront_string_params][i], (_c = {}, _c[$efront_string_type] = Variable[$efront_string_Parame], _c[$efront_string_name] = node[$efront_string_params][i], _c[$efront_string_node] = node, _c[$efront_string_index] = i, _c))
                    }
                    break;
                case Syntax[$efront_string_Functi1]:
                    for (i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___defi](node[$efront_string_params][i], (_d = {}, _d[$efront_string_type] = Variable[$efront_string_Parame], _d[$efront_string_name] = node[$efront_string_params][i], _d[$efront_string_node] = node, _d[$efront_string_index] = i, _d))
                    }
                    break;
                case Syntax[$efront_string_Identi]:
                    break;
                case Syntax[$efront_string_IfStat]:
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    break;
                case Syntax[$efront_string_Litera]:
                    break;
                case Syntax[$efront_string_Labele]:
                    break;
                case Syntax[$efront_string_Logica]:
                    currentScope[$efront_string___refe](node[$efront_string_left]);
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_Member]:
                    currentScope[$efront_string___refe](node[$efront_string_object]);
                    if (node[$efront_string_comput]) {
                        currentScope[$efront_string___refe](node[$efront_string_proper])
                    }
                    break;
                case Syntax[$efront_string_NewExp]:
                    currentScope[$efront_string___refe](node[$efront_string_callee]);
                    for (i = 0, iz = node[$efront_string_argume][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___refe](node[$efront_string_argume][i])
                    }
                    break;
                case Syntax[$efront_string_Object]:
                    for (i = 0; i < node[$efront_string_proper1][$efront_string_length]; i++) {
                        if (node[$efront_string_proper1][i][$efront_string_kind] === $efront_string_init) {
                            currentScope[$efront_string___refe](node[$efront_string_proper1][i][$efront_string_value])
                        }
                    }
                    break;
                case Syntax[$efront_string_Progra]:
                    break;
                case Syntax[$efront_string_Proper]:
                    break;
                case Syntax[$efront_string_Return]:
                    currentScope[$efront_string___refe](node[$efront_string_argume1]);
                    break;
                case Syntax[$efront_string_Sequen]:
                    for (i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                        currentScope[$efront_string___refe](node[$efront_string_expres1][i])
                    }
                    break;
                case Syntax[$efront_string_Switch]:
                    currentScope[$efront_string___refe](node[$efront_string_discri]);
                    break;
                case Syntax[$efront_string_Switch1]:
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    break;
                case Syntax[$efront_string_ThisEx]:
                    currentScope[$efront_string_variab1][$efront_string___dete1]();
                    break;
                case Syntax[$efront_string_ThrowS]:
                    currentScope[$efront_string___refe](node[$efront_string_argume1]);
                    break;
                case Syntax[$efront_string_TrySta]:
                    break;
                case Syntax[$efront_string_UnaryE]:
                    currentScope[$efront_string___refe](node[$efront_string_argume1]);
                    break;
                case Syntax[$efront_string_Update]:
                    currentScope[$efront_string___refe](node[$efront_string_argume1], Reference[$efront_string_RW], null);
                    break;
                case Syntax[$efront_string_Variab]:
                    for (i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i) {
                        decl = node[$efront_string_declar][i];
                        currentScope[$efront_string_variab1][$efront_string___defi](decl[$efront_string_id], (_e = {}, _e[$efront_string_type] = Variable[$efront_string_Variab2], _e[$efront_string_name] = decl[$efront_string_id], _e[$efront_string_node] = decl, _e[$efront_string_index] = i, _e[$efront_string_parent] = node, _e));
                        if (decl[$efront_string_init]) {
                            currentScope[$efront_string___refe](decl[$efront_string_id], Reference[$efront_string_WRITE], decl[$efront_string_init], false);
                            currentScope[$efront_string___refe](decl[$efront_string_init])
                        }
                    }
                    break;
                case Syntax[$efront_string_Variab1]:
                    break;
                case Syntax[$efront_string_WhileS]:
                    currentScope[$efront_string___refe](node[$efront_string_test]);
                    break;
                case Syntax[$efront_string_WithSt]:
                    currentScope[$efront_string_upper][$efront_string___refe](node[$efront_string_object]);
                    break
                }
            }, _a[$efront_string_leave] = function leave(node) {
                while (currentScope && node === currentScope[$efront_string_block]) {
                    currentScope[$efront_string___clos]()
                }
            }, _a));
            assert(currentScope === null);
            globalScope = null;
            scopes = null;
            options = null;
            return new ScopeManager(resultScopes)
        }
        exports[$efront_string_versio] = $efront_string_1_0_3;
        exports[$efront_string_Refere] = Reference;
        exports[$efront_string_Variab2] = Variable;
        exports[$efront_string_Scope] = Scope;
        exports[$efront_string_ScopeM] = ScopeManager;
        exports[$efront_string_analyz] = analyze
    }, this)
}],
/** 436 escope */ [1,function(require) {
    return require(435)
}],
/** 437 $efront_string_is */ "is",
/** 438 $efront_string_Unreac */ /** text */ "Unreachable point. logically broken.",
/** 439 $efront_string_loc */ "loc",
/** 440 $efront_string_number */ "number",
/** 441 $efront_string__5 */ "-",
/** 442 $efront_string__6 */ "/",
/** 443 $efront_string_string1 */ "stringRepeat",
/** 444 $efront_string_sameVa */ "sameValue",
/** 445 $efront_string_Array */ "Array",
/** 446 $efront_string_of */ "of",
/** 447 $efront_string_last */ "last",
/** 448 $efront_string_empty */ "empty",
/** 449 $efront_string_Object2 */ "Object",
/** 450 $efront_string_isObje */ "isObject",
/** 451 $efront_string_assert */ "assert",
/** 452 $efront_string_unreac */ "unreachable",
/** 453 $efront_string_isIden3 */ "isIdentifier",
/** 454 $efront_string_moveLo */ "moveLocation",
/** 455 $efront_string_delete1 */ "deleteLocation",
/** 456 $efront_string_conver */ "convertToEmptyStatement",
/** 457 $efront_string_mayBeC */ "mayBeCompletionValue",
/** 458 $efront_string_isNega */ "isNegative",
/** 459 $efront_string_isFunc */ "isFunctionBody",
/** 460 $efront_string_Specia */ "SpecialNode",
/** 461 $efront_string_genera1 */ "generateNegative",
/** 462 $efront_string_genera2 */ "generateUndefined",
/** 463 $efront_string_isUnde */ "isUndefined",
/** 464 $efront_string_genera3 */ "generateNaN",
/** 465 $efront_string_isNaN */ "isNaN",
/** 466 $efront_string_isRefe */ "isReference",
/** 467 $efront_string_canExt */ "canExtractSequence",
/** 468 $efront_string_genera4 */ "generateFromValue",
/** 469 $efront_string_delega */ "delegateVariableDeclarations",
/** 470 $efront_string_isScop1 */ "isScopedDeclaration",
/** 471 common.js */ [1,53,54,16,55,17,165,114,51,334,268,36,269,12,270,271,39,2,3,437,340,341,438,216,210,212,213,77,237,241,240,223,252,278,257,284,439,336,236,244,292,440,261,424,441,294,185,224,442,272,273,242,247,226,56,207,406,366,42,196,262,323,326,263,429,173,192,303,287,47,337,305,432,423,178,239,304,5,347,443,444,445,356,446,447,448,449,450,40,307,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,function(require, Array, Object, RegExp, Error, String, isNaN, undefined, exports, $efront_string_Syntax, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_object, $efront_string_hasOwn, $efront_string_slice, $efront_string_length, $efront_string_is, $efront_string_lastIn, $efront_string___, $efront_string_Unreac, $efront_string_keywor, $efront_string_isKeyw, $efront_string_isRest, $efront_string_isIden2, $efront_string_type, $efront_string_Expres, $efront_string_Functi1, $efront_string_Functi, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_Switch1, $efront_string_conseq, $efront_string_loc, $efront_string_Visito, $efront_string_EmptyS, $efront_string_Litera, $efront_string_value, $efront_string_number, $efront_string_UnaryE, $efront_string_operat, $efront_string__5, $efront_string_argume1, $efront_string_void, $efront_string_Binary, $efront_string__6, $efront_string_left, $efront_string_right, $efront_string_Identi, $efront_string_Member, $efront_string_CallEx, $efront_string_name, $efront_string_eval, $efront_string_resolv1, $efront_string_isStat, $efront_string_delete, $efront_string_typeof, $efront_string_Update, $efront_string_traver, $efront_string_enter, $efront_string_Variab, $efront_string_kind, $efront_string_let, $efront_string_const, $efront_string_declar, $efront_string_init, $efront_string_push, $efront_string_Visito1, $efront_string_Skip, $efront_string_Scope, $efront_string_isVari, $efront_string_var, $efront_string_ForInS, $efront_string_Break, $efront_string_concat, $efront_string_deepCo, $efront_string_string1, $efront_string_sameVa, $efront_string_Array, $efront_string_from, $efront_string_of, $efront_string_last, $efront_string_empty, $efront_string_Object2, $efront_string_isObje, $efront_string_has, $efront_string_replac, $efront_string_assert, $efront_string_unreac, $efront_string_isIden3, $efront_string_moveLo, $efront_string_delete1, $efront_string_conver, $efront_string_mayBeC, $efront_string_isNega, $efront_string_isFunc, $efront_string_Specia, $efront_string_genera1, $efront_string_genera2, $efront_string_isUnde, $efront_string_genera3, $efront_string_isNaN, $efront_string_isRefe, $efront_string_canExt, $efront_string_genera4, $efront_string_delega, $efront_string_isScop1) {
    return function () {
        'use strict';
        var _a, _b, _c;
        var Syntax, isArray, arrayFrom, arrayOf, has, sameValue, estraverse, escope, esutils;
        estraverse = require(350);
        escope = require(436);
        esutils = require(349);
        Syntax = estraverse[$efront_string_Syntax];
        isArray = Array[$efront_string_isArra];
        if (!isArray) {
            isArray = function isArray(array) {
                return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
            }
        }
        function isObject(obj) {
            return typeof obj === $efront_string_object && obj !== null
        }
        has = function () {
            var method = {}[$efront_string_hasOwn];
            return function has(obj, prop) {
                return method[$efront_string_call](obj, prop)
            }
        }();
        arrayFrom = function () {
            var slice = Array[$efront_string_protot][$efront_string_slice];
            return function arrayFrom(array) {
                return slice[$efront_string_call](array)
            }
        }();
        arrayOf = function () {
            var slice = Array[$efront_string_protot][$efront_string_slice];
            return function arrayOf() {
                return slice[$efront_string_call](arguments)
            }
        }();
        function arrayLast(array) {
            return array[array[$efront_string_length] - 1]
        }
        function arrayEmpty(array) {
            return array[$efront_string_length] === 0
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str) {
                if (num & 1) {
                    result += str
                }
            }
            return result
        }
        if (Object[$efront_string_is]) {
            sameValue = Object[$efront_string_is]
        } else {
            sameValue = function sameValue(x, y) {
                if (x === y) {
                    return x !== 0 || 1 / x === 1 / y
                }
                return x !== x && y !== y
            }
        }
        function deepCopy(obj) {
            function deepCopyInternal(obj, result) {
                var key, val;
                for (key in obj) {
                    if (key[$efront_string_lastIn]($efront_string___, 0) === 0) {
                        continue
                    }
                    if (obj[$efront_string_hasOwn](key)) {
                        val = obj[key];
                        if (typeof val === $efront_string_object && val !== null) {
                            if (val instanceof RegExp) {
                                val = new RegExp(val)
                            } else {
                                val = deepCopyInternal(val, isArray(val) ? [] : {})
                            }
                        }
                        result[key] = val
                    }
                }
                return result
            }
            return deepCopyInternal(obj, isArray(obj) ? [] : {})
        }
        function assert(cond, text) {
            if (!cond) {
                throw new Error(text)
            }
        }
        function unreachable() {
            throw new Error($efront_string_Unreac)
        }
        function isIdentifier(name) {
            if (esutils[$efront_string_keywor][$efront_string_isKeyw](name, true) || esutils[$efront_string_keywor][$efront_string_isRest](name)) {
                return false
            }
            return esutils[$efront_string_keywor][$efront_string_isIden2](name)
        }
        function mayBeCompletionValue(node, ancestors) {
            var i, ancestor;
            if (node[$efront_string_type] !== Syntax[$efront_string_Expres]) {
                return true
            }
            for (i = ancestors[$efront_string_length] - 1; i >= 0; --i, node = ancestor) {
                ancestor = ancestors[i];
                switch (ancestor[$efront_string_type]) {
                case Syntax[$efront_string_Functi1]:
                case Syntax[$efront_string_Functi]:
                    return false;
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    if (arrayLast(ancestor[$efront_string_body]) !== node) {
                        return false
                    }
                    break;
                case Syntax[$efront_string_Switch1]:
                    if (arrayLast(ancestor[$efront_string_conseq]) !== node) {
                        return false
                    }
                    break
                }
            }
            return true
        }
        function moveLocation(from, to) {
            if (from[$efront_string_loc] == null) {
                return to
            }
            to[$efront_string_loc] = deepCopy(from[$efront_string_loc]);
            return to
        }
        function deleteLocation(node) {
            if (node[$efront_string_hasOwn]($efront_string_loc)) {
                return delete node[$efront_string_loc]
            }
            return false
        }
        function convertToEmptyStatement(node) {
            var i, iz, keys;
            keys = estraverse[$efront_string_Visito][node[$efront_string_type]];
            for (i = 0, iz = keys[$efront_string_length]; i < iz; ++i) {
                delete node[keys[i]]
            }
            node[$efront_string_type] = Syntax[$efront_string_EmptyS];
            return node
        }
        function isNegative(value) {
            return value === value && (value < 0 || value === 0 && 1 / value < 0)
        }
        function isFunctionBody(node, parent) {
            return node[$efront_string_type] === Syntax[$efront_string_BlockS] && (parent[$efront_string_type] === Syntax[$efront_string_Functi] || parent[$efront_string_type] === Syntax[$efront_string_Functi1])
        }
        function isNumberLiteral(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_value] === $efront_string_number
        }
        function isOptimizedArgument(argument) {
            return isNumberLiteral(argument) && String(argument[$efront_string_value])[$efront_string_length] === 1
        }
        function generateNegativeNode(value, node) {
            var _a, _b;
            var result;
            result = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__5, _a[$efront_string_argume1] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = -value, _b), _a);
            return node ? moveLocation(node, result) : result
        }
        function isNegativeNode(node) {
            return node[$efront_string_type] === Syntax[$efront_string_UnaryE] && node[$efront_string_operat] === $efront_string__5 && isNumberLiteral(node[$efront_string_argume1])
        }
        function generateUndefined(node) {
            var _a, _b;
            var result = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _a[$efront_string_argume1] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _b), _a);
            return node ? moveLocation(node, result) : result
        }
        function isUndefined(node) {
            return node[$efront_string_type] === Syntax[$efront_string_UnaryE] && node[$efront_string_operat] === $efront_string_void && isOptimizedArgument(node[$efront_string_argume1])
        }
        function generateNaN(node) {
            var _a, _b, _c;
            var result = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Binary], _a[$efront_string_operat] = $efront_string__6, _a[$efront_string_left] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _b), _a[$efront_string_right] = (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = 0, _c), _a);
            return node ? moveLocation(node, result) : result
        }
        function isNaNNode(node) {
            if (node[$efront_string_type] === Syntax[$efront_string_Binary]) {
                if (isOptimizedArgument(node[$efront_string_left]) && isOptimizedArgument(node[$efront_string_right])) {
                    return node[$efront_string_left][$efront_string_value] === 0 && node[$efront_string_right][$efront_string_value] === 0
                }
            }
            return false
        }
        function generateFromValue(value) {
            var _a;
            if (typeof value === $efront_string_number) {
                if (isNaN(value)) {
                    return generateNaN()
                }
                if (isNegative(value)) {
                    return generateNegativeNode(value)
                }
            }
            if (value === undefined) {
                return generateUndefined()
            }
            return _a = {}, _a[$efront_string_type] = Syntax[$efront_string_Litera], _a[$efront_string_value] = value, _a
        }
        function isReference(node) {
            var type = node[$efront_string_type];
            return type === Syntax[$efront_string_Identi] || type === Syntax[$efront_string_Member]
        }
        function canExtractSequence(last, parent, scope) {
            var ref;
            if (parent[$efront_string_type] === Syntax[$efront_string_CallEx]) {
                if (last[$efront_string_type] === Syntax[$efront_string_Identi]) {
                    if (last[$efront_string_name] === $efront_string_eval) {
                        return false
                    }
                    ref = scope[$efront_string_resolv1](last);
                    return ref && ref[$efront_string_isStat]()
                }
                return last[$efront_string_type] !== Syntax[$efront_string_Member]
            } else if (parent[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                if (parent[$efront_string_operat] === $efront_string_delete) {
                    return !isReference(last)
                } else if (parent[$efront_string_operat] === $efront_string_typeof) {
                    if (last[$efront_string_type] === Syntax[$efront_string_Identi]) {
                        ref = scope[$efront_string_resolv1](last);
                        return ref && ref[$efront_string_isStat]()
                    }
                }
            } else if (parent[$efront_string_type] === Syntax[$efront_string_Update]) {
                return !isReference(last)
            }
            return true
        }
        function delegateVariableDeclarations(stmt, func) {
            var _a, _b, _c;
            var decls, target;
            decls = [];
            estraverse[$efront_string_traver](stmt, (_a = {}, _a[$efront_string_enter] = function (node) {
                var i, iz, decl;
                if (node[$efront_string_type] === Syntax[$efront_string_Variab]) {
                    if (node[$efront_string_kind] === $efront_string_let || node[$efront_string_kind] === $efront_string_const) {
                        return
                    }
                    for (i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i) {
                        decl = node[$efront_string_declar][i];
                        delete decl[$efront_string_init];
                        decls[$efront_string_push](decl)
                    }
                    return estraverse[$efront_string_Visito1][$efront_string_Skip]
                } else if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    return estraverse[$efront_string_Visito1][$efront_string_Skip]
                }
            }, _a));
            if (!decls[$efront_string_length]) {
                return null
            }
            target = null;
            estraverse[$efront_string_traver](func[$efront_string_body], (_b = {}, _b[$efront_string_enter] = function (node, parent) {
                if (node === stmt) {
                    return estraverse[$efront_string_Visito1][$efront_string_Skip]
                } else if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    return estraverse[$efront_string_Visito1][$efront_string_Skip]
                } else if (node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var) {
                    if (parent[$efront_string_type] !== Syntax[$efront_string_ForInS]) {
                        target = node;
                        return estraverse[$efront_string_Visito1][$efront_string_Break]
                    }
                }
            }, _b));
            if (target) {
                target[$efront_string_declar] = target[$efront_string_declar][$efront_string_concat](decls);
                return null
            } else {
                return _c = {}, _c[$efront_string_type] = Syntax[$efront_string_Variab], _c[$efront_string_kind] = $efront_string_var, _c[$efront_string_declar] = decls, _c
            }
        }
        function isScopedDeclaration(node) {
            if (node[$efront_string_type] === Syntax[$efront_string_Variab] && (node[$efront_string_kind] === $efront_string_let || node[$efront_string_kind] === $efront_string_const)) {
                return true
            } else if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                return true
            }
            return false
        }
        exports[$efront_string_deepCo] = deepCopy;
        exports[$efront_string_string1] = stringRepeat;
        exports[$efront_string_sameVa] = sameValue;
        exports[$efront_string_Array] = (_a = {}, _a[$efront_string_isArra] = isArray, _a[$efront_string_from] = arrayFrom, _a[$efront_string_of] = arrayOf, _a[$efront_string_last] = arrayLast, _a[$efront_string_empty] = arrayEmpty, _a);
        exports[$efront_string_Object2] = (_b = {}, _b[$efront_string_isObje] = isObject, _b[$efront_string_has] = has, _b);
        exports[$efront_string_Syntax] = Syntax;
        exports[$efront_string_traver] = estraverse[$efront_string_traver];
        exports[$efront_string_replac] = estraverse[$efront_string_replac];
        exports[$efront_string_Visito] = estraverse[$efront_string_Visito];
        exports[$efront_string_Visito1] = estraverse[$efront_string_Visito1];
        exports[$efront_string_assert] = assert;
        exports[$efront_string_unreac] = unreachable;
        exports[$efront_string_isIden3] = isIdentifier;
        exports[$efront_string_moveLo] = moveLocation;
        exports[$efront_string_delete1] = deleteLocation;
        exports[$efront_string_conver] = convertToEmptyStatement;
        exports[$efront_string_mayBeC] = mayBeCompletionValue;
        exports[$efront_string_isNega] = isNegative;
        exports[$efront_string_isFunc] = isFunctionBody;
        exports[$efront_string_Specia] = (_c = {}, _c[$efront_string_genera1] = generateNegativeNode, _c[$efront_string_isNega] = isNegativeNode, _c[$efront_string_genera2] = generateUndefined, _c[$efront_string_isUnde] = isUndefined, _c[$efront_string_genera3] = generateNaN, _c[$efront_string_isNaN] = isNaNNode, _c[$efront_string_isRefe] = isReference, _c[$efront_string_canExt] = canExtractSequence, _c[$efront_string_genera4] = generateFromValue, _c);
        exports[$efront_string_delega] = delegateVariableDeclarations;
        exports[$efront_string_isScop1] = isScopedDeclaration
    }()
}],
/** 472 $efront_string_annota */ "annotate-directive",
/** 473 $efront_string__7 */ "\\",
/** 474 $efront_string__8 */ "\b",
/** 475 $efront_string_b */ "b",
/** 476 $efront_string__9 */ /** text */ "\f",
/** 477 $efront_string_f */ "f",
/** 478 $efront_string__10 */ /** text */ "\t",
/** 479 $efront_string_t */ "t",
/** 480 $efront_string_u */ "u",
/** 481 $efront_string_0000 */ "0000",
/** 482 $efront_string_1 */ "0123456789",
/** 483 $efront_string__11 */ /** text */ "\u000b",
/** 484 $efront_string_v */ "v",
/** 485 $efront_string_x */ "x",
/** 486 $efront_string_00 */ "00",
/** 487 $efront_string__12 */ /** text */ "\n",
/** 488 $efront_string_n */ "n",
/** 489 $efront_string__13 */ /** text */ "\r",
/** 490 $efront_string_r */ "r",
/** 491 $efront_string__14 */ /** text */ "\u2028",
/** 492 $efront_string_u2028 */ "u2028",
/** 493 $efront_string__15 */ /** text */ "\u2029",
/** 494 $efront_string_u2029 */ "u2029",
/** 495 $efront_string_Incorr */ /** text */ "Incorrectly classified character",
/** 496 $efront_string_string2 */ "stringToArray",
/** 497 $efront_string__16 */ "'",
/** 498 $efront_string__17 */ "\\'",
/** 499 $efront_string__18 */ /** text */ "\\\n\r\u2028\u2029",
/** 500 $efront_string__19 */ /** text */ " ",
/** 501 $efront_string__20 */ "~",
/** 502 $efront_string_destru */ "destructive",
/** 503 $efront_string_pathNa */ "pathName",
/** 504 $efront_string_passNa */ "passName",
/** 505 annotate-directive.js */ [1,55,15,472,334,77,237,286,244,292,10,209,269,473,474,475,476,477,478,479,480,481,2,3,342,482,9,483,484,485,486,487,488,489,490,491,492,493,494,495,34,496,497,498,499,500,501,37,502,503,347,323,326,252,223,241,240,278,234,383,353,45,504,13,function(require, Error, module, $efront_string_annota, $efront_string_Syntax, $efront_string_type, $efront_string_Expres, $efront_string_expres, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_charCo, $efront_string_toStri, $efront_string__7, $efront_string__8, $efront_string_b, $efront_string__9, $efront_string_f, $efront_string__10, $efront_string_t, $efront_string_u, $efront_string_0000, $efront_string_slice, $efront_string_length, $efront_string_0, $efront_string_1, $efront_string_indexO, $efront_string__11, $efront_string_v, $efront_string_x, $efront_string_00, $efront_string__12, $efront_string_n, $efront_string__13, $efront_string_r, $efront_string__14, $efront_string_u2028, $efront_string__15, $efront_string_u2029, $efront_string_Incorr, $efront_string_undefi, $efront_string_string2, $efront_string__16, $efront_string__17, $efront_string__18, $efront_string__19, $efront_string__20, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_Progra, $efront_string_BlockS, $efront_string_Functi1, $efront_string_Functi, $efront_string_body, $efront_string_Direct, $efront_string_raw, $efront_string_direct1, $efront_string_substr, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common;
        Name = $efront_string_annota;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isDirective(stmt) {
            var expr;
            if (stmt[$efront_string_type] === Syntax[$efront_string_Expres]) {
                expr = stmt[$efront_string_expres];
                if (expr[$efront_string_type] === Syntax[$efront_string_Litera] && typeof expr[$efront_string_value] === $efront_string_string) {
                    return true
                }
            }
            return false
        }
        function escapeAllowedCharacter(ch, next) {
            var code = ch[$efront_string_charCo](0), hex = code[$efront_string_toStri](16), result = $efront_string__7;
            switch (ch) {
            case $efront_string__8:
                result += $efront_string_b;
                break;
            case $efront_string__9:
                result += $efront_string_f;
                break;
            case $efront_string__10:
                result += $efront_string_t;
                break;
            default:
                if (code > 255) {
                    result += $efront_string_u + $efront_string_0000[$efront_string_slice](hex[$efront_string_length]) + hex
                } else if (ch === $efront_string_0 && $efront_string_1[$efront_string_indexO](next) < 0) {
                    result += $efront_string_0
                } else if (ch === $efront_string__11) {
                    result += $efront_string_v
                } else {
                    result += $efront_string_x + $efront_string_00[$efront_string_slice](hex[$efront_string_length]) + hex
                }
                break
            }
            return result
        }
        function escapeDisallowedCharacter(ch) {
            var result = $efront_string__7;
            switch (ch) {
            case $efront_string__7:
                result += $efront_string__7;
                break;
            case $efront_string__12:
                result += $efront_string_n;
                break;
            case $efront_string__13:
                result += $efront_string_r;
                break;
            case $efront_string__14:
                result += $efront_string_u2028;
                break;
            case $efront_string__15:
                result += $efront_string_u2029;
                break;
            default:
                throw new Error($efront_string_Incorr)
            }
            return result
        }
        function escapeString(str) {
            var result = '', i, len, ch;
            if (typeof str[0] === $efront_string_undefi) {
                str = common[$efront_string_string2](str)
            }
            for (i = 0, len = str[$efront_string_length]; i < len; i += 1) {
                ch = str[i];
                if (ch === $efront_string__16) {
                    result += $efront_string__17;
                    continue
                } else if ($efront_string__18[$efront_string_indexO](ch) >= 0) {
                    result += escapeDisallowedCharacter(ch);
                    continue
                } else if (!(ch >= $efront_string__19 && ch <= $efront_string__20)) {
                    result += escapeAllowedCharacter(ch, str[i + 1]);
                    continue
                }
                result += ch
            }
            return result
        }
        function annotateDirective(tree, options) {
            var _a, _b;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node, parent) {
                var stmt, i, iz;
                if (!(node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_BlockS] && (parent[$efront_string_type] === Syntax[$efront_string_Functi1] || parent[$efront_string_type] === Syntax[$efront_string_Functi]))) {
                    return
                }
                for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    stmt = node[$efront_string_body][i];
                    if (isDirective(stmt)) {
                        stmt[$efront_string_type] = Syntax[$efront_string_Direct];
                        if (stmt[$efront_string_expres][$efront_string_raw]) {
                            stmt[$efront_string_direct1] = stmt[$efront_string_expres][$efront_string_raw][$efront_string_substr](1, stmt[$efront_string_expres][$efront_string_raw][$efront_string_length] - 1);
                            stmt[$efront_string_value] = stmt[$efront_string_expres][$efront_string_value];
                            stmt[$efront_string_raw] = stmt[$efront_string_expres][$efront_string_raw]
                        } else {
                            stmt[$efront_string_direct1] = escapeString(stmt[$efront_string_expres][$efront_string_value]);
                            stmt[$efront_string_value] = stmt[$efront_string_expres][$efront_string_value];
                            stmt[$efront_string_raw] = $efront_string__16 + stmt[$efront_string_direct1] + $efront_string__16
                        }
                        delete stmt[$efront_string_expres]
                    } else {
                        return
                    }
                }
            }, _b));
            return result
        }
        annotateDirective[$efront_string_passNa] = Name;
        module[$efront_string_export] = annotateDirective
    }()
}],
/** 506 $efront_string__21 */ "!",
/** 507 $efront_string__22 */ "||",
/** 508 $efront_string__23 */ "&&",
/** 509 $efront_string__24 */ "+",
/** 510 $efront_string__25 */ "|",
/** 511 $efront_string__26 */ "^",
/** 512 $efront_string__27 */ "&",
/** 513 $efront_string__28 */ "==",
/** 514 $efront_string__29 */ "!=",
/** 515 $efront_string__30 */ "===",
/** 516 $efront_string__31 */ "!==",
/** 517 $efront_string__32 */ "<",
/** 518 $efront_string__33 */ ">",
/** 519 $efront_string__34 */ "<=",
/** 520 $efront_string__35 */ ">=",
/** 521 $efront_string__36 */ "<<",
/** 522 $efront_string__37 */ ">>",
/** 523 $efront_string__38 */ ">>>",
/** 524 $efront_string__39 */ "%",
/** 525 $efront_string_consta */ "constant",
/** 526 $efront_string_doBina */ "doBinary",
/** 527 $efront_string_doUnar */ "doUnary",
/** 528 $efront_string_doLogi */ "doLogical",
/** 529 $efront_string_evalua */ "evaluate",
/** 530 $efront_string_isCons */ "isConstant",
/** 531 $efront_string_hasSid */ "hasSideEffect",
/** 532 $efront_string_boolea */ "booleanCondition",
/** 533 evaluator.js */ [1,114,51,334,77,244,292,271,261,424,185,42,506,294,224,176,206,272,273,246,452,507,508,509,441,501,196,510,511,512,513,514,515,516,517,518,519,520,521,522,523,90,442,524,525,526,527,528,529,530,219,220,274,3,226,231,22,284,285,241,242,406,366,247,249,250,293,253,255,295,258,262,531,445,447,532,function(require, undefined, exports, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_object, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_delete, $efront_string__21, $efront_string_argume1, $efront_string_Binary, $efront_string_in, $efront_string_instan, $efront_string_left, $efront_string_right, $efront_string_Logica, $efront_string_unreac, $efront_string__22, $efront_string__23, $efront_string__24, $efront_string__5, $efront_string__20, $efront_string_typeof, $efront_string__25, $efront_string__26, $efront_string__27, $efront_string__28, $efront_string__29, $efront_string__30, $efront_string__31, $efront_string__32, $efront_string__33, $efront_string__34, $efront_string__35, $efront_string__36, $efront_string__37, $efront_string__38, $efront_string__2, $efront_string__6, $efront_string__39, $efront_string_consta, $efront_string_doBina, $efront_string_doUnar, $efront_string_doLogi, $efront_string_evalua, $efront_string_isCons, $efront_string_Assign, $efront_string_ArrayE, $efront_string_elemen, $efront_string_length, $efront_string_CallEx, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_Functi1, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_proper1, $efront_string_Proper, $efront_string_Sequen, $efront_string_expres1, $efront_string_ThisEx, $efront_string_Update, $efront_string_hasSid, $efront_string_Array, $efront_string_last, $efront_string_boolea) {
    return function () {
        'use strict';
        var _a;
        var Syntax, common;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isConstant(node, allowRegExp) {
            if (node[$efront_string_type] === Syntax[$efront_string_Litera]) {
                if (typeof node[$efront_string_value] === $efront_string_object && node[$efront_string_value] !== null) {
                    return allowRegExp
                }
                return true
            }
            if (node[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                if (node[$efront_string_operat] === $efront_string_void || node[$efront_string_operat] === $efront_string_delete || node[$efront_string_operat] === $efront_string__21) {
                    return isConstant(node[$efront_string_argume1], true)
                }
                return isConstant(node[$efront_string_argume1], false)
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Binary]) {
                if (node[$efront_string_operat] === $efront_string_in || node[$efront_string_operat] === $efront_string_instan) {
                    return false
                }
                return isConstant(node[$efront_string_left], false) && isConstant(node[$efront_string_right], false)
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Logica]) {
                return isConstant(node[$efront_string_left], true) && isConstant(node[$efront_string_right], true)
            }
            return false
        }
        function getConstant(node) {
            if (node[$efront_string_type] === Syntax[$efront_string_Litera]) {
                return node[$efront_string_value]
            }
            if (node[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                return doUnary(node[$efront_string_operat], getConstant(node[$efront_string_argume1]))
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Binary]) {
                return doBinary(node[$efront_string_operat], getConstant(node[$efront_string_left]), getConstant(node[$efront_string_right]))
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Logica]) {
                return doLogical(node[$efront_string_operat], getConstant(node[$efront_string_left]), getConstant(node[$efront_string_right]))
            }
            common[$efront_string_unreac]()
        }
        function doLogical(operator, left, right) {
            if (operator === $efront_string__22) {
                return left || right
            }
            if (operator === $efront_string__23) {
                return left && right
            }
            common[$efront_string_unreac]()
        }
        function doUnary(operator, argument) {
            switch (operator) {
            case $efront_string__24:
                return +argument;
            case $efront_string__5:
                return -argument;
            case $efront_string__20:
                return ~argument;
            case $efront_string__21:
                return !argument;
            case $efront_string_delete:
                return true;
            case $efront_string_void:
                return undefined;
            case $efront_string_typeof:
                return typeof argument
            }
            common[$efront_string_unreac]()
        }
        function doBinary(operator, left, right) {
            switch (operator) {
            case $efront_string__25:
                return left | right;
            case $efront_string__26:
                return left ^ right;
            case $efront_string__27:
                return left & right;
            case $efront_string__28:
                return left == right;
            case $efront_string__29:
                return left != right;
            case $efront_string__30:
                return left === right;
            case $efront_string__31:
                return left !== right;
            case $efront_string__32:
                return left < right;
            case $efront_string__33:
                return left > right;
            case $efront_string__34:
                return left <= right;
            case $efront_string__35:
                return left >= right;
            case $efront_string__36:
                return left << right;
            case $efront_string__37:
                return left >> right;
            case $efront_string__38:
                return left >>> right;
            case $efront_string__24:
                return left + right;
            case $efront_string__5:
                return left - right;
            case $efront_string__2:
                return left * right;
            case $efront_string__6:
                return left / right;
            case $efront_string__39:
                return left % right
            }
            common[$efront_string_unreac]()
        }
        exports[$efront_string_consta] = (_a = {}, _a[$efront_string_doBina] = doBinary, _a[$efront_string_doUnar] = doUnary, _a[$efront_string_doLogi] = doLogical, _a[$efront_string_evalua] = getConstant, _a[$efront_string_isCons] = isConstant, _a);
        function hasSideEffect(expr, scope) {
            function visit(expr) {
                var i, iz, ref;
                switch (expr[$efront_string_type]) {
                case Syntax[$efront_string_Assign]:
                    return true;
                case Syntax[$efront_string_ArrayE]:
                    for (i = 0, iz = expr[$efront_string_elemen][$efront_string_length]; i < iz; ++i) {
                        if (expr[$efront_string_elemen][i] !== null && visit(expr[$efront_string_elemen][i])) {
                            return true
                        }
                    }
                    return false;
                case Syntax[$efront_string_Binary]:
                    return !isConstant(expr);
                case Syntax[$efront_string_CallEx]:
                    return true;
                case Syntax[$efront_string_Condit]:
                    return visit(expr[$efront_string_test]) || visit(expr[$efront_string_conseq]) || visit(expr[$efront_string_altern]);
                case Syntax[$efront_string_Functi1]:
                    return false;
                case Syntax[$efront_string_Identi]:
                    ref = scope[$efront_string_resolv1](expr);
                    if (ref && ref[$efront_string_isStat]()) {
                        return false
                    }
                    return true;
                case Syntax[$efront_string_Litera]:
                    return false;
                case Syntax[$efront_string_Logica]:
                    return visit(expr[$efront_string_left]) || visit(expr[$efront_string_right]);
                case Syntax[$efront_string_Member]:
                    return true;
                case Syntax[$efront_string_NewExp]:
                    return true;
                case Syntax[$efront_string_Object]:
                    for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i) {
                        if (visit(expr[$efront_string_proper1][i])) {
                            return true
                        }
                    }
                    return false;
                case Syntax[$efront_string_Proper]:
                    return visit(expr[$efront_string_value]);
                case Syntax[$efront_string_Sequen]:
                    for (i = 0, iz = expr[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                        if (visit(expr[$efront_string_expres1][i])) {
                            return true
                        }
                    }
                    return false;
                case Syntax[$efront_string_ThisEx]:
                    return false;
                case Syntax[$efront_string_UnaryE]:
                    if (expr[$efront_string_operat] === $efront_string_void || expr[$efront_string_operat] === $efront_string_delete || expr[$efront_string_operat] === $efront_string_typeof || expr[$efront_string_operat] === $efront_string__21) {
                        return visit(expr[$efront_string_argume1])
                    }
                    return !isConstant(expr);
                case Syntax[$efront_string_Update]:
                    return true
                }
                return true
            }
            return visit(expr)
        }
        exports[$efront_string_hasSid] = hasSideEffect;
        function booleanCondition(expr) {
            var ret;
            switch (expr[$efront_string_type]) {
            case Syntax[$efront_string_Assign]:
                return booleanCondition(expr[$efront_string_right]);
            case Syntax[$efront_string_ArrayE]:
                return true;
            case Syntax[$efront_string_Binary]:
                if (isConstant(expr)) {
                    return !!getConstant(expr)
                }
                return null;
            case Syntax[$efront_string_CallEx]:
                return null;
            case Syntax[$efront_string_Condit]:
                ret = booleanCondition(expr[$efront_string_test]);
                if (ret === true) {
                    return booleanCondition(expr[$efront_string_conseq])
                }
                if (ret === false) {
                    return booleanCondition(expr[$efront_string_altern])
                }
                ret = booleanCondition(expr[$efront_string_conseq]);
                if (ret === booleanCondition(expr[$efront_string_altern])) {
                    return ret
                }
                return null;
            case Syntax[$efront_string_Functi1]:
                return true;
            case Syntax[$efront_string_Identi]:
                return null;
            case Syntax[$efront_string_Litera]:
                return !!getConstant(expr);
            case Syntax[$efront_string_Logica]:
                if (expr[$efront_string_operat] === $efront_string__23) {
                    ret = booleanCondition(expr[$efront_string_left]);
                    if (ret === null) {
                        return null
                    }
                    if (!ret) {
                        return false
                    }
                    return booleanCondition(expr[$efront_string_right])
                } else {
                    ret = booleanCondition(expr[$efront_string_left]);
                    if (ret === null) {
                        return null
                    }
                    if (ret) {
                        return true
                    }
                    return booleanCondition(expr[$efront_string_right])
                }
                return null;
            case Syntax[$efront_string_Member]:
                return null;
            case Syntax[$efront_string_NewExp]:
                return true;
            case Syntax[$efront_string_Object]:
                return true;
            case Syntax[$efront_string_Proper]:
                common[$efront_string_unreac]();
                return null;
            case Syntax[$efront_string_Sequen]:
                return booleanCondition(common[$efront_string_Array][$efront_string_last](expr[$efront_string_expres1]));
            case Syntax[$efront_string_ThisEx]:
                return null;
            case Syntax[$efront_string_UnaryE]:
                if (expr[$efront_string_operat] === $efront_string_void) {
                    return false
                }
                if (expr[$efront_string_operat] === $efront_string_typeof) {
                    return true
                }
                if (expr[$efront_string_operat] === $efront_string__21) {
                    ret = booleanCondition(expr[$efront_string_argume1]);
                    if (ret === null) {
                        return null
                    }
                    return !ret
                }
                if (isConstant(expr)) {
                    return !!getConstant(expr)
                }
                return null;
            case Syntax[$efront_string_Update]:
                return null
            }
            return null
        }
        exports[$efront_string_boolea] = booleanCondition
    }()
}],
/** 534 query.js */ [1,51,37,3,41,451,function(require, exports, $efront_string_get, $efront_string_length, $efront_string_set, $efront_string_assert) {
    return function () {
        'use strict';
        var common;
        common = require(471);
        exports[$efront_string_get] = function get(root, query) {
            var i, iz, name, node;
            node = root;
            for (i = 0, iz = query[$efront_string_length]; i < iz; ++i) {
                name = query[i];
                node = node[name]
            }
            return node
        };
        exports[$efront_string_set] = function set(root, query, value) {
            var i, iz, name, node;
            common[$efront_string_assert](query[$efront_string_length] > 0);
            node = root;
            for (i = 0, iz = query[$efront_string_length] - 1; i < iz; ++i) {
                name = query[i];
                node = node[name]
            }
            name = query[i];
            node[name] = value
        }
    }()
}],
/** 535 $efront_string_transf */ "transform-static-to-dynamic-property-access",
/** 536 $efront_string_true */ "true",
/** 537 $efront_string_false */ "false",
/** 538 $efront_string_Infini */ "Infinity",
/** 539 $efront_string_result */ "result",
/** 540 $efront_string_modifi */ "modified",
/** 541 post$transform-static-to-dynamic-property-access.js */ [1,15,535,334,37,502,503,347,323,326,77,247,428,290,242,56,34,454,261,424,185,294,244,292,536,537,538,224,442,272,273,539,540,504,13,function(require, module, $efront_string_transf, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_Identi, $efront_string_name, $efront_string_undefi, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_argume1, $efront_string_Litera, $efront_string_value, $efront_string_true, $efront_string_false, $efront_string_Infini, $efront_string_Binary, $efront_string__6, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common;
        Name = $efront_string_transf;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformStaticToDynamicPropertyAccess(tree, options) {
            var _a, _b, _c;
            var result, modified;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, _b, _c, _d, _e, _f;
                var property;
                if (node[$efront_string_type] !== Syntax[$efront_string_Member] || node[$efront_string_comput] || node[$efront_string_proper][$efront_string_type] !== Syntax[$efront_string_Identi]) {
                    return
                }
                property = node[$efront_string_proper];
                switch (property[$efront_string_name]) {
                case $efront_string_undefi:
                    modified = true;
                    node[$efront_string_comput] = true;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _a[$efront_string_argume1] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _b), _a));
                    break;
                case $efront_string_true:
                case $efront_string_false:
                    modified = true;
                    node[$efront_string_comput] = true;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = property[$efront_string_name] === $efront_string_true, _c));
                    break;
                case $efront_string_Infini:
                    modified = true;
                    node[$efront_string_comput] = true;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Binary], _d[$efront_string_operat] = $efront_string__6, _d[$efront_string_left] = (_e = {}, _e[$efront_string_type] = Syntax[$efront_string_Litera], _e[$efront_string_value] = 1, _e), _d[$efront_string_right] = (_f = {}, _f[$efront_string_type] = Syntax[$efront_string_Litera], _f[$efront_string_value] = 0, _f), _d));
                    break
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformStaticToDynamicPropertyAccess[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformStaticToDynamicPropertyAccess
    }()
}],
/** 542 $efront_string_transf1 */ "transform-infinity",
/** 543 post$transform-infinity.js */ [1,15,542,334,37,502,503,347,307,326,77,244,292,440,454,224,424,442,272,273,539,540,504,13,function(require, module, $efront_string_transf1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_number, $efront_string_moveLo, $efront_string_Binary, $efront_string_operat, $efront_string__6, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common;
        Name = $efront_string_transf1;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformInfinity(tree, options) {
            var _a, _b, _c;
            var result, modified;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, _b, _c;
                if (node[$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_value] === $efront_string_number) {
                    if (node[$efront_string_value] === Infinity) {
                        modified = true;
                        return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Binary], _a[$efront_string_operat] = $efront_string__6, _a[$efront_string_left] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 1, _b), _a[$efront_string_right] = (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = 0, _c), _a))
                    }
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformInfinity[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformInfinity
    }()
}],
/** 544 $efront_string_rewrit */ "rewrite-conditional-expression",
/** 545 post$rewrite-conditional-expression.js */ [1,15,544,334,22,284,285,77,261,424,506,294,37,502,503,347,323,326,231,539,540,504,13,function(require, module, $efront_string_rewrit, $efront_string_Syntax, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_type, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_Condit, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_rewrit;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function rewrite(node) {
            var test, consequent, alternate;
            test = node[$efront_string_test];
            consequent = node[$efront_string_conseq];
            alternate = node[$efront_string_altern];
            if (test[$efront_string_type] === Syntax[$efront_string_UnaryE] && test[$efront_string_operat] === $efront_string__21) {
                modified = true;
                node[$efront_string_conseq] = alternate;
                node[$efront_string_altern] = consequent;
                node[$efront_string_test] = test[$efront_string_argume1]
            }
        }
        function rewriteConditionalExpression(tree, options) {
            var _a, _b, _c;
            var result;
            modified = false;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                if (node[$efront_string_type] === Syntax[$efront_string_Condit]) {
                    rewrite(node)
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        rewriteConditionalExpression[$efront_string_passNa] = Name;
        module[$efront_string_export] = rewriteConditionalExpression
    }()
}],
/** 546 $efront_string_rewrit1 */ "rewrite-boolean",
/** 547 $efront_string_boolea1 */ "boolean",
/** 548 post$rewrite-boolean.js */ [1,15,546,334,77,244,292,547,454,261,424,506,294,224,513,514,272,273,37,502,503,347,307,326,539,540,504,13,function(require, module, $efront_string_rewrit1, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_boolea1, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_Binary, $efront_string__28, $efront_string__29, $efront_string_left, $efront_string_right, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_rewrit1;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isBooleanLiteral(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_value] === $efront_string_boolea1
        }
        function rewrite(node) {
            var _a, _b, _c, _d;
            if (isBooleanLiteral(node)) {
                modified = true;
                return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_argume1] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = +!node[$efront_string_value], _b)), _a))
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Binary] && node[$efront_string_operat] === $efront_string__28 || node[$efront_string_operat] === $efront_string__29) {
                if (isBooleanLiteral(node[$efront_string_left])) {
                    modified = true;
                    node[$efront_string_left] = common[$efront_string_moveLo](node[$efront_string_left], (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = +node[$efront_string_left][$efront_string_value], _c));
                    return node
                }
                if (isBooleanLiteral(node[$efront_string_right])) {
                    modified = true;
                    node[$efront_string_right] = common[$efront_string_moveLo](node[$efront_string_right], (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Litera], _d[$efront_string_value] = +node[$efront_string_right][$efront_string_value], _d));
                    return node
                }
            }
            return node
        }
        function rewriteBoolean(tree, options) {
            var _a, _b, _c;
            var result;
            modified = false;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = rewrite, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        rewriteBoolean[$efront_string_passNa] = Name;
        module[$efront_string_export] = rewriteBoolean
    }()
}],
/** 549 $efront_string_omit_p */ "omit-parens-in-void-context-iife",
/** 550 $efront_string_preser */ "preserveCompletionValue",
/** 551 post$omit-parens-in-void-context-iife.js */ [1,15,549,334,77,226,280,241,37,502,503,347,550,307,326,237,313,324,457,255,295,3,261,424,506,294,325,240,539,540,504,13,function(require, module, $efront_string_omit_p, $efront_string_Syntax, $efront_string_type, $efront_string_CallEx, $efront_string_callee, $efront_string_Functi1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_replac, $efront_string_enter, $efront_string_Expres, $efront_string_parent1, $efront_string_pop, $efront_string_mayBeC, $efront_string_Sequen, $efront_string_expres1, $efront_string_length, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_leave, $efront_string_Functi, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_omit_p;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isIIFE(node) {
            var callee;
            if (node[$efront_string_type] !== Syntax[$efront_string_CallEx]) {
                return false
            }
            callee = node[$efront_string_callee];
            return callee[$efront_string_type] === Syntax[$efront_string_Functi1]
        }
        function main(tree, options) {
            var _a, _b, _c, _d;
            var result, stackCount, preserveCompletionValue;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b));
            modified = false;
            result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node, parent) {
                var _a;
                var ancestors, target;
                if (!isIIFE(node)) {
                    return
                }
                target = parent;
                if (target[$efront_string_type] === Syntax[$efront_string_Expres]) {
                    ancestors = this[$efront_string_parent1]();
                    ancestors[$efront_string_pop]();
                    if (preserveCompletionValue && common[$efront_string_mayBeC](target, ancestors)) {
                        return
                    }
                } else if (target[$efront_string_type] === Syntax[$efront_string_Sequen] && target[$efront_string_expres1][$efront_string_length] >= 2 && target[$efront_string_expres1][0] === node) {
                    ancestors = this[$efront_string_parent1]();
                    ancestors[$efront_string_pop]();
                    target = ancestors[$efront_string_pop]();
                    if (target[$efront_string_type] !== Syntax[$efront_string_Expres]) {
                        return
                    }
                } else {
                    return
                }
                modified = true;
                return _a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_argume1] = node, _a
            }, _c[$efront_string_leave] = function leave(node) {
                if (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    --stackCount
                }
            }, _c));
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        main[$efront_string_passNa] = Name;
        module[$efront_string_export] = main
    }()
}],
/** 552 $efront_string_tree_b */ "tree-based-constant-folding",
/** 553 pass$tree-based-constant-folding.js */ [1,15,552,334,460,463,458,465,525,530,77,231,284,285,224,424,176,206,272,273,529,468,526,246,261,294,527,37,502,503,347,307,325,454,444,255,295,22,539,540,504,13,function(require, module, $efront_string_tree_b, $efront_string_Syntax, $efront_string_Specia, $efront_string_isUnde, $efront_string_isNega, $efront_string_isNaN, $efront_string_consta, $efront_string_isCons, $efront_string_type, $efront_string_Condit, $efront_string_conseq, $efront_string_altern, $efront_string_Binary, $efront_string_operat, $efront_string_in, $efront_string_instan, $efront_string_left, $efront_string_right, $efront_string_evalua, $efront_string_genera4, $efront_string_doBina, $efront_string_Logica, $efront_string_UnaryE, $efront_string_argume1, $efront_string_doUnar, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_moveLo, $efront_string_sameVa, $efront_string_Sequen, $efront_string_expres1, $efront_string_test, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, evaluator, modified;
        Name = $efront_string_tree_b;
        common = require(471);
        evaluator = require(533);
        Syntax = common[$efront_string_Syntax];
        function isModifiedConstant(node) {
            if (common[$efront_string_Specia][$efront_string_isUnde](node)) {
                return false
            }
            if (common[$efront_string_Specia][$efront_string_isNega](node)) {
                return false
            }
            if (common[$efront_string_Specia][$efront_string_isNaN](node)) {
                return false
            }
            return evaluator[$efront_string_consta][$efront_string_isCons](node, false)
        }
        function isFoldableConditional(node) {
            if (node[$efront_string_type] !== Syntax[$efront_string_Condit]) {
                return false
            }
            return evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) || evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])
        }
        function foldConditional(node) {
            var binary, unary, operator, left, right;
            switch (node[$efront_string_type]) {
            case Syntax[$efront_string_Binary]:
                if (node[$efront_string_operat] === $efront_string_in || node[$efront_string_operat] === $efront_string_instan) {
                    return node
                }
                if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_left]) && isFoldableConditional(node[$efront_string_right])) {
                    modified = true;
                    binary = node;
                    operator = binary[$efront_string_operat];
                    left = evaluator[$efront_string_consta][$efront_string_evalua](binary[$efront_string_left]);
                    node = node[$efront_string_right];
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq])) {
                        node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, left, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq])))
                    } else {
                        binary[$efront_string_right] = node[$efront_string_conseq];
                        node[$efront_string_conseq] = binary
                    }
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])) {
                        node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, left, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern])))
                    } else {
                        binary[$efront_string_right] = node[$efront_string_altern];
                        node[$efront_string_altern] = binary
                    }
                } else if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_right]) && isFoldableConditional(node[$efront_string_left])) {
                    modified = true;
                    binary = node;
                    operator = binary[$efront_string_operat];
                    right = evaluator[$efront_string_consta][$efront_string_evalua](binary[$efront_string_right]);
                    node = node[$efront_string_left];
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq])) {
                        node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]), right))
                    } else {
                        binary[$efront_string_left] = node[$efront_string_conseq];
                        node[$efront_string_conseq] = binary
                    }
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])) {
                        node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]), right))
                    } else {
                        binary[$efront_string_left] = node[$efront_string_altern];
                        node[$efront_string_altern] = binary
                    }
                }
                break;
            case Syntax[$efront_string_Logica]:
                break;
            case Syntax[$efront_string_UnaryE]:
                if (isFoldableConditional(node[$efront_string_argume1])) {
                    modified = true;
                    unary = node;
                    operator = unary[$efront_string_operat];
                    node = unary[$efront_string_argume1];
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq])) {
                        node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doUnar](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq])))
                    } else {
                        unary[$efront_string_argume1] = node[$efront_string_conseq];
                        node[$efront_string_conseq] = unary
                    }
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])) {
                        node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doUnar](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern])))
                    } else {
                        unary[$efront_string_argume1] = node[$efront_string_altern];
                        node[$efront_string_altern] = unary
                    }
                }
                break
            }
            return node
        }
        function treeBasedConstantFolding(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var _a;
                var con, alt;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Binary]:
                case Syntax[$efront_string_Logica]:
                case Syntax[$efront_string_UnaryE]:
                    if (isModifiedConstant(node)) {
                        modified = true;
                        return common[$efront_string_moveLo](node, common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_evalua](node)))
                    }
                    return foldConditional(node);
                case Syntax[$efront_string_Condit]:
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) && evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])) {
                        con = evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]);
                        alt = evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]);
                        if (common[$efront_string_sameVa](con, alt)) {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                                node[$efront_string_test],
                                common[$efront_string_Specia][$efront_string_genera4](con)
                            ], _a))
                        }
                    }
                    break
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        treeBasedConstantFolding[$efront_string_passNa] = Name;
        module[$efront_string_export] = treeBasedConstantFolding
    }()
}],
/** 554 $efront_string_transf2 */ "transform-typeof-undefined",
/** 555 pass$transform-typeof-undefined.js */ [1,15,554,334,77,244,292,34,37,502,503,347,434,353,414,323,326,421,224,424,515,516,513,514,272,273,261,196,294,242,406,366,358,460,462,344,506,325,422,415,539,540,504,13,function(require, module, $efront_string_transf2, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_undefi, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_enter, $efront_string_acquir, $efront_string_Binary, $efront_string_operat, $efront_string__30, $efront_string__31, $efront_string__28, $efront_string__29, $efront_string_left, $efront_string_right, $efront_string_UnaryE, $efront_string_typeof, $efront_string_argume1, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_resolv, $efront_string_Specia, $efront_string_genera2, $efront_string_charAt, $efront_string__21, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, escope, modified;
        Name = $efront_string_transf2;
        escope = require(436);
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isUndefinedStringLiteral(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] && node[$efront_string_value] === $efront_string_undefi
        }
        function transformTypeofUndefined(tree, options) {
            var _a, _b, _c, _d;
            var result, manager, scope;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            manager[$efront_string_attach2]();
            common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var target, undef, argument, ref;
                scope = manager[$efront_string_acquir](node) || scope;
                if (node[$efront_string_type] === Syntax[$efront_string_Binary] && (node[$efront_string_operat] === $efront_string__30 || node[$efront_string_operat] === $efront_string__31 || node[$efront_string_operat] === $efront_string__28 || node[$efront_string_operat] === $efront_string__29)) {
                    if (isUndefinedStringLiteral(node[$efront_string_left])) {
                        undef = $efront_string_left;
                        target = $efront_string_right
                    } else if (isUndefinedStringLiteral(node[$efront_string_right])) {
                        undef = $efront_string_right;
                        target = $efront_string_left
                    } else {
                        return
                    }
                    if (node[target][$efront_string_type] === Syntax[$efront_string_UnaryE] && node[target][$efront_string_operat] === $efront_string_typeof) {
                        argument = node[target][$efront_string_argume1];
                        if (argument[$efront_string_type] === Syntax[$efront_string_Identi]) {
                            ref = scope[$efront_string_resolv1](argument);
                            if (!ref || !ref[$efront_string_isStat]() || !ref[$efront_string_resolv]) {
                                return
                            }
                        }
                        modified = true;
                        node[undef] = common[$efront_string_Specia][$efront_string_genera2]();
                        node[target] = argument;
                        node[$efront_string_operat] = node[$efront_string_operat][$efront_string_charAt](0) === $efront_string__21 ? $efront_string__31 : $efront_string__30
                    }
                }
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c));
            manager[$efront_string_detach]();
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        transformTypeofUndefined[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformTypeofUndefined
    }()
}],
/** 556 $efront_string_transf3 */ "transform-to-sequence-expression",
/** 557 pass$transform-to-sequence-expression.js */ [1,15,556,334,3,77,255,295,237,286,294,278,47,254,259,238,287,263,243,22,37,502,503,347,323,326,223,252,539,540,504,13,function(require, module, $efront_string_transf3, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_Sequen, $efront_string_expres1, $efront_string_Expres, $efront_string_expres, $efront_string_argume1, $efront_string_body, $efront_string_push, $efront_string_Return, $efront_string_ThrowS, $efront_string_ForSta, $efront_string_init, $efront_string_Variab, $efront_string_IfStat, $efront_string_test, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_BlockS, $efront_string_Progra, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf3;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transform(node) {
            var _a, _b;
            var i, iz, expressions, stmt, prev, body;
            function constructSeq(expressions, stmt) {
                var _a;
                var seq;
                if (expressions[$efront_string_length] !== 1) {
                    modified = true;
                    seq = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, _a);
                    if (stmt[$efront_string_type] === Syntax[$efront_string_Expres]) {
                        stmt[$efront_string_expres] = seq
                    } else {
                        stmt[$efront_string_argume1] = seq
                    }
                }
                return stmt
            }
            body = [];
            expressions = [];
            for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                prev = stmt;
                stmt = node[$efront_string_body][i];
                if (stmt[$efront_string_type] === Syntax[$efront_string_Expres]) {
                    expressions[$efront_string_push](stmt[$efront_string_expres])
                } else if (stmt[$efront_string_type] === Syntax[$efront_string_Return] && stmt[$efront_string_argume1] != null || stmt[$efront_string_type] === Syntax[$efront_string_ThrowS]) {
                    expressions[$efront_string_push](stmt[$efront_string_argume1]);
                    body[$efront_string_push](constructSeq(expressions, stmt));
                    expressions = []
                } else if (stmt[$efront_string_type] === Syntax[$efront_string_ForSta] && (!stmt[$efront_string_init] || stmt[$efront_string_init][$efront_string_type] !== Syntax[$efront_string_Variab])) {
                    if (expressions[$efront_string_length]) {
                        modified = true;
                        if (stmt[$efront_string_init]) {
                            expressions[$efront_string_push](stmt[$efront_string_init])
                        }
                        if (expressions[$efront_string_length] === 1) {
                            stmt[$efront_string_init] = expressions[0]
                        } else {
                            stmt[$efront_string_init] = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, _a)
                        }
                        expressions = []
                    }
                    body[$efront_string_push](stmt)
                } else if (stmt[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                    if (expressions[$efront_string_length]) {
                        modified = true;
                        expressions[$efront_string_push](stmt[$efront_string_test]);
                        stmt[$efront_string_test] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = expressions, _b);
                        expressions = []
                    }
                    body[$efront_string_push](stmt)
                } else {
                    if (expressions[$efront_string_length]) {
                        body[$efront_string_push](constructSeq(expressions, prev));
                        expressions = []
                    }
                    body[$efront_string_push](stmt)
                }
            }
            if (expressions[$efront_string_length]) {
                body[$efront_string_push](constructSeq(expressions, stmt))
            }
            node[$efront_string_body] = body
        }
        function transformToSequenceExpression(tree, options) {
            var _a, _b, _c;
            var result;
            modified = false;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    transform(node);
                    break
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformToSequenceExpression[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformToSequenceExpression
    }()
}],
/** 558 $efront_string_transf4 */ "transform-to-compound-assignment",
/** 559 $efront_string__40 */ "*=",
/** 560 $efront_string__41 */ "/=",
/** 561 $efront_string__42 */ "%=",
/** 562 $efront_string__43 */ "+=",
/** 563 $efront_string__44 */ "-=",
/** 564 $efront_string__45 */ "<<=",
/** 565 $efront_string__46 */ ">>=",
/** 566 $efront_string__47 */ ">>>=",
/** 567 $efront_string__48 */ "&=",
/** 568 $efront_string__49 */ "^=",
/** 569 $efront_string__50 */ "|=",
/** 570 pass$transform-to-compound-assignment.js */ [1,15,558,334,77,242,56,90,442,524,509,441,521,522,523,512,511,510,425,559,560,561,562,563,564,565,566,567,568,569,37,502,503,347,434,353,414,323,326,421,219,424,272,273,224,406,366,325,422,415,539,540,504,13,function(require, module, $efront_string_transf4, $efront_string_Syntax, $efront_string_type, $efront_string_Identi, $efront_string_name, $efront_string__2, $efront_string__6, $efront_string__39, $efront_string__24, $efront_string__5, $efront_string__36, $efront_string__37, $efront_string__38, $efront_string__27, $efront_string__26, $efront_string__25, $efront_string__4, $efront_string__40, $efront_string__41, $efront_string__42, $efront_string__43, $efront_string__44, $efront_string__45, $efront_string__46, $efront_string__47, $efront_string__48, $efront_string__49, $efront_string__50, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_enter, $efront_string_acquir, $efront_string_Assign, $efront_string_operat, $efront_string_left, $efront_string_right, $efront_string_Binary, $efront_string_resolv1, $efront_string_isStat, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, escope, modified;
        Name = $efront_string_transf4;
        escope = require(436);
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function equals(lhs, rhs) {
            if (lhs[$efront_string_type] !== rhs[$efront_string_type]) {
                return false
            }
            if (lhs[$efront_string_type] === Syntax[$efront_string_Identi]) {
                return lhs[$efront_string_name] === rhs[$efront_string_name]
            }
            return false
        }
        function compound(operator) {
            switch (operator) {
            case $efront_string__2:
            case $efront_string__6:
            case $efront_string__39:
            case $efront_string__24:
            case $efront_string__5:
            case $efront_string__36:
            case $efront_string__37:
            case $efront_string__38:
            case $efront_string__27:
            case $efront_string__26:
            case $efront_string__25:
                return operator + $efront_string__4
            }
            return null
        }
        function observableCompound(operator) {
            switch (operator) {
            case $efront_string__40:
            case $efront_string__41:
            case $efront_string__42:
            case $efront_string__43:
            case $efront_string__44:
            case $efront_string__45:
            case $efront_string__46:
            case $efront_string__47:
            case $efront_string__48:
            case $efront_string__49:
            case $efront_string__50:
                return operator
            }
            return null
        }
        function transformToCompoundAssignment(tree, options) {
            var _a, _b, _c, _d;
            var result, scope, manager;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            manager[$efront_string_attach2]();
            common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var left, right, operator, ref;
                scope = manager[$efront_string_acquir](node) || scope;
                if (node[$efront_string_type] === Syntax[$efront_string_Assign] && node[$efront_string_operat] === $efront_string__4) {
                    left = node[$efront_string_left];
                    right = node[$efront_string_right];
                    if (right[$efront_string_type] === Syntax[$efront_string_Binary] && equals(right[$efront_string_left], left)) {
                        operator = compound(right[$efront_string_operat]);
                        if (operator) {
                            modified = true;
                            node[$efront_string_operat] = operator;
                            node[$efront_string_right] = right[$efront_string_right]
                        }
                    } else if (right[$efront_string_type] === Syntax[$efront_string_Assign] && equals(right[$efront_string_left], left)) {
                        if (observableCompound(right[$efront_string_operat])) {
                            ref = scope[$efront_string_resolv1](node[$efront_string_left]);
                            if (ref[$efront_string_isStat]()) {
                                modified = true;
                                node[$efront_string_operat] = right[$efront_string_operat];
                                node[$efront_string_right] = right[$efront_string_right]
                            }
                        }
                    }
                }
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c));
            manager[$efront_string_detach]();
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        transformToCompoundAssignment[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformToCompoundAssignment
    }()
}],
/** 571 $efront_string_transf5 */ "transform-logical-association",
/** 572 pass$transform-logical-association.js */ [1,15,571,334,37,502,503,347,323,326,77,246,273,424,272,539,540,504,13,function(require, module, $efront_string_transf5, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Logica, $efront_string_right, $efront_string_operat, $efront_string_left, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf5;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformLogicalAssociation(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a;
                if (node[$efront_string_type] === Syntax[$efront_string_Logica]) {
                    if (node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Logica] && node[$efront_string_operat] === node[$efront_string_right][$efront_string_operat]) {
                        modified = true;
                        node[$efront_string_left] = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = node[$efront_string_operat], _a[$efront_string_left] = node[$efront_string_left], _a[$efront_string_right] = node[$efront_string_right][$efront_string_left], _a);
                        node[$efront_string_right] = node[$efront_string_right][$efront_string_right]
                    }
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformLogicalAssociation[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformLogicalAssociation
    }()
}],
/** 573 $efront_string_transf6 */ "transform-immediate-function-call",
/** 574 pass$transform-immediate-function-call.js */ [1,15,573,334,77,226,280,241,278,223,3,240,445,356,208,460,462,47,454,255,295,37,502,503,347,307,325,539,540,504,13,function(require, module, $efront_string_transf6, $efront_string_Syntax, $efront_string_type, $efront_string_CallEx, $efront_string_callee, $efront_string_Functi1, $efront_string_body, $efront_string_BlockS, $efront_string_length, $efront_string_Functi, $efront_string_Array, $efront_string_from, $efront_string_argume, $efront_string_Specia, $efront_string_genera2, $efront_string_push, $efront_string_moveLo, $efront_string_Sequen, $efront_string_expres1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf6;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function isEmptyFunctionCall(call) {
            var callee, i, iz, stmt;
            if (call[$efront_string_type] !== Syntax[$efront_string_CallEx]) {
                return false
            }
            callee = call[$efront_string_callee];
            if (callee[$efront_string_type] !== Syntax[$efront_string_Functi1]) {
                return false
            }
            if (callee[$efront_string_body][$efront_string_type] !== Syntax[$efront_string_BlockS]) {
                return false
            }
            if (callee[$efront_string_body][$efront_string_body][$efront_string_length] === 0) {
                return true
            }
            for (i = 0, iz = callee[$efront_string_body][$efront_string_body][$efront_string_length]; i < iz; ++i) {
                stmt = callee[$efront_string_body][$efront_string_body][i];
                if (stmt[$efront_string_type] !== Syntax[$efront_string_Functi]) {
                    return false
                }
            }
            return true
        }
        function callToSequence(call) {
            var _a;
            var expressions;
            expressions = common[$efront_string_Array][$efront_string_from](call[$efront_string_argume]);
            if (expressions[$efront_string_length] === 0) {
                return common[$efront_string_Specia][$efront_string_genera2](call)
            }
            expressions[$efront_string_push](common[$efront_string_Specia][$efront_string_genera2]());
            return common[$efront_string_moveLo](call, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, _a))
        }
        function transformImmediateFunctionCall(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                if (isEmptyFunctionCall(node)) {
                    modified = true;
                    return callToSequence(node)
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformImmediateFunctionCall[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformImmediateFunctionCall
    }()
}],
/** 575 $efront_string_transf7 */ "transform-dynamic-to-static-property-definition",
/** 576 pass$transform-dynamic-to-static-property-definition.js */ [1,115,15,575,334,37,502,503,347,323,326,77,253,291,244,292,10,453,454,242,56,269,460,468,539,540,504,13,function(require, Number, module, $efront_string_transf7, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Proper, $efront_string_key, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_isIden3, $efront_string_moveLo, $efront_string_Identi, $efront_string_name, $efront_string_toStri, $efront_string_Specia, $efront_string_genera4, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf7;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformDynamicToStaticPropertyDefinition(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a;
                var generated;
                if (node[$efront_string_type] === Syntax[$efront_string_Proper]) {
                    if (node[$efront_string_key][$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_key][$efront_string_value] === $efront_string_string) {
                        if (common[$efront_string_isIden3](node[$efront_string_key][$efront_string_value])) {
                            modified = true;
                            node[$efront_string_key] = common[$efront_string_moveLo](node[$efront_string_key], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Identi], _a[$efront_string_name] = node[$efront_string_key][$efront_string_value], _a))
                        } else if (node[$efront_string_key][$efront_string_value] === Number(node[$efront_string_key][$efront_string_value])[$efront_string_toStri]()) {
                            generated = common[$efront_string_Specia][$efront_string_genera4](Number(node[$efront_string_key][$efront_string_value]));
                            if (generated[$efront_string_type] === Syntax[$efront_string_Litera]) {
                                modified = true;
                                node[$efront_string_key] = common[$efront_string_moveLo](node[$efront_string_key], generated)
                            }
                        }
                    }
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformDynamicToStaticPropertyDefinition[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformDynamicToStaticPropertyDefinition
    }()
}],
/** 577 $efront_string_transf8 */ "transform-dynamic-to-static-property-access",
/** 578 pass$transform-dynamic-to-static-property-access.js */ [1,115,15,577,334,37,502,503,347,323,326,77,247,428,290,244,292,10,453,454,242,56,269,460,468,539,540,504,13,function(require, Number, module, $efront_string_transf8, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_isIden3, $efront_string_moveLo, $efront_string_Identi, $efront_string_name, $efront_string_toStri, $efront_string_Specia, $efront_string_genera4, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf8;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformDynamicToStaticPropertyAccess(tree, options) {
            var _a, _b, _c;
            var result;
            modified = false;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a;
                var property;
                if (node[$efront_string_type] === Syntax[$efront_string_Member] && node[$efront_string_comput]) {
                    property = node[$efront_string_proper];
                    if (property[$efront_string_type] === Syntax[$efront_string_Litera] && typeof property[$efront_string_value] === $efront_string_string) {
                        if (common[$efront_string_isIden3](property[$efront_string_value])) {
                            modified = true;
                            node[$efront_string_comput] = false;
                            node[$efront_string_proper] = common[$efront_string_moveLo](property, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Identi], _a[$efront_string_name] = property[$efront_string_value], _a))
                        } else if (property[$efront_string_value] === Number(property[$efront_string_value])[$efront_string_toStri]()) {
                            modified = true;
                            node[$efront_string_comput] = true;
                            node[$efront_string_proper] = common[$efront_string_moveLo](node[$efront_string_proper], common[$efront_string_Specia][$efront_string_genera4](Number(node[$efront_string_proper][$efront_string_value])))
                        }
                    }
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        transformDynamicToStaticPropertyAccess[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformDynamicToStaticPropertyAccess
    }()
}],
/** 579 $efront_string_transf9 */ "transform-branch-to-expression",
/** 580 pass$transform-branch-to-expression.js */ [1,15,579,334,37,502,503,347,550,307,325,77,243,313,457,285,284,237,454,286,231,22,254,294,255,295,460,462,259,246,424,508,272,273,236,539,540,504,13,function(require, module, $efront_string_transf9, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_replac, $efront_string_leave, $efront_string_type, $efront_string_IfStat, $efront_string_parent1, $efront_string_mayBeC, $efront_string_altern, $efront_string_conseq, $efront_string_Expres, $efront_string_moveLo, $efront_string_expres, $efront_string_Condit, $efront_string_test, $efront_string_Return, $efront_string_argume1, $efront_string_Sequen, $efront_string_expres1, $efront_string_Specia, $efront_string_genera2, $efront_string_ThrowS, $efront_string_Logica, $efront_string_operat, $efront_string__23, $efront_string_left, $efront_string_right, $efront_string_EmptyS, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_transf9;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function transformBranchToExpression(tree, options) {
            var _a, _b, _c, _d;
            var result, preserveCompletionValue;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b));
            modified = false;
            result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_leave] = function leave(node) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                var consequent, alternate, ancestors;
                if (node[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                    ancestors = this[$efront_string_parent1]();
                    if (preserveCompletionValue && common[$efront_string_mayBeC](node, ancestors)) {
                        return
                    }
                    if (node[$efront_string_altern]) {
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Expres] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_Expres]) {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Expres], _a[$efront_string_expres] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Condit], _b[$efront_string_test] = node[$efront_string_test], _b[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_expres], _b[$efront_string_altern] = node[$efront_string_altern][$efront_string_expres], _b)), _a))
                        }
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_Return]) {
                            modified = true;
                            if (!node[$efront_string_conseq][$efront_string_argume1] && !node[$efront_string_altern][$efront_string_argume1]) {
                                return common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _c[$efront_string_argume1] = common[$efront_string_moveLo](node, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Sequen], _d[$efront_string_expres1] = [
                                    node[$efront_string_test],
                                    common[$efront_string_Specia][$efront_string_genera2]()
                                ], _d)), _c))
                            }
                            consequent = node[$efront_string_conseq][$efront_string_argume1] || common[$efront_string_Specia][$efront_string_genera2]();
                            alternate = node[$efront_string_altern][$efront_string_argume1] || common[$efront_string_Specia][$efront_string_genera2]();
                            return common[$efront_string_moveLo](node, (_e = {}, _e[$efront_string_type] = Syntax[$efront_string_Return], _e[$efront_string_argume1] = common[$efront_string_moveLo](node, (_f = {}, _f[$efront_string_type] = Syntax[$efront_string_Condit], _f[$efront_string_test] = node[$efront_string_test], _f[$efront_string_conseq] = consequent, _f[$efront_string_altern] = alternate, _f)), _e))
                        }
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_ThrowS] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_ThrowS]) {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_g = {}, _g[$efront_string_type] = Syntax[$efront_string_ThrowS], _g[$efront_string_argume1] = common[$efront_string_moveLo](node, (_h = {}, _h[$efront_string_type] = Syntax[$efront_string_Condit], _h[$efront_string_test] = node[$efront_string_test], _h[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_argume1], _h[$efront_string_altern] = node[$efront_string_altern][$efront_string_argume1], _h)), _g))
                        }
                    } else {
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Expres]) {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_j = {}, _j[$efront_string_type] = Syntax[$efront_string_Expres], _j[$efront_string_expres] = common[$efront_string_moveLo](node, (_k = {}, _k[$efront_string_type] = Syntax[$efront_string_Logica], _k[$efront_string_operat] = $efront_string__23, _k[$efront_string_left] = node[$efront_string_test], _k[$efront_string_right] = node[$efront_string_conseq][$efront_string_expres], _k)), _j))
                        } else if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_EmptyS]) {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_l = {}, _l[$efront_string_type] = Syntax[$efront_string_Expres], _l[$efront_string_expres] = node[$efront_string_test], _l))
                        }
                    }
                }
            }, _c));
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        transformBranchToExpression[$efront_string_passNa] = Name;
        module[$efront_string_export] = transformBranchToExpression
    }()
}],
/** 581 $efront_string_reorde */ "reordering-function-declarations",
/** 582 pass$reordering-function-declarations.js */ [1,15,581,334,3,77,240,47,234,5,37,502,503,347,323,325,252,278,241,539,540,504,13,function(require, module, $efront_string_reorde, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_Functi, $efront_string_push, $efront_string_Direct, $efront_string_concat, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_Progra, $efront_string_body, $efront_string_Functi1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_reorde;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function reordering(array) {
            var i, iz, node, directives, declarations, others;
            directives = [];
            declarations = [];
            others = [];
            for (i = 0, iz = array[$efront_string_length]; i < iz; ++i) {
                node = array[i];
                if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    if (declarations[$efront_string_length] + directives[$efront_string_length] !== i) {
                        modified = true
                    }
                    declarations[$efront_string_push](node)
                } else if (node[$efront_string_type] === Syntax[$efront_string_Direct]) {
                    directives[$efront_string_push](node)
                } else {
                    others[$efront_string_push](node)
                }
            }
            return directives[$efront_string_concat](declarations, others)
        }
        function reorderingFunctionDeclarations(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Progra]:
                    node[$efront_string_body] = reordering(node[$efront_string_body]);
                    break;
                case Syntax[$efront_string_Functi]:
                case Syntax[$efront_string_Functi1]:
                    node[$efront_string_body][$efront_string_body] = reordering(node[$efront_string_body][$efront_string_body]);
                    break
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        reorderingFunctionDeclarations[$efront_string_passNa] = Name;
        module[$efront_string_export] = reorderingFunctionDeclarations
    }()
}],
/** 583 $efront_string_remove */ "remove-wasted-blocks",
/** 584 pass$remove-wasted-blocks.js */ [1,15,583,334,3,77,223,278,470,5,47,37,502,503,347,307,325,252,240,241,260,227,236,539,540,504,13,function(require, module, $efront_string_remove, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_BlockS, $efront_string_body, $efront_string_isScop1, $efront_string_concat, $efront_string_push, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_Progra, $efront_string_Functi, $efront_string_Functi1, $efront_string_TrySta, $efront_string_CatchC, $efront_string_EmptyS, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_remove;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function flattenBlockStatement(body) {
            var i, iz, j, jz, result, stmt, inner, ok;
            result = [];
            for (i = 0, iz = body[$efront_string_length]; i < iz; ++i) {
                stmt = body[i];
                if (stmt[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    ok = true;
                    for (j = 0, jz = stmt[$efront_string_body][$efront_string_length]; j < jz; ++j) {
                        inner = stmt[$efront_string_body][j];
                        if (common[$efront_string_isScop1](inner)) {
                            ok = false
                        }
                    }
                    if (ok) {
                        modified = true;
                        result = result[$efront_string_concat](stmt[$efront_string_body])
                    } else {
                        result[$efront_string_push](stmt)
                    }
                } else {
                    result[$efront_string_push](stmt)
                }
            }
            return result
        }
        function removeWastedBlocks(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node, parent) {
                var _a;
                var i, iz, stmt;
                if (node[$efront_string_type] === Syntax[$efront_string_BlockS] || node[$efront_string_type] === Syntax[$efront_string_Progra]) {
                    for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                        stmt = node[$efront_string_body][i];
                        if (stmt[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                            node[$efront_string_body] = flattenBlockStatement(node[$efront_string_body]);
                            break
                        }
                    }
                }
                if (parent[$efront_string_type] === Syntax[$efront_string_Functi] || parent[$efront_string_type] === Syntax[$efront_string_Functi1] || parent[$efront_string_type] === Syntax[$efront_string_TrySta] || parent[$efront_string_type] === Syntax[$efront_string_CatchC]) {
                    return
                }
                while (node[$efront_string_type] === Syntax[$efront_string_BlockS] && node[$efront_string_body][$efront_string_length] === 1 && !common[$efront_string_isScop1](node[$efront_string_body][0])) {
                    modified = true;
                    node = node[$efront_string_body][0]
                }
                if (node[$efront_string_type] === Syntax[$efront_string_BlockS] && node[$efront_string_body][$efront_string_length] === 0) {
                    modified = true;
                    return _a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a
                }
                return node
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        removeWastedBlocks[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeWastedBlocks
    }()
}],
/** 585 $efront_string_remove1 */ "remove-unused-label",
/** 586 $efront_string_unused */ "unused",
/** 587 $efront_string_regist */ "register",
/** 588 $efront_string_duplic */ /** text */ "duplicate label is found",
/** 589 $efront_string_used */ "used",
/** 590 $efront_string_stmt */ "stmt",
/** 591 $efront_string_unregi */ "unregister",
/** 592 $efront_string_unreso */ /** text */ "unresolved label",
/** 593 $efront_string_close */ "close",
/** 594 pass$remove-unused-label.js */ [1,15,585,334,41,586,380,36,587,451,77,245,279,56,40,588,589,590,591,37,42,278,406,592,593,502,503,347,307,326,252,240,241,225,232,325,539,540,504,13,function(require, module, $efront_string_remove1, $efront_string_Syntax, $efront_string_set, $efront_string_unused, $efront_string_upper, $efront_string_protot, $efront_string_regist, $efront_string_assert, $efront_string_type, $efront_string_Labele, $efront_string_label, $efront_string_name, $efront_string_has, $efront_string_duplic, $efront_string_used, $efront_string_stmt, $efront_string_unregi, $efront_string_get, $efront_string_delete, $efront_string_body, $efront_string_resolv1, $efront_string_unreso, $efront_string_close, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_Progra, $efront_string_Functi, $efront_string_Functi1, $efront_string_BreakS, $efront_string_Contin, $efront_string_leave, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, Map, common, scope, modified;
        Name = $efront_string_remove1;
        common = require(471);
        Map = require(50);
        Syntax = common[$efront_string_Syntax];
        function Scope(upper) {
            this[$efront_string_set] = new Map;
            this[$efront_string_unused] = [];
            this[$efront_string_upper] = upper
        }
        Scope[$efront_string_protot][$efront_string_regist] = function register(node) {
            var _a;
            var name;
            common[$efront_string_assert](node[$efront_string_type] === Syntax[$efront_string_Labele]);
            name = node[$efront_string_label][$efront_string_name];
            common[$efront_string_assert](!this[$efront_string_set][$efront_string_has](name), $efront_string_duplic);
            this[$efront_string_set][$efront_string_set](name, (_a = {}, _a[$efront_string_used] = false, _a[$efront_string_stmt] = node, _a))
        };
        Scope[$efront_string_protot][$efront_string_unregi] = function unregister(node) {
            var name, ref;
            if (node[$efront_string_type] === Syntax[$efront_string_Labele]) {
                name = node[$efront_string_label][$efront_string_name];
                ref = this[$efront_string_set][$efront_string_get](name);
                this[$efront_string_set][$efront_string_delete](name);
                if (!ref[$efront_string_used]) {
                    modified = true;
                    return node[$efront_string_body]
                }
            }
            return node
        };
        Scope[$efront_string_protot][$efront_string_resolv1] = function resolve(node) {
            var name;
            if (node[$efront_string_label]) {
                name = node[$efront_string_label][$efront_string_name];
                common[$efront_string_assert](this[$efront_string_set][$efront_string_has](name), $efront_string_unreso);
                this[$efront_string_set][$efront_string_get](name)[$efront_string_used] = true
            }
        };
        Scope[$efront_string_protot][$efront_string_close] = function close() {
            return this[$efront_string_upper]
        };
        function removeUnusedLabel(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            scope = null;
            modified = false;
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Progra]:
                case Syntax[$efront_string_Functi]:
                case Syntax[$efront_string_Functi1]:
                    scope = new Scope(scope);
                    break;
                case Syntax[$efront_string_Labele]:
                    scope[$efront_string_regist](node);
                    break;
                case Syntax[$efront_string_BreakS]:
                case Syntax[$efront_string_Contin]:
                    scope[$efront_string_resolv1](node);
                    break
                }
            }, _b[$efront_string_leave] = function leave(node) {
                var ret;
                ret = scope[$efront_string_unregi](node);
                if (node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) {
                    scope = scope[$efront_string_close]()
                }
                return ret
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        removeUnusedLabel[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeUnusedLabel
    }()
}],
/** 595 $efront_string_remove2 */ "remove-unreachable-branch",
/** 596 pass$remove-unreachable-branch.js */ [1,15,595,334,532,22,285,547,47,454,77,237,286,284,223,278,469,272,424,508,255,295,273,37,502,503,347,307,326,432,423,445,447,243,246,231,325,324,539,540,504,13,function(require, module, $efront_string_remove2, $efront_string_Syntax, $efront_string_boolea, $efront_string_test, $efront_string_altern, $efront_string_boolea1, $efront_string_push, $efront_string_moveLo, $efront_string_type, $efront_string_Expres, $efront_string_expres, $efront_string_conseq, $efront_string_BlockS, $efront_string_body, $efront_string_delega, $efront_string_left, $efront_string_operat, $efront_string__23, $efront_string_Sequen, $efront_string_expres1, $efront_string_right, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_Scope, $efront_string_isVari, $efront_string_Array, $efront_string_last, $efront_string_IfStat, $efront_string_Logica, $efront_string_Condit, $efront_string_leave, $efront_string_pop, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, escope, evaluator, modified;
        Name = $efront_string_remove2;
        escope = require(436);
        common = require(471);
        evaluator = require(533);
        Syntax = common[$efront_string_Syntax];
        function handleIfStatement(func, node) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var test, body, decl;
            test = evaluator[$efront_string_boolea](node[$efront_string_test]);
            if (!node[$efront_string_altern]) {
                if (typeof test === $efront_string_boolea1) {
                    modified = true;
                    body = [];
                    if (test) {
                        body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Expres], _a[$efront_string_expres] = node[$efront_string_test], _a)), node[$efront_string_conseq]);
                        return _b = {}, _b[$efront_string_type] = Syntax[$efront_string_BlockS], _b[$efront_string_body] = body, _b
                    } else {
                        decl = common[$efront_string_delega](node[$efront_string_conseq], func);
                        if (decl) {
                            body[$efront_string_push](decl)
                        }
                        body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Expres], _c[$efront_string_expres] = node[$efront_string_test], _c)));
                        return _d = {}, _d[$efront_string_type] = Syntax[$efront_string_BlockS], _d[$efront_string_body] = body, _d
                    }
                }
            } else {
                if (typeof test === $efront_string_boolea1) {
                    modified = true;
                    body = [];
                    if (test) {
                        decl = common[$efront_string_delega](node[$efront_string_altern], func);
                        if (decl) {
                            body[$efront_string_push](decl)
                        }
                        body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_e = {}, _e[$efront_string_type] = Syntax[$efront_string_Expres], _e[$efront_string_expres] = node[$efront_string_test], _e)), node[$efront_string_conseq]);
                        return _f = {}, _f[$efront_string_type] = Syntax[$efront_string_BlockS], _f[$efront_string_body] = body, _f
                    } else {
                        decl = common[$efront_string_delega](node[$efront_string_conseq], func);
                        if (decl) {
                            body[$efront_string_push](decl)
                        }
                        body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_g = {}, _g[$efront_string_type] = Syntax[$efront_string_Expres], _g[$efront_string_expres] = node[$efront_string_test], _g)), node[$efront_string_altern]);
                        return _h = {}, _h[$efront_string_type] = Syntax[$efront_string_BlockS], _h[$efront_string_body] = body, _h
                    }
                }
            }
        }
        function handleLogicalExpression(func, node) {
            var _a, _b;
            var test;
            test = evaluator[$efront_string_boolea](node[$efront_string_left]);
            if (typeof test === $efront_string_boolea1) {
                modified = true;
                if (test) {
                    if (node[$efront_string_operat] === $efront_string__23) {
                        return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                            node[$efront_string_left],
                            node[$efront_string_right]
                        ], _a))
                    } else {
                        return node[$efront_string_left]
                    }
                } else {
                    if (node[$efront_string_operat] === $efront_string__23) {
                        return node[$efront_string_left]
                    } else {
                        return common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                            node[$efront_string_left],
                            node[$efront_string_right]
                        ], _b))
                    }
                }
            }
        }
        function handleConditionalExpression(func, node) {
            var _a, _b;
            var test;
            test = evaluator[$efront_string_boolea](node[$efront_string_test]);
            if (typeof test === $efront_string_boolea1) {
                modified = true;
                if (test) {
                    return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                        node[$efront_string_test],
                        node[$efront_string_conseq]
                    ], _a))
                } else {
                    return common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                        node[$efront_string_test],
                        node[$efront_string_altern]
                    ], _b))
                }
            }
        }
        function removeUnreachableBranch(tree, options) {
            var _a, _b, _c;
            var result, stack;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            stack = [];
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var func;
                if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    stack[$efront_string_push](node);
                    return
                }
                func = common[$efront_string_Array][$efront_string_last](stack);
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_IfStat]:
                    return handleIfStatement(func, node);
                case Syntax[$efront_string_Logica]:
                    return handleLogicalExpression(func, node);
                case Syntax[$efront_string_Condit]:
                    return handleConditionalExpression(func, node)
                }
            }, _b[$efront_string_leave] = function leave(node) {
                if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    stack[$efront_string_pop]()
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        removeUnreachableBranch[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeUnreachableBranch
    }()
}],
/** 597 $efront_string_remove3 */ "remove-side-effect-free-expressions",
/** 598 $efront_string_expres2 */ /** text */ "expressions should be more than one",
/** 599 $efront_string_result1 */ /** text */ "result should be more than zero",
/** 600 $efront_string_unshif */ "unshift",
/** 601 $efront_string_sequen */ /** text */ "sequences' length should be more than 1",
/** 602 pass$remove-side-effect-free-expressions.js */ [1,15,597,334,451,295,3,598,531,47,599,460,467,600,77,237,382,37,502,503,347,550,434,353,414,307,326,421,255,601,445,447,261,424,185,294,324,454,286,236,325,422,415,539,540,504,13,function(require, module, $efront_string_remove3, $efront_string_Syntax, $efront_string_assert, $efront_string_expres1, $efront_string_length, $efront_string_expres2, $efront_string_hasSid, $efront_string_push, $efront_string_result1, $efront_string_Specia, $efront_string_canExt, $efront_string_unshif, $efront_string_type, $efront_string_Expres, $efront_string_global, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_Sequen, $efront_string_sequen, $efront_string_Array, $efront_string_last, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_argume1, $efront_string_pop, $efront_string_moveLo, $efront_string_expres, $efront_string_EmptyS, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, escope, evaluator, modified;
        Name = $efront_string_remove3;
        escope = require(436);
        common = require(471);
        evaluator = require(533);
        Syntax = common[$efront_string_Syntax];
        function reduce(node, scope, parent, isResultNeeded) {
            var i, iz, expr, result, prev;
            common[$efront_string_assert](node[$efront_string_expres1][$efront_string_length] > 1, $efront_string_expres2);
            result = [];
            for (i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                prev = expr;
                expr = node[$efront_string_expres1][i];
                if (i + 1 !== iz || !isResultNeeded) {
                    if (!evaluator[$efront_string_hasSid](expr, scope)) {
                        continue
                    }
                }
                result[$efront_string_push](expr)
            }
            if (!isResultNeeded && result[$efront_string_length] === 0) {
                modified = true;
                return expr
            }
            common[$efront_string_assert](result[$efront_string_length] > 0, $efront_string_result1);
            do {
                if (iz === result[$efront_string_length]) {
                    return node
                }
                if (result[$efront_string_length] === 1) {
                    if (!common[$efront_string_Specia][$efront_string_canExt](result[0], parent, scope)) {
                        result[$efront_string_unshif](prev);
                        continue
                    }
                    modified = true;
                    return result[0]
                }
                modified = true;
                node[$efront_string_expres1] = result;
                return node
            } while (true)
        }
        function removeSideEffectFreeExpressions(tree, options) {
            var _a, _b, _c, _d, _e;
            var result, scope, manager, preserveCompletionValue;
            function isResultNeeded(parent, scope) {
                if (parent[$efront_string_type] === Syntax[$efront_string_Expres] && (!preserveCompletionValue || scope[$efront_string_type] !== $efront_string_global)) {
                    return false
                }
                return true
            }
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b));
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_c = {}, _c[$efront_string_direct1] = true, _c));
            manager[$efront_string_attach2]();
            result = common[$efront_string_replac](result, (_d = {}, _d[$efront_string_enter] = function enter(node, parent) {
                var _a, _b;
                var res, unary, trans;
                res = node;
                scope = manager[$efront_string_acquir](node) || scope;
                if (res[$efront_string_type] === Syntax[$efront_string_Sequen]) {
                    res = reduce(res, scope, parent, isResultNeeded(parent, scope))
                }
                if (res[$efront_string_type] === Syntax[$efront_string_Sequen]) {
                    common[$efront_string_assert](res[$efront_string_expres1][$efront_string_length] > 1, $efront_string_sequen);
                    unary = common[$efront_string_Array][$efront_string_last](res[$efront_string_expres1]);
                    if (unary[$efront_string_type] === Syntax[$efront_string_UnaryE] && unary[$efront_string_operat] === $efront_string_void && !evaluator[$efront_string_hasSid](unary[$efront_string_argume1], scope)) {
                        modified = true;
                        res[$efront_string_expres1][$efront_string_pop]();
                        trans = common[$efront_string_moveLo](unary, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _a[$efront_string_argume1] = common[$efront_string_Array][$efront_string_last](res[$efront_string_expres1]), _a));
                        if (res[$efront_string_expres1][$efront_string_length] === 1) {
                            res = trans
                        } else {
                            res[$efront_string_expres1][res[$efront_string_expres1][$efront_string_length] - 1] = trans
                        }
                    }
                }
                if (!isResultNeeded(res, scope)) {
                    if (!evaluator[$efront_string_hasSid](res[$efront_string_expres], scope)) {
                        modified = true;
                        res = common[$efront_string_moveLo](res, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b))
                    }
                }
                return res
            }, _d[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _d));
            manager[$efront_string_detach]();
            return _e = {}, _e[$efront_string_result] = result, _e[$efront_string_modifi] = modified, _e
        }
        removeSideEffectFreeExpressions[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeSideEffectFreeExpressions
    }()
}],
/** 603 $efront_string_remove4 */ "remove-empty-statement",
/** 604 pass$remove-empty-statement.js */ [1,15,603,334,3,77,236,47,285,284,22,454,261,424,506,294,37,502,503,347,323,326,223,252,278,257,243,256,297,445,447,448,324,539,540,504,13,function(require, module, $efront_string_remove4, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_EmptyS, $efront_string_push, $efront_string_altern, $efront_string_conseq, $efront_string_test, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_Switch1, $efront_string_IfStat, $efront_string_Switch, $efront_string_cases, $efront_string_Array, $efront_string_last, $efront_string_empty, $efront_string_pop, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_remove4;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function remove(array) {
            var i, iz, node, result;
            result = [];
            for (i = 0, iz = array[$efront_string_length]; i < iz; ++i) {
                node = array[i];
                if (node[$efront_string_type] === Syntax[$efront_string_EmptyS]) {
                    modified = true
                } else {
                    result[$efront_string_push](node)
                }
            }
            return result
        }
        function removeAlternate(node) {
            var _a;
            if (node[$efront_string_altern]) {
                if (node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_EmptyS]) {
                    modified = true;
                    node[$efront_string_altern] = null
                } else if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_EmptyS]) {
                    modified = true;
                    node[$efront_string_conseq] = node[$efront_string_altern];
                    node[$efront_string_altern] = null;
                    node[$efront_string_test] = common[$efront_string_moveLo](node[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_argume1] = node[$efront_string_test], _a))
                }
            }
        }
        function removeEmptyStatement(tree, options) {
            var _a, _b, _c;
            var result;
            modified = false;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var clause;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    node[$efront_string_body] = remove(node[$efront_string_body]);
                    break;
                case Syntax[$efront_string_Switch1]:
                    node[$efront_string_conseq] = remove(node[$efront_string_conseq]);
                    break;
                case Syntax[$efront_string_IfStat]:
                    removeAlternate(node);
                    break;
                case Syntax[$efront_string_Switch]:
                    if (node[$efront_string_cases][$efront_string_length]) {
                        clause = common[$efront_string_Array][$efront_string_last](node[$efront_string_cases]);
                        if (!clause[$efront_string_test] && common[$efront_string_Array][$efront_string_empty](clause[$efront_string_conseq])) {
                            modified = true;
                            node[$efront_string_cases][$efront_string_pop]()
                        }
                    }
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        removeEmptyStatement[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeEmptyStatement
    }()
}],
/** 605 $efront_string_remove5 */ "remove-context-sensitive-expressions",
/** 606 $efront_string_transf10 */ "transform",
/** 607 $efront_string_boolea2 */ "booleanFunction",
/** 608 $efront_string_voidFu */ "voidFunction",
/** 609 $efront_string_boolea3 */ "booleanTransformation",
/** 610 $efront_string_voidTr */ "voidTransformation",
/** 611 pass$remove-context-sensitive-expressions.js */ [1,15,605,334,606,607,608,367,36,609,77,261,424,506,294,246,272,273,507,508,454,231,22,284,285,610,185,531,6,255,295,3,445,447,37,502,503,347,550,434,353,414,307,326,421,241,240,219,220,223,224,225,226,227,232,235,233,236,237,286,239,238,287,263,288,242,243,244,245,247,249,250,252,253,254,256,257,258,259,260,262,264,265,266,325,422,415,539,540,504,13,function(require, module, $efront_string_remove5, $efront_string_Syntax, $efront_string_transf10, $efront_string_boolea2, $efront_string_voidFu, $efront_string_scope, $efront_string_protot, $efront_string_boolea3, $efront_string_type, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_Logica, $efront_string_left, $efront_string_right, $efront_string__22, $efront_string__23, $efront_string_moveLo, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_voidTr, $efront_string_void, $efront_string_hasSid, $efront_string_apply, $efront_string_Sequen, $efront_string_expres1, $efront_string_length, $efront_string_Array, $efront_string_last, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_Functi1, $efront_string_Functi, $efront_string_Assign, $efront_string_ArrayE, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_Contin, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_expres, $efront_string_ForInS, $efront_string_ForSta, $efront_string_init, $efront_string_Variab, $efront_string_update, $efront_string_Identi, $efront_string_IfStat, $efront_string_Litera, $efront_string_Labele, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_Progra, $efront_string_Proper, $efront_string_Return, $efront_string_Switch, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_Update, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, evaluator, escope, modified;
        Name = $efront_string_remove5;
        common = require(471);
        evaluator = require(533);
        escope = require(436);
        Syntax = common[$efront_string_Syntax];
        function Transformer(trans, booleanFunction, voidFunction, scope) {
            this[$efront_string_transf10] = trans;
            this[$efront_string_boolea2] = booleanFunction;
            this[$efront_string_voidFu] = voidFunction;
            this[$efront_string_scope] = scope
        }
        Transformer[$efront_string_protot][$efront_string_boolea3] = function (expr) {
            var _a;
            var consequent;
            do {
                if (expr[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                    if (expr[$efront_string_operat] === $efront_string__21 && expr[$efront_string_argume1][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_argume1][$efront_string_operat] === $efront_string__21) {
                        modified = true;
                        expr = expr[$efront_string_argume1][$efront_string_argume1];
                        continue
                    }
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Logica]) {
                    if (expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_left][$efront_string_operat] === $efront_string__21 && expr[$efront_string_right][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_right][$efront_string_operat] === $efront_string__21) {
                        modified = true;
                        expr[$efront_string_left] = expr[$efront_string_left][$efront_string_argume1];
                        expr[$efront_string_right] = expr[$efront_string_right][$efront_string_argume1];
                        expr[$efront_string_operat] = expr[$efront_string_operat] === $efront_string__22 ? $efront_string__23 : $efront_string__22;
                        expr = common[$efront_string_moveLo](expr, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_argume1] = expr, _a));
                        continue
                    }
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Condit]) {
                    if (expr[$efront_string_test][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_test][$efront_string_operat] === $efront_string__21) {
                        modified = true;
                        expr[$efront_string_test] = expr[$efront_string_test][$efront_string_argume1];
                        consequent = expr[$efront_string_conseq];
                        expr[$efront_string_conseq] = expr[$efront_string_altern];
                        expr[$efront_string_altern] = consequent
                    }
                }
                break
            } while (true);
            return expr
        };
        Transformer[$efront_string_protot][$efront_string_voidTr] = function (expr) {
            var _a, _b;
            var leftHasSideEffect, rightHasSideEffect;
            do {
                expr = this[$efront_string_boolea3](expr);
                if (expr[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                    if (expr[$efront_string_operat] === $efront_string__21 || expr[$efront_string_operat] === $efront_string_void) {
                        modified = true;
                        expr = expr[$efront_string_argume1];
                        continue
                    }
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Logica]) {
                    if (expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_left][$efront_string_operat] === $efront_string__21) {
                        modified = true;
                        expr[$efront_string_left] = expr[$efront_string_left][$efront_string_argume1];
                        expr[$efront_string_operat] = expr[$efront_string_operat] === $efront_string__22 ? $efront_string__23 : $efront_string__22
                    }
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Condit]) {
                    leftHasSideEffect = evaluator[$efront_string_hasSid](expr[$efront_string_conseq], this[$efront_string_scope]);
                    rightHasSideEffect = evaluator[$efront_string_hasSid](expr[$efront_string_altern], this[$efront_string_scope]);
                    if (!leftHasSideEffect && !rightHasSideEffect) {
                        modified = true;
                        expr = expr[$efront_string_test]
                    } else if (!leftHasSideEffect) {
                        modified = true;
                        expr = common[$efront_string_moveLo](expr, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = $efront_string__22, _a[$efront_string_left] = expr[$efront_string_test], _a[$efront_string_right] = expr[$efront_string_altern], _a))
                    } else if (!rightHasSideEffect) {
                        modified = true;
                        expr = common[$efront_string_moveLo](expr, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Logica], _b[$efront_string_operat] = $efront_string__23, _b[$efront_string_left] = expr[$efront_string_test], _b[$efront_string_right] = expr[$efront_string_conseq], _b))
                    }
                }
                break
            } while (true);
            return expr
        };
        Transformer[$efront_string_protot][$efront_string_apply] = function (expr) {
            var prev;
            do {
                prev = expr;
                expr = this[$efront_string_transf10](expr);
                if (prev !== expr) {
                    continue
                }
                if (expr[$efront_string_type] === Syntax[$efront_string_Logica]) {
                    expr[$efront_string_left] = this[$efront_string_boolea2](expr[$efront_string_left], this[$efront_string_scope]);
                    expr[$efront_string_right] = this[$efront_string_voidFu](expr[$efront_string_right], this[$efront_string_scope])
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Condit]) {
                    expr[$efront_string_conseq] = this[$efront_string_voidFu](expr[$efront_string_conseq], this[$efront_string_scope]);
                    expr[$efront_string_altern] = this[$efront_string_voidFu](expr[$efront_string_altern], this[$efront_string_scope])
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Sequen]) {
                    expr[$efront_string_expres1][expr[$efront_string_expres1][$efront_string_length] - 1] = this[$efront_string_voidFu](common[$efront_string_Array][$efront_string_last](expr[$efront_string_expres1]), this[$efront_string_scope])
                }
                break
            } while (true);
            return expr
        };
        function voidContext(expr, scope) {
            var trans = new Transformer(Transformer[$efront_string_protot][$efront_string_voidTr], booleanContext, voidContext, scope);
            return trans[$efront_string_apply](expr)
        }
        function booleanContext(expr, scope) {
            var trans = new Transformer(Transformer[$efront_string_protot][$efront_string_boolea3], booleanContext, booleanContext, scope);
            return trans[$efront_string_apply](expr)
        }
        function removeContextSensitiveExpressions(tree, options) {
            var _a, _b, _c, _d, _e;
            var result, stackCount, preserveCompletionValue, scope, manager;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            stackCount = 0;
            preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b));
            scope = null;
            manager = escope[$efront_string_analyz](result, (_c = {}, _c[$efront_string_direct1] = true, _c));
            manager[$efront_string_attach2]();
            result = common[$efront_string_replac](result, (_d = {}, _d[$efront_string_enter] = function enter(node) {
                var i, iz;
                scope = manager[$efront_string_acquir](node) || scope;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    ++stackCount
                }
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Assign]:
                    break;
                case Syntax[$efront_string_ArrayE]:
                    break;
                case Syntax[$efront_string_BlockS]:
                    break;
                case Syntax[$efront_string_Binary]:
                    break;
                case Syntax[$efront_string_BreakS]:
                    break;
                case Syntax[$efront_string_CallEx]:
                    break;
                case Syntax[$efront_string_CatchC]:
                    break;
                case Syntax[$efront_string_Condit]:
                    node[$efront_string_test] = booleanContext(node[$efront_string_test], scope);
                    break;
                case Syntax[$efront_string_Contin]:
                    break;
                case Syntax[$efront_string_DoWhil]:
                    node[$efront_string_test] = booleanContext(node[$efront_string_test], scope);
                    break;
                case Syntax[$efront_string_Debugg]:
                    break;
                case Syntax[$efront_string_EmptyS]:
                    break;
                case Syntax[$efront_string_Expres]:
                    if (!preserveCompletionValue || stackCount !== 0) {
                        node[$efront_string_expres] = voidContext(node[$efront_string_expres], scope)
                    }
                    break;
                case Syntax[$efront_string_Functi1]:
                    break;
                case Syntax[$efront_string_ForInS]:
                    break;
                case Syntax[$efront_string_Functi]:
                    break;
                case Syntax[$efront_string_ForSta]:
                    if (node[$efront_string_init] && node[$efront_string_init][$efront_string_type] !== Syntax[$efront_string_Variab]) {
                        node[$efront_string_init] = voidContext(node[$efront_string_init], scope)
                    }
                    if (node[$efront_string_test]) {
                        node[$efront_string_test] = booleanContext(node[$efront_string_test], scope)
                    }
                    if (node[$efront_string_update]) {
                        node[$efront_string_update] = voidContext(node[$efront_string_update], scope)
                    }
                    break;
                case Syntax[$efront_string_Identi]:
                    break;
                case Syntax[$efront_string_IfStat]:
                    node[$efront_string_test] = booleanContext(node[$efront_string_test], scope);
                    break;
                case Syntax[$efront_string_Litera]:
                    break;
                case Syntax[$efront_string_Labele]:
                    break;
                case Syntax[$efront_string_Logica]:
                    break;
                case Syntax[$efront_string_Member]:
                    break;
                case Syntax[$efront_string_NewExp]:
                    break;
                case Syntax[$efront_string_Object]:
                    break;
                case Syntax[$efront_string_Progra]:
                    break;
                case Syntax[$efront_string_Proper]:
                    break;
                case Syntax[$efront_string_Return]:
                    break;
                case Syntax[$efront_string_Sequen]:
                    for (i = 0, iz = node[$efront_string_expres1][$efront_string_length] - 1; i < iz; ++i) {
                        node[$efront_string_expres1][i] = voidContext(node[$efront_string_expres1][i], scope)
                    }
                    break;
                case Syntax[$efront_string_Switch]:
                    break;
                case Syntax[$efront_string_Switch1]:
                    break;
                case Syntax[$efront_string_ThisEx]:
                    break;
                case Syntax[$efront_string_ThrowS]:
                    break;
                case Syntax[$efront_string_TrySta]:
                    break;
                case Syntax[$efront_string_UnaryE]:
                    if (node[$efront_string_operat] === $efront_string__21) {
                        node[$efront_string_argume1] = booleanContext(node[$efront_string_argume1], scope)
                    } else if (node[$efront_string_operat] === $efront_string_void) {
                        node[$efront_string_argume1] = voidContext(node[$efront_string_argume1], scope)
                    }
                    break;
                case Syntax[$efront_string_Update]:
                    break;
                case Syntax[$efront_string_Variab]:
                    break;
                case Syntax[$efront_string_Variab1]:
                    break;
                case Syntax[$efront_string_WhileS]:
                    node[$efront_string_test] = booleanContext(node[$efront_string_test], scope);
                    break;
                case Syntax[$efront_string_WithSt]:
                    break
                }
            }, _d[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    --stackCount
                }
            }, _d));
            manager[$efront_string_detach]();
            return _e = {}, _e[$efront_string_result] = result, _e[$efront_string_modifi] = modified, _e
        }
        removeContextSensitiveExpressions[$efront_string_passNa] = Name;
        module[$efront_string_export] = removeContextSensitiveExpressions
    }()
}],
/** 612 $efront_string_reduce */ "reduce-sequence-expression",
/** 613 pass$reduce-sequence-expression.js */ [1,15,612,334,295,3,77,255,455,47,525,530,529,271,242,406,366,531,247,428,290,37,502,503,347,434,353,414,307,326,421,325,231,22,445,447,246,272,224,273,262,261,294,460,467,219,424,425,422,415,539,540,504,13,function(require, module, $efront_string_reduce, $efront_string_Syntax, $efront_string_expres1, $efront_string_length, $efront_string_type, $efront_string_Sequen, $efront_string_delete1, $efront_string_push, $efront_string_consta, $efront_string_isCons, $efront_string_evalua, $efront_string_object, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_hasSid, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_leave, $efront_string_Condit, $efront_string_test, $efront_string_Array, $efront_string_last, $efront_string_Logica, $efront_string_left, $efront_string_Binary, $efront_string_right, $efront_string_Update, $efront_string_UnaryE, $efront_string_argume1, $efront_string_Specia, $efront_string_canExt, $efront_string_Assign, $efront_string_operat, $efront_string__4, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, evaluator, escope, modified;
        Name = $efront_string_reduce;
        escope = require(436);
        common = require(471);
        evaluator = require(533);
        Syntax = common[$efront_string_Syntax];
        function reduce(node) {
            var i, iz, j, jz, expr, result;
            result = [];
            for (i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                expr = node[$efront_string_expres1][i];
                if (expr[$efront_string_type] === Syntax[$efront_string_Sequen]) {
                    modified = true;
                    common[$efront_string_delete1](node);
                    for (j = 0, jz = expr[$efront_string_expres1][$efront_string_length]; j < jz; ++j) {
                        result[$efront_string_push](expr[$efront_string_expres1][j])
                    }
                } else {
                    result[$efront_string_push](expr)
                }
            }
            node[$efront_string_expres1] = result
        }
        function isLoadSideEffectFree(node, scope) {
            var ref, value;
            if (evaluator[$efront_string_consta][$efront_string_isCons](node)) {
                value = evaluator[$efront_string_consta][$efront_string_evalua](node);
                if (value === null || typeof value !== $efront_string_object) {
                    return true
                }
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                ref = scope[$efront_string_resolv1](node);
                return ref && ref[$efront_string_isStat]()
            }
            return false
        }
        function isStoreSideEffectFree(node, scope) {
            if (!evaluator[$efront_string_hasSid](node, scope)) {
                return true
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                return true
            }
            if (node[$efront_string_type] === Syntax[$efront_string_Member]) {
                if (!evaluator[$efront_string_hasSid](node[$efront_string_object], scope)) {
                    if (!node[$efront_string_comput] || isLoadSideEffectFree(node[$efront_string_proper], scope)) {
                        return true
                    }
                }
                return false
            }
            return false
        }
        function reduceSequenceExpression(tree, options) {
            var _a, _b, _c, _d;
            var result, scope, manager;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            manager[$efront_string_attach2]();
            result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                scope = manager[$efront_string_acquir](node) || scope
            }, _c[$efront_string_leave] = function leave(node) {
                var result, last;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Sequen]:
                    reduce(node);
                    break;
                case Syntax[$efront_string_Condit]:
                    if (node[$efront_string_test][$efront_string_type] === Syntax[$efront_string_Sequen]) {
                        modified = true;
                        result = node[$efront_string_test];
                        node[$efront_string_test] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break;
                case Syntax[$efront_string_Logica]:
                    if (node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Sequen]) {
                        modified = true;
                        result = node[$efront_string_left];
                        node[$efront_string_left] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break;
                case Syntax[$efront_string_Binary]:
                    if (node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Sequen]) {
                        modified = true;
                        result = node[$efront_string_left];
                        node[$efront_string_left] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    } else if (node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Sequen] && !evaluator[$efront_string_hasSid](node[$efront_string_left], scope)) {
                        modified = true;
                        result = node[$efront_string_right];
                        node[$efront_string_right] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break;
                case Syntax[$efront_string_Update]:
                case Syntax[$efront_string_UnaryE]:
                    if (node[$efront_string_argume1][$efront_string_type] === Syntax[$efront_string_Sequen]) {
                        last = common[$efront_string_Array][$efront_string_last](node[$efront_string_argume1][$efront_string_expres1]);
                        if (!common[$efront_string_Specia][$efront_string_canExt](last, node, scope)) {
                            break
                        }
                        modified = true;
                        result = node[$efront_string_argume1];
                        node[$efront_string_argume1] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break;
                case Syntax[$efront_string_Assign]:
                    if (node[$efront_string_operat] === $efront_string__4 && node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Sequen] && isStoreSideEffectFree(node[$efront_string_left], scope)) {
                        modified = true;
                        result = node[$efront_string_right];
                        node[$efront_string_right] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]);
                        result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break
                }
                scope = manager[$efront_string_releas](node) || scope;
                return result
            }, _c));
            manager[$efront_string_detach]();
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        reduceSequenceExpression[$efront_string_passNa] = Name;
        module[$efront_string_export] = reduceSequenceExpression
    }()
}],
/** 614 $efront_string_reduce1 */ "reduce-multiple-if-statements",
/** 615 pass$reduce-multiple-if-statements.js */ [1,15,614,334,37,502,503,347,323,325,77,243,285,284,22,246,424,508,272,273,539,540,504,13,function(require, module, $efront_string_reduce1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_test, $efront_string_Logica, $efront_string_operat, $efront_string__23, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_reduce1;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function reduceMultipleIfStatements(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var _a;
                if (node[$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_altern] && node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_conseq][$efront_string_altern]) {
                    modified = true;
                    node[$efront_string_test] = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = $efront_string__23, _a[$efront_string_left] = node[$efront_string_test], _a[$efront_string_right] = node[$efront_string_conseq][$efront_string_test], _a);
                    node[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_conseq]
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        reduceMultipleIfStatements[$efront_string_passNa] = Name;
        module[$efront_string_export] = reduceMultipleIfStatements
    }()
}],
/** 616 $efront_string_reduce2 */ "reduce-branch-jump",
/** 617 pass$reduce-branch-jump.js */ [1,15,616,334,77,243,285,284,254,294,454,255,295,22,460,462,231,331,37,502,503,347,323,325,223,252,278,3,459,257,539,540,504,13,function(require, module, $efront_string_reduce2, $efront_string_Syntax, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_Return, $efront_string_argume1, $efront_string_moveLo, $efront_string_Sequen, $efront_string_expres1, $efront_string_test, $efront_string_Specia, $efront_string_genera2, $efront_string_Condit, $efront_string_splice, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_length, $efront_string_isFunc, $efront_string_Switch1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_reduce2;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function reduceLast(ary, index) {
            var _a, _b, _c, _d;
            var node, left;
            node = ary[index];
            if (node[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                if (!node[$efront_string_altern]) {
                    if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return]) {
                        modified = true;
                        left = node[$efront_string_conseq][$efront_string_argume1];
                        if (!left) {
                            ary[index] = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Return], _a[$efront_string_argume1] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                                node[$efront_string_test],
                                common[$efront_string_Specia][$efront_string_genera2]()
                            ], _b), _a));
                            return true
                        }
                        ary[index] = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _c[$efront_string_argume1] = (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Condit], _d[$efront_string_test] = node[$efront_string_test], _d[$efront_string_conseq] = left, _d[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera2](), _d), _c));
                        return true
                    }
                }
            }
        }
        function reduce(ary, index) {
            var _a, _b, _c, _d;
            var node, sibling, left, right;
            node = ary[index];
            sibling = ary[index + 1];
            if (node[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                if (!node[$efront_string_altern]) {
                    if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return] && sibling[$efront_string_type] === Syntax[$efront_string_Return]) {
                        modified = true;
                        ary[$efront_string_splice](index, 1);
                        left = node[$efront_string_conseq][$efront_string_argume1];
                        right = sibling[$efront_string_argume1];
                        if (!left && !right) {
                            ary[index] = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Return], _a[$efront_string_argume1] = (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                                node[$efront_string_test],
                                common[$efront_string_Specia][$efront_string_genera2]()
                            ], _b), _a));
                            return true
                        }
                        if (!left) {
                            left = common[$efront_string_Specia][$efront_string_genera2]()
                        }
                        if (!right) {
                            right = common[$efront_string_Specia][$efront_string_genera2]()
                        }
                        ary[index] = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _c[$efront_string_argume1] = (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Condit], _d[$efront_string_test] = node[$efront_string_test], _d[$efront_string_conseq] = left, _d[$efront_string_altern] = right, _d), _c));
                        return true
                    }
                }
            }
            return false
        }
        function reduceBranchJump(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node, parent) {
                var i;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    i = 0;
                    while (i < node[$efront_string_body][$efront_string_length] - 1) {
                        if (!reduce(node[$efront_string_body], i)) {
                            ++i
                        }
                    }
                    if (common[$efront_string_isFunc](node, parent)) {
                        if (node[$efront_string_body][$efront_string_length] > 0) {
                            i = node[$efront_string_body][$efront_string_length] - 1;
                            reduceLast(node[$efront_string_body], i)
                        }
                    }
                    break;
                case Syntax[$efront_string_Switch1]:
                    i = 0;
                    while (i < node[$efront_string_conseq][$efront_string_length] - 1) {
                        if (!reduce(node[$efront_string_conseq], i)) {
                            ++i
                        }
                    }
                    break
                }
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        reduceBranchJump[$efront_string_passNa] = Name;
        module[$efront_string_export] = reduceBranchJump
    }()
}],
/** 618 $efront_string_hoist_ */ "hoist-variable-to-arguments",
/** 619 $efront_string_for_in */ /** text */ "for-in declaration length should be 1",
/** 620 pass$hoist-variable-to-arguments.js */ [1,15,618,334,275,3,56,47,278,307,326,77,241,240,318,263,429,178,239,451,303,619,287,282,242,238,454,219,424,425,272,273,236,255,295,237,286,37,502,503,347,434,353,414,323,226,249,280,208,421,409,411,415,539,540,504,13,function(require, module, $efront_string_hoist_, $efront_string_Syntax, $efront_string_params, $efront_string_length, $efront_string_name, $efront_string_push, $efront_string_body, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Functi1, $efront_string_Functi, $efront_string_skip, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_ForInS, $efront_string_assert, $efront_string_declar, $efront_string_for_in, $efront_string_init, $efront_string_id, $efront_string_Identi, $efront_string_ForSta, $efront_string_moveLo, $efront_string_Assign, $efront_string_operat, $efront_string__4, $efront_string_left, $efront_string_right, $efront_string_EmptyS, $efront_string_Sequen, $efront_string_expres1, $efront_string_Expres, $efront_string_expres, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_CallEx, $efront_string_NewExp, $efront_string_callee, $efront_string_argume, $efront_string_acquir, $efront_string_isArgu, $efront_string_isThis, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, escope, modified;
        Name = $efront_string_hoist_;
        escope = require(436);
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function hoist(callee) {
            var _a;
            function hoisting(ident) {
                var hoisted, i, iz;
                hoisted = false;
                for (i = 0, iz = callee[$efront_string_params][$efront_string_length]; i < iz; ++i) {
                    if (ident[$efront_string_name] === callee[$efront_string_params][i][$efront_string_name]) {
                        hoisted = true;
                        break
                    }
                }
                if (!hoisted) {
                    callee[$efront_string_params][$efront_string_push](ident)
                }
            }
            callee[$efront_string_body] = common[$efront_string_replac](callee[$efront_string_body], (_a = {}, _a[$efront_string_enter] = function (node, parent) {
                var _a, _b, _c, _d;
                var i, iz, expressions, declaration, forstmt, expr;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    this[$efront_string_skip]();
                    return
                }
                if (node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var) {
                    if (parent[$efront_string_type] === Syntax[$efront_string_ForInS]) {
                        common[$efront_string_assert](node[$efront_string_declar][$efront_string_length] === 1, $efront_string_for_in);
                        declaration = node[$efront_string_declar][0];
                        if (declaration[$efront_string_init]) {
                            return
                        }
                        if (declaration[$efront_string_id][$efront_string_type] !== Syntax[$efront_string_Identi]) {
                            return
                        }
                        hoisting(declaration[$efront_string_id]);
                        modified = true;
                        return declaration[$efront_string_id]
                    }
                    forstmt = parent[$efront_string_type] === Syntax[$efront_string_ForSta];
                    expressions = [];
                    for (i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i) {
                        declaration = node[$efront_string_declar][i];
                        if (declaration[$efront_string_id][$efront_string_type] !== Syntax[$efront_string_Identi]) {
                            return
                        }
                        hoisting(declaration[$efront_string_id]);
                        if (declaration[$efront_string_init]) {
                            expressions[$efront_string_push](common[$efront_string_moveLo](declaration, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Assign], _a[$efront_string_operat] = $efront_string__4, _a[$efront_string_left] = declaration[$efront_string_id], _a[$efront_string_right] = declaration[$efront_string_init], _a)))
                        }
                    }
                    modified = true;
                    if (expressions[$efront_string_length] === 0) {
                        if (forstmt) {
                            return null
                        }
                        return common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b))
                    }
                    if (expressions[$efront_string_length] === 1) {
                        expr = expressions[0]
                    } else {
                        expr = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Sequen], _c[$efront_string_expres1] = expressions, _c))
                    }
                    if (forstmt) {
                        return expr
                    }
                    return common[$efront_string_moveLo](node, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Expres], _d[$efront_string_expres] = expr, _d))
                }
            }, _a))
        }
        function hoistVariableToArguments(tree, options) {
            var _a, _b, _c, _d;
            var result, scope, manager;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            manager[$efront_string_attach2]();
            common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var callee;
                if (node[$efront_string_type] === Syntax[$efront_string_CallEx] || node[$efront_string_type] === Syntax[$efront_string_NewExp]) {
                    callee = node[$efront_string_callee];
                    if (callee[$efront_string_type] === Syntax[$efront_string_Functi1] && !callee[$efront_string_id]) {
                        if (callee[$efront_string_params][$efront_string_length] === node[$efront_string_argume][$efront_string_length]) {
                            scope = manager[$efront_string_acquir](callee);
                            if (!scope[$efront_string_isArgu]() && (node[$efront_string_type] !== Syntax[$efront_string_NewExp] || !scope[$efront_string_isThis]())) {
                                hoist(callee)
                            }
                        }
                    }
                }
            }, _c));
            manager[$efront_string_detach]();
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        hoistVariableToArguments[$efront_string_passNa] = Name;
        module[$efront_string_export] = hoistVariableToArguments
    }()
}],
/** 621 $efront_string_elimin */ "eliminate-duplicate-function-declarations",
/** 622 $efront_string_count */ "count",
/** 623 $efront_string_global1 */ /** text */ "global map remains",
/** 624 pass$eliminate-duplicate-function-declarations.js */ [1,15,621,334,307,326,77,240,282,56,37,622,454,236,223,318,303,3,445,447,502,503,347,40,47,41,241,325,324,46,451,623,539,540,504,13,function(require, module, $efront_string_elimin, $efront_string_Syntax, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Functi, $efront_string_id, $efront_string_name, $efront_string_get, $efront_string_count, $efront_string_moveLo, $efront_string_EmptyS, $efront_string_BlockS, $efront_string_skip, $efront_string_declar, $efront_string_length, $efront_string_Array, $efront_string_last, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_has, $efront_string_push, $efront_string_set, $efront_string_Functi1, $efront_string_leave, $efront_string_pop, $efront_string_keys, $efront_string_assert, $efront_string_global1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, Map, common, modified;
        Name = $efront_string_elimin;
        common = require(471);
        Map = require(50);
        Syntax = common[$efront_string_Syntax];
        function unique(map, root) {
            var _a;
            return common[$efront_string_replac](root, (_a = {}, _a[$efront_string_enter] = function (node) {
                var _a;
                var name, info;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    name = node[$efront_string_id][$efront_string_name];
                    info = map[$efront_string_get](name);
                    --info[$efront_string_count];
                    if (info[$efront_string_count] !== 0) {
                        modified = true;
                        return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a))
                    }
                }
                if (node !== root && node[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    return this[$efront_string_skip]()
                }
            }, _a))
        }
        function uniqueInGlobal(map, root) {
            var _a;
            return common[$efront_string_replac](root, (_a = {}, _a[$efront_string_enter] = function (node) {
                var _a;
                var name, info, first;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    name = node[$efront_string_id][$efront_string_name];
                    info = map[$efront_string_get](name);
                    first = info[$efront_string_count] === info[$efront_string_declar][$efront_string_length];
                    --info[$efront_string_count];
                    if (info[$efront_string_declar][$efront_string_length] > 1) {
                        if (first) {
                            modified = true;
                            return common[$efront_string_Array][$efront_string_last](info[$efront_string_declar])
                        } else {
                            modified = true;
                            return common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a))
                        }
                    }
                }
                if (node !== root && node[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    return this[$efront_string_skip]()
                }
            }, _a))
        }
        function main(tree, options) {
            var _a, _b, _c;
            var result, stack, functionDepth, globalBlockFound;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            functionDepth = 0;
            globalBlockFound = false;
            stack = [new Map];
            result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a;
                var map, name, info;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    name = node[$efront_string_id][$efront_string_name];
                    map = common[$efront_string_Array][$efront_string_last](stack);
                    if (map[$efront_string_has](name)) {
                        info = map[$efront_string_get](name);
                        info[$efront_string_declar][$efront_string_push](node);
                        ++info[$efront_string_count]
                    } else {
                        info = (_a = {}, _a[$efront_string_declar] = [node], _a[$efront_string_count] = 1, _a);
                        map[$efront_string_set](name, info)
                    }
                }
                if (node[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    stack[$efront_string_push](new Map)
                }
                if (node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) {
                    ++functionDepth
                }
            }, _b[$efront_string_leave] = function leave(node) {
                var map, ret;
                if (node[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    map = stack[$efront_string_pop]();
                    if (functionDepth === 0) {
                        if (map[$efront_string_keys]()[$efront_string_length] !== 0) {
                            globalBlockFound = true
                        }
                    } else {
                        ret = unique(map, node)
                    }
                }
                if (node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) {
                    --functionDepth
                }
                return ret
            }, _b));
            common[$efront_string_assert](stack[$efront_string_length] === 1, $efront_string_global1);
            if (!globalBlockFound) {
                result = uniqueInGlobal(stack[0], result)
            }
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        main[$efront_string_passNa] = Name;
        module[$efront_string_export] = main
    }()
}],
/** 625 $efront_string_drop_v */ "drop-variable-definition",
/** 626 $efront_string_candid */ "candidates",
/** 627 $efront_string_slots */ "slots",
/** 628 $efront_string___$par */ "__$parent$__",
/** 629 pass$drop-variable-definition.js */ [1,15,625,334,626,389,3,372,47,627,373,368,360,361,628,77,219,264,531,356,303,331,451,323,326,413,37,502,503,347,434,353,414,307,390,366,263,429,178,9,282,238,454,236,240,421,325,422,415,539,540,504,13,function(require, module, $efront_string_drop_v, $efront_string_Syntax, $efront_string_candid, $efront_string_variab, $efront_string_length, $efront_string_identi1, $efront_string_push, $efront_string_slots, $efront_string_refere, $efront_string_isRead, $efront_string_isWrit, $efront_string_writeE, $efront_string___$par, $efront_string_type, $efront_string_Assign, $efront_string_Variab1, $efront_string_hasSid, $efront_string_from, $efront_string_declar, $efront_string_splice, $efront_string_assert, $efront_string_traver, $efront_string_enter, $efront_string___$esc, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_variab1, $efront_string_isStat, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_indexO, $efront_string_id, $efront_string_ForSta, $efront_string_moveLo, $efront_string_EmptyS, $efront_string_Functi, $efront_string_acquir, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified, escope, evaluator;
        Name = $efront_string_drop_v;
        common = require(471);
        escope = require(436);
        evaluator = require(533);
        Syntax = common[$efront_string_Syntax];
        function getCandidates(scope) {
            var _a;
            var i, iz, j, jz, identifiers, slots, v;
            if (!scope[$efront_string_candid]) {
                slots = [];
                identifiers = [];
                for (i = 0, iz = scope[$efront_string_variab][$efront_string_length]; i < iz; ++i) {
                    v = scope[$efront_string_variab][i];
                    for (j = 0, jz = v[$efront_string_identi1][$efront_string_length]; j < jz; ++j) {
                        identifiers[$efront_string_push](v[$efront_string_identi1][j]);
                        slots[$efront_string_push](v)
                    }
                }
                scope[$efront_string_candid] = (_a = {}, _a[$efront_string_slots] = slots, _a[$efront_string_identi1] = identifiers, _a)
            }
            return scope[$efront_string_candid]
        }
        function isRemovableDefinition(slot) {
            var i, iz, ref, parent;
            if (slot[$efront_string_identi1][$efront_string_length] !== 1) {
                return false
            }
            if (slot[$efront_string_refere][$efront_string_length] === 0) {
                return true
            }
            for (i = 0, iz = slot[$efront_string_refere][$efront_string_length]; i < iz; ++i) {
                ref = slot[$efront_string_refere][i];
                if (ref[$efront_string_isRead]()) {
                    return false
                }
                if (ref[$efront_string_isWrit]()) {
                    if (!ref[$efront_string_writeE]) {
                        return false
                    }
                    parent = ref[$efront_string_writeE][$efront_string___$par];
                    if (!parent) {
                        return false
                    }
                    if (parent[$efront_string_type] !== Syntax[$efront_string_Assign] && parent[$efront_string_type] !== Syntax[$efront_string_Variab1]) {
                        return false
                    }
                    if (evaluator[$efront_string_hasSid](ref[$efront_string_writeE], ref[$efront_string_from])) {
                        return false
                    }
                }
            }
            return true
        }
        function overrideExpression(from, to) {
            var key;
            for (key in from) {
                delete from[key]
            }
            for (key in to) {
                from[key] = to[key]
            }
            return from
        }
        function removeDefinition(node, index, slot) {
            var i, iz, ref, parent;
            node[$efront_string_declar][$efront_string_splice](index, 1);
            for (i = 0, iz = slot[$efront_string_refere][$efront_string_length]; i < iz; ++i) {
                ref = slot[$efront_string_refere][i];
                common[$efront_string_assert](!ref[$efront_string_isRead]());
                if (ref[$efront_string_isWrit]()) {
                    parent = ref[$efront_string_writeE][$efront_string___$par];
                    if (parent[$efront_string_type] === Syntax[$efront_string_Assign]) {
                        overrideExpression(ref[$efront_string_writeE][$efront_string___$par], ref[$efront_string_writeE])
                    }
                }
            }
        }
        function attachParent(tree) {
            var _a;
            return common[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function (node, parent) {
                node[$efront_string___$par] = parent
            }, _a))
        }
        function removeParent(tree) {
            var _a;
            return common[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                delete node[$efront_string___$par];
                delete node[$efront_string___$esc]
            }, _a))
        }
        function dropVariableDefinition(tree, options) {
            var _a, _b, _c, _d;
            var result, manager, scope;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            scope = null;
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            manager[$efront_string_attach2]();
            attachParent(result);
            result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node, parent) {
                var _a, _b;
                var i, decl, cand, index, slot, ret;
                ret = node;
                if (scope) {
                    if (scope[$efront_string_variab1][$efront_string_isStat]()) {
                        cand = getCandidates(scope[$efront_string_variab1]);
                        if (node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var) {
                            i = node[$efront_string_declar][$efront_string_length];
                            while (i--) {
                                decl = node[$efront_string_declar][i];
                                index = cand[$efront_string_identi1][$efront_string_indexO](decl[$efront_string_id]);
                                if (index !== -1) {
                                    slot = cand[$efront_string_slots][index];
                                    if (isRemovableDefinition(slot)) {
                                        modified = true;
                                        removeDefinition(node, i, slot);
                                        continue
                                    }
                                }
                            }
                            if (node[$efront_string_declar][$efront_string_length] === 0) {
                                if (parent[$efront_string_type] === Syntax[$efront_string_ForSta]) {
                                    ret = null
                                } else {
                                    ret = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a))
                                }
                            }
                        }
                        if (node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                            index = cand[$efront_string_identi1][$efront_string_indexO](node[$efront_string_id]);
                            if (index !== -1) {
                                slot = cand[$efront_string_slots][index];
                                if (slot[$efront_string_identi1][$efront_string_length] === 1 && slot[$efront_string_refere][$efront_string_length] === 0) {
                                    modified = true;
                                    ret = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b));
                                    return ret
                                }
                            }
                        }
                    }
                }
                scope = manager[$efront_string_acquir](node) || scope;
                return ret
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c));
            manager[$efront_string_detach]();
            removeParent(result);
            return _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        dropVariableDefinition[$efront_string_passNa] = Name;
        module[$efront_string_export] = dropVariableDefinition
    }()
}],
/** 630 $efront_string_dead_c */ "dead-code-elimination",
/** 631 $efront_string_labels */ "labels",
/** 632 $efront_string_NAMED_ */ "NAMED_ONLY",
/** 633 $efront_string_ITERAT */ "ITERATION",
/** 634 $efront_string_SWITCH */ "SWITCH",
/** 635 $efront_string_isIter */ "isIteration",
/** 636 $efront_string_isAnon */ "isAnonymous",
/** 637 $efront_string_contai */ "contains",
/** 638 $efront_string_target1 */ "targets",
/** 639 $efront_string_lookup */ "lookupContinuableTarget",
/** 640 $efront_string_lookup1 */ "lookupBreakableTarget",
/** 641 $efront_string_jumps */ "jumps",
/** 642 $efront_string_next */ "next",
/** 643 $efront_string_NEXT */ "NEXT",
/** 644 $efront_string_insert */ "insert",
/** 645 $efront_string_erase */ "erase",
/** 646 $efront_string_kill */ "kill",
/** 647 $efront_string_jumpTo */ "jumpTo",
/** 648 $efront_string_resolv2 */ "resolveJump",
/** 649 $efront_string_isDead */ "isDead",
/** 650 $efront_string_revive */ "revive",
/** 651 $efront_string_isRequ */ "isRequired",
/** 652 $efront_string_should */ /** text */ "should be node",
/** 653 $efront_string___$con */ "__$context",
/** 654 $efront_string_lookup2 */ "lookup",
/** 655 $efront_string_status */ /** text */ "status should be null",
/** 656 pass$dead-code-elimination.js */ [1,15,630,334,65,77,631,632,633,634,36,635,636,637,9,638,639,3,56,452,640,47,324,314,380,641,642,643,644,645,331,646,40,647,648,43,649,650,587,279,591,651,451,652,252,241,240,653,415,654,243,285,284,266,245,278,223,445,447,232,456,22,454,261,424,506,294,323,326,337,305,225,227,235,233,236,237,238,287,288,239,272,273,254,256,296,297,257,259,260,298,299,302,265,263,325,37,502,503,347,655,539,540,504,13,function(require, module, $efront_string_dead_c, $efront_string_Syntax, $efront_string_node, $efront_string_type, $efront_string_labels, $efront_string_NAMED_, $efront_string_ITERAT, $efront_string_SWITCH, $efront_string_protot, $efront_string_isIter, $efront_string_isAnon, $efront_string_contai, $efront_string_indexO, $efront_string_target1, $efront_string_lookup, $efront_string_length, $efront_string_name, $efront_string_unreac, $efront_string_lookup1, $efront_string_push, $efront_string_pop, $efront_string_curren, $efront_string_upper, $efront_string_jumps, $efront_string_next, $efront_string_NEXT, $efront_string_insert, $efront_string_erase, $efront_string_splice, $efront_string_kill, $efront_string_has, $efront_string_jumpTo, $efront_string_resolv2, $efront_string_clear, $efront_string_isDead, $efront_string_revive, $efront_string_regist, $efront_string_label, $efront_string_unregi, $efront_string_isRequ, $efront_string_assert, $efront_string_should, $efront_string_Progra, $efront_string_Functi1, $efront_string_Functi, $efront_string___$con, $efront_string_detach, $efront_string_lookup2, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_WithSt, $efront_string_Labele, $efront_string_body, $efront_string_BlockS, $efront_string_Array, $efront_string_last, $efront_string_Contin, $efront_string_conver, $efront_string_test, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__21, $efront_string_argume1, $efront_string_traver, $efront_string_enter, $efront_string_Visito1, $efront_string_Skip, $efront_string_BreakS, $efront_string_CatchC, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_ForSta, $efront_string_init, $efront_string_update, $efront_string_ForInS, $efront_string_left, $efront_string_right, $efront_string_Return, $efront_string_Switch, $efront_string_discri, $efront_string_cases, $efront_string_Switch1, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_block, $efront_string_handle, $efront_string_finali, $efront_string_WhileS, $efront_string_Variab, $efront_string_leave, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_status, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, status, modified;
        Name = $efront_string_dead_c;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function JumpTarget(node, status, type) {
            this[$efront_string_node] = node;
            this[$efront_string_type] = type;
            this[$efront_string_labels] = status[$efront_string_labels] || [];
            status[$efront_string_labels] = null
        }
        JumpTarget[$efront_string_NAMED_] = 0;
        JumpTarget[$efront_string_ITERAT] = 2;
        JumpTarget[$efront_string_SWITCH] = 3;
        JumpTarget[$efront_string_protot][$efront_string_isIter] = function isIteration() {
            return this[$efront_string_type] === JumpTarget[$efront_string_ITERAT]
        };
        JumpTarget[$efront_string_protot][$efront_string_isAnon] = function isAnonymous() {
            return this[$efront_string_type] & 2
        };
        JumpTarget[$efront_string_protot][$efront_string_contai] = function contains(label) {
            return this[$efront_string_labels][$efront_string_indexO](label) !== -1
        };
        function Jumps() {
            this[$efront_string_target1] = []
        }
        Jumps[$efront_string_protot][$efront_string_lookup] = function lookupContinuableTarget(label) {
            var i, target;
            for (i = this[$efront_string_target1][$efront_string_length] - 1; i >= 0; --i) {
                target = this[$efront_string_target1][i];
                if (target[$efront_string_isIter]() && (!label || target[$efront_string_contai](label[$efront_string_name]))) {
                    return target[$efront_string_node]
                }
            }
            common[$efront_string_unreac]()
        };
        Jumps[$efront_string_protot][$efront_string_lookup1] = function lookupBreakableTarget(label) {
            var i, target;
            for (i = this[$efront_string_target1][$efront_string_length] - 1; i >= 0; --i) {
                target = this[$efront_string_target1][i];
                if (label) {
                    if (target[$efront_string_contai](label[$efront_string_name])) {
                        return target[$efront_string_node]
                    }
                } else {
                    if (target[$efront_string_isAnon]()) {
                        return target[$efront_string_node]
                    }
                }
            }
            common[$efront_string_unreac]()
        };
        Jumps[$efront_string_protot][$efront_string_push] = function push(target) {
            this[$efront_string_target1][$efront_string_push](target)
        };
        Jumps[$efront_string_protot][$efront_string_pop] = function pop() {
            this[$efront_string_target1][$efront_string_pop]()
        };
        function Status(upper) {
            this[$efront_string_curren] = [];
            this[$efront_string_upper] = upper;
            this[$efront_string_jumps] = new Jumps;
            this[$efront_string_labels] = null;
            this[$efront_string_next]()
        }
        Status[$efront_string_NEXT] = {};
        Status[$efront_string_protot][$efront_string_insert] = function insert(stmt) {
            this[$efront_string_curren][$efront_string_push](stmt)
        };
        Status[$efront_string_protot][$efront_string_erase] = function erase(stmt) {
            var index = this[$efront_string_curren][$efront_string_indexO](stmt);
            if (index === -1) {
                return false
            }
            this[$efront_string_curren][$efront_string_splice](index, 1);
            return true
        };
        Status[$efront_string_protot][$efront_string_kill] = function kill() {
            return this[$efront_string_erase](Status[$efront_string_NEXT])
        };
        Status[$efront_string_protot][$efront_string_has] = function has(stmt) {
            return this[$efront_string_curren][$efront_string_indexO](stmt) !== -1
        };
        Status[$efront_string_protot][$efront_string_jumpTo] = function jumpTo(stmt) {
            this[$efront_string_kill]();
            this[$efront_string_insert](stmt)
        };
        Status[$efront_string_protot][$efront_string_resolv2] = function resolveJump(stmt) {
            var index = this[$efront_string_curren][$efront_string_indexO](stmt);
            if (index !== -1) {
                this[$efront_string_curren][$efront_string_splice](index, 1);
                this[$efront_string_insert](Status[$efront_string_NEXT])
            }
        };
        Status[$efront_string_protot][$efront_string_clear] = function clear() {
            this[$efront_string_curren][$efront_string_length] = 0
        };
        Status[$efront_string_protot][$efront_string_next] = function next() {
            this[$efront_string_insert](Status[$efront_string_NEXT])
        };
        Status[$efront_string_protot][$efront_string_isDead] = function isDead() {
            return !this[$efront_string_has](Status[$efront_string_NEXT])
        };
        Status[$efront_string_protot][$efront_string_revive] = function revive() {
            if (this[$efront_string_isDead]()) {
                this[$efront_string_next]();
                return true
            }
            return false
        };
        Status[$efront_string_protot][$efront_string_regist] = function register(node) {
            if (!this[$efront_string_labels]) {
                this[$efront_string_labels] = []
            }
            this[$efront_string_labels][$efront_string_push](node[$efront_string_label][$efront_string_name])
        };
        Status[$efront_string_protot][$efront_string_unregi] = function unregister() {
            this[$efront_string_labels] = null
        };
        Status[$efront_string_isRequ] = function isRequired(node) {
            var type = node[$efront_string_type];
            common[$efront_string_assert](node, $efront_string_should);
            return type === Syntax[$efront_string_Progra] || type === Syntax[$efront_string_Functi1] || type === Syntax[$efront_string_Functi]
        };
        function Context(node) {
            node[$efront_string___$con] = this;
            this[$efront_string_node] = node
        }
        Context[$efront_string_protot][$efront_string_detach] = function detach() {
            delete this[$efront_string_node][$efront_string___$con]
        };
        Context[$efront_string_lookup2] = function lookup(node) {
            return node[$efront_string___$con]
        };
        function getForwardLastNode(node) {
            while (true) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_IfStat]:
                    if (node[$efront_string_altern]) {
                        return null
                    }
                    node = node[$efront_string_conseq];
                    continue;
                case Syntax[$efront_string_WithSt]:
                case Syntax[$efront_string_Labele]:
                    node = node[$efront_string_body];
                    continue;
                case Syntax[$efront_string_BlockS]:
                    if (node[$efront_string_body][$efront_string_length]) {
                        node = common[$efront_string_Array][$efront_string_last](node[$efront_string_body]);
                        continue
                    }
                    break
                }
                return node
            }
        }
        function visitLoopBody(loop, body) {
            var jump, last;
            last = getForwardLastNode(body);
            if (last) {
                if (last[$efront_string_type] === Syntax[$efront_string_Contin]) {
                    jump = status[$efront_string_jumps][$efront_string_lookup](last[$efront_string_label]);
                    if (jump === loop) {
                        modified = true;
                        common[$efront_string_conver](last)
                    }
                }
            }
            return visit(body)
        }
        function visit(target) {
            var _a;
            var live = false;
            if (!target) {
                return !status[$efront_string_isDead]()
            }
            function eliminate(node, array) {
                var _a;
                var i, iz, stmt, ret, info, result;
                result = [];
                for (i = 0, iz = array[$efront_string_length]; i < iz; ++i) {
                    stmt = array[i];
                    if (stmt[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                        info = new Context(stmt);
                        ret = visit(stmt);
                        info[$efront_string_detach]()
                    } else {
                        ret = visit(stmt)
                    }
                    if (ret) {
                        live |= 1;
                        result[$efront_string_push](stmt);
                        if (stmt[$efront_string_type] === Syntax[$efront_string_IfStat] && stmt[$efront_string_altern]) {
                            if ((!info[$efront_string_conseq] || !info[$efront_string_altern]) && info[$efront_string_conseq] !== info[$efront_string_altern]) {
                                modified = true;
                                if (info[$efront_string_conseq]) {
                                    stmt[$efront_string_test] = common[$efront_string_moveLo](stmt[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_argume1] = stmt[$efront_string_test], _a));
                                    result[$efront_string_push](stmt[$efront_string_conseq]);
                                    stmt[$efront_string_conseq] = stmt[$efront_string_altern];
                                    stmt[$efront_string_altern] = null
                                } else {
                                    result[$efront_string_push](stmt[$efront_string_altern]);
                                    stmt[$efront_string_altern] = null
                                }
                            }
                        }
                    } else {
                        modified = true
                    }
                }
                return result
            }
            common[$efront_string_traver](target, (_a = {}, _a[$efront_string_enter] = function enter(node) {
                var i, iz, stmt, consequent, alternate, ctx, hasDefaultClause;
                if (Status[$efront_string_isRequ](node)) {
                    status = new Status(status)
                }
                live |= !status[$efront_string_isDead]();
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Progra]:
                    node[$efront_string_body] = eliminate(node, node[$efront_string_body]);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_BlockS]:
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_NAMED_]));
                    node[$efront_string_body] = eliminate(node, node[$efront_string_body]);
                    status[$efront_string_jumps][$efront_string_pop]();
                    status[$efront_string_resolv2](node);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_BreakS]:
                    if (node[$efront_string_label] && status[$efront_string_labels] && status[$efront_string_labels][$efront_string_indexO](node[$efront_string_label])) {
                        modified = true;
                        common[$efront_string_conver](node)
                    } else {
                        status[$efront_string_jumpTo](status[$efront_string_jumps][$efront_string_lookup1](node[$efront_string_label]))
                    }
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_CatchC]:
                    live |= visit(node[$efront_string_body]);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Contin]:
                    status[$efront_string_jumpTo](status[$efront_string_jumps][$efront_string_lookup](node[$efront_string_label]));
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_DoWhil]:
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_ITERAT]));
                    live |= visitLoopBody(node, node[$efront_string_body]);
                    status[$efront_string_jumps][$efront_string_pop]();
                    live |= visit(node[$efront_string_test]);
                    status[$efront_string_resolv2](node);
                    status[$efront_string_revive]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Debugg]:
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_EmptyS]:
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Expres]:
                    break;
                case Syntax[$efront_string_ForSta]:
                    live |= visit(node[$efront_string_init]);
                    live |= visit(node[$efront_string_test]);
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_ITERAT]));
                    live |= visitLoopBody(node, node[$efront_string_body]);
                    status[$efront_string_jumps][$efront_string_pop]();
                    live |= visit(node[$efront_string_update]);
                    status[$efront_string_resolv2](node);
                    status[$efront_string_revive]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_ForInS]:
                    live |= visit(node[$efront_string_left]);
                    live |= visit(node[$efront_string_right]);
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_ITERAT]));
                    live |= visitLoopBody(node, node[$efront_string_body]);
                    status[$efront_string_jumps][$efront_string_pop]();
                    status[$efront_string_resolv2](node);
                    status[$efront_string_revive]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_IfStat]:
                    live |= visit(node[$efront_string_test]);
                    live |= visit(node[$efront_string_conseq]);
                    if (!node[$efront_string_altern]) {
                        status[$efront_string_revive]();
                        return common[$efront_string_Visito1][$efront_string_Skip]
                    }
                    consequent = !status[$efront_string_isDead]();
                    if (!status[$efront_string_revive]()) {
                        status[$efront_string_insert](node)
                    }
                    live |= visit(node[$efront_string_altern]);
                    alternate = !status[$efront_string_isDead]();
                    if (status[$efront_string_erase](node)) {
                        status[$efront_string_revive]()
                    }
                    if (ctx = Context[$efront_string_lookup2](node)) {
                        ctx[$efront_string_conseq] = consequent;
                        ctx[$efront_string_altern] = alternate
                    }
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Labele]:
                    status[$efront_string_regist](node);
                    break;
                case Syntax[$efront_string_Return]:
                    live |= visit(node[$efront_string_argume1]);
                    status[$efront_string_kill]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Switch]:
                    visit(node[$efront_string_discri]);
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_SWITCH]));
                    for (i = 0, iz = node[$efront_string_cases][$efront_string_length]; i < iz; ++i) {
                        stmt = node[$efront_string_cases][i];
                        live |= visit(stmt);
                        if (!stmt[$efront_string_test]) {
                            hasDefaultClause = true
                        }
                        if (status[$efront_string_isDead]() && i + 1 < iz) {
                            status[$efront_string_next]()
                        }
                    }
                    status[$efront_string_jumps][$efront_string_pop]();
                    status[$efront_string_resolv2](node);
                    if (status[$efront_string_isDead]() && !hasDefaultClause) {
                        status[$efront_string_next]()
                    }
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Switch1]:
                    if (node[$efront_string_test]) {
                        live |= visit(node[$efront_string_test])
                    }
                    node[$efront_string_conseq] = eliminate(node, node[$efront_string_conseq]);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_ThrowS]:
                    live |= visit(node[$efront_string_argume1]);
                    status[$efront_string_kill]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_TrySta]:
                    live |= visit(node[$efront_string_block]);
                    if (node[$efront_string_handle] && node[$efront_string_handle][$efront_string_length]) {
                        if (!status[$efront_string_revive]()) {
                            status[$efront_string_insert](node)
                        }
                        node[$efront_string_handle] = eliminate(node, node[$efront_string_handle]);
                        if (status[$efront_string_erase](node)) {
                            status[$efront_string_revive]()
                        }
                    }
                    if (node[$efront_string_finali]) {
                        if (!status[$efront_string_revive]()) {
                            status[$efront_string_insert](node)
                        }
                        live |= visit(node[$efront_string_finali]);
                        if (!status[$efront_string_erase](node)) {
                            status[$efront_string_kill]()
                        }
                    }
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_WhileS]:
                    live |= visit(node[$efront_string_test]);
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_ITERAT]));
                    live |= visitLoopBody(node, node[$efront_string_body]);
                    status[$efront_string_jumps][$efront_string_pop]();
                    status[$efront_string_resolv2](node);
                    status[$efront_string_revive]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_WithSt]:
                    break;
                case Syntax[$efront_string_Variab]:
                case Syntax[$efront_string_Functi]:
                    live = true;
                    break
                }
            }, _a[$efront_string_leave] = function leave(node) {
                if (Status[$efront_string_isRequ](node)) {
                    status = status[$efront_string_upper];
                    return
                }
                if (node[$efront_string_type] === Syntax[$efront_string_Labele]) {
                    status[$efront_string_unregi]()
                }
            }, _a));
            return live
        }
        function deadCodeElimination(tree, options) {
            var _a, _b;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            status = null;
            modified = false;
            visit(result);
            common[$efront_string_assert](status === null, $efront_string_status);
            return _b = {}, _b[$efront_string_result] = result, _b[$efront_string_modifi] = modified, _b
        }
        deadCodeElimination[$efront_string_passNa] = Name;
        module[$efront_string_export] = deadCodeElimination
    }()
}],
/** 657 $efront_string_concat1 */ "concatenate-variable-definition",
/** 658 pass$concatenate-variable-definition.js */ [1,15,657,334,37,502,503,347,323,325,77,223,252,278,3,263,429,178,47,303,539,540,504,13,function(require, module, $efront_string_concat1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_type, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_length, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_push, $efront_string_declar, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function () {
        'use strict';
        var Name, Syntax, common, modified;
        Name = $efront_string_concat1;
        common = require(471);
        Syntax = common[$efront_string_Syntax];
        function concatenateVariableDefinition(tree, options) {
            var _a, _b, _c;
            var result;
            result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree);
            modified = false;
            common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var i, iz, j, jz, stmt, decl, target, body;
                if (node[$efront_string_type] !== Syntax[$efront_string_BlockS] && node[$efront_string_type] !== Syntax[$efront_string_Progra]) {
                    return
                }
                target = null;
                body = [];
                for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    stmt = node[$efront_string_body][i];
                    if (stmt[$efront_string_type] === Syntax[$efront_string_Variab] && stmt[$efront_string_kind] === $efront_string_var) {
                        if (!target) {
                            target = stmt;
                            body[$efront_string_push](stmt);
                            continue
                        }
                        modified = true;
                        for (j = 0, jz = stmt[$efront_string_declar][$efront_string_length]; j < jz; ++j) {
                            decl = stmt[$efront_string_declar][j];
                            target[$efront_string_declar][$efront_string_push](decl)
                        }
                    } else {
                        target = null;
                        body[$efront_string_push](stmt)
                    }
                }
                node[$efront_string_body] = body
            }, _b));
            return _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        concatenateVariableDefinition[$efront_string_passNa] = Name;
        module[$efront_string_export] = concatenateVariableDefinition
    }()
}],
/** 659 $efront_string__dev */ "-dev",
/** 660 $efront_string__scope */ "_scope",
/** 661 $efront_string__funct1 */ "_functionName",
/** 662 $efront_string_distin */ "distinguishFunctionExpressionScope",
/** 663 $efront_string_passAs */ "passAsUnique",
/** 664 $efront_string_genera5 */ "generateName",
/** 665 $efront_string_9 */ "9",
/** 666 $efront_string_sort */ "sort",
/** 667 $efront_string_users */ "users",
/** 668 $efront_string_names */ "names",
/** 669 $efront_string_mangle1 */ "mangle",
/** 670 $efront_string_map */ "map",
/** 671 $efront_string_node_s */ /** text */ "node should be LabeledStatement",
/** 672 esshorten$lib$esshorten.js */ [1,55,51,62,334,9,659,3,660,661,662,380,391,298,282,56,36,663,216,210,212,386,40,388,355,664,346,366,665,389,666,357,372,373,65,667,668,669,41,279,670,631,587,77,245,671,47,588,591,37,42,406,592,593,323,326,432,423,225,232,325,502,347,434,353,417,function(require, Error, exports, $efront_string_versio, $efront_string_Syntax, $efront_string_indexO, $efront_string__dev, $efront_string_length, $efront_string__scope, $efront_string__funct1, $efront_string_distin, $efront_string_upper, $efront_string_functi1, $efront_string_block, $efront_string_id, $efront_string_name, $efront_string_protot, $efront_string_passAs, $efront_string_keywor, $efront_string_isKeyw, $efront_string_isRest, $efront_string_taints, $efront_string_has, $efront_string_throug, $efront_string_identi, $efront_string_genera5, $efront_string_genera, $efront_string_isStat, $efront_string_9, $efront_string_variab, $efront_string_sort, $efront_string_tainte, $efront_string_identi1, $efront_string_refere, $efront_string_node, $efront_string_users, $efront_string_names, $efront_string_mangle1, $efront_string_set, $efront_string_label, $efront_string_map, $efront_string_labels, $efront_string_regist, $efront_string_type, $efront_string_Labele, $efront_string_node_s, $efront_string_push, $efront_string_duplic, $efront_string_unregi, $efront_string_get, $efront_string_delete, $efront_string_resolv1, $efront_string_unreso, $efront_string_close, $efront_string_traver, $efront_string_enter, $efront_string_Scope, $efront_string_isVari, $efront_string_BreakS, $efront_string_Contin, $efront_string_leave, $efront_string_destru, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_scopes) {
    return function () {
        'use strict';
        var escope, estraverse, esutils, utility, version, assert, Syntax, Map;
        escope = require(436);
        estraverse = require(350);
        esutils = require(349);
        utility = require(348);
        Map = require(113);
        version = require(112)[$efront_string_versio];
        Syntax = estraverse[$efront_string_Syntax];
        assert = function assert(cond, message) {
            if (!cond) {
                throw new Error(message)
            }
        };
        if (version[$efront_string_indexO]($efront_string__dev, version[$efront_string_length] - 4) === -1) {
            assert = function () {
            }
        }
        function NameGenerator(scope, options) {
            this[$efront_string__scope] = scope;
            this[$efront_string__funct1] = '';
            if (!options[$efront_string_distin] && this[$efront_string__scope][$efront_string_upper] && this[$efront_string__scope][$efront_string_upper][$efront_string_functi1]) {
                this[$efront_string__funct1] = this[$efront_string__scope][$efront_string_upper][$efront_string_block][$efront_string_id][$efront_string_name]
            }
        }
        NameGenerator[$efront_string_protot][$efront_string_passAs] = function passAsUnique(name) {
            var i, iz;
            if (this[$efront_string__funct1] === name) {
                return false
            }
            if (esutils[$efront_string_keywor][$efront_string_isKeyw](name, true) || esutils[$efront_string_keywor][$efront_string_isRest](name)) {
                return false
            }
            if (this[$efront_string__scope][$efront_string_taints][$efront_string_has](name)) {
                return false
            }
            for (i = 0, iz = this[$efront_string__scope][$efront_string_throug][$efront_string_length]; i < iz; ++i) {
                if (this[$efront_string__scope][$efront_string_throug][i][$efront_string_identi][$efront_string_name] === name) {
                    return false
                }
            }
            return true
        };
        NameGenerator[$efront_string_protot][$efront_string_genera5] = function generateName(tip) {
            do {
                tip = utility[$efront_string_genera](tip)
            } while (!this[$efront_string_passAs](tip));
            return tip
        };
        function run(scope, options) {
            var i, iz, j, jz, variable, name, def, ref, generator;
            generator = new NameGenerator(scope, options);
            if (scope[$efront_string_isStat]()) {
                name = $efront_string_9;
                scope[$efront_string_variab][$efront_string_sort](function (a, b) {
                    if (a[$efront_string_tainte]) {
                        return 1
                    }
                    if (b[$efront_string_tainte]) {
                        return -1
                    }
                    return b[$efront_string_identi1][$efront_string_length] + b[$efront_string_refere][$efront_string_length] - (a[$efront_string_identi1][$efront_string_length] + a[$efront_string_refere][$efront_string_length])
                });
                for (i = 0, iz = scope[$efront_string_variab][$efront_string_length]; i < iz; ++i) {
                    variable = scope[$efront_string_variab][i];
                    if (variable[$efront_string_tainte]) {
                        continue
                    }
                    if (variable[$efront_string_identi1][$efront_string_length] === 0) {
                        continue
                    }
                    name = generator[$efront_string_genera5](name);
                    for (j = 0, jz = variable[$efront_string_identi1][$efront_string_length]; j < jz; ++j) {
                        def = variable[$efront_string_identi1][j];
                        def[$efront_string_name] = name
                    }
                    for (j = 0, jz = variable[$efront_string_refere][$efront_string_length]; j < jz; ++j) {
                        ref = variable[$efront_string_refere][j];
                        ref[$efront_string_identi][$efront_string_name] = name
                    }
                }
            }
        }
        function Label(node, upper) {
            this[$efront_string_node] = node;
            this[$efront_string_upper] = upper;
            this[$efront_string_users] = [];
            this[$efront_string_names] = new Map;
            this[$efront_string_name] = null
        }
        Label[$efront_string_protot][$efront_string_mangle1] = function () {
            var tip, current, i, iz;
            tip = $efront_string_9;
            for (current = this[$efront_string_upper]; current; current = current[$efront_string_upper]) {
                if (current[$efront_string_name] !== null) {
                    this[$efront_string_names][$efront_string_set](current[$efront_string_name], true)
                }
            }
            do {
                tip = utility[$efront_string_genera](tip)
            } while (this[$efront_string_names][$efront_string_has](tip));
            this[$efront_string_name] = tip;
            for (current = this[$efront_string_upper]; current; current = current[$efront_string_upper]) {
                current[$efront_string_names][$efront_string_set](tip, true)
            }
            this[$efront_string_node][$efront_string_label][$efront_string_name] = tip;
            for (i = 0, iz = this[$efront_string_users][$efront_string_length]; i < iz; ++i) {
                this[$efront_string_users][i][$efront_string_label][$efront_string_name] = tip
            }
        };
        function LabelScope(upper) {
            this[$efront_string_map] = new Map;
            this[$efront_string_upper] = upper;
            this[$efront_string_label] = null;
            this[$efront_string_labels] = []
        }
        LabelScope[$efront_string_protot][$efront_string_regist] = function register(node) {
            var name;
            assert(node[$efront_string_type] === Syntax[$efront_string_Labele], $efront_string_node_s);
            this[$efront_string_label] = new Label(node, this[$efront_string_label]);
            this[$efront_string_labels][$efront_string_push](this[$efront_string_label]);
            name = node[$efront_string_label][$efront_string_name];
            assert(!this[$efront_string_map][$efront_string_has](name), $efront_string_duplic);
            this[$efront_string_map][$efront_string_set](name, this[$efront_string_label])
        };
        LabelScope[$efront_string_protot][$efront_string_unregi] = function unregister(node) {
            var name, ref;
            if (node[$efront_string_type] !== Syntax[$efront_string_Labele]) {
                return
            }
            name = node[$efront_string_label][$efront_string_name];
            ref = this[$efront_string_map][$efront_string_get](name);
            this[$efront_string_map][$efront_string_delete](name);
            this[$efront_string_label] = ref[$efront_string_upper]
        };
        LabelScope[$efront_string_protot][$efront_string_resolv1] = function resolve(node) {
            var name;
            if (node[$efront_string_label]) {
                name = node[$efront_string_label][$efront_string_name];
                assert(this[$efront_string_map][$efront_string_has](name), $efront_string_unreso);
                this[$efront_string_map][$efront_string_get](name)[$efront_string_users][$efront_string_push](node)
            }
        };
        LabelScope[$efront_string_protot][$efront_string_close] = function close() {
            var i, iz, label;
            this[$efront_string_labels][$efront_string_sort](function (lhs, rhs) {
                return rhs[$efront_string_users][$efront_string_length] - lhs[$efront_string_users][$efront_string_length]
            });
            for (i = 0, iz = this[$efront_string_labels][$efront_string_length]; i < iz; ++i) {
                label = this[$efront_string_labels][i];
                label[$efront_string_mangle1]()
            }
            return this[$efront_string_upper]
        };
        function mangleLabels(tree) {
            var _a;
            var labelScope;
            estraverse[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    labelScope = new LabelScope(labelScope);
                    return
                }
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Labele]:
                    labelScope[$efront_string_regist](node);
                    break;
                case Syntax[$efront_string_BreakS]:
                case Syntax[$efront_string_Contin]:
                    labelScope[$efront_string_resolv1](node);
                    break
                }
            }, _a[$efront_string_leave] = function (node) {
                labelScope[$efront_string_unregi](node);
                if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    labelScope = labelScope[$efront_string_close]()
                }
            }, _a));
            return tree
        }
        function mangle(tree, options) {
            var _a, _b;
            var result, manager, i, iz;
            if (options == null) {
                options = (_a = {}, _a[$efront_string_destru] = true, _a)
            }
            result = options[$efront_string_destru] == null || options[$efront_string_destru] ? tree : utility[$efront_string_deepCo](tree);
            manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = true, _b));
            for (i = 0, iz = manager[$efront_string_scopes][$efront_string_length]; i < iz; ++i) {
                run(manager[$efront_string_scopes][i], options)
            }
            return mangleLabels(result)
        }
        exports[$efront_string_mangle1] = mangle;
        exports[$efront_string_versio] = version;
        exports[$efront_string_genera] = utility[$efront_string_genera]
    }()
}],
/** 673 $efront_string___dire */ "__direct",
/** 674 $efront_string_don_t_ */ /** text */ "don't create duplicate pass names",
/** 675 $efront_string_pass */ "pass",
/** 676 $efront_string_post */ "post",
/** 677 $efront_string_requir */ "require",
/** 678 $efront_string_Regist */ "Registry",
/** 679 $efront_string___defa */ "__defaultPipeline",
/** 680 $efront_string_once */ "once",
/** 681 pass.js */ [1,51,673,3,451,504,674,675,676,449,40,37,4,442,677,678,679,680,function(require, exports, $efront_string___dire, $efront_string_length, $efront_string_assert, $efront_string_passNa, $efront_string_don_t_, $efront_string_pass, $efront_string_post, $efront_string_Object2, $efront_string_has, $efront_string_get, $efront_string_split, $efront_string__6, $efront_string_requir, $efront_string_Regist, $efront_string___defa, $efront_string_once) {
    return function () {
        'use strict';
        var _a;
        var query, Registry, pass, post, common;
        common = require(471);
        query = require(534);
        Registry = {};
        Registry[$efront_string___dire] = {};
        function initialize(kind, passes) {
            var i, iz, pass;
            Registry[kind] = {};
            for (i = 0, iz = passes[$efront_string_length]; i < iz; ++i) {
                pass = passes[i];
                common[$efront_string_assert](Registry[kind][pass[$efront_string_passNa]] == null, $efront_string_don_t_);
                Registry[kind][pass[$efront_string_passNa]] = pass
            }
            common[$efront_string_assert](Registry[$efront_string___dire][pass[$efront_string_passNa]] == null, $efront_string_don_t_);
            Registry[$efront_string___dire][pass[$efront_string_passNa]] = pass
        }
        pass = [
            require(620),
            require(578),
            require(576),
            require(574),
            require(572),
            require(582),
            require(594),
            require(604),
            require(584),
            require(570),
            require(557),
            require(580),
            require(555),
            require(613),
            require(617),
            require(615),
            require(656),
            require(602),
            require(611),
            require(553),
            require(658),
            require(629),
            require(596),
            require(624)
        ];
        post = [
            require(541),
            require(543),
            require(548),
            require(545),
            require(551)
        ];
        initialize($efront_string_pass, pass);
        initialize($efront_string_post, post);
        function passRequire(name) {
            if (common[$efront_string_Object2][$efront_string_has](Registry[$efront_string___dire], name)) {
                return Registry[$efront_string___dire][name]
            }
            return query[$efront_string_get](Registry, name[$efront_string_split]($efront_string__6))
        }
        exports[$efront_string_requir] = passRequire;
        exports[$efront_string_Regist] = Registry;
        exports[$efront_string___defa] = [
            pass,
            (_a = {}, _a[$efront_string_once] = true, _a[$efront_string_pass] = post, _a)
        ]
    }()
}],
/** 682 $efront_string_data */ "data",
/** 683 options.js */ [1,15,449,40,450,502,550,682,36,37,503,13,function(require, module, $efront_string_Object2, $efront_string_has, $efront_string_isObje, $efront_string_destru, $efront_string_preser, $efront_string_data, $efront_string_protot, $efront_string_get, $efront_string_pathNa, $efront_string_export) {
    return function () {
        'use strict';
        var common;
        common = require(471);
        function extend(result, update) {
            var prop, lhs, rhs;
            for (prop in update) {
                if (!common[$efront_string_Object2][$efront_string_has](update, prop)) {
                    continue
                }
                if (prop in result) {
                    lhs = result[prop];
                    rhs = update[prop];
                    if (common[$efront_string_Object2][$efront_string_isObje](rhs) && common[$efront_string_Object2][$efront_string_isObje](lhs)) {
                        result[prop] = extend(lhs, rhs)
                    } else {
                        result[prop] = update[prop]
                    }
                } else {
                    result[prop] = update[prop]
                }
            }
            return result
        }
        function Options(override) {
            var _a;
            var defaults = (_a = {}, _a[$efront_string_destru] = true, _a[$efront_string_preser] = false, _a);
            if (override == null) {
                this[$efront_string_data] = defaults;
                return
            }
            this[$efront_string_data] = extend(defaults, override)
        }
        Options[$efront_string_protot][$efront_string_get] = function get(name, details) {
            var local;
            if (details != null) {
                if (common[$efront_string_Object2][$efront_string_has](details, $efront_string_pathNa)) {
                    local = this[$efront_string_data][details[$efront_string_pathNa]];
                    if (local != null && common[$efront_string_Object2][$efront_string_has](local, name)) {
                        return local[name]
                    }
                }
            }
            return this[$efront_string_data][name]
        };
        module[$efront_string_export] = Options
    }()
}],
/** 684 esshorten */ [1,function(require) {
    return require(672)
}],
/** 685 $efront_string_optimi1 */ "optimize",
/** 686 esmangle.js */ [1,54,51,334,77,243,285,245,238,239,265,266,278,323,325,284,223,234,237,286,454,244,292,383,353,203,46,39,504,56,47,3,37,502,347,540,539,679,445,268,680,675,62,669,685,function(require, Object, exports, $efront_string_Syntax, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_Labele, $efront_string_ForSta, $efront_string_ForInS, $efront_string_WhileS, $efront_string_WithSt, $efront_string_body, $efront_string_traver, $efront_string_leave, $efront_string_conseq, $efront_string_BlockS, $efront_string_Direct, $efront_string_Expres, $efront_string_expres, $efront_string_moveLo, $efront_string_Litera, $efront_string_value, $efront_string_raw, $efront_string_direct1, $efront_string_functi, $efront_string_keys, $efront_string_hasOwn, $efront_string_passNa, $efront_string_name, $efront_string_push, $efront_string_length, $efront_string_get, $efront_string_destru, $efront_string_deepCo, $efront_string_modifi, $efront_string_result, $efront_string___defa, $efront_string_Array, $efront_string_isArra, $efront_string_once, $efront_string_pass, $efront_string_versio, $efront_string_mangle1, $efront_string_optimi1) {
    return function () {
        'use strict';
        var esshorten, common, Options, Syntax, Pass, annotateDirective;
        esshorten = require(684);
        common = require(471);
        Options = require(683);
        Pass = require(681);
        annotateDirective = require(505);
        Syntax = common[$efront_string_Syntax];
        function recover(tree, useDirectiveStatement) {
            var _a;
            function trailingIf(node) {
                while (true) {
                    switch (node[$efront_string_type]) {
                    case Syntax[$efront_string_IfStat]:
                        if (!node[$efront_string_altern]) {
                            return true
                        }
                        node = node[$efront_string_altern];
                        continue;
                    case Syntax[$efront_string_Labele]:
                    case Syntax[$efront_string_ForSta]:
                    case Syntax[$efront_string_ForInS]:
                    case Syntax[$efront_string_WhileS]:
                    case Syntax[$efront_string_WithSt]:
                        node = node[$efront_string_body];
                        continue
                    }
                    return false
                }
            }
            common[$efront_string_traver](tree, (_a = {}, _a[$efront_string_leave] = function leave(node) {
                var _a, _b;
                if (node[$efront_string_type] === Syntax[$efront_string_IfStat] && node[$efront_string_altern]) {
                    if (node[$efront_string_conseq][$efront_string_type] !== Syntax[$efront_string_BlockS]) {
                        if (trailingIf(node[$efront_string_conseq])) {
                            node[$efront_string_conseq] = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_BlockS], _a[$efront_string_body] = [node[$efront_string_conseq]], _a)
                        }
                    }
                }
                if (!useDirectiveStatement && node[$efront_string_type] === Syntax[$efront_string_Direct]) {
                    node[$efront_string_type] = Syntax[$efront_string_Expres];
                    node[$efront_string_expres] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = node[$efront_string_value], _b[$efront_string_raw] = node[$efront_string_raw], _b));
                    delete node[$efront_string_direct1];
                    delete node[$efront_string_value];
                    delete node[$efront_string_raw]
                }
            }, _a));
            return tree
        }
        function iteration(tree, p, options) {
            var i, iz, pass, res, changed, statuses, passes, result;
            function addPass(pass) {
                var name;
                if (typeof pass !== $efront_string_functi) {
                    name = Object[$efront_string_keys](pass)[0];
                    pass = pass[name]
                }
                if (pass[$efront_string_hasOwn]($efront_string_passNa)) {
                    name = pass[$efront_string_passNa]
                } else {
                    name = pass[$efront_string_name]
                }
                passes[$efront_string_push](pass);
                statuses[$efront_string_push](true)
            }
            function fillStatuses(bool) {
                var i, iz;
                for (i = 0, iz = statuses[$efront_string_length]; i < iz; ++i) {
                    statuses[i] = bool
                }
            }
            result = options[$efront_string_get]($efront_string_destru) ? tree : common[$efront_string_deepCo](tree);
            statuses = [];
            passes = [];
            for (i = 0, iz = p[$efront_string_length]; i < iz; ++i) {
                addPass(p[i])
            }
            do {
                changed = false;
                for (i = 0, iz = passes[$efront_string_length]; i < iz; ++i) {
                    pass = passes[i];
                    if (statuses[i]) {
                        res = pass(result, options);
                        if (res[$efront_string_modifi]) {
                            changed = true;
                            fillStatuses(true)
                        } else {
                            statuses[i] = false
                        }
                        result = res[$efront_string_result]
                    }
                }
            } while (changed);
            return result
        }
        function optimize(tree, pipeline, options) {
            var _a;
            var i, iz, j, jz, section, pass;
            tree = annotateDirective(tree, new Options((_a = {}, _a[$efront_string_destru] = false, _a)));
            if (null == pipeline) {
                pipeline = Pass[$efront_string___defa]
            }
            options = new Options(options);
            for (i = 0, iz = pipeline[$efront_string_length]; i < iz; ++i) {
                section = pipeline[i];
                if (common[$efront_string_Array][$efront_string_isArra](section)) {
                    tree = iteration(tree, section, options)
                } else if (section[$efront_string_once]) {
                    pass = section[$efront_string_pass];
                    for (j = 0, jz = pass[$efront_string_length]; j < jz; ++j) {
                        tree = pass[j](tree, options)[$efront_string_result]
                    }
                }
            }
            return recover(tree, options[$efront_string_get]($efront_string_direct1))
        }
        exports[$efront_string_versio] = require(164)[$efront_string_versio];
        exports[$efront_string_mangle1] = esshorten[$efront_string_mangle1];
        exports[$efront_string_optimi1] = optimize;
        exports[$efront_string_pass] = Pass
    }()
}],
/** 687 "e" */ "e",
/** 688 "d" */ "d",
/** 689 "o" */ "o",
/** 690 "C" */ "C",
/** 691 "r" */ "r",
/** 692 "a" */ "a",
/** 693 "h" */ "h",
/** 694 "m" */ "m",
/** 695 "f" */ "f",
/** 696 "t" */ "t",
/** 697 "A" */ "A",
/** 698 "c" */ "c"],function (a, c,s) {
        var 
    o=s[4],
    e=s[7],
    M=15,
    z=s[9],x=s[8],
    n=s[1],
    m=s[2],
    v=s[6],
    q=s[3],
    y=s[5],
    w=s[10],
    B=s[12],
    E=51,
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[11]],
        h=s[M-1][0],
        j=s[16],
        $=[s[686],s[687],s[688],s[689],s[690],s[691],s[692],s[689],s[693],s[688],s[690],s[694]],
        _=[s[695],s[696],s[686],s[687],s[688],s[689],s[690],s[691],s[692],s[697]][v]()[w](''),T = this,R;
        if (!(a instanceof s[52])){
            R = function(){
                return a
            }
        }else if(!a[m]){
            R=function(){return function(i){return T[i]()}
            };
        }else{
            R=function(){
                if(~[E,M][x](c+1))return s[c][0];
                var r=s[13],I,g=[],i=0,k=a[m]-1,f=a[k],l=r[e](f);
                if(~a[x](E)||~a[x](M))I={},I[B]={};
                for(;i<k;i++)g[i]=a[i]===M?I:a[i]===E?I[B]:a[i]?T[a[i]]():T[0];
                if (l) {
                    l = l[1][q](',');
                    g = g[o]([l]);
                }
                r = f[y](I?I[B]:T[0], g);
                return I?I[B]:r;
            }
        }
        return T[c + 1] = function(){
            var S=R();T[c+1]=function(){return S};
            return S
        }
    },[this.window||this.globalThis||global])[685]()
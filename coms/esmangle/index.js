module.exports=([/*Wed Feb 24 2021 07:13:53 GMT+0800 (中国标准时间) by efront 2.17.0*/].map||function (f, t) {
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
/** 15 module */ [1614121520],
/** 16 RegExp */ RegExp,
/** 17 String */ String,
/** 18 $efront_string_NonAsc */ "NonAsciiIdentifierStart",
/** 19 $efront_string__0_ */ /** text */ "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u01000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
/** 20 $efront_string_NonAsc1 */ "NonAsciiIdentifierPart",
/** 21 $efront_string__0_1 */ /** text */ "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u01000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
/** 22 $efront_string_test */ "test",
/** 23 $efront_string_fromCh */ "fromCharCode",
/** 24 $efront_string_isDeci */ "isDecimalDigit",
/** 25 $efront_string_isHexD */ "isHexDigit",
/** 26 $efront_string_isOcta */ "isOctalDigit",
/** 27 $efront_string_isWhit */ "isWhiteSpace",
/** 28 $efront_string_isLine */ "isLineTerminator",
/** 29 $efront_string_isIden */ "isIdentifierStart",
/** 30 $efront_string_isIden1 */ "isIdentifierPart",
/** 31 esutils$lib$code.js */ [16,17,15,18,19,20,21,9,22,23,13,24,25,26,27,28,29,30,function(RegExp, String, module, $efront_string_NonAsc, $efront_string__0_, $efront_string_NonAsc1, $efront_string__0_1, $efront_string_indexO, $efront_string_test, $efront_string_fromCh, $efront_string_export, $efront_string_isDeci, $efront_string_isHexD, $efront_string_isOcta, $efront_string_isWhit, $efront_string_isLine, $efront_string_isIden, $efront_string_isIden1) {
    return function (_a, _b, Regex) {
        'use strict';
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
        _a = {}, _a[$efront_string_NonAsc] = new RegExp($efront_string__0_), _a[$efront_string_NonAsc1] = new RegExp($efront_string__0_1), Regex = _a, _b = {}, _b[$efront_string_isDeci] = isDecimalDigit, _b[$efront_string_isHexD] = isHexDigit, _b[$efront_string_isOcta] = isOctalDigit, _b[$efront_string_isWhit] = isWhiteSpace, _b[$efront_string_isLine] = isLineTerminator, _b[$efront_string_isIden] = isIdentifierStart, _b[$efront_string_isIden1] = isIdentifierPart, module[$efront_string_export] = _b
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
    return function (Map) {
        'use strict';
        typeof global[$efront_string_Map] !== $efront_string_undefi ? Map = global[$efront_string_Map] : (Map = function Map() {
            this[$efront_string___data] = {}
        }, Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key) ? this[$efront_string___data][key] : void 0
        }, Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key)
        }, Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
            key = $efront_string_$ + key, this[$efront_string___data][key] = val
        }, Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
            return key = $efront_string_$ + key, delete this[$efront_string___data][key]
        }, Map[$efront_string_protot][$efront_string_clear] = function MapClear() {
            this[$efront_string___data] = {}
        }, Map[$efront_string_protot][$efront_string_forEac] = function MapForEach(callback, thisArg) {
            var real, key;
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && (key = real[$efront_string_substr](1), callback[$efront_string_call](thisArg, this[$efront_string___data][real], key, this))
        }, Map[$efront_string_protot][$efront_string_keys] = function MapKeys() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push](real[$efront_string_substr](1));
            return result
        }, Map[$efront_string_protot][$efront_string_values] = function MapValues() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push](this[$efront_string___data][real]);
            return result
        }, Map[$efront_string_protot][$efront_string_items] = function MapItems() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push]([
                    real[$efront_string_substr](1),
                    this[$efront_string___data][real]
                ]);
            return result
        }), module[$efront_string_export] = Map
    }()
}],
/** 51 undefined */ undefined,
/** 52 exports */ [1686],
/** 53 define */ typeof define!=="undefined"?define:void 0,
/** 54 Array */ Array,
/** 55 Object */ Object,
/** 56 Error */ Error,
/** 57 $efront_string_functi */ "function",
/** 58 $efront_string_amd */ "amd",
/** 59 $efront_string_estrav */ "estraverse",
/** 60 $efront_string_Assign */ "AssignmentExpression",
/** 61 $efront_string_ArrayE */ "ArrayExpression",
/** 62 $efront_string_ArrayP */ "ArrayPattern",
/** 63 $efront_string_ArrowF */ "ArrowFunctionExpression",
/** 64 $efront_string_BlockS */ "BlockStatement",
/** 65 $efront_string_Binary */ "BinaryExpression",
/** 66 $efront_string_BreakS */ "BreakStatement",
/** 67 $efront_string_CallEx */ "CallExpression",
/** 68 $efront_string_CatchC */ "CatchClause",
/** 69 $efront_string_ClassB */ "ClassBody",
/** 70 $efront_string_ClassD */ "ClassDeclaration",
/** 71 $efront_string_ClassE */ "ClassExpression",
/** 72 $efront_string_Condit */ "ConditionalExpression",
/** 73 $efront_string_Contin */ "ContinueStatement",
/** 74 $efront_string_Debugg */ "DebuggerStatement",
/** 75 $efront_string_Direct */ "DirectiveStatement",
/** 76 $efront_string_DoWhil */ "DoWhileStatement",
/** 77 $efront_string_EmptyS */ "EmptyStatement",
/** 78 $efront_string_Expres */ "ExpressionStatement",
/** 79 $efront_string_ForSta */ "ForStatement",
/** 80 $efront_string_ForInS */ "ForInStatement",
/** 81 $efront_string_Functi */ "FunctionDeclaration",
/** 82 $efront_string_Functi1 */ "FunctionExpression",
/** 83 $efront_string_Identi */ "Identifier",
/** 84 $efront_string_IfStat */ "IfStatement",
/** 85 $efront_string_Litera */ "Literal",
/** 86 $efront_string_Labele */ "LabeledStatement",
/** 87 $efront_string_Logica */ "LogicalExpression",
/** 88 $efront_string_Member */ "MemberExpression",
/** 89 $efront_string_Method */ "MethodDefinition",
/** 90 $efront_string_NewExp */ "NewExpression",
/** 91 $efront_string_Object */ "ObjectExpression",
/** 92 $efront_string_Object1 */ "ObjectPattern",
/** 93 $efront_string_Progra */ "Program",
/** 94 $efront_string_Proper */ "Property",
/** 95 $efront_string_Return */ "ReturnStatement",
/** 96 $efront_string_Sequen */ "SequenceExpression",
/** 97 $efront_string_Switch */ "SwitchStatement",
/** 98 $efront_string_Switch1 */ "SwitchCase",
/** 99 $efront_string_ThisEx */ "ThisExpression",
/** 100 $efront_string_ThrowS */ "ThrowStatement",
/** 101 $efront_string_TrySta */ "TryStatement",
/** 102 $efront_string_UnaryE */ "UnaryExpression",
/** 103 $efront_string_Update */ "UpdateExpression",
/** 104 $efront_string_Variab */ "VariableDeclaration",
/** 105 $efront_string_Variab1 */ "VariableDeclarator",
/** 106 $efront_string_WhileS */ "WhileStatement",
/** 107 $efront_string_WithSt */ "WithStatement",
/** 108 $efront_string_YieldE */ "YieldExpression",
/** 109 $efront_string_isArra */ "isArray",
/** 110 $efront_string_toStri */ "toString",
/** 111 $efront_string__objec */ /** text */ "[object Array]",
/** 112 $efront_string_object */ "object",
/** 113 $efront_string_left */ "left",
/** 114 $efront_string_right */ "right",
/** 115 $efront_string_elemen */ "elements",
/** 116 $efront_string_params */ "params",
/** 117 $efront_string_defaul */ "defaults",
/** 118 $efront_string_rest */ "rest",
/** 119 $efront_string_body */ "body",
/** 120 $efront_string_label */ "label",
/** 121 $efront_string_callee */ "callee",
/** 122 $efront_string_argume */ "arguments",
/** 123 $efront_string_param */ "param",
/** 124 $efront_string_id */ "id",
/** 125 $efront_string_superC */ "superClass",
/** 126 $efront_string_conseq */ "consequent",
/** 127 $efront_string_altern */ "alternate",
/** 128 $efront_string_expres */ "expression",
/** 129 $efront_string_init */ "init",
/** 130 $efront_string_update */ "update",
/** 131 $efront_string_ForOfS */ "ForOfStatement",
/** 132 $efront_string_proper */ "property",
/** 133 $efront_string_key */ "key",
/** 134 $efront_string_value */ "value",
/** 135 $efront_string_proper1 */ "properties",
/** 136 $efront_string_argume1 */ "argument",
/** 137 $efront_string_expres1 */ "expressions",
/** 138 $efront_string_discri */ "discriminant",
/** 139 $efront_string_cases */ "cases",
/** 140 $efront_string_block */ "block",
/** 141 $efront_string_handle */ "handlers",
/** 142 $efront_string_handle1 */ "handler",
/** 143 $efront_string_guarde */ "guardedHandlers",
/** 144 $efront_string_finali */ "finalizer",
/** 145 $efront_string_declar */ "declarations",
/** 146 $efront_string_Break */ "Break",
/** 147 $efront_string_Skip */ "Skip",
/** 148 $efront_string_parent */ "parent",
/** 149 $efront_string_replac */ "replace",
/** 150 $efront_string_node */ "node",
/** 151 $efront_string_path */ "path",
/** 152 $efront_string_wrap */ "wrap",
/** 153 $efront_string_ref */ "ref",
/** 154 $efront_string___curr */ "__current",
/** 155 $efront_string___leav */ "__leavelist",
/** 156 $efront_string_parent1 */ "parents",
/** 157 $efront_string_curren */ "current",
/** 158 $efront_string___exec */ "__execute",
/** 159 $efront_string___stat */ "__state",
/** 160 $efront_string_notify */ "notify",
/** 161 $efront_string_skip */ "skip",
/** 162 $efront_string_break */ "break",
/** 163 $efront_string___init */ "__initialize",
/** 164 $efront_string_visito */ "visitor",
/** 165 $efront_string_root */ "root",
/** 166 $efront_string___work */ "__worklist",
/** 167 $efront_string_traver */ "traverse",
/** 168 $efront_string_pop */ "pop",
/** 169 $efront_string_leave */ "leave",
/** 170 $efront_string_enter */ "enter",
/** 171 $efront_string_type */ "type",
/** 172 $efront_string_range */ "range",
/** 173 $efront_string_extend */ "extendedRange",
/** 174 $efront_string_attach */ /** text */ "attachComments needs range information",
/** 175 $efront_string_leadin */ "leadingComments",
/** 176 $efront_string_splice */ "splice",
/** 177 $efront_string_traili */ "trailingComments",
/** 178 $efront_string_versio */ "version",
/** 179 $efront_string_1_5_1_ */ "1.5.1-dev",
/** 180 $efront_string_Syntax */ "Syntax",
/** 181 $efront_string_attach1 */ "attachComments",
/** 182 $efront_string_Visito */ "VisitorKeys",
/** 183 $efront_string_Visito1 */ "VisitorOption",
/** 184 $efront_string_Contro */ "Controller",
/** 185 estraverse$estraverse.js */ [53,52,54,55,51,56,57,58,13,34,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,36,110,12,111,39,112,3,113,114,115,116,117,118,119,120,121,122,123,124,125,22,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,47,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,function(define, exports, Array, Object, undefined, Error, $efront_string_functi, $efront_string_amd, $efront_string_export, $efront_string_undefi, $efront_string_estrav, $efront_string_Assign, $efront_string_ArrayE, $efront_string_ArrayP, $efront_string_ArrowF, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_ClassB, $efront_string_ClassD, $efront_string_ClassE, $efront_string_Condit, $efront_string_Contin, $efront_string_Debugg, $efront_string_Direct, $efront_string_DoWhil, $efront_string_EmptyS, $efront_string_Expres, $efront_string_ForSta, $efront_string_ForInS, $efront_string_Functi, $efront_string_Functi1, $efront_string_Identi, $efront_string_IfStat, $efront_string_Litera, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_Method, $efront_string_NewExp, $efront_string_Object, $efront_string_Object1, $efront_string_Progra, $efront_string_Proper, $efront_string_Return, $efront_string_Sequen, $efront_string_Switch, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_Variab, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_YieldE, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_hasOwn, $efront_string_object, $efront_string_length, $efront_string_left, $efront_string_right, $efront_string_elemen, $efront_string_params, $efront_string_defaul, $efront_string_rest, $efront_string_body, $efront_string_label, $efront_string_callee, $efront_string_argume, $efront_string_param, $efront_string_id, $efront_string_superC, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_expres, $efront_string_init, $efront_string_update, $efront_string_ForOfS, $efront_string_proper, $efront_string_key, $efront_string_value, $efront_string_proper1, $efront_string_argume1, $efront_string_expres1, $efront_string_discri, $efront_string_cases, $efront_string_block, $efront_string_handle, $efront_string_handle1, $efront_string_guarde, $efront_string_finali, $efront_string_declar, $efront_string_Break, $efront_string_Skip, $efront_string_parent, $efront_string_replac, $efront_string_node, $efront_string_path, $efront_string_wrap, $efront_string_ref, $efront_string_push, $efront_string___curr, $efront_string___leav, $efront_string_parent1, $efront_string_curren, $efront_string___exec, $efront_string___stat, $efront_string_notify, $efront_string_skip, $efront_string_break, $efront_string___init, $efront_string_visito, $efront_string_root, $efront_string___work, $efront_string_traver, $efront_string_pop, $efront_string_leave, $efront_string_enter, $efront_string_type, $efront_string_range, $efront_string_extend, $efront_string_attach, $efront_string_leadin, $efront_string_splice, $efront_string_traili, $efront_string_versio, $efront_string_1_5_1_, $efront_string_Syntax, $efront_string_attach1, $efront_string_Visito, $efront_string_Visito1, $efront_string_Contro) {
    return function (root, factory) {
        'use strict';
        typeof define === $efront_string_functi && define[$efront_string_amd] ? define([$efront_string_export], factory) : typeof exports !== $efront_string_undefi ? factory(exports) : factory(root[$efront_string_estrav] = {})
    }(this, function (exports) {
        'use strict';
        function ignoreJSHintError() {
        }
        function deepCopy(obj) {
            var ret = {}, key, val;
            for (key in obj)
                obj[$efront_string_hasOwn](key) && (val = obj[key], typeof val === $efront_string_object && val !== null ? ret[key] = deepCopy(val) : ret[key] = val);
            return ret
        }
        function shallowCopy(obj) {
            var ret = {}, key;
            for (key in obj)
                obj[$efront_string_hasOwn](key) && (ret[key] = obj[key]);
            return ret
        }
        function upperBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length], i = 0;
            while (len)
                diff = len >>> 1, current = i + diff, func(array[current]) ? len = diff : (i = current + 1, len -= diff + 1);
            return i
        }
        function lowerBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length], i = 0;
            while (len)
                diff = len >>> 1, current = i + diff, func(array[current]) ? (i = current + 1, len -= diff + 1) : len = diff;
            return i
        }
        function Reference(parent, key) {
            this[$efront_string_parent] = parent, this[$efront_string_key] = key
        }
        function Element(node, path, wrap, ref) {
            this[$efront_string_node] = node, this[$efront_string_path] = path, this[$efront_string_wrap] = wrap, this[$efront_string_ref] = ref
        }
        function Controller() {
        }
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
            return target = upperBound(tokens, function search(token) {
                return token[$efront_string_range][0] > comment[$efront_string_range][0]
            }), comment[$efront_string_extend] = [
                comment[$efront_string_range][0],
                comment[$efront_string_range][1]
            ], target !== tokens[$efront_string_length] && (comment[$efront_string_extend][1] = tokens[target][$efront_string_range][0]), target -= 1, target >= 0 && (comment[$efront_string_extend][0] = tokens[target][$efront_string_range][1]), comment
        }
        function attachComments(tree, providedComments, tokens) {
            var _a, _b, comments = [], comment, len, i, cursor;
            if (!tree[$efront_string_range])
                throw new Error($efront_string_attach);
            if (!tokens[$efront_string_length]) {
                if (providedComments[$efront_string_length]) {
                    for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1)
                        comment = deepCopy(providedComments[i]), comment[$efront_string_extend] = [
                            0,
                            tree[$efront_string_range][0]
                        ], comments[$efront_string_push](comment);
                    tree[$efront_string_leadin] = comments
                }
                return tree
            }
            for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1)
                comments[$efront_string_push](extendCommentRange(deepCopy(providedComments[i]), tokens));
            return cursor = 0, traverse(tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    if (comment = comments[cursor], comment[$efront_string_extend][1] > node[$efront_string_range][0])
                        break;
                    comment[$efront_string_extend][1] === node[$efront_string_range][0] ? (node[$efront_string_leadin] || (node[$efront_string_leadin] = []), node[$efront_string_leadin][$efront_string_push](comment), comments[$efront_string_splice](cursor, 1)) : cursor += 1
                }
                return cursor === comments[$efront_string_length] ? VisitorOption[$efront_string_Break] : comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1] ? VisitorOption[$efront_string_Skip] : void 0
            }, _a)), cursor = 0, traverse(tree, (_b = {}, _b[$efront_string_leave] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    if (comment = comments[cursor], node[$efront_string_range][1] < comment[$efront_string_extend][0])
                        break;
                    node[$efront_string_range][1] === comment[$efront_string_extend][0] ? (node[$efront_string_traili] || (node[$efront_string_traili] = []), node[$efront_string_traili][$efront_string_push](comment), comments[$efront_string_splice](cursor, 1)) : cursor += 1
                }
                return cursor === comments[$efront_string_length] ? VisitorOption[$efront_string_Break] : comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1] ? VisitorOption[$efront_string_Skip] : void 0
            }, _b)), tree
        }
        var _a, _b, _c, Syntax, isArray, VisitorOption, VisitorKeys, BREAK, SKIP;
        _a = {}, _a[$efront_string_Assign] = $efront_string_Assign, _a[$efront_string_ArrayE] = $efront_string_ArrayE, _a[$efront_string_ArrayP] = $efront_string_ArrayP, _a[$efront_string_ArrowF] = $efront_string_ArrowF, _a[$efront_string_BlockS] = $efront_string_BlockS, _a[$efront_string_Binary] = $efront_string_Binary, _a[$efront_string_BreakS] = $efront_string_BreakS, _a[$efront_string_CallEx] = $efront_string_CallEx, _a[$efront_string_CatchC] = $efront_string_CatchC, _a[$efront_string_ClassB] = $efront_string_ClassB, _a[$efront_string_ClassD] = $efront_string_ClassD, _a[$efront_string_ClassE] = $efront_string_ClassE, _a[$efront_string_Condit] = $efront_string_Condit, _a[$efront_string_Contin] = $efront_string_Contin, _a[$efront_string_Debugg] = $efront_string_Debugg, _a[$efront_string_Direct] = $efront_string_Direct, _a[$efront_string_DoWhil] = $efront_string_DoWhil, _a[$efront_string_EmptyS] = $efront_string_EmptyS, _a[$efront_string_Expres] = $efront_string_Expres, _a[$efront_string_ForSta] = $efront_string_ForSta, _a[$efront_string_ForInS] = $efront_string_ForInS, _a[$efront_string_Functi] = $efront_string_Functi, _a[$efront_string_Functi1] = $efront_string_Functi1, _a[$efront_string_Identi] = $efront_string_Identi, _a[$efront_string_IfStat] = $efront_string_IfStat, _a[$efront_string_Litera] = $efront_string_Litera, _a[$efront_string_Labele] = $efront_string_Labele, _a[$efront_string_Logica] = $efront_string_Logica, _a[$efront_string_Member] = $efront_string_Member, _a[$efront_string_Method] = $efront_string_Method, _a[$efront_string_NewExp] = $efront_string_NewExp, _a[$efront_string_Object] = $efront_string_Object, _a[$efront_string_Object1] = $efront_string_Object1, _a[$efront_string_Progra] = $efront_string_Progra, _a[$efront_string_Proper] = $efront_string_Proper, _a[$efront_string_Return] = $efront_string_Return, _a[$efront_string_Sequen] = $efront_string_Sequen, _a[$efront_string_Switch] = $efront_string_Switch, _a[$efront_string_Switch1] = $efront_string_Switch1, _a[$efront_string_ThisEx] = $efront_string_ThisEx, _a[$efront_string_ThrowS] = $efront_string_ThrowS, _a[$efront_string_TrySta] = $efront_string_TrySta, _a[$efront_string_UnaryE] = $efront_string_UnaryE, _a[$efront_string_Update] = $efront_string_Update, _a[$efront_string_Variab] = $efront_string_Variab, _a[$efront_string_Variab1] = $efront_string_Variab1, _a[$efront_string_WhileS] = $efront_string_WhileS, _a[$efront_string_WithSt] = $efront_string_WithSt, _a[$efront_string_YieldE] = $efront_string_YieldE, Syntax = _a, isArray = Array[$efront_string_isArra], isArray || (isArray = function isArray(array) {
            return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
        }), ignoreJSHintError(shallowCopy), ignoreJSHintError(lowerBound), _b = {}, _b[$efront_string_Assign] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_ArrayE] = [$efront_string_elemen], _b[$efront_string_ArrayP] = [$efront_string_elemen], _b[$efront_string_ArrowF] = [
            $efront_string_params,
            $efront_string_defaul,
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
            $efront_string_defaul,
            $efront_string_rest,
            $efront_string_body
        ], _b[$efront_string_Functi1] = [
            $efront_string_id,
            $efront_string_params,
            $efront_string_defaul,
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
        ], _b[$efront_string_YieldE] = [$efront_string_argume1], VisitorKeys = _b, BREAK = {}, SKIP = {}, _c = {}, _c[$efront_string_Break] = BREAK, _c[$efront_string_Skip] = SKIP, VisitorOption = _c, Reference[$efront_string_protot][$efront_string_replac] = function replace(node) {
            this[$efront_string_parent][this[$efront_string_key]] = node
        }, Controller[$efront_string_protot][$efront_string_path] = function path() {
            function addToPath(result, path) {
                if (isArray(path))
                    for (j = 0, jz = path[$efront_string_length]; j < jz; ++j)
                        result[$efront_string_push](path[j]);
                else
                    result[$efront_string_push](path)
            }
            var i, iz, j, jz, result, element;
            if (!this[$efront_string___curr][$efront_string_path])
                return null;
            for (result = [], i = 2, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i)
                element = this[$efront_string___leav][i], addToPath(result, element[$efront_string_path]);
            return addToPath(result, this[$efront_string___curr][$efront_string_path]), result
        }, Controller[$efront_string_protot][$efront_string_parent1] = function parents() {
            var i, iz, result;
            for (result = [], i = 1, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i)
                result[$efront_string_push](this[$efront_string___leav][i][$efront_string_node]);
            return result
        }, Controller[$efront_string_protot][$efront_string_curren] = function current() {
            return this[$efront_string___curr][$efront_string_node]
        }, Controller[$efront_string_protot][$efront_string___exec] = function __execute(callback, element) {
            var previous, result;
            return result = undefined, previous = this[$efront_string___curr], this[$efront_string___curr] = element, this[$efront_string___stat] = null, callback && (result = callback[$efront_string_call](this, element[$efront_string_node], this[$efront_string___leav][this[$efront_string___leav][$efront_string_length] - 1][$efront_string_node])), this[$efront_string___curr] = previous, result
        }, Controller[$efront_string_protot][$efront_string_notify] = function notify(flag) {
            this[$efront_string___stat] = flag
        }, Controller[$efront_string_protot][$efront_string_skip] = function () {
            this[$efront_string_notify](SKIP)
        }, Controller[$efront_string_protot][$efront_string_break] = function () {
            this[$efront_string_notify](BREAK)
        }, Controller[$efront_string_protot][$efront_string___init] = function (root, visitor) {
            this[$efront_string_visito] = visitor, this[$efront_string_root] = root, this[$efront_string___work] = [], this[$efront_string___leav] = [], this[$efront_string___curr] = null, this[$efront_string___stat] = null
        }, Controller[$efront_string_protot][$efront_string_traver] = function traverse(root, visitor) {
            var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
            this[$efront_string___init](root, visitor), sentinel = {}, worklist = this[$efront_string___work], leavelist = this[$efront_string___leav], worklist[$efront_string_push](new Element(root, null, null, null)), leavelist[$efront_string_push](new Element(null, null, null, null));
            while (worklist[$efront_string_length]) {
                if (element = worklist[$efront_string_pop](), element === sentinel) {
                    if (element = leavelist[$efront_string_pop](), ret = this[$efront_string___exec](visitor[$efront_string_leave], element), this[$efront_string___stat] === BREAK || ret === BREAK)
                        return;
                    continue
                }
                if (element[$efront_string_node]) {
                    if (ret = this[$efront_string___exec](visitor[$efront_string_enter], element), this[$efront_string___stat] === BREAK || ret === BREAK)
                        return;
                    if (worklist[$efront_string_push](sentinel), leavelist[$efront_string_push](element), this[$efront_string___stat] === SKIP || ret === SKIP)
                        continue;
                    node = element[$efront_string_node], nodeType = element[$efront_string_wrap] || node[$efront_string_type], candidates = VisitorKeys[nodeType], current = candidates[$efront_string_length];
                    while ((current -= 1) >= 0) {
                        if (key = candidates[current], candidate = node[key], !candidate)
                            continue;
                        if (!isArray(candidate)) {
                            worklist[$efront_string_push](new Element(candidate, key, null, null));
                            continue
                        }
                        current2 = candidate[$efront_string_length];
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2])
                                continue;
                            (nodeType === Syntax[$efront_string_Object] || nodeType === Syntax[$efront_string_Object1]) && $efront_string_proper1 === candidates[current] ? element = new Element(candidate[current2], [
                                key,
                                current2
                            ], $efront_string_Proper, null) : element = new Element(candidate[current2], [
                                key,
                                current2
                            ], null, null), worklist[$efront_string_push](element)
                        }
                    }
                }
            }
        }, Controller[$efront_string_protot][$efront_string_replac] = function replace(root, visitor) {
            var _a, worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
            this[$efront_string___init](root, visitor), sentinel = {}, worklist = this[$efront_string___work], leavelist = this[$efront_string___leav], _a = {}, _a[$efront_string_root] = root, outer = _a, element = new Element(root, null, null, new Reference(outer, $efront_string_root)), worklist[$efront_string_push](element), leavelist[$efront_string_push](element);
            while (worklist[$efront_string_length]) {
                if (element = worklist[$efront_string_pop](), element === sentinel) {
                    if (element = leavelist[$efront_string_pop](), target = this[$efront_string___exec](visitor[$efront_string_leave], element), target !== undefined && target !== BREAK && target !== SKIP && element[$efront_string_ref][$efront_string_replac](target), this[$efront_string___stat] === BREAK || target === BREAK)
                        return outer[$efront_string_root];
                    continue
                }
                if (target = this[$efront_string___exec](visitor[$efront_string_enter], element), target !== undefined && target !== BREAK && target !== SKIP && (element[$efront_string_ref][$efront_string_replac](target), element[$efront_string_node] = target), this[$efront_string___stat] === BREAK || target === BREAK)
                    return outer[$efront_string_root];
                if (node = element[$efront_string_node], !node)
                    continue;
                if (worklist[$efront_string_push](sentinel), leavelist[$efront_string_push](element), this[$efront_string___stat] === SKIP || target === SKIP)
                    continue;
                nodeType = element[$efront_string_wrap] || node[$efront_string_type], candidates = VisitorKeys[nodeType], current = candidates[$efront_string_length];
                while ((current -= 1) >= 0) {
                    if (key = candidates[current], candidate = node[key], !candidate)
                        continue;
                    if (!isArray(candidate)) {
                        worklist[$efront_string_push](new Element(candidate, key, null, new Reference(node, key)));
                        continue
                    }
                    current2 = candidate[$efront_string_length];
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2])
                            continue;
                        nodeType === Syntax[$efront_string_Object] && $efront_string_proper1 === candidates[current] ? element = new Element(candidate[current2], [
                            key,
                            current2
                        ], $efront_string_Proper, new Reference(candidate, current2)) : element = new Element(candidate[current2], [
                            key,
                            current2
                        ], null, new Reference(candidate, current2)), worklist[$efront_string_push](element)
                    }
                }
            }
            return outer[$efront_string_root]
        }, exports[$efront_string_versio] = $efront_string_1_5_1_, exports[$efront_string_Syntax] = Syntax, exports[$efront_string_traver] = traverse, exports[$efront_string_replac] = replace, exports[$efront_string_attach1] = attachComments, exports[$efront_string_Visito] = VisitorKeys, exports[$efront_string_Visito1] = VisitorOption, exports[$efront_string_Contro] = Controller
    })
}],
/** 186 $efront_string__from */ "_from",
/** 187 $efront_string_esshor */ "esshorten@~1.1.0",
/** 188 $efront_string__id */ "_id",
/** 189 $efront_string_esshor1 */ "esshorten@1.1.1",
/** 190 $efront_string__inBun */ "_inBundle",
/** 191 $efront_string__integ */ "_integrity",
/** 192 $efront_string_sha1_F */ "sha1-F0+Wt8wmfkaHLYFOfbfCkL3/Yak=",
/** 193 $efront_string__locat */ "_location",
/** 194 $efront_string__essho */ "/esshorten",
/** 195 $efront_string__phant */ "_phantomChildren",
/** 196 $efront_string__reque */ "_requested",
/** 197 $efront_string_regist */ "registry",
/** 198 $efront_string_raw */ "raw",
/** 199 $efront_string_name */ "name",
/** 200 $efront_string_esshor2 */ "esshorten",
/** 201 $efront_string_escape */ "escapedName",
/** 202 $efront_string_rawSpe */ "rawSpec",
/** 203 $efront_string__1_1_0 */ "~1.1.0",
/** 204 $efront_string_saveSp */ "saveSpec",
/** 205 $efront_string_fetchS */ "fetchSpec",
/** 206 $efront_string__requi */ "_requiredBy",
/** 207 $efront_string__esman */ "/esmangle",
/** 208 $efront_string__resol */ "_resolved",
/** 209 $efront_string_https_ */ "https://registry.npm.taobao.org/esshorten/download/esshorten-1.1.1.tgz",
/** 210 $efront_string__shasu */ "_shasum",
/** 211 $efront_string_174f96 */ "174f96b7cc267e46872d814e7db7c290bdff61a9",
/** 212 $efront_string__spec */ "_spec",
/** 213 $efront_string__where */ "_where",
/** 214 $efront_string_D_work */ "D:\\work\\efront\\node_modules\\esmangle",
/** 215 $efront_string_bugs */ "bugs",
/** 216 $efront_string_url */ "url",
/** 217 $efront_string_https_1 */ "https://github.com/estools/esshorten/issues",
/** 218 $efront_string_bundle */ "bundleDependencies",
/** 219 $efront_string_depend */ "dependencies",
/** 220 $efront_string_escope */ "escope",
/** 221 $efront_string__1_0_1 */ "~1.0.1",
/** 222 $efront_string__4_1_1 */ "~4.1.1",
/** 223 $efront_string_esutil */ "esutils",
/** 224 $efront_string__2_0_2 */ "~2.0.2",
/** 225 $efront_string_deprec */ "deprecated",
/** 226 $efront_string_descri */ "description",
/** 227 $efront_string_Shorte */ /** text */ "Shorten (mangle) names in JavaScript code",
/** 228 $efront_string_devDep */ "devDependencies",
/** 229 $efront_string_chai */ "chai",
/** 230 $efront_string__ */ "*",
/** 231 $efront_string_coffee */ "coffee-script",
/** 232 $efront_string__1_10_ */ "~1.10.0",
/** 233 $efront_string_common */ "commonjs-everywhere",
/** 234 $efront_string__0_9_7 */ "~0.9.7",
/** 235 $efront_string_gulp */ "gulp",
/** 236 $efront_string__3_9_0 */ "~3.9.0",
/** 237 $efront_string_gulp_j */ "gulp-jshint",
/** 238 $efront_string__1_11_ */ "~1.11.2",
/** 239 $efront_string_gulp_m */ "gulp-mocha",
/** 240 $efront_string__2_1_3 */ "~2.1.3",
/** 241 $efront_string_jshint */ "jshint-stylish",
/** 242 $efront_string__2_0_1 */ "~2.0.1",
/** 243 $efront_string_direct */ "directories",
/** 244 $efront_string_lib */ "lib",
/** 245 $efront_string__lib */ "./lib",
/** 246 $efront_string_engine */ "engines",
/** 247 $efront_string__0_6_0 */ ">=0.6.0",
/** 248 $efront_string_homepa */ "homepage",
/** 249 $efront_string_https_2 */ "https://github.com/estools/esshorten#readme",
/** 250 $efront_string_licens */ "licenses",
/** 251 $efront_string_BSD */ "BSD",
/** 252 $efront_string_http_g */ "http://github.com/estools/esshorten/raw/master/LICENSE.BSD",
/** 253 $efront_string_main */ "main",
/** 254 $efront_string_lib_es */ "lib/esshorten.js",
/** 255 $efront_string_mainta */ "maintainers",
/** 256 $efront_string_Yusuke */ /** text */ "Yusuke Suzuki",
/** 257 $efront_string_email */ "email",
/** 258 $efront_string_utatan */ "utatane.tea@gmail.com",
/** 259 $efront_string_http_g1 */ "http://github.com/Constellation",
/** 260 $efront_string_reposi */ "repository",
/** 261 $efront_string_git */ "git",
/** 262 $efront_string_git_ss */ "git+ssh://git@github.com/estools/esshorten.git",
/** 263 $efront_string_script */ "scripts",
/** 264 $efront_string_lint */ "lint",
/** 265 $efront_string_gulp_l */ /** text */ "gulp lint",
/** 266 $efront_string_gulp_t */ /** text */ "gulp travis",
/** 267 $efront_string_unit_t */ "unit-test",
/** 268 $efront_string_gulp_t1 */ /** text */ "gulp test",
/** 269 $efront_string_1_1_1 */ "1.1.1",
/** 270 esshorten$package.json */ [186,187,188,189,190,191,192,193,194,195,196,171,172,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,59,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,150,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,22,266,267,268,178,269,function($efront_string__from, $efront_string_esshor, $efront_string__id, $efront_string_esshor1, $efront_string__inBun, $efront_string__integ, $efront_string_sha1_F, $efront_string__locat, $efront_string__essho, $efront_string__phant, $efront_string__reque, $efront_string_type, $efront_string_range, $efront_string_regist, $efront_string_raw, $efront_string_name, $efront_string_esshor2, $efront_string_escape, $efront_string_rawSpe, $efront_string__1_1_0, $efront_string_saveSp, $efront_string_fetchS, $efront_string__requi, $efront_string__esman, $efront_string__resol, $efront_string_https_, $efront_string__shasu, $efront_string_174f96, $efront_string__spec, $efront_string__where, $efront_string_D_work, $efront_string_bugs, $efront_string_url, $efront_string_https_1, $efront_string_bundle, $efront_string_depend, $efront_string_escope, $efront_string__1_0_1, $efront_string_estrav, $efront_string__4_1_1, $efront_string_esutil, $efront_string__2_0_2, $efront_string_deprec, $efront_string_descri, $efront_string_Shorte, $efront_string_devDep, $efront_string_chai, $efront_string__, $efront_string_coffee, $efront_string__1_10_, $efront_string_common, $efront_string__0_9_7, $efront_string_gulp, $efront_string__3_9_0, $efront_string_gulp_j, $efront_string__1_11_, $efront_string_gulp_m, $efront_string__2_1_3, $efront_string_jshint, $efront_string__2_0_1, $efront_string_direct, $efront_string_lib, $efront_string__lib, $efront_string_engine, $efront_string_node, $efront_string__0_6_0, $efront_string_homepa, $efront_string_https_2, $efront_string_licens, $efront_string_BSD, $efront_string_http_g, $efront_string_main, $efront_string_lib_es, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_http_g1, $efront_string_reposi, $efront_string_git, $efront_string_git_ss, $efront_string_script, $efront_string_lint, $efront_string_gulp_l, $efront_string_test, $efront_string_gulp_t, $efront_string_unit_t, $efront_string_gulp_t1, $efront_string_versio, $efront_string_1_1_1) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return _a = {}, _a[$efront_string__from] = $efront_string_esshor, _a[$efront_string__id] = $efront_string_esshor1, _a[$efront_string__inBun] = !1, _a[$efront_string__integ] = $efront_string_sha1_F, _a[$efront_string__locat] = $efront_string__essho, _a[$efront_string__phant] = {}, _b = {}, _b[$efront_string_type] = $efront_string_range, _b[$efront_string_regist] = !0, _b[$efront_string_raw] = $efront_string_esshor, _b[$efront_string_name] = $efront_string_esshor2, _b[$efront_string_escape] = $efront_string_esshor2, _b[$efront_string_rawSpe] = $efront_string__1_1_0, _b[$efront_string_saveSp] = null, _b[$efront_string_fetchS] = $efront_string__1_1_0, _a[$efront_string__reque] = _b, _a[$efront_string__requi] = [$efront_string__esman], _a[$efront_string__resol] = $efront_string_https_, _a[$efront_string__shasu] = $efront_string_174f96, _a[$efront_string__spec] = $efront_string_esshor, _a[$efront_string__where] = $efront_string_D_work, _c = {}, _c[$efront_string_url] = $efront_string_https_1, _a[$efront_string_bugs] = _c, _a[$efront_string_bundle] = !1, _d = {}, _d[$efront_string_escope] = $efront_string__1_0_1, _d[$efront_string_estrav] = $efront_string__4_1_1, _d[$efront_string_esutil] = $efront_string__2_0_2, _a[$efront_string_depend] = _d, _a[$efront_string_deprec] = !1, _a[$efront_string_descri] = $efront_string_Shorte, _e = {}, _e[$efront_string_chai] = $efront_string__, _e[$efront_string_coffee] = $efront_string__1_10_, _e[$efront_string_common] = $efront_string__0_9_7, _e[$efront_string_gulp] = $efront_string__3_9_0, _e[$efront_string_gulp_j] = $efront_string__1_11_, _e[$efront_string_gulp_m] = $efront_string__2_1_3, _e[$efront_string_jshint] = $efront_string__2_0_1, _a[$efront_string_devDep] = _e, _f = {}, _f[$efront_string_lib] = $efront_string__lib, _a[$efront_string_direct] = _f, _g = {}, _g[$efront_string_node] = $efront_string__0_6_0, _a[$efront_string_engine] = _g, _a[$efront_string_homepa] = $efront_string_https_2, _a[$efront_string_licens] = [(_h = {}, _h[$efront_string_type] = $efront_string_BSD, _h[$efront_string_url] = $efront_string_http_g, _h)], _a[$efront_string_main] = $efront_string_lib_es, _a[$efront_string_mainta] = [(_j = {}, _j[$efront_string_name] = $efront_string_Yusuke, _j[$efront_string_email] = $efront_string_utatan, _j[$efront_string_url] = $efront_string_http_g1, _j)], _a[$efront_string_name] = $efront_string_esshor2, _k = {}, _k[$efront_string_type] = $efront_string_git, _k[$efront_string_url] = $efront_string_git_ss, _a[$efront_string_reposi] = _k, _l = {}, _l[$efront_string_lint] = $efront_string_gulp_l, _l[$efront_string_test] = $efront_string_gulp_t, _l[$efront_string_unit_t] = $efront_string_gulp_t1, _a[$efront_string_script] = _l, _a[$efront_string_versio] = $efront_string_1_1_1, _a
}],
/** 271 $efront_string_lastIn */ "lastIndexOf",
/** 272 $efront_string___ */ "__",
/** 273 $efront_string_0 */ "0",
/** 274 $efront_string_012345 */ "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$",
/** 275 $efront_string_charAt */ "charAt",
/** 276 $efront_string_a */ "a",
/** 277 $efront_string_genera */ "generateNextName",
/** 278 $efront_string_deepCo */ "deepCopy",
/** 279 esshorten$lib$utility.js */ [54,55,16,51,52,109,36,110,12,111,271,272,39,112,273,274,4,3,275,9,45,276,277,278,function(Array, Object, RegExp, undefined, exports, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_lastIn, $efront_string___, $efront_string_hasOwn, $efront_string_object, $efront_string_0, $efront_string_012345, $efront_string_split, $efront_string_length, $efront_string_charAt, $efront_string_indexO, $efront_string_substr, $efront_string_a, $efront_string_genera, $efront_string_deepCo) {
    return function (isArray, NameSequence, ZeroSequenceCache) {
        'use strict';
        function deepCopy(obj) {
            function deepCopyInternal(obj, result) {
                var key, val;
                for (key in obj) {
                    if (key[$efront_string_lastIn]($efront_string___, 0) === 0)
                        continue;
                    obj[$efront_string_hasOwn](key) && (val = obj[key], typeof val === $efront_string_object && val !== null && (val instanceof RegExp ? val = new RegExp(val) : val = deepCopyInternal(val, isArray(val) ? [] : {})), result[key] = val)
                }
                return result
            }
            return deepCopyInternal(obj, isArray(obj) ? [] : {})
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str)
                num & 1 && (result += str);
            return result
        }
        function zeroSequence(num) {
            var res = ZeroSequenceCache[num];
            return res !== undefined ? res : (res = stringRepeat($efront_string_0, num), ZeroSequenceCache[num] = res, res)
        }
        function generateNextName(name) {
            var ch, index, cur;
            cur = name[$efront_string_length] - 1;
            do {
                if (ch = name[$efront_string_charAt](cur), index = NameSequence[$efront_string_indexO](ch), index !== NameSequence[$efront_string_length] - 1)
                    return name[$efront_string_substr](0, cur) + NameSequence[index + 1] + zeroSequence(name[$efront_string_length] - (cur + 1));
                --cur
            } while (cur >= 0);
            return $efront_string_a + zeroSequence(name[$efront_string_length])
        }
        isArray = Array[$efront_string_isArra], isArray || (isArray = function isArray(array) {
            return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
        }), ZeroSequenceCache = [], NameSequence = $efront_string_012345[$efront_string_split](''), exports[$efront_string_genera] = generateNextName, exports[$efront_string_deepCo] = deepCopy
    }()
}],
/** 280 esshorten$lib$map.js */ [32,15,33,34,35,36,37,38,39,40,41,42,43,44,45,12,46,47,48,49,13,function(global, module, $efront_string_Map, $efront_string_undefi, $efront_string___data, $efront_string_protot, $efront_string_get, $efront_string_$, $efront_string_hasOwn, $efront_string_has, $efront_string_set, $efront_string_delete, $efront_string_clear, $efront_string_forEac, $efront_string_substr, $efront_string_call, $efront_string_keys, $efront_string_push, $efront_string_values, $efront_string_items, $efront_string_export) {
    return function (Map) {
        'use strict';
        typeof global[$efront_string_Map] !== $efront_string_undefi ? Map = global[$efront_string_Map] : (Map = function Map() {
            this[$efront_string___data] = {}
        }, Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key) ? this[$efront_string___data][key] : void 0
        }, Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key)
        }, Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
            key = $efront_string_$ + key, this[$efront_string___data][key] = val
        }, Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
            return key = $efront_string_$ + key, delete this[$efront_string___data][key]
        }, Map[$efront_string_protot][$efront_string_clear] = function MapClear() {
            this[$efront_string___data] = {}
        }, Map[$efront_string_protot][$efront_string_forEac] = function MapForEach(callback, thisArg) {
            var real, key;
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && (key = real[$efront_string_substr](1), callback[$efront_string_call](thisArg, this[$efront_string___data][real], key, this))
        }, Map[$efront_string_protot][$efront_string_keys] = function MapKeys() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push](real[$efront_string_substr](1));
            return result
        }, Map[$efront_string_protot][$efront_string_values] = function MapValues() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push](this[$efront_string___data][real]);
            return result
        }, Map[$efront_string_protot][$efront_string_items] = function MapItems() {
            var real, result;
            result = [];
            for (real in this[$efront_string___data])
                this[$efront_string___data][$efront_string_hasOwn](real) && result[$efront_string_push]([
                    real[$efront_string_substr](1),
                    this[$efront_string___data][real]
                ]);
            return result
        }), module[$efront_string_export] = Map
    }()
}],
/** 281 Number */ Number,
/** 282 estraverse */ [1,function(require) {
    return require(185)
}],
/** 283 $efront_string_esmang */ "esmangle@latest",
/** 284 $efront_string_esmang1 */ "esmangle@1.0.1",
/** 285 $efront_string_sha1_2 */ "sha1-2bs3uPjq+/Tm1O1reqKVarvTxMI=",
/** 286 $efront_string_tag */ "tag",
/** 287 $efront_string_esmang2 */ "esmangle",
/** 288 $efront_string_latest */ "latest",
/** 289 $efront_string__USER */ "#USER",
/** 290 $efront_string__1 */ "/",
/** 291 $efront_string_https_3 */ "https://registry.npm.taobao.org/esmangle/download/esmangle-1.0.1.tgz",
/** 292 $efront_string_d9bb37 */ "d9bb37b8f8eafbf4e6d4ed6b7aa2956abbd3c4c2",
/** 293 $efront_string_D_work1 */ "D:\\work\\efront",
/** 294 $efront_string_bin */ "bin",
/** 295 $efront_string_bin_es */ "bin/esmangle.js",
/** 296 $efront_string_https_4 */ "https://github.com/Constellation/esmangle/issues",
/** 297 $efront_string_escode */ "escodegen",
/** 298 $efront_string__1_3_2 */ "~1.3.2",
/** 299 $efront_string_esprim */ "esprima",
/** 300 $efront_string__1_1_1 */ "~1.1.1",
/** 301 $efront_string__1_5_0 */ "~1.5.0",
/** 302 $efront_string__1_0_0 */ /** text */ "~ 1.0.0",
/** 303 $efront_string_option */ "optionator",
/** 304 $efront_string__0_3_0 */ "~0.3.0",
/** 305 $efront_string_source */ "source-map",
/** 306 $efront_string__0_1_3 */ "~0.1.33",
/** 307 $efront_string_ECMASc */ /** text */ "ECMAScript code mangler / minifier",
/** 308 $efront_string_async */ "async",
/** 309 $efront_string__0_2_9 */ "~0.2.9",
/** 310 $efront_string_clone */ "clone",
/** 311 $efront_string__0_1_1 */ "~0.1.11",
/** 312 $efront_string__0_9_4 */ "~0.9.4",
/** 313 $efront_string_grunt */ "grunt",
/** 314 $efront_string__0_4_2 */ "~0.4.2",
/** 315 $efront_string_grunt_ */ "grunt-cli",
/** 316 $efront_string_grunt_1 */ "grunt-contrib-clean",
/** 317 $efront_string__0_5_0 */ "~0.5.0",
/** 318 $efront_string_grunt_2 */ "grunt-contrib-copy",
/** 319 $efront_string_grunt_3 */ "grunt-contrib-jshint",
/** 320 $efront_string__0_8_0 */ "~0.8.0",
/** 321 $efront_string_grunt_4 */ "grunt-mocha-test",
/** 322 $efront_string__0_8_1 */ "~0.8.1",
/** 323 $efront_string_grunt_5 */ "grunt-shell",
/** 324 $efront_string__0_6_1 */ "~0.6.1",
/** 325 $efront_string_grunt_6 */ "grunt-update-submodules",
/** 326 $efront_string__0_2_1 */ "~0.2.1",
/** 327 $efront_string_q */ "q",
/** 328 $efront_string_http_g2 */ "http://github.com/Constellation/esmangle.html",
/** 329 $efront_string_http_g3 */ "http://github.com/Constellation/esmangle/raw/master/LICENSE.BSD",
/** 330 $efront_string_lib_es1 */ "lib/esmangle.js",
/** 331 $efront_string_git_ss1 */ "git+ssh://git@github.com/Constellation/esmangle.git",
/** 332 $efront_string_build */ "build",
/** 333 $efront_string_grunt_7 */ /** text */ "grunt build",
/** 334 $efront_string_grunt_8 */ /** text */ "grunt lint",
/** 335 $efront_string_regres */ "regression-test",
/** 336 $efront_string_grunt_9 */ /** text */ "grunt test:regression",
/** 337 $efront_string_grunt_10 */ /** text */ "grunt travis",
/** 338 $efront_string_grunt_11 */ /** text */ "grunt test",
/** 339 $efront_string_1_0_1 */ "1.0.1",
/** 340 esmangle$package.json */ [186,283,188,284,190,191,285,193,207,195,196,171,286,197,198,199,287,201,202,288,204,205,206,289,290,208,291,210,292,212,213,293,294,295,215,216,296,218,219,297,298,220,221,299,300,200,203,59,301,223,302,303,304,305,306,225,226,307,228,308,309,229,230,310,311,233,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,234,243,244,245,246,150,247,248,328,250,251,329,253,330,255,256,257,258,259,260,261,331,263,332,333,264,334,335,336,22,337,267,338,178,339,function($efront_string__from, $efront_string_esmang, $efront_string__id, $efront_string_esmang1, $efront_string__inBun, $efront_string__integ, $efront_string_sha1_2, $efront_string__locat, $efront_string__esman, $efront_string__phant, $efront_string__reque, $efront_string_type, $efront_string_tag, $efront_string_regist, $efront_string_raw, $efront_string_name, $efront_string_esmang2, $efront_string_escape, $efront_string_rawSpe, $efront_string_latest, $efront_string_saveSp, $efront_string_fetchS, $efront_string__requi, $efront_string__USER, $efront_string__1, $efront_string__resol, $efront_string_https_3, $efront_string__shasu, $efront_string_d9bb37, $efront_string__spec, $efront_string__where, $efront_string_D_work1, $efront_string_bin, $efront_string_bin_es, $efront_string_bugs, $efront_string_url, $efront_string_https_4, $efront_string_bundle, $efront_string_depend, $efront_string_escode, $efront_string__1_3_2, $efront_string_escope, $efront_string__1_0_1, $efront_string_esprim, $efront_string__1_1_1, $efront_string_esshor2, $efront_string__1_1_0, $efront_string_estrav, $efront_string__1_5_0, $efront_string_esutil, $efront_string__1_0_0, $efront_string_option, $efront_string__0_3_0, $efront_string_source, $efront_string__0_1_3, $efront_string_deprec, $efront_string_descri, $efront_string_ECMASc, $efront_string_devDep, $efront_string_async, $efront_string__0_2_9, $efront_string_chai, $efront_string__, $efront_string_clone, $efront_string__0_1_1, $efront_string_common, $efront_string__0_9_4, $efront_string_grunt, $efront_string__0_4_2, $efront_string_grunt_, $efront_string_grunt_1, $efront_string__0_5_0, $efront_string_grunt_2, $efront_string_grunt_3, $efront_string__0_8_0, $efront_string_grunt_4, $efront_string__0_8_1, $efront_string_grunt_5, $efront_string__0_6_1, $efront_string_grunt_6, $efront_string__0_2_1, $efront_string_q, $efront_string__0_9_7, $efront_string_direct, $efront_string_lib, $efront_string__lib, $efront_string_engine, $efront_string_node, $efront_string__0_6_0, $efront_string_homepa, $efront_string_http_g2, $efront_string_licens, $efront_string_BSD, $efront_string_http_g3, $efront_string_main, $efront_string_lib_es1, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_http_g1, $efront_string_reposi, $efront_string_git, $efront_string_git_ss1, $efront_string_script, $efront_string_build, $efront_string_grunt_7, $efront_string_lint, $efront_string_grunt_8, $efront_string_regres, $efront_string_grunt_9, $efront_string_test, $efront_string_grunt_10, $efront_string_unit_t, $efront_string_grunt_11, $efront_string_versio, $efront_string_1_0_1) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return _a = {}, _a[$efront_string__from] = $efront_string_esmang, _a[$efront_string__id] = $efront_string_esmang1, _a[$efront_string__inBun] = !1, _a[$efront_string__integ] = $efront_string_sha1_2, _a[$efront_string__locat] = $efront_string__esman, _a[$efront_string__phant] = {}, _b = {}, _b[$efront_string_type] = $efront_string_tag, _b[$efront_string_regist] = !0, _b[$efront_string_raw] = $efront_string_esmang, _b[$efront_string_name] = $efront_string_esmang2, _b[$efront_string_escape] = $efront_string_esmang2, _b[$efront_string_rawSpe] = $efront_string_latest, _b[$efront_string_saveSp] = null, _b[$efront_string_fetchS] = $efront_string_latest, _a[$efront_string__reque] = _b, _a[$efront_string__requi] = [
        $efront_string__USER,
        $efront_string__1
    ], _a[$efront_string__resol] = $efront_string_https_3, _a[$efront_string__shasu] = $efront_string_d9bb37, _a[$efront_string__spec] = $efront_string_esmang, _a[$efront_string__where] = $efront_string_D_work1, _c = {}, _c[$efront_string_esmang2] = $efront_string_bin_es, _a[$efront_string_bin] = _c, _d = {}, _d[$efront_string_url] = $efront_string_https_4, _a[$efront_string_bugs] = _d, _a[$efront_string_bundle] = !1, _e = {}, _e[$efront_string_escode] = $efront_string__1_3_2, _e[$efront_string_escope] = $efront_string__1_0_1, _e[$efront_string_esprim] = $efront_string__1_1_1, _e[$efront_string_esshor2] = $efront_string__1_1_0, _e[$efront_string_estrav] = $efront_string__1_5_0, _e[$efront_string_esutil] = $efront_string__1_0_0, _e[$efront_string_option] = $efront_string__0_3_0, _e[$efront_string_source] = $efront_string__0_1_3, _a[$efront_string_depend] = _e, _a[$efront_string_deprec] = !1, _a[$efront_string_descri] = $efront_string_ECMASc, _f = {}, _f[$efront_string_async] = $efront_string__0_2_9, _f[$efront_string_chai] = $efront_string__, _f[$efront_string_clone] = $efront_string__0_1_1, _f[$efront_string_common] = $efront_string__0_9_4, _f[$efront_string_grunt] = $efront_string__0_4_2, _f[$efront_string_grunt_] = $efront_string__0_1_1, _f[$efront_string_grunt_1] = $efront_string__0_5_0, _f[$efront_string_grunt_2] = $efront_string__0_5_0, _f[$efront_string_grunt_3] = $efront_string__0_8_0, _f[$efront_string_grunt_4] = $efront_string__0_8_1, _f[$efront_string_grunt_5] = $efront_string__0_6_1, _f[$efront_string_grunt_6] = $efront_string__0_2_1, _f[$efront_string_q] = $efront_string__0_9_7, _a[$efront_string_devDep] = _f, _g = {}, _g[$efront_string_lib] = $efront_string__lib, _a[$efront_string_direct] = _g, _h = {}, _h[$efront_string_node] = $efront_string__0_6_0, _a[$efront_string_engine] = _h, _a[$efront_string_homepa] = $efront_string_http_g2, _a[$efront_string_licens] = [(_j = {}, _j[$efront_string_type] = $efront_string_BSD, _j[$efront_string_url] = $efront_string_http_g3, _j)], _a[$efront_string_main] = $efront_string_lib_es1, _a[$efront_string_mainta] = [(_k = {}, _k[$efront_string_name] = $efront_string_Yusuke, _k[$efront_string_email] = $efront_string_utatan, _k[$efront_string_url] = $efront_string_http_g1, _k)], _a[$efront_string_name] = $efront_string_esmang2, _l = {}, _l[$efront_string_type] = $efront_string_git, _l[$efront_string_url] = $efront_string_git_ss1, _a[$efront_string_reposi] = _l, _m = {}, _m[$efront_string_build] = $efront_string_grunt_7, _m[$efront_string_lint] = $efront_string_grunt_8, _m[$efront_string_regres] = $efront_string_grunt_9, _m[$efront_string_test] = $efront_string_grunt_10, _m[$efront_string_unit_t] = $efront_string_grunt_11, _a[$efront_string_script] = _m, _a[$efront_string_versio] = $efront_string_1_0_1, _a
}],
/** 341 isNaN */ isNaN,
/** 342 $efront_string_implem */ "implements",
/** 343 $efront_string_interf */ "interface",
/** 344 $efront_string_packag */ "package",
/** 345 $efront_string_privat */ "private",
/** 346 $efront_string_protec */ "protected",
/** 347 $efront_string_public */ "public",
/** 348 $efront_string_static */ "static",
/** 349 $efront_string_let */ "let",
/** 350 $efront_string_yield */ "yield",
/** 351 $efront_string_if */ "if",
/** 352 $efront_string_in */ "in",
/** 353 $efront_string_do */ "do",
/** 354 $efront_string_var */ "var",
/** 355 $efront_string_for */ "for",
/** 356 $efront_string_new */ "new",
/** 357 $efront_string_try */ "try",
/** 358 $efront_string_this */ "this",
/** 359 $efront_string_else */ "else",
/** 360 $efront_string_case */ "case",
/** 361 $efront_string_void */ "void",
/** 362 $efront_string_with */ "with",
/** 363 $efront_string_enum */ "enum",
/** 364 $efront_string_while */ "while",
/** 365 $efront_string_catch */ "catch",
/** 366 $efront_string_throw */ "throw",
/** 367 $efront_string_const */ "const",
/** 368 $efront_string_class */ "class",
/** 369 $efront_string_super */ "super",
/** 370 $efront_string_return */ "return",
/** 371 $efront_string_typeof */ "typeof",
/** 372 $efront_string_switch */ "switch",
/** 373 $efront_string_export1 */ "export",
/** 374 $efront_string_import */ "import",
/** 375 $efront_string_defaul1 */ "default",
/** 376 $efront_string_finall */ "finally",
/** 377 $efront_string_extend1 */ "extends",
/** 378 $efront_string_contin */ "continue",
/** 379 $efront_string_debugg */ "debugger",
/** 380 $efront_string_instan */ "instanceof",
/** 381 $efront_string_eval */ "eval",
/** 382 $efront_string_charCo */ "charCodeAt",
/** 383 $efront_string_isKeyw */ "isKeywordES5",
/** 384 $efront_string_isKeyw1 */ "isKeywordES6",
/** 385 $efront_string_isRest */ "isRestrictedWord",
/** 386 $efront_string_isIden2 */ "isIdentifierName",
/** 387 esutils$lib$keyword.js */ [1,15,342,343,344,345,346,347,348,349,350,3,351,352,353,354,355,356,357,358,359,360,361,362,363,364,162,365,366,367,368,369,370,371,42,372,373,374,375,376,377,57,378,379,380,381,122,382,29,30,13,383,384,385,386,function(require, module, $efront_string_implem, $efront_string_interf, $efront_string_packag, $efront_string_privat, $efront_string_protec, $efront_string_public, $efront_string_static, $efront_string_let, $efront_string_yield, $efront_string_length, $efront_string_if, $efront_string_in, $efront_string_do, $efront_string_var, $efront_string_for, $efront_string_new, $efront_string_try, $efront_string_this, $efront_string_else, $efront_string_case, $efront_string_void, $efront_string_with, $efront_string_enum, $efront_string_while, $efront_string_break, $efront_string_catch, $efront_string_throw, $efront_string_const, $efront_string_class, $efront_string_super, $efront_string_return, $efront_string_typeof, $efront_string_delete, $efront_string_switch, $efront_string_export1, $efront_string_import, $efront_string_defaul1, $efront_string_finall, $efront_string_extend1, $efront_string_functi, $efront_string_contin, $efront_string_debugg, $efront_string_instan, $efront_string_eval, $efront_string_argume, $efront_string_charCo, $efront_string_isIden, $efront_string_isIden1, $efront_string_export, $efront_string_isKeyw, $efront_string_isKeyw1, $efront_string_isRest, $efront_string_isIden2) {
    return function (_a, code) {
        'use strict';
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
                return !0;
            default:
                return !1
            }
        }
        function isKeywordES5(id, strict) {
            return !strict && id === $efront_string_yield ? !1 : isKeywordES6(id, strict)
        }
        function isKeywordES6(id, strict) {
            if (strict && isStrictModeReservedWordES6(id))
                return !0;
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
                return id === $efront_string_defaul1 || id === $efront_string_finall || id === $efront_string_extend1;
            case 8:
                return id === $efront_string_functi || id === $efront_string_contin || id === $efront_string_debugg;
            case 10:
                return id === $efront_string_instan;
            default:
                return !1
            }
        }
        function isRestrictedWord(id) {
            return id === $efront_string_eval || id === $efront_string_argume
        }
        function isIdentifierName(id) {
            var i, iz, ch;
            if (id[$efront_string_length] === 0)
                return !1;
            if (ch = id[$efront_string_charCo](0), !code[$efront_string_isIden](ch) || ch === 92)
                return !1;
            for (i = 1, iz = id[$efront_string_length]; i < iz; ++i)
                if (ch = id[$efront_string_charCo](i), !code[$efront_string_isIden1](ch) || ch === 92)
                    return !1;
            return !0
        }
        code = require(31), _a = {}, _a[$efront_string_isKeyw] = isKeywordES5, _a[$efront_string_isKeyw1] = isKeywordES6, _a[$efront_string_isRest] = isRestrictedWord, _a[$efront_string_isIden2] = isIdentifierName, module[$efront_string_export] = _a
    }()
}],
/** 388 $efront_string_code */ "code",
/** 389 $efront_string_keywor */ "keyword",
/** 390 esutils$lib$utils.js */ [52,1,388,389,function(exports, require, $efront_string_code, $efront_string_keywor) {
    return function () {
        'use strict';
        exports[$efront_string_code] = require(31), exports[$efront_string_keywor] = require(387)
    }()
}],
/** 391 $efront_string__2 */ ".",
/** 392 $efront_string_optimi */ "optimistic",
/** 393 $efront_string_direct1 */ "directive",
/** 394 $efront_string_ecmaVe */ "ecmaVersion",
/** 395 $efront_string_identi */ "identifier",
/** 396 $efront_string_from */ "from",
/** 397 $efront_string_tainte */ "tainted",
/** 398 $efront_string_resolv */ "resolved",
/** 399 $efront_string_flag */ "flag",
/** 400 $efront_string_isWrit */ "isWrite",
/** 401 $efront_string_writeE */ "writeExpr",
/** 402 $efront_string___mayb */ "__maybeImplicitGlobal",
/** 403 $efront_string_READ */ "READ",
/** 404 $efront_string_WRITE */ "WRITE",
/** 405 $efront_string_RW */ "RW",
/** 406 $efront_string_isStat */ "isStatic",
/** 407 $efront_string_scope */ "scope",
/** 408 $efront_string_isRead */ "isRead",
/** 409 $efront_string_isRead1 */ "isReadOnly",
/** 410 $efront_string_isWrit1 */ "isWriteOnly",
/** 411 $efront_string_isRead2 */ "isReadWrite",
/** 412 $efront_string_identi1 */ "identifiers",
/** 413 $efront_string_refere */ "references",
/** 414 $efront_string_defs */ "defs",
/** 415 $efront_string_stack */ "stack",
/** 416 $efront_string_Parame */ "Parameter",
/** 417 $efront_string_Functi2 */ "FunctionName",
/** 418 $efront_string_Variab2 */ "Variable",
/** 419 $efront_string_Implic */ "ImplicitGlobalVariable",
/** 420 $efront_string_upper */ "upper",
/** 421 $efront_string_isStri */ "isStrict",
/** 422 $efront_string_global */ "global",
/** 423 $efront_string__use_s */ /** text */ "\"use strict\"",
/** 424 $efront_string__use_s1 */ /** text */ "'use strict'",
/** 425 $efront_string_taints */ "taints",
/** 426 $efront_string_dynami */ "dynamic",
/** 427 $efront_string_throug */ "through",
/** 428 $efront_string_variab */ "variables",
/** 429 $efront_string_variab1 */ "variableScope",
/** 430 $efront_string_functi1 */ "functionExpressionScope",
/** 431 $efront_string_direct2 */ "directCallToEvalScope",
/** 432 $efront_string_thisFo */ "thisFound",
/** 433 $efront_string_naming */ "naming",
/** 434 $efront_string___defi */ "__define",
/** 435 $efront_string_childS */ "childScopes",
/** 436 $efront_string_implic */ "implicit",
/** 437 $efront_string___clos */ "__close",
/** 438 $efront_string___reso */ "__resolve",
/** 439 $efront_string___dele */ "__delegateToUpperScope",
/** 440 $efront_string___defi1 */ "__defineImplicit",
/** 441 $efront_string___refe */ "__referencing",
/** 442 $efront_string___dete */ "__detectEval",
/** 443 $efront_string___dete1 */ "__detectThis",
/** 444 $efront_string___isCl */ "__isClosed",
/** 445 $efront_string_resolv1 */ "resolve",
/** 446 $efront_string_scope_ */ /** text */ "scope should be closed",
/** 447 $efront_string_target */ /** text */ "target should be identifier",
/** 448 $efront_string_isArgu */ "isArgumentsMaterialized",
/** 449 $efront_string_always */ /** text */ "always have arguments variable",
/** 450 $efront_string_isThis */ "isThisMaterialized",
/** 451 $efront_string_mangle */ "mangledName",
/** 452 $efront_string___$esc */ "__$escope$__",
/** 453 $efront_string_attach2 */ "attach",
/** 454 $efront_string_detach */ "detach",
/** 455 $efront_string_isUsed */ "isUsedName",
/** 456 $efront_string_scopes */ "scopes",
/** 457 $efront_string_attach3 */ "attached",
/** 458 $efront_string___get */ "__get",
/** 459 $efront_string_isScop */ "isScopeRequired",
/** 460 $efront_string_acquir */ "acquire",
/** 461 $efront_string_releas */ "release",
/** 462 $efront_string_isVari */ "isVariableScopeRequired",
/** 463 $efront_string_operat */ "operator",
/** 464 $efront_string__3 */ "=",
/** 465 $efront_string_ignore */ "ignoreEval",
/** 466 $efront_string_index */ "index",
/** 467 $efront_string_comput */ "computed",
/** 468 $efront_string_kind */ "kind",
/** 469 $efront_string_1_0_3 */ "1.0.3",
/** 470 $efront_string_Refere */ "Reference",
/** 471 $efront_string_Scope */ "Scope",
/** 472 $efront_string_ScopeM */ "ScopeManager",
/** 473 $efront_string_analyz */ "analyze",
/** 474 escope$escope.js */ [53,52,1,51,56,55,16,4,391,3,39,57,58,220,13,59,34,180,33,35,36,37,38,40,41,42,392,393,394,112,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,199,412,413,414,415,68,416,417,418,419,420,421,171,119,422,75,198,423,424,78,128,85,134,10,365,107,362,93,425,426,140,427,428,113,429,430,431,432,433,434,124,150,122,47,82,435,436,437,438,439,440,83,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,81,167,170,60,463,464,114,61,115,64,65,66,67,121,465,381,123,72,22,126,127,73,76,74,77,79,129,130,80,104,145,116,466,84,86,87,88,467,132,90,91,135,468,94,95,136,96,137,97,138,98,99,100,101,102,103,148,105,106,169,178,469,470,471,472,473,function(define, exports, require, undefined, Error, Object, RegExp, $efront_string_split, $efront_string__2, $efront_string_length, $efront_string_hasOwn, $efront_string_functi, $efront_string_amd, $efront_string_escope, $efront_string_export, $efront_string_estrav, $efront_string_undefi, $efront_string_Syntax, $efront_string_Map, $efront_string___data, $efront_string_protot, $efront_string_get, $efront_string_$, $efront_string_has, $efront_string_set, $efront_string_delete, $efront_string_optimi, $efront_string_direct1, $efront_string_ecmaVe, $efront_string_object, $efront_string_identi, $efront_string_from, $efront_string_tainte, $efront_string_resolv, $efront_string_flag, $efront_string_isWrit, $efront_string_writeE, $efront_string___mayb, $efront_string_READ, $efront_string_WRITE, $efront_string_RW, $efront_string_isStat, $efront_string_scope, $efront_string_isRead, $efront_string_isRead1, $efront_string_isWrit1, $efront_string_isRead2, $efront_string_name, $efront_string_identi1, $efront_string_refere, $efront_string_defs, $efront_string_stack, $efront_string_CatchC, $efront_string_Parame, $efront_string_Functi2, $efront_string_Variab2, $efront_string_Implic, $efront_string_upper, $efront_string_isStri, $efront_string_type, $efront_string_body, $efront_string_global, $efront_string_Direct, $efront_string_raw, $efront_string__use_s, $efront_string__use_s1, $efront_string_Expres, $efront_string_expres, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_catch, $efront_string_WithSt, $efront_string_with, $efront_string_Progra, $efront_string_taints, $efront_string_dynami, $efront_string_block, $efront_string_throug, $efront_string_variab, $efront_string_left, $efront_string_variab1, $efront_string_functi1, $efront_string_direct2, $efront_string_thisFo, $efront_string_naming, $efront_string___defi, $efront_string_id, $efront_string_node, $efront_string_argume, $efront_string_push, $efront_string_Functi1, $efront_string_childS, $efront_string_implic, $efront_string___clos, $efront_string___reso, $efront_string___dele, $efront_string___defi1, $efront_string_Identi, $efront_string___refe, $efront_string___dete, $efront_string___dete1, $efront_string___isCl, $efront_string_resolv1, $efront_string_scope_, $efront_string_target, $efront_string_isArgu, $efront_string_always, $efront_string_isThis, $efront_string_mangle, $efront_string___$esc, $efront_string_attach2, $efront_string_detach, $efront_string_isUsed, $efront_string_scopes, $efront_string_attach3, $efront_string___get, $efront_string_isScop, $efront_string_acquir, $efront_string_releas, $efront_string_isVari, $efront_string_Functi, $efront_string_traver, $efront_string_enter, $efront_string_Assign, $efront_string_operat, $efront_string__3, $efront_string_right, $efront_string_ArrayE, $efront_string_elemen, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_callee, $efront_string_ignore, $efront_string_eval, $efront_string_param, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_Contin, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_ForSta, $efront_string_init, $efront_string_update, $efront_string_ForInS, $efront_string_Variab, $efront_string_declar, $efront_string_params, $efront_string_index, $efront_string_IfStat, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_NewExp, $efront_string_Object, $efront_string_proper1, $efront_string_kind, $efront_string_Proper, $efront_string_Return, $efront_string_argume1, $efront_string_Sequen, $efront_string_expres1, $efront_string_Switch, $efront_string_discri, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_parent, $efront_string_Variab1, $efront_string_WhileS, $efront_string_leave, $efront_string_versio, $efront_string_1_0_3, $efront_string_Refere, $efront_string_Scope, $efront_string_ScopeM, $efront_string_analyz) {
    return function (factory, global) {
        'use strict';
        function namespace(str, obj) {
            var i, iz, names, name;
            for (names = str[$efront_string_split]($efront_string__2), i = 0, iz = names[$efront_string_length]; i < iz; ++i)
                name = names[i], obj[$efront_string_hasOwn](name) ? obj = obj[name] : obj = obj[name] = {};
            return obj
        }
        typeof define === $efront_string_functi && define[$efront_string_amd] ? define($efront_string_escope, [
            $efront_string_export,
            $efront_string_estrav
        ], function (exports, estraverse) {
            factory(exports, global, estraverse)
        }) : typeof exports !== $efront_string_undefi ? factory(exports, global, require(282)) : factory(namespace($efront_string_escope, global), global, global[$efront_string_estrav])
    }(function (exports, global, estraverse) {
        'use strict';
        function assert(cond, text) {
            if (!cond)
                throw new Error(text)
        }
        function defaultOptions() {
            var _a;
            return _a = {}, _a[$efront_string_optimi] = !1, _a[$efront_string_direct1] = !1, _a[$efront_string_ecmaVe] = 5, _a
        }
        function updateDeeply(target, override) {
            function isHashObject(target) {
                return typeof target === $efront_string_object && target instanceof Object && !(target instanceof RegExp)
            }
            var key, val;
            for (key in override)
                override[$efront_string_hasOwn](key) && (val = override[key], isHashObject(val) ? isHashObject(target[key]) ? updateDeeply(target[key], val) : target[key] = updateDeeply({}, val) : target[key] = val);
            return target
        }
        function Reference(ident, scope, flag, writeExpr, maybeImplicitGlobal) {
            this[$efront_string_identi] = ident, this[$efront_string_from] = scope, this[$efront_string_tainte] = !1, this[$efront_string_resolv] = null, this[$efront_string_flag] = flag, this[$efront_string_isWrit]() && (this[$efront_string_writeE] = writeExpr), this[$efront_string___mayb] = maybeImplicitGlobal
        }
        function Variable(name, scope) {
            this[$efront_string_name] = name, this[$efront_string_identi1] = [], this[$efront_string_refere] = [], this[$efront_string_defs] = [], this[$efront_string_tainte] = !1, this[$efront_string_stack] = !0, this[$efront_string_scope] = scope
        }
        function isStrictScope(scope, block) {
            var body, i, iz, stmt, expr;
            if (scope[$efront_string_upper] && scope[$efront_string_upper][$efront_string_isStri])
                return !0;
            if (scope[$efront_string_type] === $efront_string_functi)
                body = block[$efront_string_body];
            else if (scope[$efront_string_type] === $efront_string_global)
                body = block;
            else
                return !1;
            if (options[$efront_string_direct1])
                for (i = 0, iz = body[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    if (stmt = body[$efront_string_body][i], stmt[$efront_string_type] !== $efront_string_Direct)
                        break;
                    if (stmt[$efront_string_raw] === $efront_string__use_s || stmt[$efront_string_raw] === $efront_string__use_s1)
                        return !0
                }
            else
                for (i = 0, iz = body[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    if (stmt = body[$efront_string_body][i], stmt[$efront_string_type] !== Syntax[$efront_string_Expres])
                        break;
                    if (expr = stmt[$efront_string_expres], expr[$efront_string_type] !== Syntax[$efront_string_Litera] || typeof expr[$efront_string_value] !== $efront_string_string)
                        break;
                    if (expr[$efront_string_raw] != null) {
                        if (expr[$efront_string_raw] === $efront_string__use_s || expr[$efront_string_raw] === $efront_string__use_s1)
                            return !0
                    } else if (expr[$efront_string_value] === 'use strict')
                        return !0
                }
            return !1
        }
        function Scope(block, opt) {
            var _a, _b, _c, variable, body;
            this[$efront_string_type] = block[$efront_string_type] === Syntax[$efront_string_CatchC] ? $efront_string_catch : block[$efront_string_type] === Syntax[$efront_string_WithSt] ? $efront_string_with : block[$efront_string_type] === Syntax[$efront_string_Progra] ? $efront_string_global : $efront_string_functi, this[$efront_string_set] = new Map, this[$efront_string_taints] = new Map, this[$efront_string_dynami] = this[$efront_string_type] === $efront_string_global || this[$efront_string_type] === $efront_string_with, this[$efront_string_block] = block, this[$efront_string_throug] = [], this[$efront_string_variab] = [], this[$efront_string_refere] = [], this[$efront_string_left] = [], this[$efront_string_variab1] = this[$efront_string_type] === $efront_string_global || this[$efront_string_type] === $efront_string_functi ? this : currentScope[$efront_string_variab1], this[$efront_string_functi1] = !1, this[$efront_string_direct2] = !1, this[$efront_string_thisFo] = !1, body = this[$efront_string_type] === $efront_string_functi ? block[$efront_string_body] : block, opt[$efront_string_naming] ? (this[$efront_string___defi](block[$efront_string_id], (_a = {}, _a[$efront_string_type] = Variable[$efront_string_Functi2], _a[$efront_string_name] = block[$efront_string_id], _a[$efront_string_node] = block, _a)), this[$efront_string_functi1] = !0) : (this[$efront_string_type] === $efront_string_functi && (variable = new Variable($efront_string_argume, this), this[$efront_string_taints][$efront_string_set]($efront_string_argume, !0), this[$efront_string_set][$efront_string_set]($efront_string_argume, variable), this[$efront_string_variab][$efront_string_push](variable)), block[$efront_string_type] === Syntax[$efront_string_Functi1] && block[$efront_string_id] && new Scope(block, (_b = {}, _b[$efront_string_naming] = !0, _b))), this[$efront_string_upper] = currentScope, this[$efront_string_isStri] = isStrictScope(this, block), this[$efront_string_childS] = [], currentScope && currentScope[$efront_string_childS][$efront_string_push](this), currentScope = this, this[$efront_string_type] === $efront_string_global && (globalScope = this, _c = {}, _c[$efront_string_set] = new Map, _c[$efront_string_variab] = [], globalScope[$efront_string_implic] = _c), scopes[$efront_string_push](this)
        }
        function ScopeManager(scopes) {
            this[$efront_string_scopes] = scopes, this[$efront_string_attach3] = !1
        }
        function analyze(tree, providedOptions) {
            var _a, resultScopes;
            return options = updateDeeply(defaultOptions(), providedOptions), resultScopes = scopes = [], currentScope = null, globalScope = null, estraverse[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function enter(node) {
                var _a, _b, _c, _d, _e, i, iz, decl;
                Scope[$efront_string_isScop](node) && new Scope(node, {});
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Assign]:
                    node[$efront_string_operat] === $efront_string__3 ? currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_WRITE], node[$efront_string_right], !currentScope[$efront_string_isStri] && node[$efront_string_left][$efront_string_name] != null && node) : currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_RW], node[$efront_string_right]);
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_ArrayE]:
                    for (i = 0, iz = node[$efront_string_elemen][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___refe](node[$efront_string_elemen][i]);
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
                    for (i = 0, iz = node[$efront_string_argume][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___refe](node[$efront_string_argume][i]);
                    !options[$efront_string_ignore] && node[$efront_string_callee][$efront_string_type] === Syntax[$efront_string_Identi] && node[$efront_string_callee][$efront_string_name] === $efront_string_eval && currentScope[$efront_string_variab1][$efront_string___dete]();
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
                    node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab] ? currentScope[$efront_string___refe](node[$efront_string_left][$efront_string_declar][0][$efront_string_id], Reference[$efront_string_WRITE], null, !1) : currentScope[$efront_string___refe](node[$efront_string_left], Reference[$efront_string_WRITE], null, !currentScope[$efront_string_isStri] && node[$efront_string_left][$efront_string_name] != null && node);
                    currentScope[$efront_string___refe](node[$efront_string_right]);
                    break;
                case Syntax[$efront_string_Functi]:
                    currentScope[$efront_string_upper][$efront_string___defi](node[$efront_string_id], (_b = {}, _b[$efront_string_type] = Variable[$efront_string_Functi2], _b[$efront_string_name] = node[$efront_string_id], _b[$efront_string_node] = node, _b));
                    for (i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___defi](node[$efront_string_params][i], (_c = {}, _c[$efront_string_type] = Variable[$efront_string_Parame], _c[$efront_string_name] = node[$efront_string_params][i], _c[$efront_string_node] = node, _c[$efront_string_index] = i, _c));
                    break;
                case Syntax[$efront_string_Functi1]:
                    for (i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___defi](node[$efront_string_params][i], (_d = {}, _d[$efront_string_type] = Variable[$efront_string_Parame], _d[$efront_string_name] = node[$efront_string_params][i], _d[$efront_string_node] = node, _d[$efront_string_index] = i, _d));
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
                    node[$efront_string_comput] && currentScope[$efront_string___refe](node[$efront_string_proper]);
                    break;
                case Syntax[$efront_string_NewExp]:
                    currentScope[$efront_string___refe](node[$efront_string_callee]);
                    for (i = 0, iz = node[$efront_string_argume][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___refe](node[$efront_string_argume][i]);
                    break;
                case Syntax[$efront_string_Object]:
                    for (i = 0; i < node[$efront_string_proper1][$efront_string_length]; i++)
                        node[$efront_string_proper1][i][$efront_string_kind] === $efront_string_init && currentScope[$efront_string___refe](node[$efront_string_proper1][i][$efront_string_value]);
                    break;
                case Syntax[$efront_string_Progra]:
                    break;
                case Syntax[$efront_string_Proper]:
                    break;
                case Syntax[$efront_string_Return]:
                    currentScope[$efront_string___refe](node[$efront_string_argume1]);
                    break;
                case Syntax[$efront_string_Sequen]:
                    for (i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i)
                        currentScope[$efront_string___refe](node[$efront_string_expres1][i]);
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
                    for (i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i)
                        decl = node[$efront_string_declar][i], currentScope[$efront_string_variab1][$efront_string___defi](decl[$efront_string_id], (_e = {}, _e[$efront_string_type] = Variable[$efront_string_Variab2], _e[$efront_string_name] = decl[$efront_string_id], _e[$efront_string_node] = decl, _e[$efront_string_index] = i, _e[$efront_string_parent] = node, _e)), decl[$efront_string_init] && (currentScope[$efront_string___refe](decl[$efront_string_id], Reference[$efront_string_WRITE], decl[$efront_string_init], !1), currentScope[$efront_string___refe](decl[$efront_string_init]));
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
                while (currentScope && node === currentScope[$efront_string_block])
                    currentScope[$efront_string___clos]()
            }, _a)), assert(currentScope === null), globalScope = null, scopes = null, options = null, new ScopeManager(resultScopes)
        }
        var Syntax, Map, currentScope, globalScope, scopes, options;
        Syntax = estraverse[$efront_string_Syntax], typeof global[$efront_string_Map] !== $efront_string_undefi ? Map = global[$efront_string_Map] : (Map = function Map() {
            this[$efront_string___data] = {}
        }, Map[$efront_string_protot][$efront_string_get] = function MapGet(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key) ? this[$efront_string___data][key] : undefined
        }, Map[$efront_string_protot][$efront_string_has] = function MapHas(key) {
            return key = $efront_string_$ + key, this[$efront_string___data][$efront_string_hasOwn](key)
        }, Map[$efront_string_protot][$efront_string_set] = function MapSet(key, val) {
            key = $efront_string_$ + key, this[$efront_string___data][key] = val
        }, Map[$efront_string_protot][$efront_string_delete] = function MapDelete(key) {
            return key = $efront_string_$ + key, delete this[$efront_string___data][key]
        }), Reference[$efront_string_READ] = 1, Reference[$efront_string_WRITE] = 2, Reference[$efront_string_RW] = 3, Reference[$efront_string_protot][$efront_string_isStat] = function isStatic() {
            return !this[$efront_string_tainte] && this[$efront_string_resolv] && this[$efront_string_resolv][$efront_string_scope][$efront_string_isStat]()
        }, Reference[$efront_string_protot][$efront_string_isWrit] = function isWrite() {
            return this[$efront_string_flag] & Reference[$efront_string_WRITE]
        }, Reference[$efront_string_protot][$efront_string_isRead] = function isRead() {
            return this[$efront_string_flag] & Reference[$efront_string_READ]
        }, Reference[$efront_string_protot][$efront_string_isRead1] = function isReadOnly() {
            return this[$efront_string_flag] === Reference[$efront_string_READ]
        }, Reference[$efront_string_protot][$efront_string_isWrit1] = function isWriteOnly() {
            return this[$efront_string_flag] === Reference[$efront_string_WRITE]
        }, Reference[$efront_string_protot][$efront_string_isRead2] = function isReadWrite() {
            return this[$efront_string_flag] === Reference[$efront_string_RW]
        }, Variable[$efront_string_CatchC] = $efront_string_CatchC, Variable[$efront_string_Parame] = $efront_string_Parame, Variable[$efront_string_Functi2] = $efront_string_Functi2, Variable[$efront_string_Variab2] = $efront_string_Variab2, Variable[$efront_string_Implic] = $efront_string_Implic, Scope[$efront_string_protot][$efront_string___clos] = function __close() {
            var _a, i, iz, ref, current, node, implicit;
            if (!this[$efront_string_dynami] || options[$efront_string_optimi])
                for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i)
                    ref = this[$efront_string_left][i], this[$efront_string___reso](ref) || this[$efront_string___dele](ref);
            else if (this[$efront_string_type] === $efront_string_with)
                for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i)
                    ref = this[$efront_string_left][i], ref[$efront_string_tainte] = !0, this[$efront_string___dele](ref);
            else
                for (i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i) {
                    ref = this[$efront_string_left][i], current = this;
                    do
                        current[$efront_string_throug][$efront_string_push](ref), current = current[$efront_string_upper];
                    while (current)
                }
            if (this[$efront_string_type] === $efront_string_global) {
                for (implicit = [], i = 0, iz = this[$efront_string_left][$efront_string_length]; i < iz; ++i)
                    ref = this[$efront_string_left][i], ref[$efront_string___mayb] && !this[$efront_string_set][$efront_string_has](ref[$efront_string_identi][$efront_string_name]) && implicit[$efront_string_push](ref[$efront_string___mayb]);
                for (i = 0, iz = implicit[$efront_string_length]; i < iz; ++i)
                    node = implicit[i], this[$efront_string___defi1](node[$efront_string_left], (_a = {}, _a[$efront_string_type] = Variable[$efront_string_Implic], _a[$efront_string_name] = node[$efront_string_left], _a[$efront_string_node] = node, _a))
            }
            this[$efront_string_left] = null, currentScope = this[$efront_string_upper]
        }, Scope[$efront_string_protot][$efront_string___reso] = function __resolve(ref) {
            var variable, name;
            return name = ref[$efront_string_identi][$efront_string_name], this[$efront_string_set][$efront_string_has](name) ? (variable = this[$efront_string_set][$efront_string_get](name), variable[$efront_string_refere][$efront_string_push](ref), variable[$efront_string_stack] = variable[$efront_string_stack] && ref[$efront_string_from][$efront_string_variab1] === this[$efront_string_variab1], ref[$efront_string_tainte] && (variable[$efront_string_tainte] = !0, this[$efront_string_taints][$efront_string_set](variable[$efront_string_name], !0)), ref[$efront_string_resolv] = variable, !0) : !1
        }, Scope[$efront_string_protot][$efront_string___dele] = function __delegateToUpperScope(ref) {
            this[$efront_string_upper] && this[$efront_string_upper][$efront_string_left][$efront_string_push](ref), this[$efront_string_throug][$efront_string_push](ref)
        }, Scope[$efront_string_protot][$efront_string___defi1] = function __defineImplicit(node, info) {
            var name, variable;
            node && node[$efront_string_type] === Syntax[$efront_string_Identi] && (name = node[$efront_string_name], this[$efront_string_implic][$efront_string_set][$efront_string_has](name) ? (variable = this[$efront_string_implic][$efront_string_set][$efront_string_get](name), variable[$efront_string_identi1][$efront_string_push](node), variable[$efront_string_defs][$efront_string_push](info)) : (variable = new Variable(name, this), variable[$efront_string_identi1][$efront_string_push](node), variable[$efront_string_defs][$efront_string_push](info), this[$efront_string_implic][$efront_string_set][$efront_string_set](name, variable), this[$efront_string_implic][$efront_string_variab][$efront_string_push](variable)))
        }, Scope[$efront_string_protot][$efront_string___defi] = function __define(node, info) {
            var name, variable;
            node && node[$efront_string_type] === Syntax[$efront_string_Identi] && (name = node[$efront_string_name], this[$efront_string_set][$efront_string_has](name) ? (variable = this[$efront_string_set][$efront_string_get](name), variable[$efront_string_identi1][$efront_string_push](node), variable[$efront_string_defs][$efront_string_push](info)) : (variable = new Variable(name, this), variable[$efront_string_identi1][$efront_string_push](node), variable[$efront_string_defs][$efront_string_push](info), this[$efront_string_set][$efront_string_set](name, variable), this[$efront_string_variab][$efront_string_push](variable)))
        }, Scope[$efront_string_protot][$efront_string___refe] = function __referencing(node, assign, writeExpr, maybeImplicitGlobal) {
            var ref;
            node && node[$efront_string_type] === Syntax[$efront_string_Identi] && (ref = new Reference(node, this, assign || Reference[$efront_string_READ], writeExpr, maybeImplicitGlobal), this[$efront_string_refere][$efront_string_push](ref), this[$efront_string_left][$efront_string_push](ref))
        }, Scope[$efront_string_protot][$efront_string___dete] = function __detectEval() {
            var current;
            current = this, this[$efront_string_direct2] = !0;
            do
                current[$efront_string_dynami] = !0, current = current[$efront_string_upper];
            while (current)
        }, Scope[$efront_string_protot][$efront_string___dete1] = function __detectThis() {
            this[$efront_string_thisFo] = !0
        }, Scope[$efront_string_protot][$efront_string___isCl] = function isClosed() {
            return this[$efront_string_left] === null
        }, Scope[$efront_string_protot][$efront_string_resolv1] = function resolve(ident) {
            var ref, i, iz;
            for (assert(this[$efront_string___isCl](), $efront_string_scope_), assert(ident[$efront_string_type] === Syntax[$efront_string_Identi], $efront_string_target), i = 0, iz = this[$efront_string_refere][$efront_string_length]; i < iz; ++i)
                if (ref = this[$efront_string_refere][i], ref[$efront_string_identi] === ident)
                    return ref;
            return null
        }, Scope[$efront_string_protot][$efront_string_isStat] = function isStatic() {
            return !this[$efront_string_dynami]
        }, Scope[$efront_string_protot][$efront_string_isArgu] = function isArgumentsMaterialized() {
            var variable;
            return this[$efront_string_type] !== $efront_string_functi ? !0 : this[$efront_string_isStat]() ? (variable = this[$efront_string_set][$efront_string_get]($efront_string_argume), assert(variable, $efront_string_always), variable[$efront_string_tainte] || variable[$efront_string_refere][$efront_string_length] !== 0) : !0
        }, Scope[$efront_string_protot][$efront_string_isThis] = function isThisMaterialized() {
            return this[$efront_string_type] !== $efront_string_functi ? !0 : this[$efront_string_isStat]() ? this[$efront_string_thisFo] : !0
        }, Scope[$efront_string_mangle] = $efront_string___$esc, Scope[$efront_string_protot][$efront_string_attach2] = function attach() {
            this[$efront_string_functi1] || (this[$efront_string_block][Scope[$efront_string_mangle]] = this)
        }, Scope[$efront_string_protot][$efront_string_detach] = function detach() {
            this[$efront_string_functi1] || delete this[$efront_string_block][Scope[$efront_string_mangle]]
        }, Scope[$efront_string_protot][$efront_string_isUsed] = function (name) {
            if (this[$efront_string_set][$efront_string_has](name))
                return !0;
            for (var i = 0, iz = this[$efront_string_throug][$efront_string_length]; i < iz; ++i)
                if (this[$efront_string_throug][i][$efront_string_identi][$efront_string_name] === name)
                    return !0;
            return !1
        }, ScopeManager[$efront_string_protot][$efront_string___get] = function __get(node) {
            var i, iz, scope;
            if (this[$efront_string_attach3])
                return node[Scope[$efront_string_mangle]] || null;
            if (Scope[$efront_string_isScop](node))
                for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i)
                    if (scope = this[$efront_string_scopes][i], !scope[$efront_string_functi1] && scope[$efront_string_block] === node)
                        return scope;
            return null
        }, ScopeManager[$efront_string_protot][$efront_string_acquir] = function acquire(node) {
            return this[$efront_string___get](node)
        }, ScopeManager[$efront_string_protot][$efront_string_releas] = function release(node) {
            var scope = this[$efront_string___get](node);
            if (scope) {
                scope = scope[$efront_string_upper];
                while (scope) {
                    if (!scope[$efront_string_functi1])
                        return scope;
                    scope = scope[$efront_string_upper]
                }
            }
            return null
        }, ScopeManager[$efront_string_protot][$efront_string_attach2] = function attach() {
            var i, iz;
            for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i)
                this[$efront_string_scopes][i][$efront_string_attach2]();
            this[$efront_string_attach3] = !0
        }, ScopeManager[$efront_string_protot][$efront_string_detach] = function detach() {
            var i, iz;
            for (i = 0, iz = this[$efront_string_scopes][$efront_string_length]; i < iz; ++i)
                this[$efront_string_scopes][i][$efront_string_detach]();
            this[$efront_string_attach3] = !1
        }, Scope[$efront_string_isScop] = function isScopeRequired(node) {
            return Scope[$efront_string_isVari](node) || node[$efront_string_type] === Syntax[$efront_string_WithSt] || node[$efront_string_type] === Syntax[$efront_string_CatchC]
        }, Scope[$efront_string_isVari] = function isVariableScopeRequired(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]
        }, exports[$efront_string_versio] = $efront_string_1_0_3, exports[$efront_string_Refere] = Reference, exports[$efront_string_Variab2] = Variable, exports[$efront_string_Scope] = Scope, exports[$efront_string_ScopeM] = ScopeManager, exports[$efront_string_analyz] = analyze
    }, this)
}],
/** 475 esutils */ [1,function(require) {
    return require(390)
}],
/** 476 escope */ [1,function(require) {
    return require(474)
}],
/** 477 $efront_string_is */ "is",
/** 478 $efront_string_Unreac */ /** text */ "Unreachable point. logically broken.",
/** 479 $efront_string_loc */ "loc",
/** 480 $efront_string_number */ "number",
/** 481 $efront_string__4 */ "-",
/** 482 $efront_string_string1 */ "stringRepeat",
/** 483 $efront_string_sameVa */ "sameValue",
/** 484 $efront_string_Array */ "Array",
/** 485 $efront_string_of */ "of",
/** 486 $efront_string_last */ "last",
/** 487 $efront_string_empty */ "empty",
/** 488 $efront_string_Object2 */ "Object",
/** 489 $efront_string_isObje */ "isObject",
/** 490 $efront_string_assert */ "assert",
/** 491 $efront_string_unreac */ "unreachable",
/** 492 $efront_string_isIden3 */ "isIdentifier",
/** 493 $efront_string_moveLo */ "moveLocation",
/** 494 $efront_string_delete1 */ "deleteLocation",
/** 495 $efront_string_conver */ "convertToEmptyStatement",
/** 496 $efront_string_mayBeC */ "mayBeCompletionValue",
/** 497 $efront_string_isNega */ "isNegative",
/** 498 $efront_string_isFunc */ "isFunctionBody",
/** 499 $efront_string_Specia */ "SpecialNode",
/** 500 $efront_string_genera1 */ "generateNegative",
/** 501 $efront_string_genera2 */ "generateUndefined",
/** 502 $efront_string_isUnde */ "isUndefined",
/** 503 $efront_string_genera3 */ "generateNaN",
/** 504 $efront_string_isNaN */ "isNaN",
/** 505 $efront_string_isRefe */ "isReference",
/** 506 $efront_string_canExt */ "canExtractSequence",
/** 507 $efront_string_genera4 */ "generateFromValue",
/** 508 $efront_string_delega */ "delegateVariableDeclarations",
/** 509 $efront_string_isScop1 */ "isScopedDeclaration",
/** 510 common.js */ [1,54,55,16,56,17,341,51,52,180,109,36,110,12,111,112,39,2,3,477,271,272,478,389,383,385,386,171,78,82,81,64,93,119,98,126,479,182,77,85,134,480,102,463,481,136,361,65,290,113,114,83,88,67,199,381,445,406,42,371,103,167,170,104,468,349,367,145,129,47,183,147,471,462,354,80,146,5,278,482,483,484,396,485,486,487,488,489,40,149,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,function(require, Array, Object, RegExp, Error, String, isNaN, undefined, exports, $efront_string_Syntax, $efront_string_isArra, $efront_string_protot, $efront_string_toStri, $efront_string_call, $efront_string__objec, $efront_string_object, $efront_string_hasOwn, $efront_string_slice, $efront_string_length, $efront_string_is, $efront_string_lastIn, $efront_string___, $efront_string_Unreac, $efront_string_keywor, $efront_string_isKeyw, $efront_string_isRest, $efront_string_isIden2, $efront_string_type, $efront_string_Expres, $efront_string_Functi1, $efront_string_Functi, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_Switch1, $efront_string_conseq, $efront_string_loc, $efront_string_Visito, $efront_string_EmptyS, $efront_string_Litera, $efront_string_value, $efront_string_number, $efront_string_UnaryE, $efront_string_operat, $efront_string__4, $efront_string_argume1, $efront_string_void, $efront_string_Binary, $efront_string__1, $efront_string_left, $efront_string_right, $efront_string_Identi, $efront_string_Member, $efront_string_CallEx, $efront_string_name, $efront_string_eval, $efront_string_resolv1, $efront_string_isStat, $efront_string_delete, $efront_string_typeof, $efront_string_Update, $efront_string_traver, $efront_string_enter, $efront_string_Variab, $efront_string_kind, $efront_string_let, $efront_string_const, $efront_string_declar, $efront_string_init, $efront_string_push, $efront_string_Visito1, $efront_string_Skip, $efront_string_Scope, $efront_string_isVari, $efront_string_var, $efront_string_ForInS, $efront_string_Break, $efront_string_concat, $efront_string_deepCo, $efront_string_string1, $efront_string_sameVa, $efront_string_Array, $efront_string_from, $efront_string_of, $efront_string_last, $efront_string_empty, $efront_string_Object2, $efront_string_isObje, $efront_string_has, $efront_string_replac, $efront_string_assert, $efront_string_unreac, $efront_string_isIden3, $efront_string_moveLo, $efront_string_delete1, $efront_string_conver, $efront_string_mayBeC, $efront_string_isNega, $efront_string_isFunc, $efront_string_Specia, $efront_string_genera1, $efront_string_genera2, $efront_string_isUnde, $efront_string_genera3, $efront_string_isNaN, $efront_string_isRefe, $efront_string_canExt, $efront_string_genera4, $efront_string_delega, $efront_string_isScop1) {
    return function (_a, _b, _c, Syntax, isArray, arrayFrom, arrayOf, has, sameValue, estraverse, escope, esutils) {
        'use strict';
        function isObject(obj) {
            return typeof obj === $efront_string_object && obj !== null
        }
        function arrayLast(array) {
            return array[array[$efront_string_length] - 1]
        }
        function arrayEmpty(array) {
            return array[$efront_string_length] === 0
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str)
                num & 1 && (result += str);
            return result
        }
        function deepCopy(obj) {
            function deepCopyInternal(obj, result) {
                var key, val;
                for (key in obj) {
                    if (key[$efront_string_lastIn]($efront_string___, 0) === 0)
                        continue;
                    obj[$efront_string_hasOwn](key) && (val = obj[key], typeof val === $efront_string_object && val !== null && (val instanceof RegExp ? val = new RegExp(val) : val = deepCopyInternal(val, isArray(val) ? [] : {})), result[key] = val)
                }
                return result
            }
            return deepCopyInternal(obj, isArray(obj) ? [] : {})
        }
        function assert(cond, text) {
            if (!cond)
                throw new Error(text)
        }
        function unreachable() {
            throw new Error($efront_string_Unreac)
        }
        function isIdentifier(name) {
            return esutils[$efront_string_keywor][$efront_string_isKeyw](name, !0) || esutils[$efront_string_keywor][$efront_string_isRest](name) ? !1 : esutils[$efront_string_keywor][$efront_string_isIden2](name)
        }
        function mayBeCompletionValue(node, ancestors) {
            var i, ancestor;
            if (node[$efront_string_type] !== Syntax[$efront_string_Expres])
                return !0;
            for (i = ancestors[$efront_string_length] - 1; i >= 0; --i, node = ancestor) {
                ancestor = ancestors[i];
                switch (ancestor[$efront_string_type]) {
                case Syntax[$efront_string_Functi1]:
                case Syntax[$efront_string_Functi]:
                    return !1;
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    if (arrayLast(ancestor[$efront_string_body]) !== node)
                        return !1;
                    break;
                case Syntax[$efront_string_Switch1]:
                    if (arrayLast(ancestor[$efront_string_conseq]) !== node)
                        return !1;
                    break
                }
            }
            return !0
        }
        function moveLocation(from, to) {
            return from[$efront_string_loc] == null ? to : (to[$efront_string_loc] = deepCopy(from[$efront_string_loc]), to)
        }
        function deleteLocation(node) {
            return node[$efront_string_hasOwn]($efront_string_loc) ? delete node[$efront_string_loc] : !1
        }
        function convertToEmptyStatement(node) {
            var i, iz, keys;
            for (keys = estraverse[$efront_string_Visito][node[$efront_string_type]], i = 0, iz = keys[$efront_string_length]; i < iz; ++i)
                delete node[keys[i]];
            return node[$efront_string_type] = Syntax[$efront_string_EmptyS], node
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
            var _a, _b, result;
            return _a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__4, _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = -value, _a[$efront_string_argume1] = _b, result = _a, node ? moveLocation(node, result) : result
        }
        function isNegativeNode(node) {
            return node[$efront_string_type] === Syntax[$efront_string_UnaryE] && node[$efront_string_operat] === $efront_string__4 && isNumberLiteral(node[$efront_string_argume1])
        }
        function generateUndefined(node) {
            var _a, _b, result = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _a[$efront_string_argume1] = _b, _a);
            return node ? moveLocation(node, result) : result
        }
        function isUndefined(node) {
            return node[$efront_string_type] === Syntax[$efront_string_UnaryE] && node[$efront_string_operat] === $efront_string_void && isOptimizedArgument(node[$efront_string_argume1])
        }
        function generateNaN(node) {
            var _a, _b, _c, result = (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Binary], _a[$efront_string_operat] = $efront_string__1, _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _a[$efront_string_left] = _b, _c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = 0, _a[$efront_string_right] = _c, _a);
            return node ? moveLocation(node, result) : result
        }
        function isNaNNode(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Binary] && isOptimizedArgument(node[$efront_string_left]) && isOptimizedArgument(node[$efront_string_right]) ? node[$efront_string_left][$efront_string_value] === 0 && node[$efront_string_right][$efront_string_value] === 0 : !1
        }
        function generateFromValue(value) {
            var _a;
            if (typeof value === $efront_string_number) {
                if (isNaN(value))
                    return generateNaN();
                if (isNegative(value))
                    return generateNegativeNode(value)
            }
            return value === undefined ? generateUndefined() : (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Litera], _a[$efront_string_value] = value, _a)
        }
        function isReference(node) {
            var type = node[$efront_string_type];
            return type === Syntax[$efront_string_Identi] || type === Syntax[$efront_string_Member]
        }
        function canExtractSequence(last, parent, scope) {
            var ref;
            if (parent[$efront_string_type] === Syntax[$efront_string_CallEx])
                return last[$efront_string_type] === Syntax[$efront_string_Identi] ? last[$efront_string_name] === $efront_string_eval ? !1 : (ref = scope[$efront_string_resolv1](last), ref && ref[$efront_string_isStat]()) : last[$efront_string_type] !== Syntax[$efront_string_Member];
            if (parent[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                if (parent[$efront_string_operat] === $efront_string_delete)
                    return !isReference(last);
                else if (parent[$efront_string_operat] === $efront_string_typeof && last[$efront_string_type] === Syntax[$efront_string_Identi])
                    return ref = scope[$efront_string_resolv1](last), ref && ref[$efront_string_isStat]()
            } else if (parent[$efront_string_type] === Syntax[$efront_string_Update])
                return !isReference(last);
            return !0
        }
        function delegateVariableDeclarations(stmt, func) {
            var _a, _b, _c, decls, target;
            return decls = [], estraverse[$efront_string_traver](stmt, (_a = {}, _a[$efront_string_enter] = function (node) {
                var i, iz, decl;
                if (node[$efront_string_type] === Syntax[$efront_string_Variab]) {
                    if (node[$efront_string_kind] === $efront_string_let || node[$efront_string_kind] === $efront_string_const)
                        return;
                    for (i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i)
                        decl = node[$efront_string_declar][i], delete decl[$efront_string_init], decls[$efront_string_push](decl);
                    return estraverse[$efront_string_Visito1][$efront_string_Skip]
                }
                return escope[$efront_string_Scope][$efront_string_isVari](node) ? estraverse[$efront_string_Visito1][$efront_string_Skip] : void 0
            }, _a)), decls[$efront_string_length] ? (target = null, estraverse[$efront_string_traver](func[$efront_string_body], (_b = {}, _b[$efront_string_enter] = function (node, parent) {
                return node === stmt ? estraverse[$efront_string_Visito1][$efront_string_Skip] : escope[$efront_string_Scope][$efront_string_isVari](node) ? estraverse[$efront_string_Visito1][$efront_string_Skip] : node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var && parent[$efront_string_type] !== Syntax[$efront_string_ForInS] ? (target = node, estraverse[$efront_string_Visito1][$efront_string_Break]) : void 0
            }, _b)), target ? (target[$efront_string_declar] = target[$efront_string_declar][$efront_string_concat](decls), null) : (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Variab], _c[$efront_string_kind] = $efront_string_var, _c[$efront_string_declar] = decls, _c)) : null
        }
        function isScopedDeclaration(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Variab] && (node[$efront_string_kind] === $efront_string_let || node[$efront_string_kind] === $efront_string_const) ? !0 : node[$efront_string_type] === Syntax[$efront_string_Functi] ? !0 : !1
        }
        estraverse = require(282), escope = require(476), esutils = require(475), Syntax = estraverse[$efront_string_Syntax], isArray = Array[$efront_string_isArra], isArray || (isArray = function isArray(array) {
            return Object[$efront_string_protot][$efront_string_toStri][$efront_string_call](array) === $efront_string__objec
        }), has = function (method) {
            return method = {}[$efront_string_hasOwn], function has(obj, prop) {
                return method[$efront_string_call](obj, prop)
            }
        }(), arrayFrom = function (slice) {
            return slice = Array[$efront_string_protot][$efront_string_slice], function arrayFrom(array) {
                return slice[$efront_string_call](array)
            }
        }(), arrayOf = function (slice) {
            return slice = Array[$efront_string_protot][$efront_string_slice], function arrayOf() {
                return slice[$efront_string_call](arguments)
            }
        }(), Object[$efront_string_is] ? sameValue = Object[$efront_string_is] : sameValue = function sameValue(x, y) {
            return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y
        }, exports[$efront_string_deepCo] = deepCopy, exports[$efront_string_string1] = stringRepeat, exports[$efront_string_sameVa] = sameValue, _a = {}, _a[$efront_string_isArra] = isArray, _a[$efront_string_from] = arrayFrom, _a[$efront_string_of] = arrayOf, _a[$efront_string_last] = arrayLast, _a[$efront_string_empty] = arrayEmpty, exports[$efront_string_Array] = _a, _b = {}, _b[$efront_string_isObje] = isObject, _b[$efront_string_has] = has, exports[$efront_string_Object2] = _b, exports[$efront_string_Syntax] = Syntax, exports[$efront_string_traver] = estraverse[$efront_string_traver], exports[$efront_string_replac] = estraverse[$efront_string_replac], exports[$efront_string_Visito] = estraverse[$efront_string_Visito], exports[$efront_string_Visito1] = estraverse[$efront_string_Visito1], exports[$efront_string_assert] = assert, exports[$efront_string_unreac] = unreachable, exports[$efront_string_isIden3] = isIdentifier, exports[$efront_string_moveLo] = moveLocation, exports[$efront_string_delete1] = deleteLocation, exports[$efront_string_conver] = convertToEmptyStatement, exports[$efront_string_mayBeC] = mayBeCompletionValue, exports[$efront_string_isNega] = isNegative, exports[$efront_string_isFunc] = isFunctionBody, _c = {}, _c[$efront_string_genera1] = generateNegativeNode, _c[$efront_string_isNega] = isNegativeNode, _c[$efront_string_genera2] = generateUndefined, _c[$efront_string_isUnde] = isUndefined, _c[$efront_string_genera3] = generateNaN, _c[$efront_string_isNaN] = isNaNNode, _c[$efront_string_isRefe] = isReference, _c[$efront_string_canExt] = canExtractSequence, _c[$efront_string_genera4] = generateFromValue, exports[$efront_string_Specia] = _c, exports[$efront_string_delega] = delegateVariableDeclarations, exports[$efront_string_isScop1] = isScopedDeclaration
    }()
}],
/** 511 $efront_string_annota */ "annotate-directive",
/** 512 $efront_string__5 */ "\\",
/** 513 $efront_string__6 */ "\b",
/** 514 $efront_string_b */ "b",
/** 515 $efront_string__7 */ /** text */ "\f",
/** 516 $efront_string_f */ "f",
/** 517 $efront_string__8 */ /** text */ "\t",
/** 518 $efront_string_t */ "t",
/** 519 $efront_string_u */ "u",
/** 520 $efront_string_0000 */ "0000",
/** 521 $efront_string_1 */ "0123456789",
/** 522 $efront_string__9 */ /** text */ "\u000b",
/** 523 $efront_string_v */ "v",
/** 524 $efront_string_x */ "x",
/** 525 $efront_string_00 */ "00",
/** 526 $efront_string__10 */ /** text */ "\n",
/** 527 $efront_string_n */ "n",
/** 528 $efront_string__11 */ /** text */ "\r",
/** 529 $efront_string_r */ "r",
/** 530 $efront_string__12 */ /** text */ "\u2028",
/** 531 $efront_string_u2028 */ "u2028",
/** 532 $efront_string__13 */ /** text */ "\u2029",
/** 533 $efront_string_u2029 */ "u2029",
/** 534 $efront_string_Incorr */ /** text */ "Incorrectly classified character",
/** 535 $efront_string_string2 */ "stringToArray",
/** 536 $efront_string__14 */ "'",
/** 537 $efront_string__15 */ "\\'",
/** 538 $efront_string__16 */ /** text */ "\\\n\r\u2028\u2029",
/** 539 $efront_string__17 */ /** text */ " ",
/** 540 $efront_string__18 */ "~",
/** 541 $efront_string_destru */ "destructive",
/** 542 $efront_string_pathNa */ "pathName",
/** 543 $efront_string_passNa */ "passName",
/** 544 annotate-directive.js */ [1,56,15,511,180,171,78,128,85,134,10,382,110,512,513,514,515,516,517,518,519,520,2,3,273,521,9,522,523,524,525,526,527,528,529,530,531,532,533,534,34,535,536,537,538,539,540,37,541,542,278,167,170,93,64,82,81,119,75,198,393,45,543,13,function(require, Error, module, $efront_string_annota, $efront_string_Syntax, $efront_string_type, $efront_string_Expres, $efront_string_expres, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_charCo, $efront_string_toStri, $efront_string__5, $efront_string__6, $efront_string_b, $efront_string__7, $efront_string_f, $efront_string__8, $efront_string_t, $efront_string_u, $efront_string_0000, $efront_string_slice, $efront_string_length, $efront_string_0, $efront_string_1, $efront_string_indexO, $efront_string__9, $efront_string_v, $efront_string_x, $efront_string_00, $efront_string__10, $efront_string_n, $efront_string__11, $efront_string_r, $efront_string__12, $efront_string_u2028, $efront_string__13, $efront_string_u2029, $efront_string_Incorr, $efront_string_undefi, $efront_string_string2, $efront_string__14, $efront_string__15, $efront_string__16, $efront_string__17, $efront_string__18, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_Progra, $efront_string_BlockS, $efront_string_Functi1, $efront_string_Functi, $efront_string_body, $efront_string_Direct, $efront_string_raw, $efront_string_direct1, $efront_string_substr, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common) {
        'use strict';
        function isDirective(stmt) {
            var expr;
            return stmt[$efront_string_type] === Syntax[$efront_string_Expres] && (expr = stmt[$efront_string_expres], expr[$efront_string_type] === Syntax[$efront_string_Litera] && typeof expr[$efront_string_value] === $efront_string_string) ? !0 : !1
        }
        function escapeAllowedCharacter(ch, next) {
            var code = ch[$efront_string_charCo](0), hex = code[$efront_string_toStri](16), result = $efront_string__5;
            switch (ch) {
            case $efront_string__6:
                result += $efront_string_b;
                break;
            case $efront_string__7:
                result += $efront_string_f;
                break;
            case $efront_string__8:
                result += $efront_string_t;
                break;
            default:
                code > 255 ? result += $efront_string_u + $efront_string_0000[$efront_string_slice](hex[$efront_string_length]) + hex : ch === $efront_string_0 && $efront_string_1[$efront_string_indexO](next) < 0 ? result += $efront_string_0 : ch === $efront_string__9 ? result += $efront_string_v : result += $efront_string_x + $efront_string_00[$efront_string_slice](hex[$efront_string_length]) + hex;
                break
            }
            return result
        }
        function escapeDisallowedCharacter(ch) {
            var result = $efront_string__5;
            switch (ch) {
            case $efront_string__5:
                result += $efront_string__5;
                break;
            case $efront_string__10:
                result += $efront_string_n;
                break;
            case $efront_string__11:
                result += $efront_string_r;
                break;
            case $efront_string__12:
                result += $efront_string_u2028;
                break;
            case $efront_string__13:
                result += $efront_string_u2029;
                break;
            default:
                throw new Error($efront_string_Incorr)
            }
            return result
        }
        function escapeString(str) {
            var result = '', i, len, ch;
            for (typeof str[0] === $efront_string_undefi && (str = common[$efront_string_string2](str)), i = 0, len = str[$efront_string_length]; i < len; i += 1) {
                if (ch = str[i], ch === $efront_string__14) {
                    result += $efront_string__15;
                    continue
                }
                if ($efront_string__16[$efront_string_indexO](ch) >= 0) {
                    result += escapeDisallowedCharacter(ch);
                    continue
                }
                if (!(ch >= $efront_string__17 && ch <= $efront_string__18)) {
                    result += escapeAllowedCharacter(ch, str[i + 1]);
                    continue
                }
                result += ch
            }
            return result
        }
        function annotateDirective(tree, options) {
            var _a, _b, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node, parent) {
                var stmt, i, iz;
                if (!(node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_BlockS] && (parent[$efront_string_type] === Syntax[$efront_string_Functi1] || parent[$efront_string_type] === Syntax[$efront_string_Functi])))
                    return;
                for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    if (stmt = node[$efront_string_body][i], !isDirective(stmt))
                        return;
                    stmt[$efront_string_type] = Syntax[$efront_string_Direct], stmt[$efront_string_expres][$efront_string_raw] ? (stmt[$efront_string_direct1] = stmt[$efront_string_expres][$efront_string_raw][$efront_string_substr](1, stmt[$efront_string_expres][$efront_string_raw][$efront_string_length] - 1), stmt[$efront_string_value] = stmt[$efront_string_expres][$efront_string_value], stmt[$efront_string_raw] = stmt[$efront_string_expres][$efront_string_raw]) : (stmt[$efront_string_direct1] = escapeString(stmt[$efront_string_expres][$efront_string_value]), stmt[$efront_string_value] = stmt[$efront_string_expres][$efront_string_value], stmt[$efront_string_raw] = $efront_string__14 + stmt[$efront_string_direct1] + $efront_string__14), delete stmt[$efront_string_expres]
                }
            }, _b)), result
        }
        Name = $efront_string_annota, common = require(510), Syntax = common[$efront_string_Syntax], annotateDirective[$efront_string_passNa] = Name, module[$efront_string_export] = annotateDirective
    }()
}],
/** 545 $efront_string__19 */ "!",
/** 546 $efront_string__20 */ "||",
/** 547 $efront_string__21 */ "&&",
/** 548 $efront_string__22 */ "+",
/** 549 $efront_string__23 */ "|",
/** 550 $efront_string__24 */ "^",
/** 551 $efront_string__25 */ "&",
/** 552 $efront_string__26 */ "==",
/** 553 $efront_string__27 */ "!=",
/** 554 $efront_string__28 */ "===",
/** 555 $efront_string__29 */ "!==",
/** 556 $efront_string__30 */ "<",
/** 557 $efront_string__31 */ ">",
/** 558 $efront_string__32 */ "<=",
/** 559 $efront_string__33 */ ">=",
/** 560 $efront_string__34 */ "<<",
/** 561 $efront_string__35 */ ">>",
/** 562 $efront_string__36 */ ">>>",
/** 563 $efront_string__37 */ "%",
/** 564 $efront_string_consta */ "constant",
/** 565 $efront_string_doBina */ "doBinary",
/** 566 $efront_string_doUnar */ "doUnary",
/** 567 $efront_string_doLogi */ "doLogical",
/** 568 $efront_string_evalua */ "evaluate",
/** 569 $efront_string_isCons */ "isConstant",
/** 570 $efront_string_hasSid */ "hasSideEffect",
/** 571 $efront_string_boolea */ "booleanCondition",
/** 572 evaluator.js */ [1,51,52,180,171,85,134,112,102,463,361,42,545,136,65,352,380,113,114,87,491,546,547,548,481,540,371,549,550,551,552,553,554,555,556,557,558,559,560,561,562,230,290,563,564,565,566,567,568,569,60,61,115,3,67,72,22,126,127,82,83,445,406,88,90,91,135,94,96,137,99,103,570,484,486,571,function(require, undefined, exports, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_object, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_delete, $efront_string__19, $efront_string_argume1, $efront_string_Binary, $efront_string_in, $efront_string_instan, $efront_string_left, $efront_string_right, $efront_string_Logica, $efront_string_unreac, $efront_string__20, $efront_string__21, $efront_string__22, $efront_string__4, $efront_string__18, $efront_string_typeof, $efront_string__23, $efront_string__24, $efront_string__25, $efront_string__26, $efront_string__27, $efront_string__28, $efront_string__29, $efront_string__30, $efront_string__31, $efront_string__32, $efront_string__33, $efront_string__34, $efront_string__35, $efront_string__36, $efront_string__, $efront_string__1, $efront_string__37, $efront_string_consta, $efront_string_doBina, $efront_string_doUnar, $efront_string_doLogi, $efront_string_evalua, $efront_string_isCons, $efront_string_Assign, $efront_string_ArrayE, $efront_string_elemen, $efront_string_length, $efront_string_CallEx, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_Functi1, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_proper1, $efront_string_Proper, $efront_string_Sequen, $efront_string_expres1, $efront_string_ThisEx, $efront_string_Update, $efront_string_hasSid, $efront_string_Array, $efront_string_last, $efront_string_boolea) {
    return function (_a, Syntax, common) {
        'use strict';
        function isConstant(node, allowRegExp) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] ? typeof node[$efront_string_value] === $efront_string_object && node[$efront_string_value] !== null ? allowRegExp : !0 : node[$efront_string_type] === Syntax[$efront_string_UnaryE] ? node[$efront_string_operat] === $efront_string_void || node[$efront_string_operat] === $efront_string_delete || node[$efront_string_operat] === $efront_string__19 ? isConstant(node[$efront_string_argume1], !0) : isConstant(node[$efront_string_argume1], !1) : node[$efront_string_type] === Syntax[$efront_string_Binary] ? node[$efront_string_operat] === $efront_string_in || node[$efront_string_operat] === $efront_string_instan ? !1 : isConstant(node[$efront_string_left], !1) && isConstant(node[$efront_string_right], !1) : node[$efront_string_type] === Syntax[$efront_string_Logica] ? isConstant(node[$efront_string_left], !0) && isConstant(node[$efront_string_right], !0) : !1
        }
        function getConstant(node) {
            if (node[$efront_string_type] === Syntax[$efront_string_Litera])
                return node[$efront_string_value];
            if (node[$efront_string_type] === Syntax[$efront_string_UnaryE])
                return doUnary(node[$efront_string_operat], getConstant(node[$efront_string_argume1]));
            if (node[$efront_string_type] === Syntax[$efront_string_Binary])
                return doBinary(node[$efront_string_operat], getConstant(node[$efront_string_left]), getConstant(node[$efront_string_right]));
            if (node[$efront_string_type] === Syntax[$efront_string_Logica])
                return doLogical(node[$efront_string_operat], getConstant(node[$efront_string_left]), getConstant(node[$efront_string_right]));
            common[$efront_string_unreac]()
        }
        function doLogical(operator, left, right) {
            if (operator === $efront_string__20)
                return left || right;
            if (operator === $efront_string__21)
                return left && right;
            common[$efront_string_unreac]()
        }
        function doUnary(operator, argument) {
            switch (operator) {
            case $efront_string__22:
                return +argument;
            case $efront_string__4:
                return -argument;
            case $efront_string__18:
                return ~argument;
            case $efront_string__19:
                return !argument;
            case $efront_string_delete:
                return !0;
            case $efront_string_void:
                return undefined;
            case $efront_string_typeof:
                return typeof argument
            }
            common[$efront_string_unreac]()
        }
        function doBinary(operator, left, right) {
            switch (operator) {
            case $efront_string__23:
                return left | right;
            case $efront_string__24:
                return left ^ right;
            case $efront_string__25:
                return left & right;
            case $efront_string__26:
                return left == right;
            case $efront_string__27:
                return left != right;
            case $efront_string__28:
                return left === right;
            case $efront_string__29:
                return left !== right;
            case $efront_string__30:
                return left < right;
            case $efront_string__31:
                return left > right;
            case $efront_string__32:
                return left <= right;
            case $efront_string__33:
                return left >= right;
            case $efront_string__34:
                return left << right;
            case $efront_string__35:
                return left >> right;
            case $efront_string__36:
                return left >>> right;
            case $efront_string__22:
                return left + right;
            case $efront_string__4:
                return left - right;
            case $efront_string__:
                return left * right;
            case $efront_string__1:
                return left / right;
            case $efront_string__37:
                return left % right
            }
            common[$efront_string_unreac]()
        }
        function hasSideEffect(expr, scope) {
            function visit(expr) {
                var i, iz, ref;
                switch (expr[$efront_string_type]) {
                case Syntax[$efront_string_Assign]:
                    return !0;
                case Syntax[$efront_string_ArrayE]:
                    for (i = 0, iz = expr[$efront_string_elemen][$efront_string_length]; i < iz; ++i)
                        if (expr[$efront_string_elemen][i] !== null && visit(expr[$efront_string_elemen][i]))
                            return !0;
                    return !1;
                case Syntax[$efront_string_Binary]:
                    return !isConstant(expr);
                case Syntax[$efront_string_CallEx]:
                    return !0;
                case Syntax[$efront_string_Condit]:
                    return visit(expr[$efront_string_test]) || visit(expr[$efront_string_conseq]) || visit(expr[$efront_string_altern]);
                case Syntax[$efront_string_Functi1]:
                    return !1;
                case Syntax[$efront_string_Identi]:
                    ref = scope[$efront_string_resolv1](expr);
                    return ref && ref[$efront_string_isStat]() ? !1 : !0;
                case Syntax[$efront_string_Litera]:
                    return !1;
                case Syntax[$efront_string_Logica]:
                    return visit(expr[$efront_string_left]) || visit(expr[$efront_string_right]);
                case Syntax[$efront_string_Member]:
                    return !0;
                case Syntax[$efront_string_NewExp]:
                    return !0;
                case Syntax[$efront_string_Object]:
                    for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i)
                        if (visit(expr[$efront_string_proper1][i]))
                            return !0;
                    return !1;
                case Syntax[$efront_string_Proper]:
                    return visit(expr[$efront_string_value]);
                case Syntax[$efront_string_Sequen]:
                    for (i = 0, iz = expr[$efront_string_expres1][$efront_string_length]; i < iz; ++i)
                        if (visit(expr[$efront_string_expres1][i]))
                            return !0;
                    return !1;
                case Syntax[$efront_string_ThisEx]:
                    return !1;
                case Syntax[$efront_string_UnaryE]:
                    return expr[$efront_string_operat] === $efront_string_void || expr[$efront_string_operat] === $efront_string_delete || expr[$efront_string_operat] === $efront_string_typeof || expr[$efront_string_operat] === $efront_string__19 ? visit(expr[$efront_string_argume1]) : !isConstant(expr);
                case Syntax[$efront_string_Update]:
                    return !0
                }
                return !0
            }
            return visit(expr)
        }
        function booleanCondition(expr) {
            var ret;
            switch (expr[$efront_string_type]) {
            case Syntax[$efront_string_Assign]:
                return booleanCondition(expr[$efront_string_right]);
            case Syntax[$efront_string_ArrayE]:
                return !0;
            case Syntax[$efront_string_Binary]:
                return isConstant(expr) ? !!getConstant(expr) : null;
            case Syntax[$efront_string_CallEx]:
                return null;
            case Syntax[$efront_string_Condit]:
                ret = booleanCondition(expr[$efront_string_test]);
                if (ret === !0)
                    return booleanCondition(expr[$efront_string_conseq]);
                if (ret === !1)
                    return booleanCondition(expr[$efront_string_altern]);
                ret = booleanCondition(expr[$efront_string_conseq]);
                return ret === booleanCondition(expr[$efront_string_altern]) ? ret : null;
            case Syntax[$efront_string_Functi1]:
                return !0;
            case Syntax[$efront_string_Identi]:
                return null;
            case Syntax[$efront_string_Litera]:
                return !!getConstant(expr);
            case Syntax[$efront_string_Logica]:
                return expr[$efront_string_operat] === $efront_string__21 ? (ret = booleanCondition(expr[$efront_string_left]), ret === null ? null : ret ? booleanCondition(expr[$efront_string_right]) : !1) : (ret = booleanCondition(expr[$efront_string_left]), ret === null ? null : ret ? !0 : booleanCondition(expr[$efront_string_right]));
            case Syntax[$efront_string_Member]:
                return null;
            case Syntax[$efront_string_NewExp]:
                return !0;
            case Syntax[$efront_string_Object]:
                return !0;
            case Syntax[$efront_string_Proper]:
                common[$efront_string_unreac]();
                return null;
            case Syntax[$efront_string_Sequen]:
                return booleanCondition(common[$efront_string_Array][$efront_string_last](expr[$efront_string_expres1]));
            case Syntax[$efront_string_ThisEx]:
                return null;
            case Syntax[$efront_string_UnaryE]:
                return expr[$efront_string_operat] === $efront_string_void ? !1 : expr[$efront_string_operat] === $efront_string_typeof ? !0 : expr[$efront_string_operat] === $efront_string__19 ? (ret = booleanCondition(expr[$efront_string_argume1]), ret === null ? null : !ret) : isConstant(expr) ? !!getConstant(expr) : null;
            case Syntax[$efront_string_Update]:
                return null
            }
            return null
        }
        common = require(510), Syntax = common[$efront_string_Syntax], _a = {}, _a[$efront_string_doBina] = doBinary, _a[$efront_string_doUnar] = doUnary, _a[$efront_string_doLogi] = doLogical, _a[$efront_string_evalua] = getConstant, _a[$efront_string_isCons] = isConstant, exports[$efront_string_consta] = _a, exports[$efront_string_hasSid] = hasSideEffect, exports[$efront_string_boolea] = booleanCondition
    }()
}],
/** 573 query.js */ [1,52,37,3,41,490,function(require, exports, $efront_string_get, $efront_string_length, $efront_string_set, $efront_string_assert) {
    return function (common) {
        'use strict';
        common = require(510), exports[$efront_string_get] = function get(root, query) {
            var i, iz, name, node;
            for (node = root, i = 0, iz = query[$efront_string_length]; i < iz; ++i)
                name = query[i], node = node[name];
            return node
        }, exports[$efront_string_set] = function set(root, query, value) {
            var i, iz, name, node;
            for (common[$efront_string_assert](query[$efront_string_length] > 0), node = root, i = 0, iz = query[$efront_string_length] - 1; i < iz; ++i)
                name = query[i], node = node[name];
            name = query[i], node[name] = value
        }
    }()
}],
/** 574 $efront_string_transf */ "transform-static-to-dynamic-property-access",
/** 575 $efront_string_true */ "true",
/** 576 $efront_string_false */ "false",
/** 577 $efront_string_Infini */ "Infinity",
/** 578 $efront_string_result */ "result",
/** 579 $efront_string_modifi */ "modified",
/** 580 post$transform-static-to-dynamic-property-access.js */ [1,15,574,180,37,541,542,278,167,170,171,88,467,132,83,199,34,493,102,463,361,136,85,134,575,576,577,65,290,113,114,578,579,543,13,function(require, module, $efront_string_transf, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_Identi, $efront_string_name, $efront_string_undefi, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_argume1, $efront_string_Litera, $efront_string_value, $efront_string_true, $efront_string_false, $efront_string_Infini, $efront_string_Binary, $efront_string__1, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common) {
        'use strict';
        function transformStaticToDynamicPropertyAccess(tree, options) {
            var _a, _b, _c, result, modified;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, _b, _c, _d, _e, _f, property;
                if (node[$efront_string_type] !== Syntax[$efront_string_Member] || node[$efront_string_comput] || node[$efront_string_proper][$efront_string_type] !== Syntax[$efront_string_Identi])
                    return;
                property = node[$efront_string_proper];
                switch (property[$efront_string_name]) {
                case $efront_string_undefi:
                    modified = !0;
                    node[$efront_string_comput] = !0;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 0, _a[$efront_string_argume1] = _b, _a));
                    break;
                case $efront_string_true:
                case $efront_string_false:
                    modified = !0;
                    node[$efront_string_comput] = !0;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = property[$efront_string_name] === $efront_string_true, _c));
                    break;
                case $efront_string_Infini:
                    modified = !0;
                    node[$efront_string_comput] = !0;
                    node[$efront_string_proper] = common[$efront_string_moveLo](property, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Binary], _d[$efront_string_operat] = $efront_string__1, _e = {}, _e[$efront_string_type] = Syntax[$efront_string_Litera], _e[$efront_string_value] = 1, _d[$efront_string_left] = _e, _f = {}, _f[$efront_string_type] = Syntax[$efront_string_Litera], _f[$efront_string_value] = 0, _d[$efront_string_right] = _f, _d));
                    break
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf, common = require(510), Syntax = common[$efront_string_Syntax], transformStaticToDynamicPropertyAccess[$efront_string_passNa] = Name, module[$efront_string_export] = transformStaticToDynamicPropertyAccess
    }()
}],
/** 581 $efront_string_transf1 */ "transform-infinity",
/** 582 post$transform-infinity.js */ [1,15,581,180,37,541,542,278,149,170,171,85,134,480,493,65,463,290,113,114,578,579,543,13,function(require, module, $efront_string_transf1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_number, $efront_string_moveLo, $efront_string_Binary, $efront_string_operat, $efront_string__1, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common) {
        'use strict';
        function transformInfinity(tree, options) {
            var _a, _b, _c, result, modified;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, _b, _c;
                return node[$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_value] === $efront_string_number && node[$efront_string_value] === Infinity ? (modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Binary], _a[$efront_string_operat] = $efront_string__1, _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = 1, _a[$efront_string_left] = _b, _c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = 0, _a[$efront_string_right] = _c, _a))) : void 0
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf1, common = require(510), Syntax = common[$efront_string_Syntax], transformInfinity[$efront_string_passNa] = Name, module[$efront_string_export] = transformInfinity
    }()
}],
/** 583 $efront_string_rewrit */ "rewrite-conditional-expression",
/** 584 post$rewrite-conditional-expression.js */ [1,15,583,180,22,126,127,171,102,463,545,136,37,541,542,278,167,170,72,578,579,543,13,function(require, module, $efront_string_rewrit, $efront_string_Syntax, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_type, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_Condit, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function rewrite(node) {
            var test, consequent, alternate;
            test = node[$efront_string_test], consequent = node[$efront_string_conseq], alternate = node[$efront_string_altern], test[$efront_string_type] === Syntax[$efront_string_UnaryE] && test[$efront_string_operat] === $efront_string__19 && (modified = !0, node[$efront_string_conseq] = alternate, node[$efront_string_altern] = consequent, node[$efront_string_test] = test[$efront_string_argume1])
        }
        function rewriteConditionalExpression(tree, options) {
            var _a, _b, _c, result;
            return modified = !1, result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                node[$efront_string_type] === Syntax[$efront_string_Condit] && rewrite(node)
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_rewrit, common = require(510), Syntax = common[$efront_string_Syntax], rewriteConditionalExpression[$efront_string_passNa] = Name, module[$efront_string_export] = rewriteConditionalExpression
    }()
}],
/** 585 $efront_string_rewrit1 */ "rewrite-boolean",
/** 586 $efront_string_boolea1 */ "boolean",
/** 587 post$rewrite-boolean.js */ [1,15,585,180,171,85,134,586,493,102,463,545,136,65,552,553,113,114,37,541,542,278,149,170,578,579,543,13,function(require, module, $efront_string_rewrit1, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_boolea1, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_Binary, $efront_string__26, $efront_string__27, $efront_string_left, $efront_string_right, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function isBooleanLiteral(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_value] === $efront_string_boolea1
        }
        function rewrite(node) {
            var _a, _b, _c, _d;
            if (isBooleanLiteral(node))
                return modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__19, _a[$efront_string_argume1] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = +!node[$efront_string_value], _b)), _a));
            if (node[$efront_string_type] === Syntax[$efront_string_Binary] && node[$efront_string_operat] === $efront_string__26 || node[$efront_string_operat] === $efront_string__27) {
                if (isBooleanLiteral(node[$efront_string_left]))
                    return modified = !0, node[$efront_string_left] = common[$efront_string_moveLo](node[$efront_string_left], (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Litera], _c[$efront_string_value] = +node[$efront_string_left][$efront_string_value], _c)), node;
                if (isBooleanLiteral(node[$efront_string_right]))
                    return modified = !0, node[$efront_string_right] = common[$efront_string_moveLo](node[$efront_string_right], (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Litera], _d[$efront_string_value] = +node[$efront_string_right][$efront_string_value], _d)), node
            }
            return node
        }
        function rewriteBoolean(tree, options) {
            var _a, _b, _c, result;
            return modified = !1, result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = rewrite, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_rewrit1, common = require(510), Syntax = common[$efront_string_Syntax], rewriteBoolean[$efront_string_passNa] = Name, module[$efront_string_export] = rewriteBoolean
    }()
}],
/** 588 $efront_string_omit_p */ "omit-parens-in-void-context-iife",
/** 589 $efront_string_preser */ "preserveCompletionValue",
/** 590 post$omit-parens-in-void-context-iife.js */ [1,15,588,180,171,67,121,82,37,541,542,278,589,149,170,78,156,168,496,96,137,3,102,463,545,136,169,81,578,579,543,13,function(require, module, $efront_string_omit_p, $efront_string_Syntax, $efront_string_type, $efront_string_CallEx, $efront_string_callee, $efront_string_Functi1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_replac, $efront_string_enter, $efront_string_Expres, $efront_string_parent1, $efront_string_pop, $efront_string_mayBeC, $efront_string_Sequen, $efront_string_expres1, $efront_string_length, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_leave, $efront_string_Functi, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function isIIFE(node) {
            var callee;
            return node[$efront_string_type] !== Syntax[$efront_string_CallEx] ? !1 : (callee = node[$efront_string_callee], callee[$efront_string_type] === Syntax[$efront_string_Functi1])
        }
        function main(tree, options) {
            var _a, _b, _c, _d, result, stackCount, preserveCompletionValue;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b)), modified = !1, result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node, parent) {
                var _a, ancestors, target;
                if (!isIIFE(node))
                    return;
                if (target = parent, target[$efront_string_type] === Syntax[$efront_string_Expres]) {
                    if (ancestors = this[$efront_string_parent1](), ancestors[$efront_string_pop](), preserveCompletionValue && common[$efront_string_mayBeC](target, ancestors))
                        return
                } else if (target[$efront_string_type] === Syntax[$efront_string_Sequen] && target[$efront_string_expres1][$efront_string_length] >= 2 && target[$efront_string_expres1][0] === node) {
                    if (ancestors = this[$efront_string_parent1](), ancestors[$efront_string_pop](), target = ancestors[$efront_string_pop](), target[$efront_string_type] !== Syntax[$efront_string_Expres])
                        return
                } else
                    return;
                return modified = !0, _a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__19, _a[$efront_string_argume1] = node, _a
            }, _c[$efront_string_leave] = function leave(node) {
                (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) && --stackCount
            }, _c)), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_omit_p, common = require(510), Syntax = common[$efront_string_Syntax], main[$efront_string_passNa] = Name, module[$efront_string_export] = main
    }()
}],
/** 591 $efront_string_tree_b */ "tree-based-constant-folding",
/** 592 pass$tree-based-constant-folding.js */ [1,15,591,180,499,502,497,504,564,569,171,72,126,127,65,463,352,380,113,114,568,507,565,87,102,136,566,37,541,542,278,149,169,493,483,96,137,22,578,579,543,13,function(require, module, $efront_string_tree_b, $efront_string_Syntax, $efront_string_Specia, $efront_string_isUnde, $efront_string_isNega, $efront_string_isNaN, $efront_string_consta, $efront_string_isCons, $efront_string_type, $efront_string_Condit, $efront_string_conseq, $efront_string_altern, $efront_string_Binary, $efront_string_operat, $efront_string_in, $efront_string_instan, $efront_string_left, $efront_string_right, $efront_string_evalua, $efront_string_genera4, $efront_string_doBina, $efront_string_Logica, $efront_string_UnaryE, $efront_string_argume1, $efront_string_doUnar, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_moveLo, $efront_string_sameVa, $efront_string_Sequen, $efront_string_expres1, $efront_string_test, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, evaluator, modified) {
        'use strict';
        function isModifiedConstant(node) {
            return common[$efront_string_Specia][$efront_string_isUnde](node) ? !1 : common[$efront_string_Specia][$efront_string_isNega](node) ? !1 : common[$efront_string_Specia][$efront_string_isNaN](node) ? !1 : evaluator[$efront_string_consta][$efront_string_isCons](node, !1)
        }
        function isFoldableConditional(node) {
            return node[$efront_string_type] !== Syntax[$efront_string_Condit] ? !1 : evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) || evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern])
        }
        function foldConditional(node) {
            var binary, unary, operator, left, right;
            switch (node[$efront_string_type]) {
            case Syntax[$efront_string_Binary]:
                if (node[$efront_string_operat] === $efront_string_in || node[$efront_string_operat] === $efront_string_instan)
                    return node;
                evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_left]) && isFoldableConditional(node[$efront_string_right]) ? (modified = !0, binary = node, operator = binary[$efront_string_operat], left = evaluator[$efront_string_consta][$efront_string_evalua](binary[$efront_string_left]), node = node[$efront_string_right], evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) ? node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, left, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]))) : (binary[$efront_string_right] = node[$efront_string_conseq], node[$efront_string_conseq] = binary), evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern]) ? node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, left, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]))) : (binary[$efront_string_right] = node[$efront_string_altern], node[$efront_string_altern] = binary)) : evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_right]) && isFoldableConditional(node[$efront_string_left]) && (modified = !0, binary = node, operator = binary[$efront_string_operat], right = evaluator[$efront_string_consta][$efront_string_evalua](binary[$efront_string_right]), node = node[$efront_string_left], evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) ? node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]), right)) : (binary[$efront_string_left] = node[$efront_string_conseq], node[$efront_string_conseq] = binary), evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern]) ? node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doBina](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]), right)) : (binary[$efront_string_left] = node[$efront_string_altern], node[$efront_string_altern] = binary));
                break;
            case Syntax[$efront_string_Logica]:
                break;
            case Syntax[$efront_string_UnaryE]:
                isFoldableConditional(node[$efront_string_argume1]) && (modified = !0, unary = node, operator = unary[$efront_string_operat], node = unary[$efront_string_argume1], evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) ? node[$efront_string_conseq] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doUnar](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]))) : (unary[$efront_string_argume1] = node[$efront_string_conseq], node[$efront_string_conseq] = unary), evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern]) ? node[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_doUnar](operator, evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]))) : (unary[$efront_string_argume1] = node[$efront_string_altern], node[$efront_string_altern] = unary));
                break
            }
            return node
        }
        function treeBasedConstantFolding(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var _a, con, alt;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Binary]:
                case Syntax[$efront_string_Logica]:
                case Syntax[$efront_string_UnaryE]:
                    return isModifiedConstant(node) ? (modified = !0, common[$efront_string_moveLo](node, common[$efront_string_Specia][$efront_string_genera4](evaluator[$efront_string_consta][$efront_string_evalua](node)))) : foldConditional(node);
                case Syntax[$efront_string_Condit]:
                    if (evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_conseq]) && evaluator[$efront_string_consta][$efront_string_isCons](node[$efront_string_altern]) && (con = evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_conseq]), alt = evaluator[$efront_string_consta][$efront_string_evalua](node[$efront_string_altern]), common[$efront_string_sameVa](con, alt)))
                        return modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                            node[$efront_string_test],
                            common[$efront_string_Specia][$efront_string_genera4](con)
                        ], _a));
                    break
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_tree_b, common = require(510), evaluator = require(572), Syntax = common[$efront_string_Syntax], treeBasedConstantFolding[$efront_string_passNa] = Name, module[$efront_string_export] = treeBasedConstantFolding
    }()
}],
/** 593 $efront_string_transf2 */ "transform-typeof-undefined",
/** 594 pass$transform-typeof-undefined.js */ [1,15,593,180,171,85,134,34,37,541,542,278,473,393,453,167,170,460,65,463,554,555,552,553,113,114,102,371,136,83,445,406,398,499,501,275,545,169,461,454,578,579,543,13,function(require, module, $efront_string_transf2, $efront_string_Syntax, $efront_string_type, $efront_string_Litera, $efront_string_value, $efront_string_undefi, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_enter, $efront_string_acquir, $efront_string_Binary, $efront_string_operat, $efront_string__28, $efront_string__29, $efront_string__26, $efront_string__27, $efront_string_left, $efront_string_right, $efront_string_UnaryE, $efront_string_typeof, $efront_string_argume1, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_resolv, $efront_string_Specia, $efront_string_genera2, $efront_string_charAt, $efront_string__19, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, escope, modified) {
        'use strict';
        function isUndefinedStringLiteral(node) {
            return node[$efront_string_type] === Syntax[$efront_string_Litera] && node[$efront_string_value] === $efront_string_undefi
        }
        function transformTypeofUndefined(tree, options) {
            var _a, _b, _c, _d, result, manager, scope;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), manager[$efront_string_attach2](), common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var target, undef, argument, ref;
                if (scope = manager[$efront_string_acquir](node) || scope, node[$efront_string_type] === Syntax[$efront_string_Binary] && (node[$efront_string_operat] === $efront_string__28 || node[$efront_string_operat] === $efront_string__29 || node[$efront_string_operat] === $efront_string__26 || node[$efront_string_operat] === $efront_string__27)) {
                    if (isUndefinedStringLiteral(node[$efront_string_left]))
                        undef = $efront_string_left, target = $efront_string_right;
                    else if (isUndefinedStringLiteral(node[$efront_string_right]))
                        undef = $efront_string_right, target = $efront_string_left;
                    else
                        return;
                    if (node[target][$efront_string_type] === Syntax[$efront_string_UnaryE] && node[target][$efront_string_operat] === $efront_string_typeof) {
                        if (argument = node[target][$efront_string_argume1], argument[$efront_string_type] === Syntax[$efront_string_Identi] && (ref = scope[$efront_string_resolv1](argument), !(ref && ref[$efront_string_isStat]() && ref[$efront_string_resolv])))
                            return;
                        modified = !0, node[undef] = common[$efront_string_Specia][$efront_string_genera2](), node[target] = argument, node[$efront_string_operat] = node[$efront_string_operat][$efront_string_charAt](0) === $efront_string__19 ? $efront_string__29 : $efront_string__28
                    }
                }
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c)), manager[$efront_string_detach](), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_transf2, escope = require(476), common = require(510), Syntax = common[$efront_string_Syntax], transformTypeofUndefined[$efront_string_passNa] = Name, module[$efront_string_export] = transformTypeofUndefined
    }()
}],
/** 595 $efront_string_transf3 */ "transform-to-sequence-expression",
/** 596 pass$transform-to-sequence-expression.js */ [1,15,595,180,3,171,96,137,78,128,136,119,47,95,100,79,129,104,84,22,37,541,542,278,167,170,64,93,578,579,543,13,function(require, module, $efront_string_transf3, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_Sequen, $efront_string_expres1, $efront_string_Expres, $efront_string_expres, $efront_string_argume1, $efront_string_body, $efront_string_push, $efront_string_Return, $efront_string_ThrowS, $efront_string_ForSta, $efront_string_init, $efront_string_Variab, $efront_string_IfStat, $efront_string_test, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_BlockS, $efront_string_Progra, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function transform(node) {
            function constructSeq(expressions, stmt) {
                var _a, seq;
                return expressions[$efront_string_length] !== 1 && (modified = !0, _a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, seq = _a, stmt[$efront_string_type] === Syntax[$efront_string_Expres] ? stmt[$efront_string_expres] = seq : stmt[$efront_string_argume1] = seq), stmt
            }
            var _a, _b, i, iz, expressions, stmt, prev, body;
            for (body = [], expressions = [], i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i)
                prev = stmt, stmt = node[$efront_string_body][i], stmt[$efront_string_type] === Syntax[$efront_string_Expres] ? expressions[$efront_string_push](stmt[$efront_string_expres]) : stmt[$efront_string_type] === Syntax[$efront_string_Return] && stmt[$efront_string_argume1] != null || stmt[$efront_string_type] === Syntax[$efront_string_ThrowS] ? (expressions[$efront_string_push](stmt[$efront_string_argume1]), body[$efront_string_push](constructSeq(expressions, stmt)), expressions = []) : stmt[$efront_string_type] === Syntax[$efront_string_ForSta] && (!stmt[$efront_string_init] || stmt[$efront_string_init][$efront_string_type] !== Syntax[$efront_string_Variab]) ? (expressions[$efront_string_length] && (modified = !0, stmt[$efront_string_init] && expressions[$efront_string_push](stmt[$efront_string_init]), expressions[$efront_string_length] === 1 ? stmt[$efront_string_init] = expressions[0] : (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, stmt[$efront_string_init] = _a), expressions = []), body[$efront_string_push](stmt)) : stmt[$efront_string_type] === Syntax[$efront_string_IfStat] ? (expressions[$efront_string_length] && (modified = !0, expressions[$efront_string_push](stmt[$efront_string_test]), _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = expressions, stmt[$efront_string_test] = _b, expressions = []), body[$efront_string_push](stmt)) : (expressions[$efront_string_length] && (body[$efront_string_push](constructSeq(expressions, prev)), expressions = []), body[$efront_string_push](stmt));
            expressions[$efront_string_length] && body[$efront_string_push](constructSeq(expressions, stmt)), node[$efront_string_body] = body
        }
        function transformToSequenceExpression(tree, options) {
            var _a, _b, _c, result;
            return modified = !1, result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    transform(node);
                    break
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf3, common = require(510), Syntax = common[$efront_string_Syntax], transformToSequenceExpression[$efront_string_passNa] = Name, module[$efront_string_export] = transformToSequenceExpression
    }()
}],
/** 597 $efront_string_transf4 */ "transform-to-compound-assignment",
/** 598 $efront_string__38 */ "*=",
/** 599 $efront_string__39 */ "/=",
/** 600 $efront_string__40 */ "%=",
/** 601 $efront_string__41 */ "+=",
/** 602 $efront_string__42 */ "-=",
/** 603 $efront_string__43 */ "<<=",
/** 604 $efront_string__44 */ ">>=",
/** 605 $efront_string__45 */ ">>>=",
/** 606 $efront_string__46 */ "&=",
/** 607 $efront_string__47 */ "^=",
/** 608 $efront_string__48 */ "|=",
/** 609 pass$transform-to-compound-assignment.js */ [1,15,597,180,171,83,199,230,290,563,548,481,560,561,562,551,550,549,464,598,599,600,601,602,603,604,605,606,607,608,37,541,542,278,473,393,453,167,170,460,60,463,113,114,65,445,406,169,461,454,578,579,543,13,function(require, module, $efront_string_transf4, $efront_string_Syntax, $efront_string_type, $efront_string_Identi, $efront_string_name, $efront_string__, $efront_string__1, $efront_string__37, $efront_string__22, $efront_string__4, $efront_string__34, $efront_string__35, $efront_string__36, $efront_string__25, $efront_string__24, $efront_string__23, $efront_string__3, $efront_string__38, $efront_string__39, $efront_string__40, $efront_string__41, $efront_string__42, $efront_string__43, $efront_string__44, $efront_string__45, $efront_string__46, $efront_string__47, $efront_string__48, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_enter, $efront_string_acquir, $efront_string_Assign, $efront_string_operat, $efront_string_left, $efront_string_right, $efront_string_Binary, $efront_string_resolv1, $efront_string_isStat, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, escope, modified) {
        'use strict';
        function equals(lhs, rhs) {
            return lhs[$efront_string_type] !== rhs[$efront_string_type] ? !1 : lhs[$efront_string_type] === Syntax[$efront_string_Identi] ? lhs[$efront_string_name] === rhs[$efront_string_name] : !1
        }
        function compound(operator) {
            switch (operator) {
            case $efront_string__:
            case $efront_string__1:
            case $efront_string__37:
            case $efront_string__22:
            case $efront_string__4:
            case $efront_string__34:
            case $efront_string__35:
            case $efront_string__36:
            case $efront_string__25:
            case $efront_string__24:
            case $efront_string__23:
                return operator + $efront_string__3
            }
            return null
        }
        function observableCompound(operator) {
            switch (operator) {
            case $efront_string__38:
            case $efront_string__39:
            case $efront_string__40:
            case $efront_string__41:
            case $efront_string__42:
            case $efront_string__43:
            case $efront_string__44:
            case $efront_string__45:
            case $efront_string__46:
            case $efront_string__47:
            case $efront_string__48:
                return operator
            }
            return null
        }
        function transformToCompoundAssignment(tree, options) {
            var _a, _b, _c, _d, result, scope, manager;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), manager[$efront_string_attach2](), common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var left, right, operator, ref;
                scope = manager[$efront_string_acquir](node) || scope, node[$efront_string_type] === Syntax[$efront_string_Assign] && node[$efront_string_operat] === $efront_string__3 && (left = node[$efront_string_left], right = node[$efront_string_right], right[$efront_string_type] === Syntax[$efront_string_Binary] && equals(right[$efront_string_left], left) ? (operator = compound(right[$efront_string_operat]), operator && (modified = !0, node[$efront_string_operat] = operator, node[$efront_string_right] = right[$efront_string_right])) : right[$efront_string_type] === Syntax[$efront_string_Assign] && equals(right[$efront_string_left], left) && observableCompound(right[$efront_string_operat]) && (ref = scope[$efront_string_resolv1](node[$efront_string_left]), ref[$efront_string_isStat]() && (modified = !0, node[$efront_string_operat] = right[$efront_string_operat], node[$efront_string_right] = right[$efront_string_right])))
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c)), manager[$efront_string_detach](), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_transf4, escope = require(476), common = require(510), Syntax = common[$efront_string_Syntax], transformToCompoundAssignment[$efront_string_passNa] = Name, module[$efront_string_export] = transformToCompoundAssignment
    }()
}],
/** 610 $efront_string_transf5 */ "transform-logical-association",
/** 611 pass$transform-logical-association.js */ [1,15,610,180,37,541,542,278,167,170,171,87,114,463,113,578,579,543,13,function(require, module, $efront_string_transf5, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Logica, $efront_string_right, $efront_string_operat, $efront_string_left, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function transformLogicalAssociation(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a;
                node[$efront_string_type] === Syntax[$efront_string_Logica] && node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Logica] && node[$efront_string_operat] === node[$efront_string_right][$efront_string_operat] && (modified = !0, _a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = node[$efront_string_operat], _a[$efront_string_left] = node[$efront_string_left], _a[$efront_string_right] = node[$efront_string_right][$efront_string_left], node[$efront_string_left] = _a, node[$efront_string_right] = node[$efront_string_right][$efront_string_right])
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf5, common = require(510), Syntax = common[$efront_string_Syntax], transformLogicalAssociation[$efront_string_passNa] = Name, module[$efront_string_export] = transformLogicalAssociation
    }()
}],
/** 612 $efront_string_transf6 */ "transform-immediate-function-call",
/** 613 pass$transform-immediate-function-call.js */ [1,15,612,180,171,67,121,82,119,64,3,81,484,396,122,499,501,47,493,96,137,37,541,542,278,149,169,578,579,543,13,function(require, module, $efront_string_transf6, $efront_string_Syntax, $efront_string_type, $efront_string_CallEx, $efront_string_callee, $efront_string_Functi1, $efront_string_body, $efront_string_BlockS, $efront_string_length, $efront_string_Functi, $efront_string_Array, $efront_string_from, $efront_string_argume, $efront_string_Specia, $efront_string_genera2, $efront_string_push, $efront_string_moveLo, $efront_string_Sequen, $efront_string_expres1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function isEmptyFunctionCall(call) {
            var callee, i, iz, stmt;
            if (call[$efront_string_type] !== Syntax[$efront_string_CallEx])
                return !1;
            if (callee = call[$efront_string_callee], callee[$efront_string_type] !== Syntax[$efront_string_Functi1])
                return !1;
            if (callee[$efront_string_body][$efront_string_type] !== Syntax[$efront_string_BlockS])
                return !1;
            if (callee[$efront_string_body][$efront_string_body][$efront_string_length] === 0)
                return !0;
            for (i = 0, iz = callee[$efront_string_body][$efront_string_body][$efront_string_length]; i < iz; ++i)
                if (stmt = callee[$efront_string_body][$efront_string_body][i], stmt[$efront_string_type] !== Syntax[$efront_string_Functi])
                    return !1;
            return !0
        }
        function callToSequence(call) {
            var _a, expressions;
            return expressions = common[$efront_string_Array][$efront_string_from](call[$efront_string_argume]), expressions[$efront_string_length] === 0 ? common[$efront_string_Specia][$efront_string_genera2](call) : (expressions[$efront_string_push](common[$efront_string_Specia][$efront_string_genera2]()), common[$efront_string_moveLo](call, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = expressions, _a)))
        }
        function transformImmediateFunctionCall(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                return isEmptyFunctionCall(node) ? (modified = !0, callToSequence(node)) : void 0
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf6, common = require(510), Syntax = common[$efront_string_Syntax], transformImmediateFunctionCall[$efront_string_passNa] = Name, module[$efront_string_export] = transformImmediateFunctionCall
    }()
}],
/** 614 $efront_string_transf7 */ "transform-dynamic-to-static-property-definition",
/** 615 pass$transform-dynamic-to-static-property-definition.js */ [1,281,15,614,180,37,541,542,278,167,170,171,94,133,85,134,10,492,493,83,199,110,499,507,578,579,543,13,function(require, Number, module, $efront_string_transf7, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Proper, $efront_string_key, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_isIden3, $efront_string_moveLo, $efront_string_Identi, $efront_string_name, $efront_string_toStri, $efront_string_Specia, $efront_string_genera4, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function transformDynamicToStaticPropertyDefinition(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, generated;
                node[$efront_string_type] === Syntax[$efront_string_Proper] && node[$efront_string_key][$efront_string_type] === Syntax[$efront_string_Litera] && typeof node[$efront_string_key][$efront_string_value] === $efront_string_string && (common[$efront_string_isIden3](node[$efront_string_key][$efront_string_value]) ? (modified = !0, node[$efront_string_key] = common[$efront_string_moveLo](node[$efront_string_key], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Identi], _a[$efront_string_name] = node[$efront_string_key][$efront_string_value], _a))) : node[$efront_string_key][$efront_string_value] === Number(node[$efront_string_key][$efront_string_value])[$efront_string_toStri]() && (generated = common[$efront_string_Specia][$efront_string_genera4](Number(node[$efront_string_key][$efront_string_value])), generated[$efront_string_type] === Syntax[$efront_string_Litera] && (modified = !0, node[$efront_string_key] = common[$efront_string_moveLo](node[$efront_string_key], generated))))
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf7, common = require(510), Syntax = common[$efront_string_Syntax], transformDynamicToStaticPropertyDefinition[$efront_string_passNa] = Name, module[$efront_string_export] = transformDynamicToStaticPropertyDefinition
    }()
}],
/** 616 $efront_string_transf8 */ "transform-dynamic-to-static-property-access",
/** 617 pass$transform-dynamic-to-static-property-access.js */ [1,281,15,616,180,37,541,542,278,167,170,171,88,467,132,85,134,10,492,493,83,199,110,499,507,578,579,543,13,function(require, Number, module, $efront_string_transf8, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_type, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_Litera, $efront_string_value, $efront_string_string, $efront_string_isIden3, $efront_string_moveLo, $efront_string_Identi, $efront_string_name, $efront_string_toStri, $efront_string_Specia, $efront_string_genera4, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function transformDynamicToStaticPropertyAccess(tree, options) {
            var _a, _b, _c, result;
            return modified = !1, result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, property;
                node[$efront_string_type] === Syntax[$efront_string_Member] && node[$efront_string_comput] && (property = node[$efront_string_proper], property[$efront_string_type] === Syntax[$efront_string_Litera] && typeof property[$efront_string_value] === $efront_string_string && (common[$efront_string_isIden3](property[$efront_string_value]) ? (modified = !0, node[$efront_string_comput] = !1, node[$efront_string_proper] = common[$efront_string_moveLo](property, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Identi], _a[$efront_string_name] = property[$efront_string_value], _a))) : property[$efront_string_value] === Number(property[$efront_string_value])[$efront_string_toStri]() && (modified = !0, node[$efront_string_comput] = !0, node[$efront_string_proper] = common[$efront_string_moveLo](node[$efront_string_proper], common[$efront_string_Specia][$efront_string_genera4](Number(node[$efront_string_proper][$efront_string_value]))))))
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_transf8, common = require(510), Syntax = common[$efront_string_Syntax], transformDynamicToStaticPropertyAccess[$efront_string_passNa] = Name, module[$efront_string_export] = transformDynamicToStaticPropertyAccess
    }()
}],
/** 618 $efront_string_transf9 */ "transform-branch-to-expression",
/** 619 pass$transform-branch-to-expression.js */ [1,15,618,180,37,541,542,278,589,149,169,171,84,156,496,127,126,78,493,128,72,22,95,136,96,137,499,501,100,87,463,547,113,114,77,578,579,543,13,function(require, module, $efront_string_transf9, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_replac, $efront_string_leave, $efront_string_type, $efront_string_IfStat, $efront_string_parent1, $efront_string_mayBeC, $efront_string_altern, $efront_string_conseq, $efront_string_Expres, $efront_string_moveLo, $efront_string_expres, $efront_string_Condit, $efront_string_test, $efront_string_Return, $efront_string_argume1, $efront_string_Sequen, $efront_string_expres1, $efront_string_Specia, $efront_string_genera2, $efront_string_ThrowS, $efront_string_Logica, $efront_string_operat, $efront_string__21, $efront_string_left, $efront_string_right, $efront_string_EmptyS, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function transformBranchToExpression(tree, options) {
            var _a, _b, _c, _d, result, preserveCompletionValue;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b)), modified = !1, result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_leave] = function leave(node) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, consequent, alternate, ancestors;
                if (node[$efront_string_type] === Syntax[$efront_string_IfStat]) {
                    if (ancestors = this[$efront_string_parent1](), preserveCompletionValue && common[$efront_string_mayBeC](node, ancestors))
                        return;
                    if (node[$efront_string_altern]) {
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Expres] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_Expres])
                            return modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Expres], _a[$efront_string_expres] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Condit], _b[$efront_string_test] = node[$efront_string_test], _b[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_expres], _b[$efront_string_altern] = node[$efront_string_altern][$efront_string_expres], _b)), _a));
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_Return])
                            return modified = !0, node[$efront_string_conseq][$efront_string_argume1] || node[$efront_string_altern][$efront_string_argume1] ? (consequent = node[$efront_string_conseq][$efront_string_argume1] || common[$efront_string_Specia][$efront_string_genera2](), alternate = node[$efront_string_altern][$efront_string_argume1] || common[$efront_string_Specia][$efront_string_genera2](), common[$efront_string_moveLo](node, (_e = {}, _e[$efront_string_type] = Syntax[$efront_string_Return], _e[$efront_string_argume1] = common[$efront_string_moveLo](node, (_f = {}, _f[$efront_string_type] = Syntax[$efront_string_Condit], _f[$efront_string_test] = node[$efront_string_test], _f[$efront_string_conseq] = consequent, _f[$efront_string_altern] = alternate, _f)), _e))) : common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _c[$efront_string_argume1] = common[$efront_string_moveLo](node, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Sequen], _d[$efront_string_expres1] = [
                                node[$efront_string_test],
                                common[$efront_string_Specia][$efront_string_genera2]()
                            ], _d)), _c));
                        if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_ThrowS] && node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_ThrowS])
                            return modified = !0, common[$efront_string_moveLo](node, (_g = {}, _g[$efront_string_type] = Syntax[$efront_string_ThrowS], _g[$efront_string_argume1] = common[$efront_string_moveLo](node, (_h = {}, _h[$efront_string_type] = Syntax[$efront_string_Condit], _h[$efront_string_test] = node[$efront_string_test], _h[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_argume1], _h[$efront_string_altern] = node[$efront_string_altern][$efront_string_argume1], _h)), _g))
                    } else if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Expres])
                        return modified = !0, common[$efront_string_moveLo](node, (_j = {}, _j[$efront_string_type] = Syntax[$efront_string_Expres], _j[$efront_string_expres] = common[$efront_string_moveLo](node, (_k = {}, _k[$efront_string_type] = Syntax[$efront_string_Logica], _k[$efront_string_operat] = $efront_string__21, _k[$efront_string_left] = node[$efront_string_test], _k[$efront_string_right] = node[$efront_string_conseq][$efront_string_expres], _k)), _j));
                    else if (node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_EmptyS])
                        return modified = !0, common[$efront_string_moveLo](node, (_l = {}, _l[$efront_string_type] = Syntax[$efront_string_Expres], _l[$efront_string_expres] = node[$efront_string_test], _l))
                }
            }, _c)), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_transf9, common = require(510), Syntax = common[$efront_string_Syntax], transformBranchToExpression[$efront_string_passNa] = Name, module[$efront_string_export] = transformBranchToExpression
    }()
}],
/** 620 $efront_string_reorde */ "reordering-function-declarations",
/** 621 pass$reordering-function-declarations.js */ [1,15,620,180,3,171,81,47,75,5,37,541,542,278,167,169,93,119,82,578,579,543,13,function(require, module, $efront_string_reorde, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_Functi, $efront_string_push, $efront_string_Direct, $efront_string_concat, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_Progra, $efront_string_body, $efront_string_Functi1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function reordering(array) {
            var i, iz, node, directives, declarations, others;
            for (directives = [], declarations = [], others = [], i = 0, iz = array[$efront_string_length]; i < iz; ++i)
                node = array[i], node[$efront_string_type] === Syntax[$efront_string_Functi] ? (declarations[$efront_string_length] + directives[$efront_string_length] !== i && (modified = !0), declarations[$efront_string_push](node)) : node[$efront_string_type] === Syntax[$efront_string_Direct] ? directives[$efront_string_push](node) : others[$efront_string_push](node);
            return directives[$efront_string_concat](declarations, others)
        }
        function reorderingFunctionDeclarations(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Progra]:
                    node[$efront_string_body] = reordering(node[$efront_string_body]);
                    break;
                case Syntax[$efront_string_Functi]:
                case Syntax[$efront_string_Functi1]:
                    node[$efront_string_body][$efront_string_body] = reordering(node[$efront_string_body][$efront_string_body]);
                    break
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_reorde, common = require(510), Syntax = common[$efront_string_Syntax], reorderingFunctionDeclarations[$efront_string_passNa] = Name, module[$efront_string_export] = reorderingFunctionDeclarations
    }()
}],
/** 622 $efront_string_remove */ "remove-wasted-blocks",
/** 623 pass$remove-wasted-blocks.js */ [1,15,622,180,3,171,64,119,509,5,47,37,541,542,278,149,169,93,81,82,101,68,77,578,579,543,13,function(require, module, $efront_string_remove, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_BlockS, $efront_string_body, $efront_string_isScop1, $efront_string_concat, $efront_string_push, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_leave, $efront_string_Progra, $efront_string_Functi, $efront_string_Functi1, $efront_string_TrySta, $efront_string_CatchC, $efront_string_EmptyS, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function flattenBlockStatement(body) {
            var i, iz, j, jz, result, stmt, inner, ok;
            for (result = [], i = 0, iz = body[$efront_string_length]; i < iz; ++i)
                if (stmt = body[i], stmt[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    for (ok = !0, j = 0, jz = stmt[$efront_string_body][$efront_string_length]; j < jz; ++j)
                        inner = stmt[$efront_string_body][j], common[$efront_string_isScop1](inner) && (ok = !1);
                    ok ? (modified = !0, result = result[$efront_string_concat](stmt[$efront_string_body])) : result[$efront_string_push](stmt)
                } else
                    result[$efront_string_push](stmt);
            return result
        }
        function removeWastedBlocks(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_leave] = function leave(node, parent) {
                var _a, i, iz, stmt;
                if (node[$efront_string_type] === Syntax[$efront_string_BlockS] || node[$efront_string_type] === Syntax[$efront_string_Progra])
                    for (i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i)
                        if (stmt = node[$efront_string_body][i], stmt[$efront_string_type] === Syntax[$efront_string_BlockS]) {
                            node[$efront_string_body] = flattenBlockStatement(node[$efront_string_body]);
                            break
                        }
                if (parent[$efront_string_type] === Syntax[$efront_string_Functi] || parent[$efront_string_type] === Syntax[$efront_string_Functi1] || parent[$efront_string_type] === Syntax[$efront_string_TrySta] || parent[$efront_string_type] === Syntax[$efront_string_CatchC])
                    return;
                while (node[$efront_string_type] === Syntax[$efront_string_BlockS] && node[$efront_string_body][$efront_string_length] === 1 && !common[$efront_string_isScop1](node[$efront_string_body][0]))
                    modified = !0, node = node[$efront_string_body][0];
                return node[$efront_string_type] === Syntax[$efront_string_BlockS] && node[$efront_string_body][$efront_string_length] === 0 ? (modified = !0, _a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a) : node
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_remove, common = require(510), Syntax = common[$efront_string_Syntax], removeWastedBlocks[$efront_string_passNa] = Name, module[$efront_string_export] = removeWastedBlocks
    }()
}],
/** 624 $efront_string_remove1 */ "remove-unused-label",
/** 625 $efront_string_unused */ "unused",
/** 626 $efront_string_regist1 */ "register",
/** 627 $efront_string_duplic */ /** text */ "duplicate label is found",
/** 628 $efront_string_used */ "used",
/** 629 $efront_string_stmt */ "stmt",
/** 630 $efront_string_unregi */ "unregister",
/** 631 $efront_string_unreso */ /** text */ "unresolved label",
/** 632 $efront_string_close */ "close",
/** 633 pass$remove-unused-label.js */ [1,15,624,180,41,625,420,36,626,490,171,86,120,199,40,627,628,629,630,37,42,119,445,631,632,541,542,278,149,170,93,81,82,66,73,169,578,579,543,13,function(require, module, $efront_string_remove1, $efront_string_Syntax, $efront_string_set, $efront_string_unused, $efront_string_upper, $efront_string_protot, $efront_string_regist1, $efront_string_assert, $efront_string_type, $efront_string_Labele, $efront_string_label, $efront_string_name, $efront_string_has, $efront_string_duplic, $efront_string_used, $efront_string_stmt, $efront_string_unregi, $efront_string_get, $efront_string_delete, $efront_string_body, $efront_string_resolv1, $efront_string_unreso, $efront_string_close, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_Progra, $efront_string_Functi, $efront_string_Functi1, $efront_string_BreakS, $efront_string_Contin, $efront_string_leave, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, Map, common, scope, modified) {
        'use strict';
        function Scope(upper) {
            this[$efront_string_set] = new Map, this[$efront_string_unused] = [], this[$efront_string_upper] = upper
        }
        function removeUnusedLabel(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), scope = null, modified = !1, result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Progra]:
                case Syntax[$efront_string_Functi]:
                case Syntax[$efront_string_Functi1]:
                    scope = new Scope(scope);
                    break;
                case Syntax[$efront_string_Labele]:
                    scope[$efront_string_regist1](node);
                    break;
                case Syntax[$efront_string_BreakS]:
                case Syntax[$efront_string_Contin]:
                    scope[$efront_string_resolv1](node);
                    break
                }
            }, _b[$efront_string_leave] = function leave(node) {
                var ret;
                return ret = scope[$efront_string_unregi](node), (node[$efront_string_type] === Syntax[$efront_string_Progra] || node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) && (scope = scope[$efront_string_close]()), ret
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_remove1, common = require(510), Map = require(50), Syntax = common[$efront_string_Syntax], Scope[$efront_string_protot][$efront_string_regist1] = function register(node) {
            var _a, name;
            common[$efront_string_assert](node[$efront_string_type] === Syntax[$efront_string_Labele]), name = node[$efront_string_label][$efront_string_name], common[$efront_string_assert](!this[$efront_string_set][$efront_string_has](name), $efront_string_duplic), this[$efront_string_set][$efront_string_set](name, (_a = {}, _a[$efront_string_used] = !1, _a[$efront_string_stmt] = node, _a))
        }, Scope[$efront_string_protot][$efront_string_unregi] = function unregister(node) {
            var name, ref;
            return node[$efront_string_type] === Syntax[$efront_string_Labele] && (name = node[$efront_string_label][$efront_string_name], ref = this[$efront_string_set][$efront_string_get](name), this[$efront_string_set][$efront_string_delete](name), !ref[$efront_string_used]) ? (modified = !0, node[$efront_string_body]) : node
        }, Scope[$efront_string_protot][$efront_string_resolv1] = function resolve(node) {
            var name;
            node[$efront_string_label] && (name = node[$efront_string_label][$efront_string_name], common[$efront_string_assert](this[$efront_string_set][$efront_string_has](name), $efront_string_unreso), this[$efront_string_set][$efront_string_get](name)[$efront_string_used] = !0)
        }, Scope[$efront_string_protot][$efront_string_close] = function close() {
            return this[$efront_string_upper]
        }, removeUnusedLabel[$efront_string_passNa] = Name, module[$efront_string_export] = removeUnusedLabel
    }()
}],
/** 634 $efront_string_remove2 */ "remove-unreachable-branch",
/** 635 pass$remove-unreachable-branch.js */ [1,15,634,180,571,22,127,586,47,493,171,78,128,126,64,119,508,113,463,547,96,137,114,37,541,542,278,149,170,471,462,484,486,84,87,72,169,168,578,579,543,13,function(require, module, $efront_string_remove2, $efront_string_Syntax, $efront_string_boolea, $efront_string_test, $efront_string_altern, $efront_string_boolea1, $efront_string_push, $efront_string_moveLo, $efront_string_type, $efront_string_Expres, $efront_string_expres, $efront_string_conseq, $efront_string_BlockS, $efront_string_body, $efront_string_delega, $efront_string_left, $efront_string_operat, $efront_string__21, $efront_string_Sequen, $efront_string_expres1, $efront_string_right, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_replac, $efront_string_enter, $efront_string_Scope, $efront_string_isVari, $efront_string_Array, $efront_string_last, $efront_string_IfStat, $efront_string_Logica, $efront_string_Condit, $efront_string_leave, $efront_string_pop, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, escope, evaluator, modified) {
        'use strict';
        function handleIfStatement(func, node) {
            var _a, _b, _c, _d, _e, _f, _g, _h, test, body, decl;
            if (test = evaluator[$efront_string_boolea](node[$efront_string_test]), !node[$efront_string_altern]) {
                if (typeof test === $efront_string_boolea1)
                    return modified = !0, body = [], test ? (body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Expres], _a[$efront_string_expres] = node[$efront_string_test], _a)), node[$efront_string_conseq]), _b = {}, _b[$efront_string_type] = Syntax[$efront_string_BlockS], _b[$efront_string_body] = body, _b) : (decl = common[$efront_string_delega](node[$efront_string_conseq], func), decl && body[$efront_string_push](decl), body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Expres], _c[$efront_string_expres] = node[$efront_string_test], _c))), _d = {}, _d[$efront_string_type] = Syntax[$efront_string_BlockS], _d[$efront_string_body] = body, _d)
            } else if (typeof test === $efront_string_boolea1)
                return modified = !0, body = [], test ? (decl = common[$efront_string_delega](node[$efront_string_altern], func), decl && body[$efront_string_push](decl), body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_e = {}, _e[$efront_string_type] = Syntax[$efront_string_Expres], _e[$efront_string_expres] = node[$efront_string_test], _e)), node[$efront_string_conseq]), _f = {}, _f[$efront_string_type] = Syntax[$efront_string_BlockS], _f[$efront_string_body] = body, _f) : (decl = common[$efront_string_delega](node[$efront_string_conseq], func), decl && body[$efront_string_push](decl), body[$efront_string_push](common[$efront_string_moveLo](node[$efront_string_test], (_g = {}, _g[$efront_string_type] = Syntax[$efront_string_Expres], _g[$efront_string_expres] = node[$efront_string_test], _g)), node[$efront_string_altern]), _h = {}, _h[$efront_string_type] = Syntax[$efront_string_BlockS], _h[$efront_string_body] = body, _h)
        }
        function handleLogicalExpression(func, node) {
            var _a, _b, test;
            return test = evaluator[$efront_string_boolea](node[$efront_string_left]), typeof test === $efront_string_boolea1 ? (modified = !0, test ? node[$efront_string_operat] === $efront_string__21 ? common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                node[$efront_string_left],
                node[$efront_string_right]
            ], _a)) : node[$efront_string_left] : node[$efront_string_operat] === $efront_string__21 ? node[$efront_string_left] : common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                node[$efront_string_left],
                node[$efront_string_right]
            ], _b))) : void 0
        }
        function handleConditionalExpression(func, node) {
            var _a, _b, test;
            return test = evaluator[$efront_string_boolea](node[$efront_string_test]), typeof test === $efront_string_boolea1 ? (modified = !0, test ? common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Sequen], _a[$efront_string_expres1] = [
                node[$efront_string_test],
                node[$efront_string_conseq]
            ], _a)) : common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                node[$efront_string_test],
                node[$efront_string_altern]
            ], _b))) : void 0
        }
        function removeUnreachableBranch(tree, options) {
            var _a, _b, _c, result, stack;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, stack = [], result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
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
                escope[$efront_string_Scope][$efront_string_isVari](node) && stack[$efront_string_pop]()
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_remove2, escope = require(476), common = require(510), evaluator = require(572), Syntax = common[$efront_string_Syntax], removeUnreachableBranch[$efront_string_passNa] = Name, module[$efront_string_export] = removeUnreachableBranch
    }()
}],
/** 636 $efront_string_remove3 */ "remove-side-effect-free-expressions",
/** 637 $efront_string_expres2 */ /** text */ "expressions should be more than one",
/** 638 $efront_string_result1 */ /** text */ "result should be more than zero",
/** 639 $efront_string_unshif */ "unshift",
/** 640 $efront_string_sequen */ /** text */ "sequences' length should be more than 1",
/** 641 pass$remove-side-effect-free-expressions.js */ [1,15,636,180,490,137,3,637,570,47,638,499,506,639,171,78,422,37,541,542,278,589,473,393,453,149,170,460,96,640,484,486,102,463,361,136,168,493,128,77,169,461,454,578,579,543,13,function(require, module, $efront_string_remove3, $efront_string_Syntax, $efront_string_assert, $efront_string_expres1, $efront_string_length, $efront_string_expres2, $efront_string_hasSid, $efront_string_push, $efront_string_result1, $efront_string_Specia, $efront_string_canExt, $efront_string_unshif, $efront_string_type, $efront_string_Expres, $efront_string_global, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_Sequen, $efront_string_sequen, $efront_string_Array, $efront_string_last, $efront_string_UnaryE, $efront_string_operat, $efront_string_void, $efront_string_argume1, $efront_string_pop, $efront_string_moveLo, $efront_string_expres, $efront_string_EmptyS, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, escope, evaluator, modified) {
        'use strict';
        function reduce(node, scope, parent, isResultNeeded) {
            var i, iz, expr, result, prev;
            for (common[$efront_string_assert](node[$efront_string_expres1][$efront_string_length] > 1, $efront_string_expres2), result = [], i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                if (prev = expr, expr = node[$efront_string_expres1][i], (i + 1 !== iz || !isResultNeeded) && !evaluator[$efront_string_hasSid](expr, scope))
                    continue;
                result[$efront_string_push](expr)
            }
            if (!isResultNeeded && result[$efront_string_length] === 0)
                return modified = !0, expr;
            common[$efront_string_assert](result[$efront_string_length] > 0, $efront_string_result1);
            do {
                if (iz === result[$efront_string_length])
                    return node;
                if (result[$efront_string_length] === 1) {
                    if (!common[$efront_string_Specia][$efront_string_canExt](result[0], parent, scope)) {
                        result[$efront_string_unshif](prev);
                        continue
                    }
                    return modified = !0, result[0]
                }
                return modified = !0, node[$efront_string_expres1] = result, node
            } while (!0)
        }
        function removeSideEffectFreeExpressions(tree, options) {
            function isResultNeeded(parent, scope) {
                return parent[$efront_string_type] === Syntax[$efront_string_Expres] && (!preserveCompletionValue || scope[$efront_string_type] !== $efront_string_global) ? !1 : !0
            }
            var _a, _b, _c, _d, _e, result, scope, manager, preserveCompletionValue;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b)), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_c = {}, _c[$efront_string_direct1] = !0, _c)), manager[$efront_string_attach2](), result = common[$efront_string_replac](result, (_d = {}, _d[$efront_string_enter] = function enter(node, parent) {
                var _a, _b, res, unary, trans;
                return res = node, scope = manager[$efront_string_acquir](node) || scope, res[$efront_string_type] === Syntax[$efront_string_Sequen] && (res = reduce(res, scope, parent, isResultNeeded(parent, scope))), res[$efront_string_type] === Syntax[$efront_string_Sequen] && (common[$efront_string_assert](res[$efront_string_expres1][$efront_string_length] > 1, $efront_string_sequen), unary = common[$efront_string_Array][$efront_string_last](res[$efront_string_expres1]), unary[$efront_string_type] === Syntax[$efront_string_UnaryE] && unary[$efront_string_operat] === $efront_string_void && !evaluator[$efront_string_hasSid](unary[$efront_string_argume1], scope) && (modified = !0, res[$efront_string_expres1][$efront_string_pop](), trans = common[$efront_string_moveLo](unary, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string_void, _a[$efront_string_argume1] = common[$efront_string_Array][$efront_string_last](res[$efront_string_expres1]), _a)), res[$efront_string_expres1][$efront_string_length] === 1 ? res = trans : res[$efront_string_expres1][res[$efront_string_expres1][$efront_string_length] - 1] = trans)), isResultNeeded(res, scope) || evaluator[$efront_string_hasSid](res[$efront_string_expres], scope) || (modified = !0, res = common[$efront_string_moveLo](res, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b))), res
            }, _d[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _d)), manager[$efront_string_detach](), _e = {}, _e[$efront_string_result] = result, _e[$efront_string_modifi] = modified, _e
        }
        Name = $efront_string_remove3, escope = require(476), common = require(510), evaluator = require(572), Syntax = common[$efront_string_Syntax], removeSideEffectFreeExpressions[$efront_string_passNa] = Name, module[$efront_string_export] = removeSideEffectFreeExpressions
    }()
}],
/** 642 $efront_string_remove4 */ "remove-empty-statement",
/** 643 pass$remove-empty-statement.js */ [1,15,642,180,3,171,77,47,127,126,22,493,102,463,545,136,37,541,542,278,167,170,64,93,119,98,84,97,139,484,486,487,168,578,579,543,13,function(require, module, $efront_string_remove4, $efront_string_Syntax, $efront_string_length, $efront_string_type, $efront_string_EmptyS, $efront_string_push, $efront_string_altern, $efront_string_conseq, $efront_string_test, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_enter, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_Switch1, $efront_string_IfStat, $efront_string_Switch, $efront_string_cases, $efront_string_Array, $efront_string_last, $efront_string_empty, $efront_string_pop, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function remove(array) {
            var i, iz, node, result;
            for (result = [], i = 0, iz = array[$efront_string_length]; i < iz; ++i)
                node = array[i], node[$efront_string_type] === Syntax[$efront_string_EmptyS] ? modified = !0 : result[$efront_string_push](node);
            return result
        }
        function removeAlternate(node) {
            var _a;
            node[$efront_string_altern] && (node[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_EmptyS] ? (modified = !0, node[$efront_string_altern] = null) : node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_EmptyS] && (modified = !0, node[$efront_string_conseq] = node[$efront_string_altern], node[$efront_string_altern] = null, node[$efront_string_test] = common[$efront_string_moveLo](node[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__19, _a[$efront_string_argume1] = node[$efront_string_test], _a))))
        }
        function removeEmptyStatement(tree, options) {
            var _a, _b, _c, result;
            return modified = !1, result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), common[$efront_string_traver](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
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
                    node[$efront_string_cases][$efront_string_length] && (clause = common[$efront_string_Array][$efront_string_last](node[$efront_string_cases]), !clause[$efront_string_test] && common[$efront_string_Array][$efront_string_empty](clause[$efront_string_conseq]) && (modified = !0, node[$efront_string_cases][$efront_string_pop]()))
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_remove4, common = require(510), Syntax = common[$efront_string_Syntax], removeEmptyStatement[$efront_string_passNa] = Name, module[$efront_string_export] = removeEmptyStatement
    }()
}],
/** 644 $efront_string_remove5 */ "remove-context-sensitive-expressions",
/** 645 $efront_string_transf10 */ "transform",
/** 646 $efront_string_boolea2 */ "booleanFunction",
/** 647 $efront_string_voidFu */ "voidFunction",
/** 648 $efront_string_boolea3 */ "booleanTransformation",
/** 649 $efront_string_voidTr */ "voidTransformation",
/** 650 pass$remove-context-sensitive-expressions.js */ [1,15,644,180,645,646,647,407,36,648,171,102,463,545,136,87,113,114,546,547,493,72,22,126,127,649,361,570,6,96,137,3,484,486,37,541,542,278,589,473,393,453,149,170,460,82,81,60,61,64,65,66,67,68,73,76,74,77,78,128,80,79,129,104,130,83,84,85,86,88,90,91,93,94,95,97,98,99,100,101,103,105,106,107,169,461,454,578,579,543,13,function(require, module, $efront_string_remove5, $efront_string_Syntax, $efront_string_transf10, $efront_string_boolea2, $efront_string_voidFu, $efront_string_scope, $efront_string_protot, $efront_string_boolea3, $efront_string_type, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_Logica, $efront_string_left, $efront_string_right, $efront_string__20, $efront_string__21, $efront_string_moveLo, $efront_string_Condit, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_voidTr, $efront_string_void, $efront_string_hasSid, $efront_string_apply, $efront_string_Sequen, $efront_string_expres1, $efront_string_length, $efront_string_Array, $efront_string_last, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_preser, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_Functi1, $efront_string_Functi, $efront_string_Assign, $efront_string_ArrayE, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_Contin, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_expres, $efront_string_ForInS, $efront_string_ForSta, $efront_string_init, $efront_string_Variab, $efront_string_update, $efront_string_Identi, $efront_string_IfStat, $efront_string_Litera, $efront_string_Labele, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_Progra, $efront_string_Proper, $efront_string_Return, $efront_string_Switch, $efront_string_Switch1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_Update, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, evaluator, escope, modified) {
        'use strict';
        function Transformer(trans, booleanFunction, voidFunction, scope) {
            this[$efront_string_transf10] = trans, this[$efront_string_boolea2] = booleanFunction, this[$efront_string_voidFu] = voidFunction, this[$efront_string_scope] = scope
        }
        function voidContext(expr, scope) {
            var trans = new Transformer(Transformer[$efront_string_protot][$efront_string_voidTr], booleanContext, voidContext, scope);
            return trans[$efront_string_apply](expr)
        }
        function booleanContext(expr, scope) {
            var trans = new Transformer(Transformer[$efront_string_protot][$efront_string_boolea3], booleanContext, booleanContext, scope);
            return trans[$efront_string_apply](expr)
        }
        function removeContextSensitiveExpressions(tree, options) {
            var _a, _b, _c, _d, _e, result, stackCount, preserveCompletionValue, scope, manager;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, stackCount = 0, preserveCompletionValue = options[$efront_string_get]($efront_string_preser, (_b = {}, _b[$efront_string_pathNa] = Name, _b)), scope = null, manager = escope[$efront_string_analyz](result, (_c = {}, _c[$efront_string_direct1] = !0, _c)), manager[$efront_string_attach2](), result = common[$efront_string_replac](result, (_d = {}, _d[$efront_string_enter] = function enter(node) {
                var i, iz;
                scope = manager[$efront_string_acquir](node) || scope, (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) && ++stackCount;
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
                    (!preserveCompletionValue || stackCount !== 0) && (node[$efront_string_expres] = voidContext(node[$efront_string_expres], scope));
                    break;
                case Syntax[$efront_string_Functi1]:
                    break;
                case Syntax[$efront_string_ForInS]:
                    break;
                case Syntax[$efront_string_Functi]:
                    break;
                case Syntax[$efront_string_ForSta]:
                    node[$efront_string_init] && node[$efront_string_init][$efront_string_type] !== Syntax[$efront_string_Variab] && (node[$efront_string_init] = voidContext(node[$efront_string_init], scope));
                    node[$efront_string_test] && (node[$efront_string_test] = booleanContext(node[$efront_string_test], scope));
                    node[$efront_string_update] && (node[$efront_string_update] = voidContext(node[$efront_string_update], scope));
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
                    for (i = 0, iz = node[$efront_string_expres1][$efront_string_length] - 1; i < iz; ++i)
                        node[$efront_string_expres1][i] = voidContext(node[$efront_string_expres1][i], scope);
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
                    node[$efront_string_operat] === $efront_string__19 ? node[$efront_string_argume1] = booleanContext(node[$efront_string_argume1], scope) : node[$efront_string_operat] === $efront_string_void && (node[$efront_string_argume1] = voidContext(node[$efront_string_argume1], scope));
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
                scope = manager[$efront_string_releas](node) || scope, (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) && --stackCount
            }, _d)), manager[$efront_string_detach](), _e = {}, _e[$efront_string_result] = result, _e[$efront_string_modifi] = modified, _e
        }
        Name = $efront_string_remove5, common = require(510), evaluator = require(572), escope = require(476), Syntax = common[$efront_string_Syntax], Transformer[$efront_string_protot][$efront_string_boolea3] = function (expr) {
            var _a, consequent;
            do {
                if (expr[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                    if (expr[$efront_string_operat] === $efront_string__19 && expr[$efront_string_argume1][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_argume1][$efront_string_operat] === $efront_string__19) {
                        modified = !0, expr = expr[$efront_string_argume1][$efront_string_argume1];
                        continue
                    }
                } else if (expr[$efront_string_type] === Syntax[$efront_string_Logica]) {
                    if (expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_left][$efront_string_operat] === $efront_string__19 && expr[$efront_string_right][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_right][$efront_string_operat] === $efront_string__19) {
                        modified = !0, expr[$efront_string_left] = expr[$efront_string_left][$efront_string_argume1], expr[$efront_string_right] = expr[$efront_string_right][$efront_string_argume1], expr[$efront_string_operat] = expr[$efront_string_operat] === $efront_string__20 ? $efront_string__21 : $efront_string__20, expr = common[$efront_string_moveLo](expr, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__19, _a[$efront_string_argume1] = expr, _a));
                        continue
                    }
                } else
                    expr[$efront_string_type] === Syntax[$efront_string_Condit] && expr[$efront_string_test][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_test][$efront_string_operat] === $efront_string__19 && (modified = !0, expr[$efront_string_test] = expr[$efront_string_test][$efront_string_argume1], consequent = expr[$efront_string_conseq], expr[$efront_string_conseq] = expr[$efront_string_altern], expr[$efront_string_altern] = consequent);
                break
            } while (!0);
            return expr
        }, Transformer[$efront_string_protot][$efront_string_voidTr] = function (expr) {
            var _a, _b, leftHasSideEffect, rightHasSideEffect;
            do {
                if (expr = this[$efront_string_boolea3](expr), expr[$efront_string_type] === Syntax[$efront_string_UnaryE]) {
                    if (expr[$efront_string_operat] === $efront_string__19 || expr[$efront_string_operat] === $efront_string_void) {
                        modified = !0, expr = expr[$efront_string_argume1];
                        continue
                    }
                } else
                    expr[$efront_string_type] === Syntax[$efront_string_Logica] ? expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_UnaryE] && expr[$efront_string_left][$efront_string_operat] === $efront_string__19 && (modified = !0, expr[$efront_string_left] = expr[$efront_string_left][$efront_string_argume1], expr[$efront_string_operat] = expr[$efront_string_operat] === $efront_string__20 ? $efront_string__21 : $efront_string__20) : expr[$efront_string_type] === Syntax[$efront_string_Condit] && (leftHasSideEffect = evaluator[$efront_string_hasSid](expr[$efront_string_conseq], this[$efront_string_scope]), rightHasSideEffect = evaluator[$efront_string_hasSid](expr[$efront_string_altern], this[$efront_string_scope]), leftHasSideEffect || rightHasSideEffect ? leftHasSideEffect ? rightHasSideEffect || (modified = !0, expr = common[$efront_string_moveLo](expr, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Logica], _b[$efront_string_operat] = $efront_string__21, _b[$efront_string_left] = expr[$efront_string_test], _b[$efront_string_right] = expr[$efront_string_conseq], _b))) : (modified = !0, expr = common[$efront_string_moveLo](expr, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = $efront_string__20, _a[$efront_string_left] = expr[$efront_string_test], _a[$efront_string_right] = expr[$efront_string_altern], _a))) : (modified = !0, expr = expr[$efront_string_test]));
                break
            } while (!0);
            return expr
        }, Transformer[$efront_string_protot][$efront_string_apply] = function (expr) {
            var prev;
            do {
                if (prev = expr, expr = this[$efront_string_transf10](expr), prev !== expr)
                    continue;
                expr[$efront_string_type] === Syntax[$efront_string_Logica] ? (expr[$efront_string_left] = this[$efront_string_boolea2](expr[$efront_string_left], this[$efront_string_scope]), expr[$efront_string_right] = this[$efront_string_voidFu](expr[$efront_string_right], this[$efront_string_scope])) : expr[$efront_string_type] === Syntax[$efront_string_Condit] ? (expr[$efront_string_conseq] = this[$efront_string_voidFu](expr[$efront_string_conseq], this[$efront_string_scope]), expr[$efront_string_altern] = this[$efront_string_voidFu](expr[$efront_string_altern], this[$efront_string_scope])) : expr[$efront_string_type] === Syntax[$efront_string_Sequen] && (expr[$efront_string_expres1][expr[$efront_string_expres1][$efront_string_length] - 1] = this[$efront_string_voidFu](common[$efront_string_Array][$efront_string_last](expr[$efront_string_expres1]), this[$efront_string_scope]));
                break
            } while (!0);
            return expr
        }, removeContextSensitiveExpressions[$efront_string_passNa] = Name, module[$efront_string_export] = removeContextSensitiveExpressions
    }()
}],
/** 651 $efront_string_reduce */ "reduce-sequence-expression",
/** 652 pass$reduce-sequence-expression.js */ [1,15,651,180,137,3,171,96,494,47,564,569,568,112,83,445,406,570,88,467,132,37,541,542,278,473,393,453,149,170,460,169,72,22,484,486,87,113,65,114,103,102,136,499,506,60,463,464,461,454,578,579,543,13,function(require, module, $efront_string_reduce, $efront_string_Syntax, $efront_string_expres1, $efront_string_length, $efront_string_type, $efront_string_Sequen, $efront_string_delete1, $efront_string_push, $efront_string_consta, $efront_string_isCons, $efront_string_evalua, $efront_string_object, $efront_string_Identi, $efront_string_resolv1, $efront_string_isStat, $efront_string_hasSid, $efront_string_Member, $efront_string_comput, $efront_string_proper, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_enter, $efront_string_acquir, $efront_string_leave, $efront_string_Condit, $efront_string_test, $efront_string_Array, $efront_string_last, $efront_string_Logica, $efront_string_left, $efront_string_Binary, $efront_string_right, $efront_string_Update, $efront_string_UnaryE, $efront_string_argume1, $efront_string_Specia, $efront_string_canExt, $efront_string_Assign, $efront_string_operat, $efront_string__3, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, evaluator, escope, modified) {
        'use strict';
        function reduce(node) {
            var i, iz, j, jz, expr, result;
            for (result = [], i = 0, iz = node[$efront_string_expres1][$efront_string_length]; i < iz; ++i)
                if (expr = node[$efront_string_expres1][i], expr[$efront_string_type] === Syntax[$efront_string_Sequen])
                    for (modified = !0, common[$efront_string_delete1](node), j = 0, jz = expr[$efront_string_expres1][$efront_string_length]; j < jz; ++j)
                        result[$efront_string_push](expr[$efront_string_expres1][j]);
                else
                    result[$efront_string_push](expr);
            node[$efront_string_expres1] = result
        }
        function isLoadSideEffectFree(node, scope) {
            var ref, value;
            return evaluator[$efront_string_consta][$efront_string_isCons](node) && (value = evaluator[$efront_string_consta][$efront_string_evalua](node), value === null || typeof value !== $efront_string_object) ? !0 : node[$efront_string_type] === Syntax[$efront_string_Identi] ? (ref = scope[$efront_string_resolv1](node), ref && ref[$efront_string_isStat]()) : !1
        }
        function isStoreSideEffectFree(node, scope) {
            return evaluator[$efront_string_hasSid](node, scope) ? node[$efront_string_type] === Syntax[$efront_string_Identi] ? !0 : node[$efront_string_type] === Syntax[$efront_string_Member] ? !evaluator[$efront_string_hasSid](node[$efront_string_object], scope) && (!node[$efront_string_comput] || isLoadSideEffectFree(node[$efront_string_proper], scope)) ? !0 : !1 : !1 : !0
        }
        function reduceSequenceExpression(tree, options) {
            var _a, _b, _c, _d, result, scope, manager;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), manager[$efront_string_attach2](), result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                scope = manager[$efront_string_acquir](node) || scope
            }, _c[$efront_string_leave] = function leave(node) {
                var result, last;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Sequen]:
                    reduce(node);
                    break;
                case Syntax[$efront_string_Condit]:
                    node[$efront_string_test][$efront_string_type] === Syntax[$efront_string_Sequen] && (modified = !0, result = node[$efront_string_test], node[$efront_string_test] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node);
                    break;
                case Syntax[$efront_string_Logica]:
                    node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Sequen] && (modified = !0, result = node[$efront_string_left], node[$efront_string_left] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node);
                    break;
                case Syntax[$efront_string_Binary]:
                    node[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Sequen] ? (modified = !0, result = node[$efront_string_left], node[$efront_string_left] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node) : node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Sequen] && !evaluator[$efront_string_hasSid](node[$efront_string_left], scope) && (modified = !0, result = node[$efront_string_right], node[$efront_string_right] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node);
                    break;
                case Syntax[$efront_string_Update]:
                case Syntax[$efront_string_UnaryE]:
                    if (node[$efront_string_argume1][$efront_string_type] === Syntax[$efront_string_Sequen]) {
                        if (last = common[$efront_string_Array][$efront_string_last](node[$efront_string_argume1][$efront_string_expres1]), !common[$efront_string_Specia][$efront_string_canExt](last, node, scope))
                            break;
                        modified = !0, result = node[$efront_string_argume1], node[$efront_string_argume1] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node
                    }
                    break;
                case Syntax[$efront_string_Assign]:
                    node[$efront_string_operat] === $efront_string__3 && node[$efront_string_right][$efront_string_type] === Syntax[$efront_string_Sequen] && isStoreSideEffectFree(node[$efront_string_left], scope) && (modified = !0, result = node[$efront_string_right], node[$efront_string_right] = common[$efront_string_Array][$efront_string_last](result[$efront_string_expres1]), result[$efront_string_expres1][result[$efront_string_expres1][$efront_string_length] - 1] = node);
                    break
                }
                return scope = manager[$efront_string_releas](node) || scope, result
            }, _c)), manager[$efront_string_detach](), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_reduce, escope = require(476), common = require(510), evaluator = require(572), Syntax = common[$efront_string_Syntax], reduceSequenceExpression[$efront_string_passNa] = Name, module[$efront_string_export] = reduceSequenceExpression
    }()
}],
/** 653 $efront_string_reduce1 */ "reduce-multiple-if-statements",
/** 654 pass$reduce-multiple-if-statements.js */ [1,15,653,180,37,541,542,278,167,169,171,84,127,126,22,87,463,547,113,114,578,579,543,13,function(require, module, $efront_string_reduce1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_test, $efront_string_Logica, $efront_string_operat, $efront_string__21, $efront_string_left, $efront_string_right, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function reduceMultipleIfStatements(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var _a;
                node[$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_altern] && node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_conseq][$efront_string_altern] && (modified = !0, _a = {}, _a[$efront_string_type] = Syntax[$efront_string_Logica], _a[$efront_string_operat] = $efront_string__21, _a[$efront_string_left] = node[$efront_string_test], _a[$efront_string_right] = node[$efront_string_conseq][$efront_string_test], node[$efront_string_test] = _a, node[$efront_string_conseq] = node[$efront_string_conseq][$efront_string_conseq])
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_reduce1, common = require(510), Syntax = common[$efront_string_Syntax], reduceMultipleIfStatements[$efront_string_passNa] = Name, module[$efront_string_export] = reduceMultipleIfStatements
    }()
}],
/** 655 $efront_string_reduce2 */ "reduce-branch-jump",
/** 656 pass$reduce-branch-jump.js */ [1,15,655,180,171,84,127,126,95,136,493,96,137,22,499,501,72,176,37,541,542,278,167,169,64,93,119,3,498,98,578,579,543,13,function(require, module, $efront_string_reduce2, $efront_string_Syntax, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_Return, $efront_string_argume1, $efront_string_moveLo, $efront_string_Sequen, $efront_string_expres1, $efront_string_test, $efront_string_Specia, $efront_string_genera2, $efront_string_Condit, $efront_string_splice, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_length, $efront_string_isFunc, $efront_string_Switch1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function reduceLast(ary, index) {
            var _a, _b, _c, _d, node, left;
            return node = ary[index], node[$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_altern] && node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return] ? (modified = !0, left = node[$efront_string_conseq][$efront_string_argume1], left ? (ary[index] = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _d = {}, _d[$efront_string_type] = Syntax[$efront_string_Condit], _d[$efront_string_test] = node[$efront_string_test], _d[$efront_string_conseq] = left, _d[$efront_string_altern] = common[$efront_string_Specia][$efront_string_genera2](), _c[$efront_string_argume1] = _d, _c)), !0) : (ary[index] = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Return], _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                node[$efront_string_test],
                common[$efront_string_Specia][$efront_string_genera2]()
            ], _a[$efront_string_argume1] = _b, _a)), !0)) : void 0
        }
        function reduce(ary, index) {
            var _a, _b, _c, _d, node, sibling, left, right;
            return node = ary[index], sibling = ary[index + 1], node[$efront_string_type] === Syntax[$efront_string_IfStat] && !node[$efront_string_altern] && node[$efront_string_conseq][$efront_string_type] === Syntax[$efront_string_Return] && sibling[$efront_string_type] === Syntax[$efront_string_Return] ? (modified = !0, ary[$efront_string_splice](index, 1), left = node[$efront_string_conseq][$efront_string_argume1], right = sibling[$efront_string_argume1], left || right ? (left || (left = common[$efront_string_Specia][$efront_string_genera2]()), right || (right = common[$efront_string_Specia][$efront_string_genera2]()), ary[index] = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Return], _d = {}, _d[$efront_string_type] = Syntax[$efront_string_Condit], _d[$efront_string_test] = node[$efront_string_test], _d[$efront_string_conseq] = left, _d[$efront_string_altern] = right, _c[$efront_string_argume1] = _d, _c)), !0) : (ary[index] = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Return], _b = {}, _b[$efront_string_type] = Syntax[$efront_string_Sequen], _b[$efront_string_expres1] = [
                node[$efront_string_test],
                common[$efront_string_Specia][$efront_string_genera2]()
            ], _a[$efront_string_argume1] = _b, _a)), !0)) : !1
        }
        function reduceBranchJump(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node, parent) {
                var i;
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_BlockS]:
                case Syntax[$efront_string_Progra]:
                    i = 0;
                    while (i < node[$efront_string_body][$efront_string_length] - 1)
                        reduce(node[$efront_string_body], i) || ++i;
                    common[$efront_string_isFunc](node, parent) && node[$efront_string_body][$efront_string_length] > 0 && (i = node[$efront_string_body][$efront_string_length] - 1, reduceLast(node[$efront_string_body], i));
                    break;
                case Syntax[$efront_string_Switch1]:
                    i = 0;
                    while (i < node[$efront_string_conseq][$efront_string_length] - 1)
                        reduce(node[$efront_string_conseq], i) || ++i;
                    break
                }
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_reduce2, common = require(510), Syntax = common[$efront_string_Syntax], reduceBranchJump[$efront_string_passNa] = Name, module[$efront_string_export] = reduceBranchJump
    }()
}],
/** 657 $efront_string_hoist_ */ "hoist-variable-to-arguments",
/** 658 $efront_string_for_in */ /** text */ "for-in declaration length should be 1",
/** 659 pass$hoist-variable-to-arguments.js */ [1,15,657,180,116,3,199,47,119,149,170,171,82,81,161,104,468,354,80,490,145,658,129,124,83,79,493,60,463,464,113,114,77,96,137,78,128,37,541,542,278,473,393,453,167,67,90,121,122,460,448,450,454,578,579,543,13,function(require, module, $efront_string_hoist_, $efront_string_Syntax, $efront_string_params, $efront_string_length, $efront_string_name, $efront_string_push, $efront_string_body, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Functi1, $efront_string_Functi, $efront_string_skip, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_ForInS, $efront_string_assert, $efront_string_declar, $efront_string_for_in, $efront_string_init, $efront_string_id, $efront_string_Identi, $efront_string_ForSta, $efront_string_moveLo, $efront_string_Assign, $efront_string_operat, $efront_string__3, $efront_string_left, $efront_string_right, $efront_string_EmptyS, $efront_string_Sequen, $efront_string_expres1, $efront_string_Expres, $efront_string_expres, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_traver, $efront_string_CallEx, $efront_string_NewExp, $efront_string_callee, $efront_string_argume, $efront_string_acquir, $efront_string_isArgu, $efront_string_isThis, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, escope, modified) {
        'use strict';
        function hoist(callee) {
            function hoisting(ident) {
                var hoisted, i, iz;
                for (hoisted = !1, i = 0, iz = callee[$efront_string_params][$efront_string_length]; i < iz; ++i)
                    if (ident[$efront_string_name] === callee[$efront_string_params][i][$efront_string_name]) {
                        hoisted = !0;
                        break
                    }
                hoisted || callee[$efront_string_params][$efront_string_push](ident)
            }
            var _a;
            callee[$efront_string_body] = common[$efront_string_replac](callee[$efront_string_body], (_a = {}, _a[$efront_string_enter] = function (node, parent) {
                var _a, _b, _c, _d, i, iz, expressions, declaration, forstmt, expr;
                if (node[$efront_string_type] === Syntax[$efront_string_Functi1] || node[$efront_string_type] === Syntax[$efront_string_Functi]) {
                    this[$efront_string_skip]();
                    return
                }
                if (node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var) {
                    if (parent[$efront_string_type] === Syntax[$efront_string_ForInS])
                        return common[$efront_string_assert](node[$efront_string_declar][$efront_string_length] === 1, $efront_string_for_in), declaration = node[$efront_string_declar][0], declaration[$efront_string_init] ? void 0 : declaration[$efront_string_id][$efront_string_type] !== Syntax[$efront_string_Identi] ? void 0 : (hoisting(declaration[$efront_string_id]), modified = !0, declaration[$efront_string_id]);
                    for (forstmt = parent[$efront_string_type] === Syntax[$efront_string_ForSta], expressions = [], i = 0, iz = node[$efront_string_declar][$efront_string_length]; i < iz; ++i) {
                        if (declaration = node[$efront_string_declar][i], declaration[$efront_string_id][$efront_string_type] !== Syntax[$efront_string_Identi])
                            return;
                        hoisting(declaration[$efront_string_id]), declaration[$efront_string_init] && expressions[$efront_string_push](common[$efront_string_moveLo](declaration, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_Assign], _a[$efront_string_operat] = $efront_string__3, _a[$efront_string_left] = declaration[$efront_string_id], _a[$efront_string_right] = declaration[$efront_string_init], _a)))
                    }
                    return modified = !0, expressions[$efront_string_length] === 0 ? forstmt ? null : common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b)) : (expressions[$efront_string_length] === 1 ? expr = expressions[0] : expr = common[$efront_string_moveLo](node, (_c = {}, _c[$efront_string_type] = Syntax[$efront_string_Sequen], _c[$efront_string_expres1] = expressions, _c)), forstmt ? expr : common[$efront_string_moveLo](node, (_d = {}, _d[$efront_string_type] = Syntax[$efront_string_Expres], _d[$efront_string_expres] = expr, _d)))
                }
            }, _a))
        }
        function hoistVariableToArguments(tree, options) {
            var _a, _b, _c, _d, result, scope, manager;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), manager[$efront_string_attach2](), common[$efront_string_traver](result, (_c = {}, _c[$efront_string_enter] = function enter(node) {
                var callee;
                (node[$efront_string_type] === Syntax[$efront_string_CallEx] || node[$efront_string_type] === Syntax[$efront_string_NewExp]) && (callee = node[$efront_string_callee], callee[$efront_string_type] === Syntax[$efront_string_Functi1] && !callee[$efront_string_id] && callee[$efront_string_params][$efront_string_length] === node[$efront_string_argume][$efront_string_length] && (scope = manager[$efront_string_acquir](callee), !scope[$efront_string_isArgu]() && (node[$efront_string_type] !== Syntax[$efront_string_NewExp] || !scope[$efront_string_isThis]()) && hoist(callee)))
            }, _c)), manager[$efront_string_detach](), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_hoist_, escope = require(476), common = require(510), Syntax = common[$efront_string_Syntax], hoistVariableToArguments[$efront_string_passNa] = Name, module[$efront_string_export] = hoistVariableToArguments
    }()
}],
/** 660 $efront_string_elimin */ "eliminate-duplicate-function-declarations",
/** 661 $efront_string_count */ "count",
/** 662 $efront_string_global1 */ /** text */ "global map remains",
/** 663 pass$eliminate-duplicate-function-declarations.js */ [1,15,660,180,149,170,171,81,124,199,37,661,493,77,64,161,145,3,484,486,541,542,278,40,47,41,82,169,168,46,490,662,578,579,543,13,function(require, module, $efront_string_elimin, $efront_string_Syntax, $efront_string_replac, $efront_string_enter, $efront_string_type, $efront_string_Functi, $efront_string_id, $efront_string_name, $efront_string_get, $efront_string_count, $efront_string_moveLo, $efront_string_EmptyS, $efront_string_BlockS, $efront_string_skip, $efront_string_declar, $efront_string_length, $efront_string_Array, $efront_string_last, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_has, $efront_string_push, $efront_string_set, $efront_string_Functi1, $efront_string_leave, $efront_string_pop, $efront_string_keys, $efront_string_assert, $efront_string_global1, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, Map, common, modified) {
        'use strict';
        function unique(map, root) {
            var _a;
            return common[$efront_string_replac](root, (_a = {}, _a[$efront_string_enter] = function (node) {
                var _a, name, info;
                return node[$efront_string_type] === Syntax[$efront_string_Functi] && (name = node[$efront_string_id][$efront_string_name], info = map[$efront_string_get](name), --info[$efront_string_count], info[$efront_string_count] !== 0) ? (modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a))) : node !== root && node[$efront_string_type] === Syntax[$efront_string_BlockS] ? this[$efront_string_skip]() : void 0
            }, _a))
        }
        function uniqueInGlobal(map, root) {
            var _a;
            return common[$efront_string_replac](root, (_a = {}, _a[$efront_string_enter] = function (node) {
                var _a, name, info, first;
                return node[$efront_string_type] === Syntax[$efront_string_Functi] && (name = node[$efront_string_id][$efront_string_name], info = map[$efront_string_get](name), first = info[$efront_string_count] === info[$efront_string_declar][$efront_string_length], --info[$efront_string_count], info[$efront_string_declar][$efront_string_length] > 1) ? first ? (modified = !0, common[$efront_string_Array][$efront_string_last](info[$efront_string_declar])) : (modified = !0, common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a))) : node !== root && node[$efront_string_type] === Syntax[$efront_string_BlockS] ? this[$efront_string_skip]() : void 0
            }, _a))
        }
        function main(tree, options) {
            var _a, _b, _c, result, stack, functionDepth, globalBlockFound;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, functionDepth = 0, globalBlockFound = !1, stack = [new Map], result = common[$efront_string_replac](result, (_b = {}, _b[$efront_string_enter] = function enter(node) {
                var _a, map, name, info;
                node[$efront_string_type] === Syntax[$efront_string_Functi] && (name = node[$efront_string_id][$efront_string_name], map = common[$efront_string_Array][$efront_string_last](stack), map[$efront_string_has](name) ? (info = map[$efront_string_get](name), info[$efront_string_declar][$efront_string_push](node), ++info[$efront_string_count]) : (_a = {}, _a[$efront_string_declar] = [node], _a[$efront_string_count] = 1, info = _a, map[$efront_string_set](name, info))), node[$efront_string_type] === Syntax[$efront_string_BlockS] && stack[$efront_string_push](new Map), (node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) && ++functionDepth
            }, _b[$efront_string_leave] = function leave(node) {
                var map, ret;
                return node[$efront_string_type] === Syntax[$efront_string_BlockS] && (map = stack[$efront_string_pop](), functionDepth === 0 ? map[$efront_string_keys]()[$efront_string_length] !== 0 && (globalBlockFound = !0) : ret = unique(map, node)), (node[$efront_string_type] === Syntax[$efront_string_Functi] || node[$efront_string_type] === Syntax[$efront_string_Functi1]) && --functionDepth, ret
            }, _b)), common[$efront_string_assert](stack[$efront_string_length] === 1, $efront_string_global1), globalBlockFound || (result = uniqueInGlobal(stack[0], result)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_elimin, common = require(510), Map = require(50), Syntax = common[$efront_string_Syntax], main[$efront_string_passNa] = Name, module[$efront_string_export] = main
    }()
}],
/** 664 $efront_string_drop_v */ "drop-variable-definition",
/** 665 $efront_string_candid */ "candidates",
/** 666 $efront_string_slots */ "slots",
/** 667 $efront_string___$par */ "__$parent$__",
/** 668 pass$drop-variable-definition.js */ [1,15,664,180,665,428,3,412,47,666,413,408,400,401,667,171,60,105,570,396,145,176,490,167,170,452,37,541,542,278,473,393,453,149,429,406,104,468,354,9,124,79,493,77,81,460,169,461,454,578,579,543,13,function(require, module, $efront_string_drop_v, $efront_string_Syntax, $efront_string_candid, $efront_string_variab, $efront_string_length, $efront_string_identi1, $efront_string_push, $efront_string_slots, $efront_string_refere, $efront_string_isRead, $efront_string_isWrit, $efront_string_writeE, $efront_string___$par, $efront_string_type, $efront_string_Assign, $efront_string_Variab1, $efront_string_hasSid, $efront_string_from, $efront_string_declar, $efront_string_splice, $efront_string_assert, $efront_string_traver, $efront_string_enter, $efront_string___$esc, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_attach2, $efront_string_replac, $efront_string_variab1, $efront_string_isStat, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_indexO, $efront_string_id, $efront_string_ForSta, $efront_string_moveLo, $efront_string_EmptyS, $efront_string_Functi, $efront_string_acquir, $efront_string_leave, $efront_string_releas, $efront_string_detach, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified, escope, evaluator) {
        'use strict';
        function getCandidates(scope) {
            var _a, i, iz, j, jz, identifiers, slots, v;
            if (!scope[$efront_string_candid]) {
                for (slots = [], identifiers = [], i = 0, iz = scope[$efront_string_variab][$efront_string_length]; i < iz; ++i)
                    for (v = scope[$efront_string_variab][i], j = 0, jz = v[$efront_string_identi1][$efront_string_length]; j < jz; ++j)
                        identifiers[$efront_string_push](v[$efront_string_identi1][j]), slots[$efront_string_push](v);
                _a = {}, _a[$efront_string_slots] = slots, _a[$efront_string_identi1] = identifiers, scope[$efront_string_candid] = _a
            }
            return scope[$efront_string_candid]
        }
        function isRemovableDefinition(slot) {
            var i, iz, ref, parent;
            if (slot[$efront_string_identi1][$efront_string_length] !== 1)
                return !1;
            if (slot[$efront_string_refere][$efront_string_length] === 0)
                return !0;
            for (i = 0, iz = slot[$efront_string_refere][$efront_string_length]; i < iz; ++i) {
                if (ref = slot[$efront_string_refere][i], ref[$efront_string_isRead]())
                    return !1;
                if (ref[$efront_string_isWrit]()) {
                    if (!ref[$efront_string_writeE])
                        return !1;
                    if (parent = ref[$efront_string_writeE][$efront_string___$par], !parent)
                        return !1;
                    if (parent[$efront_string_type] !== Syntax[$efront_string_Assign] && parent[$efront_string_type] !== Syntax[$efront_string_Variab1])
                        return !1;
                    if (evaluator[$efront_string_hasSid](ref[$efront_string_writeE], ref[$efront_string_from]))
                        return !1
                }
            }
            return !0
        }
        function overrideExpression(from, to) {
            var key;
            for (key in from)
                delete from[key];
            for (key in to)
                from[key] = to[key];
            return from
        }
        function removeDefinition(node, index, slot) {
            var i, iz, ref, parent;
            for (node[$efront_string_declar][$efront_string_splice](index, 1), i = 0, iz = slot[$efront_string_refere][$efront_string_length]; i < iz; ++i)
                ref = slot[$efront_string_refere][i], common[$efront_string_assert](!ref[$efront_string_isRead]()), ref[$efront_string_isWrit]() && (parent = ref[$efront_string_writeE][$efront_string___$par], parent[$efront_string_type] === Syntax[$efront_string_Assign] && overrideExpression(ref[$efront_string_writeE][$efront_string___$par], ref[$efront_string_writeE]))
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
                delete node[$efront_string___$par], delete node[$efront_string___$esc]
            }, _a))
        }
        function dropVariableDefinition(tree, options) {
            var _a, _b, _c, _d, result, manager, scope;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, scope = null, manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), manager[$efront_string_attach2](), attachParent(result), result = common[$efront_string_replac](result, (_c = {}, _c[$efront_string_enter] = function enter(node, parent) {
                var _a, _b, i, decl, cand, index, slot, ret;
                if (ret = node, scope && scope[$efront_string_variab1][$efront_string_isStat]()) {
                    if (cand = getCandidates(scope[$efront_string_variab1]), node[$efront_string_type] === Syntax[$efront_string_Variab] && node[$efront_string_kind] === $efront_string_var) {
                        i = node[$efront_string_declar][$efront_string_length];
                        while (i--)
                            decl = node[$efront_string_declar][i], index = cand[$efront_string_identi1][$efront_string_indexO](decl[$efront_string_id]), index !== -1 && (slot = cand[$efront_string_slots][index], isRemovableDefinition(slot) && (modified = !0, removeDefinition(node, i, slot)));
                        node[$efront_string_declar][$efront_string_length] === 0 && (parent[$efront_string_type] === Syntax[$efront_string_ForSta] ? ret = null : ret = common[$efront_string_moveLo](node, (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_EmptyS], _a)))
                    }
                    if (node[$efront_string_type] === Syntax[$efront_string_Functi] && (index = cand[$efront_string_identi1][$efront_string_indexO](node[$efront_string_id]), index !== -1) && (slot = cand[$efront_string_slots][index], slot[$efront_string_identi1][$efront_string_length] === 1 && slot[$efront_string_refere][$efront_string_length] === 0))
                        return modified = !0, ret = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_EmptyS], _b)), ret
                }
                return scope = manager[$efront_string_acquir](node) || scope, ret
            }, _c[$efront_string_leave] = function leave(node) {
                scope = manager[$efront_string_releas](node) || scope
            }, _c)), manager[$efront_string_detach](), removeParent(result), _d = {}, _d[$efront_string_result] = result, _d[$efront_string_modifi] = modified, _d
        }
        Name = $efront_string_drop_v, common = require(510), escope = require(476), evaluator = require(572), Syntax = common[$efront_string_Syntax], dropVariableDefinition[$efront_string_passNa] = Name, module[$efront_string_export] = dropVariableDefinition
    }()
}],
/** 669 $efront_string_dead_c */ "dead-code-elimination",
/** 670 $efront_string_labels */ "labels",
/** 671 $efront_string_NAMED_ */ "NAMED_ONLY",
/** 672 $efront_string_ITERAT */ "ITERATION",
/** 673 $efront_string_SWITCH */ "SWITCH",
/** 674 $efront_string_isIter */ "isIteration",
/** 675 $efront_string_isAnon */ "isAnonymous",
/** 676 $efront_string_contai */ "contains",
/** 677 $efront_string_target1 */ "targets",
/** 678 $efront_string_lookup */ "lookupContinuableTarget",
/** 679 $efront_string_lookup1 */ "lookupBreakableTarget",
/** 680 $efront_string_jumps */ "jumps",
/** 681 $efront_string_next */ "next",
/** 682 $efront_string_NEXT */ "NEXT",
/** 683 $efront_string_insert */ "insert",
/** 684 $efront_string_erase */ "erase",
/** 685 $efront_string_kill */ "kill",
/** 686 $efront_string_jumpTo */ "jumpTo",
/** 687 $efront_string_resolv2 */ "resolveJump",
/** 688 $efront_string_isDead */ "isDead",
/** 689 $efront_string_revive */ "revive",
/** 690 $efront_string_isRequ */ "isRequired",
/** 691 $efront_string_should */ /** text */ "should be node",
/** 692 $efront_string___$con */ "__$context",
/** 693 $efront_string_lookup2 */ "lookup",
/** 694 $efront_string_status */ /** text */ "status should be null",
/** 695 pass$dead-code-elimination.js */ [1,15,669,180,150,171,670,671,672,673,36,674,675,676,9,677,678,3,199,491,679,47,168,157,420,680,681,682,683,684,176,685,40,686,687,43,688,689,626,120,630,690,490,691,93,82,81,692,454,693,84,127,126,107,86,119,64,484,486,73,495,22,493,102,463,545,136,167,170,183,147,66,68,76,74,77,78,79,129,130,80,113,114,95,97,138,139,98,100,101,140,141,144,106,104,169,37,541,542,278,694,578,579,543,13,function(require, module, $efront_string_dead_c, $efront_string_Syntax, $efront_string_node, $efront_string_type, $efront_string_labels, $efront_string_NAMED_, $efront_string_ITERAT, $efront_string_SWITCH, $efront_string_protot, $efront_string_isIter, $efront_string_isAnon, $efront_string_contai, $efront_string_indexO, $efront_string_target1, $efront_string_lookup, $efront_string_length, $efront_string_name, $efront_string_unreac, $efront_string_lookup1, $efront_string_push, $efront_string_pop, $efront_string_curren, $efront_string_upper, $efront_string_jumps, $efront_string_next, $efront_string_NEXT, $efront_string_insert, $efront_string_erase, $efront_string_splice, $efront_string_kill, $efront_string_has, $efront_string_jumpTo, $efront_string_resolv2, $efront_string_clear, $efront_string_isDead, $efront_string_revive, $efront_string_regist1, $efront_string_label, $efront_string_unregi, $efront_string_isRequ, $efront_string_assert, $efront_string_should, $efront_string_Progra, $efront_string_Functi1, $efront_string_Functi, $efront_string___$con, $efront_string_detach, $efront_string_lookup2, $efront_string_IfStat, $efront_string_altern, $efront_string_conseq, $efront_string_WithSt, $efront_string_Labele, $efront_string_body, $efront_string_BlockS, $efront_string_Array, $efront_string_last, $efront_string_Contin, $efront_string_conver, $efront_string_test, $efront_string_moveLo, $efront_string_UnaryE, $efront_string_operat, $efront_string__19, $efront_string_argume1, $efront_string_traver, $efront_string_enter, $efront_string_Visito1, $efront_string_Skip, $efront_string_BreakS, $efront_string_CatchC, $efront_string_DoWhil, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_ForSta, $efront_string_init, $efront_string_update, $efront_string_ForInS, $efront_string_left, $efront_string_right, $efront_string_Return, $efront_string_Switch, $efront_string_discri, $efront_string_cases, $efront_string_Switch1, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_block, $efront_string_handle, $efront_string_finali, $efront_string_WhileS, $efront_string_Variab, $efront_string_leave, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_status, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, status, modified) {
        'use strict';
        function JumpTarget(node, status, type) {
            this[$efront_string_node] = node, this[$efront_string_type] = type, this[$efront_string_labels] = status[$efront_string_labels] || [], status[$efront_string_labels] = null
        }
        function Jumps() {
            this[$efront_string_target1] = []
        }
        function Status(upper) {
            this[$efront_string_curren] = [], this[$efront_string_upper] = upper, this[$efront_string_jumps] = new Jumps, this[$efront_string_labels] = null, this[$efront_string_next]()
        }
        function Context(node) {
            node[$efront_string___$con] = this, this[$efront_string_node] = node
        }
        function getForwardLastNode(node) {
            while (!0) {
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_IfStat]:
                    if (node[$efront_string_altern])
                        return null;
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
            return last = getForwardLastNode(body), last && last[$efront_string_type] === Syntax[$efront_string_Contin] && (jump = status[$efront_string_jumps][$efront_string_lookup](last[$efront_string_label]), jump === loop && (modified = !0, common[$efront_string_conver](last))), visit(body)
        }
        function visit(target) {
            function eliminate(node, array) {
                var _a, i, iz, stmt, ret, info, result;
                for (result = [], i = 0, iz = array[$efront_string_length]; i < iz; ++i)
                    stmt = array[i], stmt[$efront_string_type] === Syntax[$efront_string_IfStat] ? (info = new Context(stmt), ret = visit(stmt), info[$efront_string_detach]()) : ret = visit(stmt), ret ? (live |= 1, result[$efront_string_push](stmt), stmt[$efront_string_type] === Syntax[$efront_string_IfStat] && stmt[$efront_string_altern] && !(info[$efront_string_conseq] && info[$efront_string_altern]) && info[$efront_string_conseq] !== info[$efront_string_altern] && (modified = !0, info[$efront_string_conseq] ? (stmt[$efront_string_test] = common[$efront_string_moveLo](stmt[$efront_string_test], (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_UnaryE], _a[$efront_string_operat] = $efront_string__19, _a[$efront_string_argume1] = stmt[$efront_string_test], _a)), result[$efront_string_push](stmt[$efront_string_conseq]), stmt[$efront_string_conseq] = stmt[$efront_string_altern], stmt[$efront_string_altern] = null) : (result[$efront_string_push](stmt[$efront_string_altern]), stmt[$efront_string_altern] = null))) : modified = !0;
                return result
            }
            var _a, live = !1;
            return target ? (common[$efront_string_traver](target, (_a = {}, _a[$efront_string_enter] = function enter(node) {
                var i, iz, stmt, consequent, alternate, ctx, hasDefaultClause;
                Status[$efront_string_isRequ](node) && (status = new Status(status)), live |= !status[$efront_string_isDead]();
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
                    node[$efront_string_label] && status[$efront_string_labels] && status[$efront_string_labels][$efront_string_indexO](node[$efront_string_label]) ? (modified = !0, common[$efront_string_conver](node)) : status[$efront_string_jumpTo](status[$efront_string_jumps][$efront_string_lookup1](node[$efront_string_label]));
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
                    if (!node[$efront_string_altern])
                        return status[$efront_string_revive](), common[$efront_string_Visito1][$efront_string_Skip];
                    consequent = !status[$efront_string_isDead]();
                    status[$efront_string_revive]() || status[$efront_string_insert](node);
                    live |= visit(node[$efront_string_altern]);
                    alternate = !status[$efront_string_isDead]();
                    status[$efront_string_erase](node) && status[$efront_string_revive]();
                    (ctx = Context[$efront_string_lookup2](node)) && (ctx[$efront_string_conseq] = consequent, ctx[$efront_string_altern] = alternate);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Labele]:
                    status[$efront_string_regist1](node);
                    break;
                case Syntax[$efront_string_Return]:
                    live |= visit(node[$efront_string_argume1]);
                    status[$efront_string_kill]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Switch]:
                    visit(node[$efront_string_discri]);
                    status[$efront_string_jumps][$efront_string_push](new JumpTarget(node, status, JumpTarget[$efront_string_SWITCH]));
                    for (i = 0, iz = node[$efront_string_cases][$efront_string_length]; i < iz; ++i)
                        stmt = node[$efront_string_cases][i], live |= visit(stmt), stmt[$efront_string_test] || (hasDefaultClause = !0), status[$efront_string_isDead]() && i + 1 < iz && status[$efront_string_next]();
                    status[$efront_string_jumps][$efront_string_pop]();
                    status[$efront_string_resolv2](node);
                    status[$efront_string_isDead]() && !hasDefaultClause && status[$efront_string_next]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_Switch1]:
                    node[$efront_string_test] && (live |= visit(node[$efront_string_test]));
                    node[$efront_string_conseq] = eliminate(node, node[$efront_string_conseq]);
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_ThrowS]:
                    live |= visit(node[$efront_string_argume1]);
                    status[$efront_string_kill]();
                    return common[$efront_string_Visito1][$efront_string_Skip];
                case Syntax[$efront_string_TrySta]:
                    live |= visit(node[$efront_string_block]);
                    node[$efront_string_handle] && node[$efront_string_handle][$efront_string_length] && (status[$efront_string_revive]() || status[$efront_string_insert](node), node[$efront_string_handle] = eliminate(node, node[$efront_string_handle]), status[$efront_string_erase](node) && status[$efront_string_revive]());
                    node[$efront_string_finali] && (status[$efront_string_revive]() || status[$efront_string_insert](node), live |= visit(node[$efront_string_finali]), status[$efront_string_erase](node) || status[$efront_string_kill]());
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
                    live = !0;
                    break
                }
            }, _a[$efront_string_leave] = function leave(node) {
                if (Status[$efront_string_isRequ](node)) {
                    status = status[$efront_string_upper];
                    return
                }
                node[$efront_string_type] === Syntax[$efront_string_Labele] && status[$efront_string_unregi]()
            }, _a)), live) : !status[$efront_string_isDead]()
        }
        function deadCodeElimination(tree, options) {
            var _a, _b, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), status = null, modified = !1, visit(result), common[$efront_string_assert](status === null, $efront_string_status), _b = {}, _b[$efront_string_result] = result, _b[$efront_string_modifi] = modified, _b
        }
        Name = $efront_string_dead_c, common = require(510), Syntax = common[$efront_string_Syntax], JumpTarget[$efront_string_NAMED_] = 0, JumpTarget[$efront_string_ITERAT] = 2, JumpTarget[$efront_string_SWITCH] = 3, JumpTarget[$efront_string_protot][$efront_string_isIter] = function isIteration() {
            return this[$efront_string_type] === JumpTarget[$efront_string_ITERAT]
        }, JumpTarget[$efront_string_protot][$efront_string_isAnon] = function isAnonymous() {
            return this[$efront_string_type] & 2
        }, JumpTarget[$efront_string_protot][$efront_string_contai] = function contains(label) {
            return this[$efront_string_labels][$efront_string_indexO](label) !== -1
        }, Jumps[$efront_string_protot][$efront_string_lookup] = function lookupContinuableTarget(label) {
            var i, target;
            for (i = this[$efront_string_target1][$efront_string_length] - 1; i >= 0; --i)
                if (target = this[$efront_string_target1][i], target[$efront_string_isIter]() && (!label || target[$efront_string_contai](label[$efront_string_name])))
                    return target[$efront_string_node];
            common[$efront_string_unreac]()
        }, Jumps[$efront_string_protot][$efront_string_lookup1] = function lookupBreakableTarget(label) {
            var i, target;
            for (i = this[$efront_string_target1][$efront_string_length] - 1; i >= 0; --i)
                if (target = this[$efront_string_target1][i], label) {
                    if (target[$efront_string_contai](label[$efront_string_name]))
                        return target[$efront_string_node]
                } else if (target[$efront_string_isAnon]())
                    return target[$efront_string_node];
            common[$efront_string_unreac]()
        }, Jumps[$efront_string_protot][$efront_string_push] = function push(target) {
            this[$efront_string_target1][$efront_string_push](target)
        }, Jumps[$efront_string_protot][$efront_string_pop] = function pop() {
            this[$efront_string_target1][$efront_string_pop]()
        }, Status[$efront_string_NEXT] = {}, Status[$efront_string_protot][$efront_string_insert] = function insert(stmt) {
            this[$efront_string_curren][$efront_string_push](stmt)
        }, Status[$efront_string_protot][$efront_string_erase] = function erase(stmt) {
            var index = this[$efront_string_curren][$efront_string_indexO](stmt);
            return index === -1 ? !1 : (this[$efront_string_curren][$efront_string_splice](index, 1), !0)
        }, Status[$efront_string_protot][$efront_string_kill] = function kill() {
            return this[$efront_string_erase](Status[$efront_string_NEXT])
        }, Status[$efront_string_protot][$efront_string_has] = function has(stmt) {
            return this[$efront_string_curren][$efront_string_indexO](stmt) !== -1
        }, Status[$efront_string_protot][$efront_string_jumpTo] = function jumpTo(stmt) {
            this[$efront_string_kill](), this[$efront_string_insert](stmt)
        }, Status[$efront_string_protot][$efront_string_resolv2] = function resolveJump(stmt) {
            var index = this[$efront_string_curren][$efront_string_indexO](stmt);
            index !== -1 && (this[$efront_string_curren][$efront_string_splice](index, 1), this[$efront_string_insert](Status[$efront_string_NEXT]))
        }, Status[$efront_string_protot][$efront_string_clear] = function clear() {
            this[$efront_string_curren][$efront_string_length] = 0
        }, Status[$efront_string_protot][$efront_string_next] = function next() {
            this[$efront_string_insert](Status[$efront_string_NEXT])
        }, Status[$efront_string_protot][$efront_string_isDead] = function isDead() {
            return !this[$efront_string_has](Status[$efront_string_NEXT])
        }, Status[$efront_string_protot][$efront_string_revive] = function revive() {
            return this[$efront_string_isDead]() ? (this[$efront_string_next](), !0) : !1
        }, Status[$efront_string_protot][$efront_string_regist1] = function register(node) {
            this[$efront_string_labels] || (this[$efront_string_labels] = []), this[$efront_string_labels][$efront_string_push](node[$efront_string_label][$efront_string_name])
        }, Status[$efront_string_protot][$efront_string_unregi] = function unregister() {
            this[$efront_string_labels] = null
        }, Status[$efront_string_isRequ] = function isRequired(node) {
            var type = node[$efront_string_type];
            return common[$efront_string_assert](node, $efront_string_should), type === Syntax[$efront_string_Progra] || type === Syntax[$efront_string_Functi1] || type === Syntax[$efront_string_Functi]
        }, Context[$efront_string_protot][$efront_string_detach] = function detach() {
            delete this[$efront_string_node][$efront_string___$con]
        }, Context[$efront_string_lookup2] = function lookup(node) {
            return node[$efront_string___$con]
        }, deadCodeElimination[$efront_string_passNa] = Name, module[$efront_string_export] = deadCodeElimination
    }()
}],
/** 696 $efront_string_concat1 */ "concatenate-variable-definition",
/** 697 pass$concatenate-variable-definition.js */ [1,15,696,180,37,541,542,278,167,169,171,64,93,119,3,104,468,354,47,145,578,579,543,13,function(require, module, $efront_string_concat1, $efront_string_Syntax, $efront_string_get, $efront_string_destru, $efront_string_pathNa, $efront_string_deepCo, $efront_string_traver, $efront_string_leave, $efront_string_type, $efront_string_BlockS, $efront_string_Progra, $efront_string_body, $efront_string_length, $efront_string_Variab, $efront_string_kind, $efront_string_var, $efront_string_push, $efront_string_declar, $efront_string_result, $efront_string_modifi, $efront_string_passNa, $efront_string_export) {
    return function (Name, Syntax, common, modified) {
        'use strict';
        function concatenateVariableDefinition(tree, options) {
            var _a, _b, _c, result;
            return result = options[$efront_string_get]($efront_string_destru, (_a = {}, _a[$efront_string_pathNa] = Name, _a)) ? tree : common[$efront_string_deepCo](tree), modified = !1, common[$efront_string_traver](result, (_b = {}, _b[$efront_string_leave] = function leave(node) {
                var i, iz, j, jz, stmt, decl, target, body;
                if (node[$efront_string_type] !== Syntax[$efront_string_BlockS] && node[$efront_string_type] !== Syntax[$efront_string_Progra])
                    return;
                for (target = null, body = [], i = 0, iz = node[$efront_string_body][$efront_string_length]; i < iz; ++i)
                    if (stmt = node[$efront_string_body][i], stmt[$efront_string_type] === Syntax[$efront_string_Variab] && stmt[$efront_string_kind] === $efront_string_var) {
                        if (!target) {
                            target = stmt, body[$efront_string_push](stmt);
                            continue
                        }
                        for (modified = !0, j = 0, jz = stmt[$efront_string_declar][$efront_string_length]; j < jz; ++j)
                            decl = stmt[$efront_string_declar][j], target[$efront_string_declar][$efront_string_push](decl)
                    } else
                        target = null, body[$efront_string_push](stmt);
                node[$efront_string_body] = body
            }, _b)), _c = {}, _c[$efront_string_result] = result, _c[$efront_string_modifi] = modified, _c
        }
        Name = $efront_string_concat1, common = require(510), Syntax = common[$efront_string_Syntax], concatenateVariableDefinition[$efront_string_passNa] = Name, module[$efront_string_export] = concatenateVariableDefinition
    }()
}],
/** 698 $efront_string__dev */ "-dev",
/** 699 $efront_string__scope */ "_scope",
/** 700 $efront_string__funct1 */ "_functionName",
/** 701 $efront_string_distin */ "distinguishFunctionExpressionScope",
/** 702 $efront_string_passAs */ "passAsUnique",
/** 703 $efront_string_genera5 */ "generateName",
/** 704 $efront_string_9 */ "9",
/** 705 $efront_string_sort */ "sort",
/** 706 $efront_string_users */ "users",
/** 707 $efront_string_names */ "names",
/** 708 $efront_string_mangle1 */ "mangle",
/** 709 $efront_string_map */ "map",
/** 710 $efront_string_node_s */ /** text */ "node should be LabeledStatement",
/** 711 esshorten$lib$esshorten.js */ [1,56,52,178,180,9,698,3,699,700,701,420,430,140,124,199,36,702,389,383,385,425,40,427,395,703,277,406,704,428,705,397,412,413,150,706,707,708,41,120,709,670,626,171,86,710,47,627,630,37,42,445,631,632,167,170,471,462,66,73,169,541,278,473,393,456,function(require, Error, exports, $efront_string_versio, $efront_string_Syntax, $efront_string_indexO, $efront_string__dev, $efront_string_length, $efront_string__scope, $efront_string__funct1, $efront_string_distin, $efront_string_upper, $efront_string_functi1, $efront_string_block, $efront_string_id, $efront_string_name, $efront_string_protot, $efront_string_passAs, $efront_string_keywor, $efront_string_isKeyw, $efront_string_isRest, $efront_string_taints, $efront_string_has, $efront_string_throug, $efront_string_identi, $efront_string_genera5, $efront_string_genera, $efront_string_isStat, $efront_string_9, $efront_string_variab, $efront_string_sort, $efront_string_tainte, $efront_string_identi1, $efront_string_refere, $efront_string_node, $efront_string_users, $efront_string_names, $efront_string_mangle1, $efront_string_set, $efront_string_label, $efront_string_map, $efront_string_labels, $efront_string_regist1, $efront_string_type, $efront_string_Labele, $efront_string_node_s, $efront_string_push, $efront_string_duplic, $efront_string_unregi, $efront_string_get, $efront_string_delete, $efront_string_resolv1, $efront_string_unreso, $efront_string_close, $efront_string_traver, $efront_string_enter, $efront_string_Scope, $efront_string_isVari, $efront_string_BreakS, $efront_string_Contin, $efront_string_leave, $efront_string_destru, $efront_string_deepCo, $efront_string_analyz, $efront_string_direct1, $efront_string_scopes) {
    return function (escope, estraverse, esutils, utility, version, assert, Syntax, Map) {
        'use strict';
        function NameGenerator(scope, options) {
            this[$efront_string__scope] = scope, this[$efront_string__funct1] = '', !options[$efront_string_distin] && this[$efront_string__scope][$efront_string_upper] && this[$efront_string__scope][$efront_string_upper][$efront_string_functi1] && (this[$efront_string__funct1] = this[$efront_string__scope][$efront_string_upper][$efront_string_block][$efront_string_id][$efront_string_name])
        }
        function run(scope, options) {
            var i, iz, j, jz, variable, name, def, ref, generator;
            if (generator = new NameGenerator(scope, options), scope[$efront_string_isStat]())
                for (name = $efront_string_9, scope[$efront_string_variab][$efront_string_sort](function (a, b) {
                        return a[$efront_string_tainte] ? 1 : b[$efront_string_tainte] ? -1 : b[$efront_string_identi1][$efront_string_length] + b[$efront_string_refere][$efront_string_length] - (a[$efront_string_identi1][$efront_string_length] + a[$efront_string_refere][$efront_string_length])
                    }), i = 0, iz = scope[$efront_string_variab][$efront_string_length]; i < iz; ++i) {
                    if (variable = scope[$efront_string_variab][i], variable[$efront_string_tainte])
                        continue;
                    if (variable[$efront_string_identi1][$efront_string_length] === 0)
                        continue;
                    for (name = generator[$efront_string_genera5](name), j = 0, jz = variable[$efront_string_identi1][$efront_string_length]; j < jz; ++j)
                        def = variable[$efront_string_identi1][j], def[$efront_string_name] = name;
                    for (j = 0, jz = variable[$efront_string_refere][$efront_string_length]; j < jz; ++j)
                        ref = variable[$efront_string_refere][j], ref[$efront_string_identi][$efront_string_name] = name
                }
        }
        function Label(node, upper) {
            this[$efront_string_node] = node, this[$efront_string_upper] = upper, this[$efront_string_users] = [], this[$efront_string_names] = new Map, this[$efront_string_name] = null
        }
        function LabelScope(upper) {
            this[$efront_string_map] = new Map, this[$efront_string_upper] = upper, this[$efront_string_label] = null, this[$efront_string_labels] = []
        }
        function mangleLabels(tree) {
            var _a, labelScope;
            return estraverse[$efront_string_traver](tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                if (escope[$efront_string_Scope][$efront_string_isVari](node)) {
                    labelScope = new LabelScope(labelScope);
                    return
                }
                switch (node[$efront_string_type]) {
                case Syntax[$efront_string_Labele]:
                    labelScope[$efront_string_regist1](node);
                    break;
                case Syntax[$efront_string_BreakS]:
                case Syntax[$efront_string_Contin]:
                    labelScope[$efront_string_resolv1](node);
                    break
                }
            }, _a[$efront_string_leave] = function (node) {
                labelScope[$efront_string_unregi](node), escope[$efront_string_Scope][$efront_string_isVari](node) && (labelScope = labelScope[$efront_string_close]())
            }, _a)), tree
        }
        function mangle(tree, options) {
            var _a, _b, result, manager, i, iz;
            for (options == null && (_a = {}, _a[$efront_string_destru] = !0, options = _a), result = options[$efront_string_destru] == null || options[$efront_string_destru] ? tree : utility[$efront_string_deepCo](tree), manager = escope[$efront_string_analyz](result, (_b = {}, _b[$efront_string_direct1] = !0, _b)), i = 0, iz = manager[$efront_string_scopes][$efront_string_length]; i < iz; ++i)
                run(manager[$efront_string_scopes][i], options);
            return mangleLabels(result)
        }
        escope = require(476), estraverse = require(282), esutils = require(475), utility = require(279), Map = require(280), version = require(270)[$efront_string_versio], Syntax = estraverse[$efront_string_Syntax], assert = function assert(cond, message) {
            if (!cond)
                throw new Error(message)
        }, version[$efront_string_indexO]($efront_string__dev, version[$efront_string_length] - 4) === -1 && (assert = function () {
        }), NameGenerator[$efront_string_protot][$efront_string_passAs] = function passAsUnique(name) {
            var i, iz;
            if (this[$efront_string__funct1] === name)
                return !1;
            if (esutils[$efront_string_keywor][$efront_string_isKeyw](name, !0) || esutils[$efront_string_keywor][$efront_string_isRest](name))
                return !1;
            if (this[$efront_string__scope][$efront_string_taints][$efront_string_has](name))
                return !1;
            for (i = 0, iz = this[$efront_string__scope][$efront_string_throug][$efront_string_length]; i < iz; ++i)
                if (this[$efront_string__scope][$efront_string_throug][i][$efront_string_identi][$efront_string_name] === name)
                    return !1;
            return !0
        }, NameGenerator[$efront_string_protot][$efront_string_genera5] = function generateName(tip) {
            do
                tip = utility[$efront_string_genera](tip);
            while (!this[$efront_string_passAs](tip));
            return tip
        }, Label[$efront_string_protot][$efront_string_mangle1] = function () {
            var tip, current, i, iz;
            for (tip = $efront_string_9, current = this[$efront_string_upper]; current; current = current[$efront_string_upper])
                current[$efront_string_name] !== null && this[$efront_string_names][$efront_string_set](current[$efront_string_name], !0);
            do
                tip = utility[$efront_string_genera](tip);
            while (this[$efront_string_names][$efront_string_has](tip));
            for (this[$efront_string_name] = tip, current = this[$efront_string_upper]; current; current = current[$efront_string_upper])
                current[$efront_string_names][$efront_string_set](tip, !0);
            for (this[$efront_string_node][$efront_string_label][$efront_string_name] = tip, i = 0, iz = this[$efront_string_users][$efront_string_length]; i < iz; ++i)
                this[$efront_string_users][i][$efront_string_label][$efront_string_name] = tip
        }, LabelScope[$efront_string_protot][$efront_string_regist1] = function register(node) {
            var name;
            assert(node[$efront_string_type] === Syntax[$efront_string_Labele], $efront_string_node_s), this[$efront_string_label] = new Label(node, this[$efront_string_label]), this[$efront_string_labels][$efront_string_push](this[$efront_string_label]), name = node[$efront_string_label][$efront_string_name], assert(!this[$efront_string_map][$efront_string_has](name), $efront_string_duplic), this[$efront_string_map][$efront_string_set](name, this[$efront_string_label])
        }, LabelScope[$efront_string_protot][$efront_string_unregi] = function unregister(node) {
            var name, ref;
            if (node[$efront_string_type] !== Syntax[$efront_string_Labele])
                return;
            name = node[$efront_string_label][$efront_string_name], ref = this[$efront_string_map][$efront_string_get](name), this[$efront_string_map][$efront_string_delete](name), this[$efront_string_label] = ref[$efront_string_upper]
        }, LabelScope[$efront_string_protot][$efront_string_resolv1] = function resolve(node) {
            var name;
            node[$efront_string_label] && (name = node[$efront_string_label][$efront_string_name], assert(this[$efront_string_map][$efront_string_has](name), $efront_string_unreso), this[$efront_string_map][$efront_string_get](name)[$efront_string_users][$efront_string_push](node))
        }, LabelScope[$efront_string_protot][$efront_string_close] = function close() {
            var i, iz, label;
            for (this[$efront_string_labels][$efront_string_sort](function (lhs, rhs) {
                    return rhs[$efront_string_users][$efront_string_length] - lhs[$efront_string_users][$efront_string_length]
                }), i = 0, iz = this[$efront_string_labels][$efront_string_length]; i < iz; ++i)
                label = this[$efront_string_labels][i], label[$efront_string_mangle1]();
            return this[$efront_string_upper]
        }, exports[$efront_string_mangle1] = mangle, exports[$efront_string_versio] = version, exports[$efront_string_genera] = utility[$efront_string_genera]
    }()
}],
/** 712 $efront_string___dire */ "__direct",
/** 713 $efront_string_don_t_ */ /** text */ "don't create duplicate pass names",
/** 714 $efront_string_pass */ "pass",
/** 715 $efront_string_post */ "post",
/** 716 $efront_string_requir */ "require",
/** 717 $efront_string_Regist */ "Registry",
/** 718 $efront_string___defa */ "__defaultPipeline",
/** 719 $efront_string_once */ "once",
/** 720 pass.js */ [1,52,712,3,490,543,713,714,715,488,40,37,4,290,716,717,718,719,function(require, exports, $efront_string___dire, $efront_string_length, $efront_string_assert, $efront_string_passNa, $efront_string_don_t_, $efront_string_pass, $efront_string_post, $efront_string_Object2, $efront_string_has, $efront_string_get, $efront_string_split, $efront_string__1, $efront_string_requir, $efront_string_Regist, $efront_string___defa, $efront_string_once) {
    return function (_a, query, Registry, pass, post, common) {
        'use strict';
        function initialize(kind, passes) {
            var i, iz, pass;
            for (Registry[kind] = {}, i = 0, iz = passes[$efront_string_length]; i < iz; ++i)
                pass = passes[i], common[$efront_string_assert](Registry[kind][pass[$efront_string_passNa]] == null, $efront_string_don_t_), Registry[kind][pass[$efront_string_passNa]] = pass;
            common[$efront_string_assert](Registry[$efront_string___dire][pass[$efront_string_passNa]] == null, $efront_string_don_t_), Registry[$efront_string___dire][pass[$efront_string_passNa]] = pass
        }
        function passRequire(name) {
            return common[$efront_string_Object2][$efront_string_has](Registry[$efront_string___dire], name) ? Registry[$efront_string___dire][name] : query[$efront_string_get](Registry, name[$efront_string_split]($efront_string__1))
        }
        common = require(510), query = require(573), Registry = {}, Registry[$efront_string___dire] = {}, pass = [
            require(659),
            require(617),
            require(615),
            require(613),
            require(611),
            require(621),
            require(633),
            require(643),
            require(623),
            require(609),
            require(596),
            require(619),
            require(594),
            require(652),
            require(656),
            require(654),
            require(695),
            require(641),
            require(650),
            require(592),
            require(697),
            require(668),
            require(635),
            require(663)
        ], post = [
            require(580),
            require(582),
            require(587),
            require(584),
            require(590)
        ], initialize($efront_string_pass, pass), initialize($efront_string_post, post), exports[$efront_string_requir] = passRequire, exports[$efront_string_Regist] = Registry, exports[$efront_string___defa] = [
            pass,
            (_a = {}, _a[$efront_string_once] = !0, _a[$efront_string_pass] = post, _a)
        ]
    }()
}],
/** 721 $efront_string_data */ "data",
/** 722 options.js */ [1,15,488,40,489,541,589,721,36,37,542,13,function(require, module, $efront_string_Object2, $efront_string_has, $efront_string_isObje, $efront_string_destru, $efront_string_preser, $efront_string_data, $efront_string_protot, $efront_string_get, $efront_string_pathNa, $efront_string_export) {
    return function (common) {
        'use strict';
        function extend(result, update) {
            var prop, lhs, rhs;
            for (prop in update) {
                if (!common[$efront_string_Object2][$efront_string_has](update, prop))
                    continue;
                prop in result ? (lhs = result[prop], rhs = update[prop], common[$efront_string_Object2][$efront_string_isObje](rhs) && common[$efront_string_Object2][$efront_string_isObje](lhs) ? result[prop] = extend(lhs, rhs) : result[prop] = update[prop]) : result[prop] = update[prop]
            }
            return result
        }
        function Options(override) {
            var _a, defaults = (_a = {}, _a[$efront_string_destru] = !0, _a[$efront_string_preser] = !1, _a);
            if (override == null) {
                this[$efront_string_data] = defaults;
                return
            }
            this[$efront_string_data] = extend(defaults, override)
        }
        common = require(510), Options[$efront_string_protot][$efront_string_get] = function get(name, details) {
            var local;
            return details != null && common[$efront_string_Object2][$efront_string_has](details, $efront_string_pathNa) && (local = this[$efront_string_data][details[$efront_string_pathNa]], local != null && common[$efront_string_Object2][$efront_string_has](local, name)) ? local[name] : this[$efront_string_data][name]
        }, module[$efront_string_export] = Options
    }()
}],
/** 723 esshorten */ [1,function(require) {
    return require(711)
}],
/** 724 $efront_string_optimi1 */ "optimize",
/** 725 esmangle.js */ [1,55,52,180,171,84,127,86,79,80,106,107,119,167,169,126,64,75,78,128,493,85,134,198,393,57,46,39,543,199,47,3,37,541,278,579,578,718,484,109,719,714,178,708,724,function(require, Object, exports, $efront_string_Syntax, $efront_string_type, $efront_string_IfStat, $efront_string_altern, $efront_string_Labele, $efront_string_ForSta, $efront_string_ForInS, $efront_string_WhileS, $efront_string_WithSt, $efront_string_body, $efront_string_traver, $efront_string_leave, $efront_string_conseq, $efront_string_BlockS, $efront_string_Direct, $efront_string_Expres, $efront_string_expres, $efront_string_moveLo, $efront_string_Litera, $efront_string_value, $efront_string_raw, $efront_string_direct1, $efront_string_functi, $efront_string_keys, $efront_string_hasOwn, $efront_string_passNa, $efront_string_name, $efront_string_push, $efront_string_length, $efront_string_get, $efront_string_destru, $efront_string_deepCo, $efront_string_modifi, $efront_string_result, $efront_string___defa, $efront_string_Array, $efront_string_isArra, $efront_string_once, $efront_string_pass, $efront_string_versio, $efront_string_mangle1, $efront_string_optimi1) {
    return function (esshorten, common, Options, Syntax, Pass, annotateDirective) {
        'use strict';
        function recover(tree, useDirectiveStatement) {
            function trailingIf(node) {
                while (!0) {
                    switch (node[$efront_string_type]) {
                    case Syntax[$efront_string_IfStat]:
                        if (!node[$efront_string_altern])
                            return !0;
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
                    return !1
                }
            }
            var _a;
            return common[$efront_string_traver](tree, (_a = {}, _a[$efront_string_leave] = function leave(node) {
                var _a, _b;
                node[$efront_string_type] === Syntax[$efront_string_IfStat] && node[$efront_string_altern] && node[$efront_string_conseq][$efront_string_type] !== Syntax[$efront_string_BlockS] && trailingIf(node[$efront_string_conseq]) && (_a = {}, _a[$efront_string_type] = Syntax[$efront_string_BlockS], _a[$efront_string_body] = [node[$efront_string_conseq]], node[$efront_string_conseq] = _a), !useDirectiveStatement && node[$efront_string_type] === Syntax[$efront_string_Direct] && (node[$efront_string_type] = Syntax[$efront_string_Expres], node[$efront_string_expres] = common[$efront_string_moveLo](node, (_b = {}, _b[$efront_string_type] = Syntax[$efront_string_Litera], _b[$efront_string_value] = node[$efront_string_value], _b[$efront_string_raw] = node[$efront_string_raw], _b)), delete node[$efront_string_direct1], delete node[$efront_string_value], delete node[$efront_string_raw])
            }, _a)), tree
        }
        function iteration(tree, p, options) {
            function addPass(pass) {
                var name;
                typeof pass !== $efront_string_functi && (name = Object[$efront_string_keys](pass)[0], pass = pass[name]), pass[$efront_string_hasOwn]($efront_string_passNa) ? name = pass[$efront_string_passNa] : name = pass[$efront_string_name], passes[$efront_string_push](pass), statuses[$efront_string_push](!0)
            }
            function fillStatuses(bool) {
                var i, iz;
                for (i = 0, iz = statuses[$efront_string_length]; i < iz; ++i)
                    statuses[i] = bool
            }
            var i, iz, pass, res, changed, statuses, passes, result;
            for (result = options[$efront_string_get]($efront_string_destru) ? tree : common[$efront_string_deepCo](tree), statuses = [], passes = [], i = 0, iz = p[$efront_string_length]; i < iz; ++i)
                addPass(p[i]);
            do
                for (changed = !1, i = 0, iz = passes[$efront_string_length]; i < iz; ++i)
                    pass = passes[i], statuses[i] && (res = pass(result, options), res[$efront_string_modifi] ? (changed = !0, fillStatuses(!0)) : statuses[i] = !1, result = res[$efront_string_result]);
            while (changed);
            return result
        }
        function optimize(tree, pipeline, options) {
            var _a, i, iz, j, jz, section, pass;
            for (tree = annotateDirective(tree, new Options((_a = {}, _a[$efront_string_destru] = !1, _a))), null == pipeline && (pipeline = Pass[$efront_string___defa]), options = new Options(options), i = 0, iz = pipeline[$efront_string_length]; i < iz; ++i)
                if (section = pipeline[i], common[$efront_string_Array][$efront_string_isArra](section))
                    tree = iteration(tree, section, options);
                else if (section[$efront_string_once])
                    for (pass = section[$efront_string_pass], j = 0, jz = pass[$efront_string_length]; j < jz; ++j)
                        tree = pass[j](tree, options)[$efront_string_result];
            return recover(tree, options[$efront_string_get]($efront_string_direct1))
        }
        esshorten = require(723), common = require(510), Options = require(722), Pass = require(720), annotateDirective = require(544), Syntax = common[$efront_string_Syntax], exports[$efront_string_versio] = require(340)[$efront_string_versio], exports[$efront_string_mangle1] = esshorten[$efront_string_mangle1], exports[$efront_string_optimi1] = optimize, exports[$efront_string_pass] = Pass
    }()
}],
/** 726 "e" */ "e",
/** 727 "d" */ "d",
/** 728 "o" */ "o",
/** 729 "C" */ "C",
/** 730 "r" */ "r",
/** 731 "a" */ "a",
/** 732 "h" */ "h",
/** 733 "m" */ "m",
/** 734 "f" */ "f",
/** 735 "t" */ "t",
/** 736 "A" */ "A",
/** 737 "c" */ "c"],function (a, c,s) {
        var 
    w=s[10],x=s[8],
    n=s[1],
    e=s[7],
    v=s[6],
    o=s[4],
    z=s[9],
    q=s[3],
    B=s[12],
    m=s[2],
    y=s[5],
    M=15,
    E=52,
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[11]],
        h=s[M-1][0],
        j=s[16],
        $=[s[725],s[726],s[727],s[728],s[729],s[730],s[731],s[728],s[732],s[727],s[729],s[733]],
        _=[s[734],s[735],s[725],s[726],s[727],s[728],s[729],s[730],s[731],s[736]][v]()[w](''),T = this,R;
        if (!(a instanceof s[53])){
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
    },[this.window||global])[724]()
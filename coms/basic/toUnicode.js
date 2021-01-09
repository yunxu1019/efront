var toUnicode = function (data) {
    return data.replace(/[\u0100-\uffff]/g,
        m => "\\u" + (m.charCodeAt(0) > 0x1000 ?
            m.charCodeAt(0).toString(16) : 0 + m.charCodeAt(0).toString(16)
        )
    );
};
module.exports = toUnicode;
function krc_stringify(krc_rows) {
    var extra = krc_rows.extra;
    var e = Object.keys(extra).map(k => {
        if (k === 'id') return;
        if (k === 'hash') return;
        var a = extra[k];
        if (!isHandled(a)) return;
        if (typeof a === 'object') return;
        return `[${k}:${a}]`;
    }).filter(a => !!a).join('\r\n');
    var a = krc_rows.map(r => {
        var w = r.words.map(w => `<${w.timeBegin},${w.timeLength}>${w.label}`).join('');
        return `[${r.startTime},${r.schedule}]${w}`;
    }).join('\r\n');
    return e + "\r\n\r\n" + a;
}
var checkIndex = function (html) {
    var poweredByComment;
    var isZimoliDetected = false;
    html = String(html)
        .replace(/^\s*(<!doctype[^>]*?>\s*)?\<\!\-\-([\s\S]*?)\-\-\!?>\s*/i, function (_, doctype, message) {
            // `${doctype}<!--${message}\r\n${efrontReloadVersionAttribute}-->`
            poweredByComment = _;
            return "";
        })
        .replace(/<\!\-\-([\s\S]*?)\-\-\!?>\s*/g, (_, a) => {
            if (/^\s*\[[\s\S]*\]\s*$/.test(a)) return _;
            return '';
        })
        .replace(/<script\b[\s\S]*?<\/script>(\s*)/ig, function (script, s) {
            if (/(["'`])(?:PURGE|POST)\1\s*,\s*(['`"])comm\/main\2/i.test(script)) {
                isZimoliDetected = true;
                return "";
            }
            if (/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i.test(script)) {
                isZimoliDetected = true;
            }
            if (/\b((delete|ignore)oncompile|efrontworker)\b/i.test(script)) {
                return "";
            }
            return script;
        });
    return [html, isZimoliDetected, poweredByComment];
}
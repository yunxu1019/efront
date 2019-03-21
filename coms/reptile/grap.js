function grap(match, text, format) {
    var regtext = match instanceof RegExp ? match.source : `[^"\`']*` + match.replace(/[\\\.\/\?\+\-\*\^\[\]\{\}\(\)\:\<\>\=]/g, "\\$&");
    var reg = new RegExp(regtext, 'ig');
    var result = [];
    var match = reg.exec(text);
    while (match) {
        result.push(format instanceof Function ? format.apply(null, match) : match[0]);
        match = reg.exec(text);
    }
    return result;
}
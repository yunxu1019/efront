// -----///////// -1 ----------////////////2---3-----/////// --4------2//////5------6-----////////-7--5///8--9----//10--11---10///--12-----8//
var reg = /^([^\/\:@\?#]+\:)?(?:\/\/)?(?:(([^\/@\:]+)?(?:\:([^\/@\:]+))?)@)?(([^\/\:\?\#]+)?(?:\:(\d+))?)(([^\?#]+)?(\?([^#]*))?(#[\s\S]*)?)$/;
function parseURL(url) {
    var [__, protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash] = reg.exec(url);
    return { protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash, href: __ };
}
module.exports = parseURL;
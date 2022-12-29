// 下图来自 https://nodejs.org/dist/latest-v16.x/docs/api/url.html#urlobjectauth
// ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                              href                                              │
// ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │          host          │           path            │ hash  │
// │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │    hostname     │ port │ pathname │     search     │       │
// │          │  │                     │                 │      │          ├─┬──────────────┤       │
// │          │  │                     │                 │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘

// -------/// ---------------1---------------------------------///////////////////2-----3--------//////// ------4----2/////5---------------------------------------------------6------------------------------------------------------------------------------------//////////////-7--5///8-------9----------//10--11---10/8/--12----////
var reg = /^([^\:\/\\\?#\[]+\:(?![^\:\/\\\?\#]*@|[\/\\][^\/\\]))?(?:\/\/|\\\\)?(?:(([^\:\/\\\?#]+)?(?:\:([^\/\\\?#]+))?)@)?(([^\/\\@\?\#\.]*?[^\/\\@\:\?\#\.\d][^\/\\@\:\?\#\.]*?|[^\/\\@\:\?\#\.]+(?:\:[^\@\/\\\?#\.]*[^\d\@\:\/\\\?#\.]+|(?:\.[^\/\\@\:\?\#\.]+)+))?(?:(?:\:|^)(\d+))?)(((?:\/|\\|^)[^\?#]*)?(\?([^#]*))?)(#[\s\S]*)?$/;
var hrefDescriptor = {
    get() {
        var href = '';
        if (this.protocol) href += this.protocol;
        if (this.auth) href += "//" + this.auth + "@" + this.host;
        else if (this.host) href += "//" + this.host;
        if (this.path) href += this.path;
        if (this.hash) href += this.hash;
        return href;
    },
    set(href) {
        Object.assign(this, parseURL(href));
    }
};
function parse(url) {
    if (url === undefined || url === null) url = '';
    var [__, protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash] = reg.exec(url);
    return { protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash };
}
function parseURL(url) {
    var obj = parse(url);
    Object.defineProperty(obj, "href", hrefDescriptor);
    return obj;
}
module.exports = parseURL;
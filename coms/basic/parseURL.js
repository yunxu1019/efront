// 下图来自 https://nodejs.org/dist/latest-v16.x/docs/api/html#urlobjectauth
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
class URL {
    resolve(url) {
        var u = new URL;
        Object.assign(u, this);
        u.locate(url);
        return u;
    }
    locate(url) {
        if (url === undefined || url === null) url = '';
        var [__, protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash] = reg.exec(url);
        if (protocol) {
            this.protocol = protocol;
        }
        if (host) {
            this.auth = auth;
            this.username = username;
            this.password = password;
            this.host = host;
            this.hostname = hostname;
            this.port = port;
            this.path = path;
            this.pathname = pathname;
            this.search = search;
            this.query = query;
            this.hash = hash;
        }
        else if (pathname) {
            this.path = path;
            this.pathname = pathname;
            this.search = search;
            this.query = query;
            this.hash = hash;
        }
        else if (search) {
            this.search = search;
            this.path = (this.pathname || '') + search;
            this.query = query;
            this.hash = hash;
        }
        else if (hash) {
            this.hash = hash;
        }
        this.href = this.toString();
        return this;
    }
    toString() {
        var href = '';
        if (this.protocol) href += this.protocol;
        if (this.auth) href += "//" + this.auth + "@" + this.host;
        else if (this.host) href += "//" + this.host;
        if (this.path) href += this.path;
        if (this.hash) href += this.hash;
        return href;
    }
}
// function parse(url) {
//     if (url === undefined || url === null) url = '';
//     var [__, protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash] = reg.exec(url);
//     return { protocol, auth, username, password, host, hostname, port, path, pathname, search, query, hash };
// }
function parseURL(url) {
    var obj = new URL;
    obj.locate(url);
    return obj;
}
// mdn说__proto__这玩意在deno上不支持，吓我一跳，2023-01-04亲测支持， 2023-07-27已不支持
module.exports = parseURL;
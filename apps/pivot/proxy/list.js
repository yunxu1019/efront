var fields = refilm`
*代理路径/url input/20
真实路径/realpath url/2000
动作/action select/200 [跳转,转发]
/ $ ${[{
        name: "访问",
        do(o) {
            var url = o.url;
            if (!/^\//.test(url)) url = "/" + url;
            window.open(url, null);
        }
    }]}`;
return plist.bind(null, '短链接', "proxy", fields, "/proxy/edit");

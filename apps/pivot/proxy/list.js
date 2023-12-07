var actions = [
    {
        name: "访问",
        do(o) {
            var url = o.url;
            if (!/\//.test(url)) url = "//" + url;
            window.open(url, null);
        }
    }
];

var fields = refilm`
*代理路径/url input/120
&二维码/url ${qrcode}
真实路径/realpath input/300
动作/action select/100 [跳转,转发]
状态/status select/100 [启用,禁用]
/ $ ${actions}`;
return plist.bind(null, '短链接', "proxy", fields, "/proxy/edit");

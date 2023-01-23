var getBrowserTypeFromUserAgent = function () {
    // 世界之窗
    // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36 TheWorld 7
    if (/TheWorld/.test(navigator.userAgent)) return "sjzc,世界之窗";
    // 火狐浏览器
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0 
    if (/Firefox/.test(navigator.userAgent)) return 'ffox,Firefox';
    // Edge
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.56
    if (/Edg[e\/]/.test(navigator.userAgent)) return 'edge,Edge';
    // ie8
    // Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0) 
    if (/MSIE/.test(navigator.userAgent)) return 'msie,Internet Explorer';
    // Opera
    // Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.15
    if (/Presto/.test(navigator.userAgent)) return 'prst,Opera';
    // QQ浏览器
    // Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko Core/1.94.172.400 QQBrowser/11.1.5140.400 
    if (/QQBrowser/.test(navigator.userAgent)) return 'qqbr,QQ浏览器';
    if (/QQ/.test(navigator.userAgent)) return 'qqqq,QQ';
    // 搜狗浏览器
    // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0
    if (/MetaSr/.test(navigator.userAgent)) return 'mtsr,搜狗浏览器';
    // 微信
    // Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63080029)
    // Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN
    if (/MicroMessenger/.test(navigator.userAgent)) return 'mmsg,微信';
    // 支付宝
    // Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20B82 Ariver/1.1.0 AliApp(AP/10.2.86.6000) Nebula WK RVKType(1) AlipayDefined(nt:WIFI,ws:375|748|3.0) AlipayClient/10.2.86.6000 Language/zh-Hans Region/CN NebulaX/1.0.0
    if (/Alipay/.test(navigator.userAgent)) return 'alpy,支付宝';
    // 猎豹浏览器
    // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36
    // 遨游浏览器
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36
    // 360 安全浏览器
    // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
    // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36
    var chrome = /Chrome\/([\d]+)/.exec(navigator.userAgent);
    if (chrome) return +chrome[1] < 108 ? "360s,套壳浏览器" : "chrm,Chrome";
    // Safari
    // Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
    if (/Safari/.test(navigator.userAgent)) return 'sfri,Safari';
    return ["ayou,浏览器1", 'lbbr,浏览器2'][Math.random() * 2 | 0];
};
var [type, typeName] = getBrowserTypeFromUserAgent().split(",");
return {
    name: '',
    type,
    typeName,
    id: '',
    toString() {
        return `${this.name} (${this.id})`
    }
}
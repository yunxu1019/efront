var o = [],
    subscribeMsgService = {
        current: null,
        changeFlag: 0,
        init: function (e) {
            this.changeFlag = Date.now(),
                this.add(e)
        },
        getSubscribeMsgs: function () {
            return o
        },
        add: function (e) {
            e.length > 0 && (this.changeFlag = Date.now());
            for (var t = 0, n = e.length; t < n; t++) {
                var r = e[t];
                r.HeadImgUrl = r.HeadImgUrl = utilFactory.getContactHeadImgUrl({
                    UserName: r.UserName,
                    Skey: accountFactory.getSkey()
                });
                for (var c = r.MPArticleList, s = 0; s < c.length; s++) {
                    var l = c[s];
                    l.AppName = r.NickName,
                        /dev\.web\.weixin/.test(location.href) || (l.Url = l.Url.replace(/^http:\/\//, "https://"))
                }
                o.push(r)
            }
        }
    };
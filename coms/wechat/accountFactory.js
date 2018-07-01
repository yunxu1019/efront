var Sid, Skey, Passticket, userInfo = {},
    SyncKey = null,
    s = null,
    HigherVer = {
        type: "",
        ver: ""
    },
    d = "" === utilFactory.getCookie("MM_WX_NOTIFY_STATE") ? confFactory.MM_NOTIFY_OPEN : utilFactory.getCookie("MM_WX_NOTIFY_STATE"),
    f = "" === utilFactory.getCookie("MM_WX_SOUND_STATE") ? confFactory.MM_SOUND_OPEN : utilFactory.getCookie("MM_WX_SOUND_STATE"),
    LoginTime = 0,
    MsgCount = 0,
    RConvCount = 0,
    SMsgCount = 0,
    SConvCount = 0,
    accountFactory = {
        openNotify: function () {
            d = confFactory.MM_NOTIFY_OPEN,
                utilFactory.setCookie("MM_WX_NOTIFY_STATE", confFactory.MM_NOTIFY_OPEN)
        },
        closeNotify: function () {
            d = confFactory.MM_NOTIFY_CLOSE,
                utilFactory.setCookie("MM_WX_NOTIFY_STATE", confFactory.MM_NOTIFY_CLOSE)
        },
        isNotifyOpen: function () {
            return !!d
        },
        openSound: function () {
            f = confFactory.MM_SOUND_OPEN,
                utilFactory.setCookie("MM_WX_SOUND_STATE", confFactory.MM_SOUND_OPEN)
        },
        closeSound: function () {
            f = confFactory.MM_SOUND_CLOSE,
                utilFactory.setCookie("MM_WX_SOUND_STATE", confFactory.MM_SOUND_CLOSE)
        },
        isSoundOpen: function () {
            return !!f
        },
        setUserInfo: function (e) {
            extend(userInfo, e)
        },
        updateUserInfo: function (e, a) {
            var n = this;
            if (e && e.BitFlag == confFactory.PROFILE_BITFLAG_CHANGE) {
                var i = {};
                e.HeadImgUpdateFlag && (i.HeadImgUrl = e.HeadImgUrl),
                    e.NickName.Buff && (i.NickName = e.NickName.Buff),
                    n.setUserInfo(i),
                    a && a()
            }
        },
        getUserInfo: function () {
            return userInfo
        },
        getUserName: function () {
            return this.getUserInfo() && this.getUserInfo().UserName
        },
        getSyncKey: function () {
            return SyncKey || {
                List: []
            }
        },
        getFormateSyncCheckKey: function () {
            for (var e = s || this.getSyncKey(), t = e.List, a = [], n = 0, i = t.length; n < i; n++)
                a.push(t[n].Key + "_" + t[n].Val);
            return a.join("|")
        },
        setSyncCheckKey: function (e) {
            e && e.Count > 0 ? s = e : utilFactory.log("JS Function: setSyncCheckKey. Error. no synccheckkey")
        },
        setLoginTime: function (e) {
            LoginTime = e
        },
        getLoginTime: function () {
            return LoginTime
        },
        setRMsgCount: function (e) {
            MsgCount = e
        },
        getRMsgCount: function () {
            return MsgCount
        },
        setRConvCount: function (e) {
            RConvCount = e
        },
        getRConvCount: function () {
            return RConvCount
        },
        setSMsgCount: function (e) {
            SMsgCount = e
        },
        getSMsgCount: function () {
            return SMsgCount
        },
        setSConvCount: function (e) {
            SConvCount = e
        },
        getSConvCount: function () {
            return SConvCount
        },
        setSyncKey: function (e) {
            e && e.Count > 0 ? SyncKey = e : utilFactory.log("JS Function: setSyncKey. Error. no synckey")
        },
        setPassticket: function (e) {
            Passticket = e
        },
        getPassticket: function () {
            return Passticket
        },
        getSid: function () {
            return Sid || (Sid = utilFactory.getCookie("wxsid"))
        },
        setSid: function (e) {
            e && (Sid = e)
        },
        getSkey: function () {
            return Skey || ""
        },
        setSkey: function (e) {
            e && (Skey = e)
        },
        setUin: function (e) {
            this.getUserInfo().Uin = e
        },
        getUin: function () {
            return this.getUserInfo() && this.getUserInfo().Uin || utilFactory.getCookie("wxuin")
        },
        getBaseRequest: function () {
            return {
                BaseRequest: {
                    Uin: this.getUin(),
                    Sid: this.getSid(),
                    Skey: this.getSkey(),
                    DeviceID: this.getDeviceID()
                }
            }
        },
        getDeviceID: function () {
            return "e" + ("" + Math.random().toFixed(15)).substring(2, 17)
        },
        isHigherVer: function () {
            return HigherVer.ver >= 4.5
        },
        setClientVer: function (e) {
            var t = parseInt(e, 10).toString(16),
                a = t.substr(0, 1),
                t = t.substr(1, 3).replace("0", ".");
            HigherVer.type = a,
                HigherVer.ver = t
        }
    };
d == confFactory.MM_NOTIFY_OPEN ? accountFactory.openNotify() : accountFactory.closeNotify();
f == confFactory.MM_SOUND_OPEN ? accountFactory.openSound() : accountFactory.closeSound();
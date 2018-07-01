function a() {
    return l || (l = QMActivex.create(c))
}

function n() {
    return d || (d = QMActivex.create(s))
}

function i() {
    return a() && a().IsClipBoardImage
}

function o() {
    return !(!a() || !i()) && a().SaveClipBoardBmpToFile(1)
}

function r(a, i) {
    var r = n();
    r.StopUpload(),
        r.ClearHeaders(),
        r.ClearFormItems(),
        r && (r.URL = (MMDEV ? "http://wx.qq.com" : "http://" + location.hostname) + confFactory.API_webwxpreview + "?fun=upload",
            r.AddHeader("Cookie", document.cookie),
            r.AddFormItem("msgimgrequest", 0, 0, a),
            r.AddFormItem("filename", 1, 4, o()),
            r.OnEvent = function (e, a) {
                switch (a) {
                    case 2:
                        break;
                    case 3:
                        r && (i(JSON.parse(r.Response)),
                            r = null);
                        break;
                    case 1:
                        reportService.report(reportService.ReportType.uploaderError, {
                                text: "screensnap upload error",
                                url: r.URL
                            }),
                            i({}),
                            r = null
                }
            },
            r.StartUpload())
}
var c = "screencapture",
    s = "uploader",
    l = null,
    d = null;
var screenShotFactory = {
    isSupport: function () {
        return window.QMActivex && QMActivex.isSupport(c) > 0
    },
    install: function () {
        window.open(QMActivex.installUrl.replace(/^https/, "http"))
    },
    capture: function (e) {
        var t = a();
        t && (t.OnCaptureFinished = e.ok),
            t.OnCaptureCanceled = function () {},
            t.DoCapture()
    },
    isClipBoardImage: function () {
        return i()
    },
    upload: function (e, t) {
        if (i())
            return r(e, t), !0
    }
}
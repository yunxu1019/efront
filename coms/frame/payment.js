var paytype = data.getInstance("paytype");
function main(paytypes, price, subject = '网站扫码支付') {
    var page = view();
    page.innerHTML = payment;
    renderWithDefaults(page, {
        get paytype() {
            return paytype.value || '0';
        },
        set paytype(value) {
            data.patchInstance("paytype", { value }, true);
        },

        get waycost() {
            var pay = this.paytypes[this.paytype - 1];
            if (!pay) return 0;
            var cost = pay.cost;
            if (isFunction(cost)) cost = cost.call(pay, price);
            return BigNumber.fix(cost, 2);
        },
        get paysite() {
            var pay = this.paytypes[this.paytype - 1];
            if (!pay) return 'about:blank';
            var url = pay.url;
            if (isFunction(url)) url = url.call(pay, this.finalpay, subject);
            else if (url) url += encode62.timeencode(this.finalpay + "," + subject);
            return url;
        },
        get finalpay() {
            return BigNumber.fix(BigNumber.add(this.price, this.waycost), 2);
        },
        paytypes,
        price,
        closeView() {
            remove(page);
        },
    });
    drag.on(page.firstChild, page);
    resize.on(page);
    var frame = page.querySelector("iframe");
    var tradeid;
    bind("message")(frame, function (e) {
        if (tradeid === e.data && !queryres) cast(page, 'payment', tradeid), queryres = tradeid;
        else tradeid = e.data, queryres = null;
    });
    var queryurl, queryres;
    data.bindInstance("paytype", function ({ value }) {
        var type = paytypes[value - 1];
        queryurl = type && type.query;
    });
    var query = lazy(async function () {
        if (!tradeid || queryres) return;
        if (isFunction(queryurl)) var res = await queryurl(tradeid);
        else if (isString(queryurl)) var res = await cross('get', queryurl + encode62.timeencode(tradeid)), res = JSAM.parse(res.response || res.responseText);
        if (queryres) return;
        if (res) queryres = res, cast(page, 'payment', res._id);
    }, -200);
    on('load')(frame, query);
    on('remove')(frame, query);
    return page;
}
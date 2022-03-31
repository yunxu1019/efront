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
    data.bindInstance("paytype", function (type) {
        console.log(type)
    });
    var frame = page.querySelector("iframe");
    bind("message")(frame, function (e) {
        var id = e.data;
        cast(page, 'payment', id);
    });
    return page;
}
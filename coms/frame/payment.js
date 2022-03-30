var paytype = data.getInstance("paytype");
function main(paytypes, price) {
    var page = view();
    page.innerHTML = payment;
    renderWithDefaults(page, {
        get paytype() {
            return paytype.value;
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
            if (isFunction(url)) url = url.call(pay, this.finalpay);
            else if (url) url += this.finalpay;
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
    on("mounted")(frame, function () {
        frame.contentWindow.onmessage = function (e) {
            var id = e.data;
            cast(page, 'payment', id);
        };
    });
    return page;
}
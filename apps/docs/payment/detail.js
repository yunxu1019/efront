var _div = createElement(div);
// 应付：第一次绑定发票
// 预付：最后一次绑定发票、前几次手动选择应付款时间
// TP商：无采购单
// 总仓：有采购单
var details = {
    采购单号: "采购单号",
    含税总金额: "含税总金额",
    发票: "发票号码、发票类型、开票日期、应付款时间fp",
};
var paytypes = {
    zcyi: `供应商类型、|、供应商、${details.采购单号}、支付类型、|、${details.发票}、${details.含税总金额}、付款金额、备注`,//总仓应付
    zcyu: `供应商类型、|、供应商、${details.采购单号}、支付类型、|、应付款时间、${details.含税总金额}、付款金额、备注`,//总仓预付
    tpyi: `供应商类型、|、供应商、支付类型、|、${details.发票}、付款金额、备注`,//TP商应付
    tpyu: `供应商类型、|、供应商、支付类型、|、应付款时间、付款金额、备注`,//TP商预付
    tpyu2: `供应商类型、|、供应商、支付类型、|、已付款列表、增加预付、${details.发票}、备注`,//TP商预付绑定发票
    zcyu2: `供应商类型、|、供应商、${details.采购单号}、支付类型、|、已付款列表、增加预付、${details.发票}、${details.含税总金额}、付款金额、备注`,//总仓预付绑定发票
    zcyu22: `供应商类型、|、供应商、${details.采购单号}、支付类型、|、已付款列表、应付款时间、付款金额、${details.含税总金额}、备注`//总仓预付增加预付
};
var inputbox = {
    radio(name, isReadonly) {
        var keys = name.split(":");
        var options = name[1].split(",");
        var dataname = name[0];
        return `<div class="form-control">` + options.map(function (value) {
            return `<input value="${value}" name="${dataname}" ${isReadonly ? "disabled" : ""}/>`;
        }).join("") + `</div>`;
    },
    select(name, isReadonly) {
        return `<select class="form-control" name="${name}" ${isReadonly ? "disabled" : ""}><option>请选择</option></select>`;
    },
    textarea(name, isReadonly) {
        return `<textarea class="form-control" name="${name}" ${isReadonly ? "disabled" : ""} ></textarea>`;
    },
    input(name, isReadonly) {
        return `<input class="form-control" name=${name} ${isReadonly ? "disabled" : ""}/>`;
    },
    date(name, isReadonly) {
        return `<input class="date_time" name=${name} ${isReadonly ? "disabled" : ""}/>${isReadonly ? "" : "<i></i><i></i>"}`;
    }
};

var inputmap = {
    供应商类型: inputbox.radio,
    支付类型: inputbox.radio,
    发票类型: inputbox.radio,
    供应商: inputbox.select,
    发票号码: inputbox.select,
    应付款时间: inputbox.date,
    开票日期: inputbox.date,
    备注: inputbox.textarea
};
var namemap = {
    供应商类型: "supplierType:0,1",
    供应商: "supplierId",
    采购单号: "parentBillId",
    支付类型: "payment:0,1",
    发票类型: "invoiceType:0,1",
    发票号码: "invoiceCode",
    开票日期: "invoiceData",
    应付款时间fp: "invoicePaymentTime",
    应付款时间: "paymentTime",
    付款金额: "paymentPay",
    备注: "remark"
}
var bindchange = function (element, paytype) {
    [].map.call(element.getElementsByTagName("supplierType"), function (input) {
        input.onchange = function () {
            if (this.checked) {
                var type = paytype.replace(/^(zc|tp)/, ["zc", "tp"][this.value]);
                refresh(paytype);
            }
        };
    });
    [].map.call(element.getElementsByTagName("payment"), function (input) {
        input.onchange = function () {
            if (this.checked) {
                var type = paytype.replace(/y[iu](.*?)$/, ["yi$1", "yu$1"][this.value]);
                refresh(paytype);
            }
        };
    });
    [].map.call(element.getElementsByClassName("payment"), function (input) {
        input.onclick = function () {
            refresh(paytype.slice(0, 2) + "yu22");
        };
    });

};
var createElements = function (paytype, isReadonly) {
    var inputs = paytypes[paytype].split("、").map(function (label, cx, array) {
        if (label === "|") return `<div class="clearfix"></div>`;
        if (label === "已付款列表") return `<div payment-paid></div>`;
        if (label === "增加预付") return isReadonly ? "" : `<div class="btn">增加预付</div>`;
        var input = inputmap[label] || inputmap.input;
        var name = namemap[label];
        return `<div class="form-group"><div class="input-group"><div class="input-group-addon">${label.replace(/\w+/g, "")}</div>${input(name, isReadonly)}</div></div>`;
    }).join("");
    var form = createElement(div);
    form.innerHTML = inputs;
    return form;
};

function detail() {
    return _div;
}
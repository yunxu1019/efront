<script serverside>
    var error_codes = `ACQ.SYSTEM_ERROR	接口返回错误	请立即调用查询订单API，查询当前订单的状态，并根据订单状态决定下一步的操作
ACQ.INVALID_PARAMETER	参数无效	检查请求参数，修改后重新发起请求
ACQ.ACCESS_FORBIDDEN	无权限使用接口	联系支付宝小二签约
ACQ.EXIST_FORBIDDEN_WORD	订单信息中包含违禁词	修改订单信息后，重新发起请求
ACQ.PARTNER_ERROR	应用APP_ID填写错误	联系支付宝小二，确认APP_ID的状态
ACQ.TOTAL_FEE_EXCEED	订单总金额超过限额	修改订单金额再发起请求
ACQ.CONTEXT_INCONSISTENT	交易信息被篡改	更换商家订单号后，重新发起请求
ACQ.TRADE_HAS_SUCCESS	交易已被支付	确认该笔交易信息是否为当前买家的，如果是则认为交易付款成功，如果不是则更换商家订单号后，重新发起请求
ACQ.TRADE_HAS_CLOSE	交易已经关闭	更换商家订单号后，重新发起请求
ACQ.BUYER_SELLER_EQUAL	买卖家不能相同	更换买家重新付款
ACQ.TRADE_BUYER_NOT_MATCH	交易买家不匹配	更换商家订单号后，重新发起请求
ACQ.BUYER_ENABLE_STATUS_FORBID	买家状态非法	用户联系支付宝小二，确认买家状态为什么非法
ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIMIT_ERROR	买家付款日限额超限	更换买家进行支付
ACQ.BEYOND_PAY_RESTRICTION	商户收款额度超限	联系支付宝小二提高限额
ACQ.BEYOND_PER_RECEIPT_RESTRICTION	商户收款金额超过月限额	联系支付宝小二提高限额
ACQ.BUYER_PAYMENT_AMOUNT_MONTH_LIMIT_ERROR	买家付款月额度超限	让买家更换账号后，重新付款或者更换其它付款方式
ACQ.SELLER_BEEN_BLOCKED	商家账号被冻结	联系支付宝小二，解冻账号
ACQ.ERROR_BUYER_CERTIFY_LEVEL_LIMIT	买家未通过人行认证	让用户联系支付宝小二并更换其它付款方式
ACQ.INVALID_STORE_ID	商户门店编号无效	检查传入的门店编号是否符合规则
ACQ.APPLY_PC_MERCHANT_CODE_ERROR	申请二维码失败	请确认同样的订单号不能重复多次申请二维码，如有问题请联系支付宝小二处理
ACQ.SECONDARY_MERCHANT_STATUS_ERROR	商户状态异常	请联系对应的服务商咨询
ACQ.BEYOND_PER_RECEIPT_DAY_RESTRICTION	订单金额超过当日累计限额	联系支付宝小二提高限额（联系电话：95188）
ACQ.BEYOND_PER_RECEIPT_SINGLE_RESTRICTION	订单金额超过单笔限额	联系支付宝小二提高限额（联系电话：95188）
ACQ.TRADE_SETTLE_ERROR	交易结算异常	请检查传入的结算项信息是否正确，如果正确请联系支付宝小二
ACQ.SECONDARY_MERCHANT_ID_INVALID	二级商户不存在	请检查传入的二级商户编号是否正确
ACQ.SECONDARY_MERCHANT_ISV_PUNISH_INDIRECT	商户状态异常	请联系对应的服务商咨询
ACQ.SELLER_NOT_EXIST	卖家不存在	确认卖家信息是否传递正确
ACQ.SECONDARY_MERCHANT_ALIPAY_ACCOUNT_INVALID	二级商户账户异常	确认传入的二级商户结算账户是否与进件时设置的结算账户一致，如果一致可联系支付宝小二确认是否商户的账号信息有变更
ACQ.INVALID_RECEIVE_ACCOUNT	收款账户不支持	确认seller_id信息是否传递正确，如正确请确认seller_id是否在签约中设置了收款权限
ACQ.SECONDARY_MERCHANT_ID_BLANK	二级商户编号错误	请检查是否正确传入二级商户编号
ACQ.NOW_TIME_AFTER_EXPIRE_TIME_ERROR	当前时间已超过允许支付的时间	请检查传入的支付超时时间是否正确
ACQ.SECONDARY_MERCHANT_NOT_MATCH	二级商户信息不匹配	请检查传入的二级商户编号是否正确
ACQ.BUYER_NOT_EXIST	买家不存在	确认买家账号信息传递是否正确，如果正确可联系支付宝小二，确认买家账号是否已经注销
ACQ.SUB_GOODS_SIZE_MAX_COUNT	子商品明细超长	请检查子商品明细是否超过了150条
ACQ.DEFAULT_SETTLE_RULE_NOT_EXIST	默认结算条款不存在	请确认二级商户进件是已经设置了默认结算账户
ACQ.MERCHANT_PERM_RECEIPT_SUSPEND_LIMIT	商户暂停收款	联系支付宝小二处理（联系电话：95188）
ACQ.MERCHANT_PERM_RECEIPT_SINGLE_LIMIT	超过单笔收款限额	联系支付宝小二处理（联系电话：95188）
ACQ.MERCHANT_PERM_RECEIPT_DAY_LIMIT	超过单日累计收款额度	联系支付宝小二处理（联系电话：95188）`.split(/[\r\n]+/).map(s => {
        var [code, error, info] = s.split('\t');
        return { code, error, info };
    });
    function createId() {
        var d = new Date();
        var id = "00000000" + String(+d % 86400000 ^ (process.pid & 0xfff) << 12 ^ process.pid >> 12);
        id = id.slice(-8);
        return [d.getFullYear(), d.getMonth() + 1, d.getDate(), id].map(pad).join('');
    }
    function pad(a) {
        if (a < 10) return "0" + a;
        return a;
    }
    var amount = request.id;
    if (!/^(\d+)(\.\d+)?$/.test(amount)) amount = encode62.timedecode(request.id);
    var [amount, subject = '网页扫码支付'] = amount.split(',');
    var trade_no = createId();
    if (!+amount) return forbidden("参数异常");
    var biz_content = {
        out_trade_no: "alipay-" + trade_no,
        product_code: 'FAST_INSTANT_TRADE_PAY',
        total_amount: amount,
        qr_pay_mode: 4,
        qrcode_width: 256,
        subject: subject,
        body: subject,
    };
    var params = {
        method: "alipay.trade.page.pay",
        app_id: "2021002143612677",
        sign_type: "RSA2",
        version: "1.0",
        charset: "utf-8",
        return_url: `${req.protocol}//${req.headers[":authority"] || req.headers.host}${req.url.replace(/[\.\:][\s\S]*$/, '')}-callback`,
        biz_content: JSON.stringify(biz_content)
    };
    params.notify_url = params.return_url;
    await _runtask("alipay-sign", params);

    var log = await _runtask("couchdb", "put", "alipay-log/" + biz_content.out_trade_no, {
        _id: biz_content.out_trade_no,
        total_amount: biz_content.total_amount,
        qr_pay_mode: biz_content.qr_pay_mode,
        qrcode_width: biz_content.qrcode_width,
        subject: biz_content.subject,
        body: biz_content.body,
        timestamp: params.timestamp,
        create_time: new Date().toISOString(),
        return_url: biz_content.return_url
    });
    context.id = biz_content.out_trade_no;
    context.location = "https://openapi.alipay.com/gateway.do?" + serialize(params);
</script>
<script>
    parent.postMessage(<%JSON.stringify(context.id)%>);
    location.href = <%JSON.stringify(context.location)%>;
</script>
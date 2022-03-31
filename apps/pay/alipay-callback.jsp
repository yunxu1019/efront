<script serverside>
    // ?charset=utf-8&out_trade_no=alipay-2021120305080870&method=alipay.trade.page.pay.return&total_amount=1.01&sign=egtaa%2BmHp4JDDJL%2FeUc0Cw3E6WIJVBJL%2BWwRo2ntz824dxHY4xK0LTLgE2Pqoq8nqgBntZfLMgHvGjEq7GII0dlbX45JSe7eucgnhvyXXdQClkQLfAD0vGDEBcHylk6LkDumMwBqR12VX%2F%2FBCOlPdXx1fxzImZRwz6N72k6lmViPgrYdD17O%2Bhkg2fsN4kvMHPreIicChEfkNGtYCXZJm8iCYn3MyT4EMh0Yy2ppoW8yLHJ%2Bp4iVtJLkGCiAhYxij1eu5BveFk9aeyhEqDmAv0UoushtB6ZE2t%2BiXPvunnvM8cWUiXIJ6NRf87OLjkDSzdhkc5VTRVgPwv3KjGhSYw%3D%3D&trade_no=2021120322001426351454501632&auth_app_id=2021002143612677&version=1.0&app_id=2021002143612677&sign_type=RSA2&seller_id=2088702544831143&timestamp=2021-12-03+10%3A31%3A57
    var query = parseURL(req.url).query;
    var params = await _runtask("alipay-verify", query);
    var id = params.out_trade_no;

    var data = await _runtask("couchdb", "get", `alipay-log/${id}`);
    await _runtask("couchdb", "put", `alipay-log/${id}?_rev=${data._rev}`, extend(data, {
        alipay_trade_no: params.trade_no,
        seller_id: params.seller_id,
        return_amount: params.total_amount,
        return_time: new Date().toISOString(),
    }));
    context.id = params.out_trade_no;
</script>
<script>
    var id =<% JSON.stringify(context.id || null) %>;
    if (id) parent.postMessage(id);
</script>
<script serverside>
    if(context.id)return `<body style="color:green">支付完成</body>`;
    else return `<body style="color:red">支付失败</body>`
</script>

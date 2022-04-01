<script serverside>
    var time = Date.now();
    var out_trade_no = encode62.timedecode(request.id);
    var payed = /^(TRADE_FINISHED|TRADE_SUCCESS)$/i;
    for (var cx = 0, dx = 10; cx < dx; cx++) {
        if (Date.now() - time > 30000) return;
        var data = await _runtask("couchdb", 'get', `alipay-log/${out_trade_no}`);
        if (data.return_time || data.notify_time || payed.test(data.trade_status)) return JSON.stringify(data);
        var data1 = await _runtask("alipay-query", out_trade_no);
        if (payed.test(data1.trade_status)) {
            return JSON.stringify(Object.assign(data, { trade_status: data1.trade_status }));
        }
        await new Promise(ok => setTimeout(ok, 300));
    }
</script>
var pay = frame$payment([
    {
        url: './alipay:',
        query: './alipay-query:',
        name: '支付宝',
        icon: 'alipay.ico',
        cost(price) {
            return BigNumber.prd((0.6036218 + 0.204081632) / 100, price);
        },
    }
], 0.01, '支付宝支付测试');
popup(pay, true);
console.log(pay)
care(pay, 'payment', function (a) {
    remove(pay);
    document.write("支付完成:" + a);
});
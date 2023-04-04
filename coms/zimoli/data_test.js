function data_test1() {
    var array = [{
        name: "李时珍",
        birthday: "1518-7-3"
    }, {
        name: "周杰伦",
        birthday: "1979-1-18"
    }, {
        name: "张韶涵",
        birthday: "1982-1-19"
    }, {
        name: "詹天佑",
        birthday: "1861-4-26"
    }];
    var encoded = data.encodeStructure(array);
    var decoded = data.decodeStructure(encoded);
    console.log(array, encoded, decoded);
    return button(`sourcelength${JSON.stringify(array).length};encodedlength${JSON.stringify(encoded).length}`);
}

function data_test2() {
    data.setConfig({
        'http://baidu.com/ a=`1&b=c': {
            'baidu': 'get .'
        }
    });
    data.setSource({
        c: 2
    });
    data.from('baidu');
}
function main() {
    data_test1();
    data_test2();
}
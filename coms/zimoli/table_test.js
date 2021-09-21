function table_test() {
    var data = new Array(100).fill(0).map(function () {
        return {
            name: random(random$name),
            tel: random(random$phone)
        };
    });
    var datatable = table();
    datatable.innerHTML = `<thead><tr><td colspan=2><span>1</span></td><td rowspan=2><span>th1</span></td><td>th3</td><td>th4</td></tr><tr><td>th3</td><td>th4</td></tr></thead><tbody><tr><td rowspan=2>td1</td><td>td2</td><td>td3</td><td>td4</td></tr><tr><td rowspan=2>td1</td><td>td2</td></tr></tbody>`;
    console.log(datatable);
    return datatable;
}
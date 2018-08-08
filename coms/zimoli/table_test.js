function table_test() {
    var data = new Array(100).fill(0).map(function () {
        return {
            name: random(random$name),
            tel: random(random$phone)
        };
    });
    var datatable = table();
    console.log(datatable);
    return datatable;
}
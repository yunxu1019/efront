global.promise = new Promise(function (ok, oh) {
    require("fs").readFile(__filename, function (error, buffer) {
        if (error) return oh(error);
        else ok(buffer);
    });
}).then(function (result) {
    console.log(result);
    require("../../coms/efront/commbuilder")(result, "", __filename, []);
}).catch(function (result) {
    console.log(result);
});
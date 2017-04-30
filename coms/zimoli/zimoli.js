/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
isString("");
//用于模块化的函数，用以构造依赖注入的对象
function zimoli(object) {
    //只有把runtime绑定到对像才可以使用
    if (typeof this === 'undefined')return;
    var that = this;
    var parentname = "_parent";
    //父对象//因为以"_"开头的对象不被导出，父对象不会被覆盖
    var get = function (key) {
        var keys = key.replace(/[A-Z]+/g, function (match) {
            return "/" + match.toLowerCase();
        }).split('/');
        var key0 = keys[0];
        var tmp = that;
        while (tmp && tmp[key0] === undefined) {
            tmp = tmp[parentname];
        }
        if (!tmp) {
            throw "No Object Named " + key0 + " Found.";
        }
        keys.forEach(function (key) {
            tmp = tmp[key];
            if (!tmp) {
                throw "No Key Named " + key + " Found.";
            }
        });
        return tmp;
    };
}

var page = div();
var getdata = function () {
    var sandbox = div();
    work_logs = work_logs.replace(/\<([\w\:]+)([^>]*)\/\>/g, "<$1$2></$1>");
    sandbox.innerHTML = work_logs;
    var worksheets = [].slice.call(sandbox.getElementsByTagName("worksheet"));
    var datas = worksheets.map(function (worksheet) {
        var rows = worksheet.getElementsByTagName("row");
        var [title, desc, label, ...logs] = [].map.call(rows, r => r.innerText);
        var date = worksheet.getAttribute("ss:name");
        return {
            date,
            title,
            desc,
            title,
            label,
            logs
        };
    });
    return datas;
};
go("/sliders/welcome", null, page);
modules.data = getdata();
function main() {
    return page;
}
var page = createVboxWithState(state);
var xx_count = 0, yj_count = 0, jj_count = 0, yh_count = 0;
var xx_data = [], yj_data = [], jj_data = [], yh_data = [];
var xx_time = 0, yj_time = 0, jj_time = 0, yh_time = 0;
var px_count = 0, px_data = [], px_time = 0;
var zj_count = 0, zj_data = [], zj_time = 0;
var ysh_count = 0, ysh_data = [], ysh_time = 0;
var yd_count = 0, yd_data = [], yd_time = 0;
var cc_count = 0, cc_data = [], cc_time = 0;
var md_count = 0, md_data = [], md_time = 0;
var zc_count = 0, zc_data = [], zc_time = 0;
var fc_count = 0, fc_data = [], fc_time = 0;
var jk_count = 0, jk_data = [], jk_time = 0;
var nm_count = 0, nm_data = [], nm_time = 0;
var btns = data.map(function (data) {
    data.logs.map(function (log) {
        var is_mark = false;
        if (/学习/.test(log)) {
            is_mark = true;
            xx_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            xx_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            xx_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/研究/.test(log)) {
            is_mark = true;
            yj_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            yj_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            yj_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/修复|bug|问题|解决/.test(log)) {
            is_mark = true;
            jj_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            jj_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            jj_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/优化|体验|调整/.test(log)) {
            is_mark = true;
            yh_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            yh_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            yh_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/培训/.test(log)) {
            is_mark = true;
            px_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            px_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            px_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/组件|公共/.test(log)) {
            is_mark = true;
            zj_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            zj_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            zj_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/优生活/.test(log)) {
            is_mark = true;
            ysh_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            ysh_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            ysh_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/邮豆/.test(log)) {
            is_mark = true;
            yd_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            yd_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            yd_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/车仓/.test(log)) {
            is_mark = true;
            cc_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            cc_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            cc_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/门店/.test(log)) {
            is_mark = true;
            md_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            md_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            md_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/总仓/.test(log)) {
            is_mark = true;
            zc_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            zc_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            zc_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/分仓/.test(log)) {
            is_mark = true;
            fc_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            fc_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            fc_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (/接口/.test(log)) {
            is_mark = true;
            jk_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            jk_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            jk_data.push(data.date + `${a1}:${a2}-${b1}:${b2}`);
        }
        if (!is_mark) {
            nm_count++;
            var [, a1, a2, b1, b2] = /(\d+):(\d+)\s*-+\s*(\d+):(\d+)/.exec(log);
            nm_time += (b1 - a1) * 60 + (b2 - a2);
            console.log(a1, a2, b1, b2);
            nm_data.push(data.date + log.replace(/\s*(\d+):(\d+)\s*-+\s*(\d+):(\d+)\s*/,`${a1}:${a2}-${b1}:${b2}\t`));

        }
    })
    return "<div>" + data.date + "</div><div>" + data.logs.join("<br/>") + "</div>";
});
// console.log(xx_count, xx_time, yj_count, yj_time, jj_count, jj_time, yh_count, yh_time);
// console.log(px_count, px_time, zj_count, zj_time, yh_count, ysh_time, yd_count, yd_time);
// console.log(cc_count, cc_time, md_count, md_time);
console.log(nm_time, nm_count, nm_data);
console.log(zc_count, zc_time, fc_count, fc_time, jk_count, jk_time);
page.innerHTML = btns.join("<br/>").replace(/学习/g, "<b style=color:white;background-color:red;>$&</b>");
css(page, "position:absolute;left:0;right:0;top:0;bottom:0;");
function main() {
    document.title = title;
    return page;
}
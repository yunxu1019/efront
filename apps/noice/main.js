var avg = function (list) {
    var sum = 0, dp = 1;
    for (var cx = 0, dx = list.length; cx < dx; cx++) {
        var p = Math.sin(cx / dx * Math.PI);
        p = p * p;
        sum += list[cx] * p;
        dp += p;
    }
    return sum / dp;
};
class Ndb {
    constructor(now, ndb) {
        this.now = now;
        this.ndb = ndb;
    }
    valueOf() {
        return this.ndb;
    }
}
function init() {
    var recoder = audio.getRecorder();
    recoder.init("f");
    var _block = document.createElement("noice");
    _block.innerHTML = template;
    render(_block, recoder);
    var canvas = _block.querySelector("canvas");
    canvas.width = +innerWidth;
    canvas.height = +innerHeight;
    var context = canvas.getContext("2d");
    var date = new Date;
    var noice = 0;
    var noiceList, noiceCache;
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);  //创建渐变对象  渐变开始点和渐变结束点
    gradient.addColorStop(0, '#f096'); //添加颜色点 
    gradient.addColorStop(0.7, '#ff06'); //添加颜色点 
    gradient.addColorStop(0.9, '#0cc3'); //添加颜色点 
    gradient.addColorStop(1, '#0cc0'); //添加颜色点 
    var gradient1 = context.createLinearGradient(0, 0, 0, canvas.height);  //创建渐变对象  渐变开始点和渐变结束点
    gradient1.addColorStop(0, '#f09'); //添加颜色点 
    gradient1.addColorStop(0.7, '#f90'); //添加颜色点 
    gradient1.addColorStop(.9, '#0cc6'); //添加颜色点 
    gradient1.addColorStop(1, '#0cc0'); //添加颜色点 
    recoder.noice = "0dB";
    recoder.onprocess = function (buffer) {
        if (!noiceList) noiceList = new Array(buffer.length), noiceCache = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(0, canvas.offsetHeight / 2);
        var maxdb = -1;
        var mindb = 1;
        var now = new Date;
        var dt = now - date;
        var sch = 1000;
        date = now;
        var dx = canvas.width / buffer.length;
        Array.prototype.forEach.call(buffer, function (db, cx) {
            if (db > maxdb) maxdb = db;
            if (db < mindb) mindb = db;
            context.lineTo(cx * dx, canvas.height / 2 - db / 4 * canvas.height);
        });
        context.strokeStyle = "#000";
        context.stroke();
        if (dt > sch) return;
        var ndb = 20 * Math.log10((maxdb - mindb) * 2 ** 16);
        if (noiceCache.length && now - noiceCache[0].now > 400) noiceCache.shift();
        noiceCache.push(new Ndb(now, ndb));
        noice = avg(noiceCache);
        if (+noice) recoder.noice = noice.toFixed() + "dB";
        context.beginPath();
        noiceList.shift();
        noiceList.push(new Ndb(now, noice));
        var start = false;
        noiceList.forEach(function (db, cx) {
            if (!start) {
                start = true;
                context.moveTo(cx * dx, canvas.height);
                return;
            }
            context.lineTo(cx * dx, canvas.height - db / 100 * canvas.height);
        });
        context.lineTo(canvas.width, canvas.height);
        context.fillStyle = gradient;
        context.strokeStyle = gradient1;
        context.stroke();
        context.fill();
        render.refresh();
    };
    onmounted(_block, function () {
        _block.$scope.start();
    })
    return _block;

}
function main() {
    return init();
}
var _outterbox = document.createElement("div");
css(_outterbox, "border-radius:2px;box-shadow:0 1px 24px -3px rgba(0,0,0,0.18);width:312px;height:210px;background-color:#fff;");
var _slider = document.createElement("div");
css(_slider, "float:left;width:33.3333%;");
var _line = document.createElement("div");
css(_line, "height:46px;line-height:46px;text-align:center;");
var _innerbox = document.createElement("div");
css(_innerbox, "margin:0;");
var lineHeight = "ontouchstart" in window ? 46 : 36;
var createLine = function (startSlice, endSlice) {
    var result = [];
    for (var cx = startSlice, dx = endSlice; cx < dx; cx++) {
        var line = _line.cloneNode();
        text(line, cx);
        result.push(line);
    }
    return result;
}
function createBox(from, to) {
    var slider = _slider.cloneNode();
    slider.Height = function () {
        return Math.abs(from - to + 1) * lineHeight;
    };
    var top = 0;
    var lineCount = 9;
    var addEmpty = 2;
    var current_lines = [];

    slider.Top = function (y) {
        if (isNumber(y) && y !== top) {
            top = y;
            var deltay = parseInt(y / 2 / lineHeight) << 1;
            var $LineStart = 1 + deltay;
            var marginTop = -y + deltay * lineHeight;
            var startSlice = deltay - addEmpty < 0 ? 0 : deltay - addEmpty;
            var endSlice = deltay + lineCount;
            var _from = from + startSlice;
            var _to = from + endSlice;
            if (_from < from) {
                _from = from;
            }
            if (_to > to) {
                _to = to;
            }
            remove(current_lines);
            current_lines = createLine(_from, _to);
            appendChild(item_box, current_lines);
            slider.scrollTop = -marginTop;
        }
        return top;
    }
    var item_box = _innerbox.cloneNode();
    appendChild(slider, item_box);
    vbox(slider);
    return slider;
}
function dateslider(from_date, to_date) {
    var outterbox = _outterbox.cloneNode();
    var now = new Date;
    var currentYear = now.getFullYear();
    var currentMonth = now.getMonth() + 1;
    var currentDate = now.getDate();
    var 年 = createBox(currentYear - 0x7fffff, currentYear + 0x7fffff);
    setTimeout(function () {
        年.Top(0x7fffff * lineHeight);
    }, 1000);
    var 月 = createBox();
    var 日 = createBox();
    appendChild(outterbox, 年, 月, 日);
    return outterbox;
}
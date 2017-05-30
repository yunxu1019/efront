var image = createElement(img);
css(image, "position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;");
var container = createElement(div);
css(container, "position:relative;width:100%;height:");
function getNodes(srcs) {
    return srcs.map(function (src) {
        var element;
        if (isString(src)) {
            element = createElement(image);
            element.src = image;
        } else if (isFunction(src)) {
            element = src();
        } else {
            element = src;
        }
        return element;
    });
}

    var read = function (srcs,length,index) {
        var src = srcs; //源数据或者数据工厂
        if (isArray(src)) {
            src = function (index) {
                var length = src.length || 1;
                index = index % (length);
                if (index < 0) {
                    index = index + length;
                }
                return src[index];
            };
        }
        if (Rabbit.is_function(src)) {
            var result = [];
            for (var cx = index, dx = index + length; cx < dx; cx++) {
                result.push(src(cx));
            }
        }
        return result;
    };
function slider(srcs) {
    var box = createElement(container);
    var sliders =getNodes(srcs);
    var singleHeight = parseInt(scope.singleHeight) || 24;
    var free = parseInt(scope.free) || 2;

    function reshape() {
        var start_top, top = scope.point.y; //内页向上滑动到了那一点
        start_top = top % singleHeight; //内页中在可视范围内的最高点
        var past_count = -Math.round((top - start_top) / singleHeight); //内面顶部已被隐藏了多少个点
        var src_to_show = read(past_count, (free << 1) + 1); //哪些数据要被展示
        //绘制
        var html = '';
        for (var cx = 0, dx = src_to_show.length; cx < dx; cx++) {
            var t = start_top + singleHeight * cx;
            var r = ratio(t - singleHeight * free, singleHeight, cx - free);
            html += '<div style="' +
                    ';top:' + (t) + 'px' +
                    ';opacity:' + (1 - Math.abs(r)) +
                    ';transform:' + 'rotateX(' + r * 60 + 'deg) scale(' + ((r < 0.1 && r > -0.1) ? 1 : 0.9) + ')' +
                    ';font-weight:' + ((r < 0.1 && r > -0.1) ? 900 : 100) + '">' + src_to_show[cx] + '</div>';
        }
        ele[0].innerHTML = html;
    }


    function ratio(p1, AC, p2) {
        //   |----*----|----*----|----*----|----*----|----*--.-|----*----|----*----|----*----|----*----|
        //	 A         C         p2                          -p1                                       B
        // 如上图，AB为可滑动范围,AC为单位长，p1为滑动点，p2为要取值的点
        var r1 = (p2 + p1 / AC) / ((free << 1) + 1); //支持free级
        //返回结果在-1,1之间
        if (r1 < -1) {
            r1 = -1;
        } else if (r1 > 1) {
            r1 = 1;
        }
        return r1;
    }

    function park() {
        //停止后的动作
        scope.point.y = Math.round(scope.point.y / singleHeight) * singleHeight;
        reshape();
    }

    var bind = function (ele, src) {
        var getPoint = function (event) {
            var p = event['touches'] ? event['touches'][0] : event;
            return p ? {
                x: p.clientX,
                y: p.clientY
            } : {};
        };
        ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'].forEach(function (value, index) {
            var method = [src.start, src.move, src.end][index % 3];
            if (angular.isFunction(method)) {
                ele.addEventListener(value, function (event) {
                    event.preventDefault();
                    if (index == 1) { //鼠标动作
                        if (event.which == 1) {
                            method(getPoint(event));
                        }
                    } else {
                        method(getPoint(event));
                    }
                }, true);
            }
        });
    };

    scope.point = {
        x: 0,
        y: 0
    };
    var start;
    bind(ele[0], {
        'start': function (point) {
            var p = scope.point;
            start = {
                x: p.x - point.x,
                y: p.y - point.y
            };
        },
        'move': function (point) {
            scope.point.x = start.x + point.x;
            scope.point.y = start.y + point.y;
            reshape();
        },
        'end': function () {
            park();
        }
    });
    scope.$watch('src', function () {
        park();
    }, true);
}
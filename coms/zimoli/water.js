class WaterRipple {
    /**
     * @type {HTMLCanvasElement}
     */
    canvas = null;
    src = ""
    dropRadius = 3  // 波源半径大小
    delay = 1
    attenuation = 5
    maxAmplitude = 1024  // 最大振幅
    sourceAmplitude = 512 // 震源振幅
    autoDisturb = true;
    animateId = 0;
    intervalId = 0;
    loadId = 0;
    ripple_map = [];
    last_map = [];
    destroy() {
        this.stop();
    }
    stop() {
        cancelAnimationFrame(this.animateId);
        clearInterval(this.intervalId);
        this.loadId = 0;
    }
    async init() {
        var canvas = this.canvas;
        var width = canvas.width,
            height = canvas.height,
            amplitude_size = width * (height + 2) * 2;
        this.old_index = width;
        this.new_index = width * (height + 3);
        var ripple_map = this.ripple_map = new Array(amplitude_size);
        var last_map = this.last_map = this.ripple_map.slice();
        var ctx = canvas.getContext('2d');
        ctx.fillRect(0,0,width,height);
        var image = new Image();
        image.src = this.src;
        var loadId = ++this.loadId;
        await awaitable(image);
        if (loadId !== this.loadId) return false;
        ctx.drawImage(image, 0, 0);
        this.texture = ctx.getImageData(0, 0, width, height);
        this.ripple = ctx.getImageData(0, 0, width, height);
        for (var i = 0; i < amplitude_size; i++) {
            ripple_map[i] = last_map[i] = 0;
        }
    }
    start() {
        var that = this;
        if (that.autoDisturb) {
            that.intervalId = setInterval(function () {
                if (!that.canvas || !that.canvas.parentNode) return that.stop();
                var { width, height } = that.canvas;
                that.disturb(Math.random() * width, Math.random() * height);
            }, that.delay * 1000);
        }
        // 动画主循环
        var animate = async function () {
            var { ripple, canvas } = that;
            if (!canvas) return;
            if (!ripple || ripple.width !== canvas.width || ripple.height !== canvas.height) {
                if (await that.init() === false) return;
            }
            that.renderRipple();
            that.animateId = requestAnimationFrame(animate);
        };
        animate();
    }
    // 在指定地点产生波源
    disturb(circleX, circleY) {
        // 将值向下取整
        circleX |= 0;
        circleY |= 0;
        var dropRadius = this.dropRadius,
            sourceAmplitude = this.sourceAmplitude,
            width = this.canvas.width,
            old_index = width,
            ripple_map = this.ripple_map;
        var maxDistanceX = circleX + dropRadius,
            maxDistanceY = circleY + dropRadius;
        for (var y = circleY - dropRadius; y < maxDistanceY; y++) {
            for (var x = circleX - dropRadius; x < maxDistanceX; x++) {
                ripple_map[old_index + y * width + x] += sourceAmplitude;
            }
        }
    }
    // 渲染下一帧
    renderRipple() {
        var temp = this.old_index,
            deviation_x,  // x水平方向偏移
            deviation_y,  // y竖直方向偏移
            pixel_deviation, // 偏移后的ImageData对象像素索引
            pixel_source;  // 原始ImageData对象像素索引

        // 交互索引 old_index, new_index
        this.old_index = this.new_index;
        this.new_index = temp;
        // console.log(this.old_index,this.new_index)
        var i = 0;
        // 设置像素索引和振幅索引
        this.map_index = this.old_index;

        var _map_index = this.map_index,
            _width = this.canvas.width,
            _height = this.canvas.height,
            _half_width = _width >> 1,
            _half_height = _height >> 1,
            _ripple_map = this.ripple_map,
            _last_map = this.last_map,
            _ripple_data = this.ripple.data,  // 引用修改
            _texture_data = this.texture.data, // 引用修改
            _new_index = this.new_index,
            _attenuation = this.attenuation,
            _maxAmplitude = this.maxAmplitude;


        // 渲染所有像素点
        for (var y = 0; y < _height; y++) {
            for (var x = 0; x < _width; x++) {
                var x_boundary = 0, judge = _map_index % _width;
                if (judge == 0) {
                    x_boundary = 1; // 左边边界
                } else if (judge == _width - 1) {
                    x_boundary = 2; // 右边边界
                }
                var top = _ripple_map[_map_index - _width],// 上边的相邻点
                    bottom = _ripple_map[_map_index + _width],// 下边的相邻点
                    left = x_boundary != 1 ? _ripple_map[_map_index - 1] : 0,// 左边的相邻点
                    right = x_boundary != 2 ? _ripple_map[_map_index + 1] : 0;// 右边的相邻点
                // 计算当前像素点下一时刻的振幅
                var amplitude = (top + bottom + left + right) >> 1;
                amplitude -= _ripple_map[_new_index + i];
                amplitude -= amplitude >> _attenuation;  // 计算衰减

                // 更新振幅数组
                _ripple_map[_new_index + i] = amplitude;

                amplitude = _maxAmplitude - amplitude;
                var old_amplitude = _last_map[i];
                _last_map[i] = amplitude;

                if (old_amplitude != amplitude) {
                    deviation_x = (((x - _half_width) * amplitude / _maxAmplitude) << 0) + _half_width;
                    deviation_y = (((y - _half_height) * amplitude / _maxAmplitude) << 0) + _half_height;

                    // 检查边界
                    if (deviation_x > _width) {
                        deviation_x = _width - 1;
                    }
                    if (deviation_x < 0) {
                        deviation_x = 0;
                    }
                    if (deviation_y > _height) {
                        deviation_y = _height - 1;
                    }
                    if (deviation_y < 0) {
                        deviation_y = 0;
                    }

                    pixel_source = i * 4;
                    pixel_deviation = (deviation_x + (deviation_y * _width)) * 4;

                    // 移动像素的RGBA信息
                    _ripple_data[pixel_source] = _texture_data[pixel_deviation];
                    _ripple_data[pixel_source + 1] = _texture_data[pixel_deviation + 1];
                    _ripple_data[pixel_source + 2] = _texture_data[pixel_deviation + 2];
                    //                        ripple.data[pixel_source + 3] = texture.data[pixel_deviation + 3];
                }
                ++i;
                ++_map_index;
            }
        }

        this.map_index = _map_index;
        this.canvas.getContext('2d').putImageData(this.ripple, 0, 0);
    }
    calculAmplitude(index, old_amplitude) {
        var attenuation = this.attenuation,  // 衰减级别
            map_index = this.map_index,
            ripple_map = this.ripple_map,
            width = this.canvas.width;

        var x_boundary = 0, judge = map_index % width;
        if (judge == 0) {
            x_boundary = 1; // 左边边界
        } else if (judge == width - 1) {
            x_boundary = 2; // 右边边界
        }
        var top = ripple_map[index - width],// 上边的相邻点
            bottom = ripple_map[index + width],// 下边的相邻点
            left = x_boundary != 1 ? ripple_map[index - 1] : 0,// 左边的相邻点
            right = x_boundary != 2 ? ripple_map[index + 1] : 0;// 右边的相邻点
        // 计算当前像素点下一时刻的振幅
        var amplitude = top + bottom + left + right;
        amplitude >>= 1;
        amplitude -= old_amplitude;
        amplitude -= amplitude >> attenuation;  // 计算衰减
        return amplitude;
    }

    constructor(element, settings) {
        // 合并设置
        if (isElement(element) && /^canvas$/i.test(element.tagName)) this.canvas = element;
        extendIfOccurs(this, settings);
    }
}
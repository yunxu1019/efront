
var coordIn = move.coordIn;
var _createImage = function (url, callback, iscurrent) {
    var imgpic;
    if (url instanceof Image) {
        imgpic = new Image;
        imgpic.src = url.src;
    }
    else if (typeof url === 'object' && /^canvas$/i.test(url.tagName)) {
        imgpic = url;
        imgpic.complete = true;
    }
    else {
        imgpic = document.createElement('img');
        imgpic.src = url;
    }
    var onload = function () {
        imgpic.onload = null;
        callback(imgpic);
    };
    if (imgpic.complete) {
        onload.call(imgpic);
    } else {
        imgpic.onload = onload;
        if (iscurrent) imgpic.onerror = () => alert("打开失败！");
    }
    return imgpic;
};
var create = function (url, key, report_error) {
    if (!url) return;

    var image = picture_();
    image.url = url;
    var rotate = url.rotate | 0;
    if (广告 && !广告.parentNode) appendChild(image, 广告);
    if (isObject(url)) {
        if (key) {
            url = seek(url, key);
        }
    }
    var p = this;
    if (report_error) p.current = image;
    var createImage = p.createImage || _createImage;

    image.shape = function (x, y, scaled, rotate) {
        var style = get_style(x, y, scaled, rotate);
        if (p.mirror) addClass(image, 'mirror');
        else removeClass(image, 'mirror');
        css(imgpic, style);
        if (imgpic && !p.buzy) dispatch(p, 'scaled');
    };
    image.close = function () {
        if (!p.touchclose) return false;
        remove(p);
    };
    image.park = function (x, y, scaled, rotate) {
    };
    var init = function () {
        if (!imgpic) return;
        if (!image.clientHeight || !image.clientWidth) {
            image.width = imgpic.width;
            image.height = imgpic.height;
            return;
        }
        if (p.current === image) {
            p.width = image.width;
            p.height = image.height;
        }
        image.init();
    };
    var imgpic;
    image.setImage = function (_imgpic) {
        _imgpic.rotate = rotate;
        if (!isElement(_imgpic)) _imgpic = this;
        if (imgpic) {
            [].forEach.call(imgpic.attributes, a => {
                var { name, value } = a;
                if (/width|height/i.test(name)) return;
                _imgpic.setAttribute(name, value);
            })
            remove(imgpic);
            appendChild(image, _imgpic);
            imgpic = _imgpic;
        }
        else {
            imgpic = _imgpic;
            _imgpic.setAttribute('imgpic', '');
            _imgpic.draggable = false;
            image.width = _imgpic.width;
            image.height = _imgpic.height;
            appendChild(image, _imgpic);
            init();
        }
    };

    createImage(url, image.setImage, report_error);


    var get_style = function (x, y, scaled, rotate) {
        var width = image.width * scaled;
        var height = image.height * scaled;
        var [left, top, marginLeft, marginTop] = coordIn([image.clientWidth, image.clientHeight], [x, y, width, height]);
        return {
            imageRendering: scaled >= 3 / devicePixelRatio ? "pixelated" : "",
            width: fromOffset(width),
            height: fromOffset(height),
            left,
            top,
            marginLeft,
            transform: `rotate(${rotate}deg)`,
            marginTop
        };
    }
    image.rotateTo(rotate);
    return image;
};


var 广告 = document.createElement(/Trident/i.test(navigator.userAgent) ? "Welcome" : "欢迎使用白前看图");
addClass(广告, 'adv');
广告.innerHTML = `欢迎使用白前看图 `;
var alink = anchor2('http://efront.cc/baiplay', 'http://efront.cc/baiplay');
alink.target = "_blank";
appendChild(广告, alink);
function picture() {
    var to = 0, key, url;
    var images = {};
    var cacheLength = 8;
    var gen = function (index, ratio) {
        if (index >= urls.length || index < 0) return null;
        if (images[index] && images[index].url !== urls[index]) {
            delete images[index];
        }
        if (!images[index]) {
            images[index] = create.call(p, urls[index], key, p.index === index);
        }
        if (!images[index + 1] && index + 1 < urls.length) {
            images[index + 1] = create.call(p, urls[index + 1], key, p.index === index);
        }
        if (index >= cacheLength) delete images[index - cacheLength];
        if (index + cacheLength < urls.length) {
            delete images[index + cacheLength];
        }
        var img = images[index]
        if (ratio > .75 && img) {
            p.width = img.width;
            p.height = img.height;
            p.current = img;
        }
        return images[index];
    };
    var urls = [], element;
    for (var a of arguments) {
        if (a instanceof Array) {
            urls.push.apply(urls, a);
        }
        else if (isElement(a)) {
            if (/^(img|canvas)$/i.test(a.tagName)) {
                urls.push(a);
            }
            else {
                if (!element) element = a;
            }
        }
        else if (typeof a === 'string') {
            if (!url) url = a, urls.push(a);
            else if (key) urls.push(key), key = a;
            else key = a;
        }
        else if (typeof a === 'number') {
            if (key) urls.push(key), key = null;
            to = a;
        }
    }
    if (element) {
        var p = slider(element, gen);
        care(p, function (e) {
            urls = [].concat(e);
            p.src = gen;
            p.go(p.index || 0, false);
        });
        on("changes")(p, function ({ changes }) {
            if (changes.index) {
                p.go(p.index, false);
            }
        });
    } else {
        var urls = [].concat(url);
        var p = slider(gen, element, false);
    }
    if (isFinite(to)) p.go(to);
    p.getScale = function () {
        if (p.current) return p.current.getScale();
        return 1;
    };
    p.initialStyle = 'backdrop-filter:blur(0);opacity:0;';
    p.update = function () {
        var current = p.current;
        if (!current) return;
        p.buzy = true;
        current.update(false);
        p.buzy = false;
    };
    p.setShape = function (shape) {
        var current = p.current;
        setTimeout(current);
        if (!current) return;
        p.buzy = true;
        current.setShape(shape);
        p.buzy = false;
    };
    p.scaleBy = function (ratio) {
        var current = p.current;
        if (!current) return;
        p.buzy = true;
        current.scaleBy(ratio);
        p.buzy = false;
    };
    p.reshape = function () {
        var current = p.current;
        if (!current) return;
        p.buzy = true;
        var shape = current.getShape();
        current.setShape(shape);
        p.buzy = false;
    };
    p.rotateTo = function (deg) {
        var img = p.current;
        if (!img) return;
        img.rotateTo(deg);
        return deg;
    };

    p.rotateBy = function (deg) {
        var img = p.current;
        if (!img) return;
        img.rotateBy(deg);
        return img.rotate;
    };
    return p;
}
picture.closeAdv = function (params) {
    广告 = null;
};
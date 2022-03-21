
var coordIn = move.coordIn;
var _createImage = function (url, callback) {
    var imgpic;
    if (url instanceof Image) {
        imgpic = new Image;
        imgpic.src = url.src;
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
    }
    return imgpic;
};
var create = function (url, key) {
    if (!url) return;

    var image = picture_();
    image.url = url;
    if (广告 && !广告.parentNode) appendChild(image, 广告);
    if (isObject(url)) {
        if (key) {
            url = seek(url, key);
        }
    }
    var p = this;
    var createImage = p.createImage || _createImage;

    image.shape = function (x, y, scaled, rotate) {
        var style = get_style(x, y, scaled, rotate);
        css(imgpic, style);
        if (imgpic) dispatch(p, 'scaled');
    };
    image.close = function () {
        if (!p.touchclose) return false;
        remove(p);
    };
    image.park = function (x, y, scaled, rotate) {
        var style = get_style(x, y, scaled, rotate);
        var a = transition(imgpic, style, true);
        setTimeout(function () {
            // set_unlock();
            // image.locked = false;
        }, a || 0);

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

    createImage(url, image.setImage);


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
    return image;
};


var 广告 = document.createElement(/Trident/i.test(navigator.userAgent) ? "Welcome" : "欢迎使用白前看图");
addClass(广告, 'adv');
广告.innerHTML = `欢迎使用白前看图 `;
var alink = anchor2('http://efront.cc/baiplay', 'http://efront.cc/baiplay');
alink.target = "_blank";
appendChild(广告, alink);
function picture(url, to = 0, key) {

    var images = {};
    var gen = function (index, ratio) {
        if (index >= urls.length || index < 0) return null;
        if (images[index] && images[index].url !== urls[index]) {
            delete images[index];
        }
        if (!images[index]) {
            images[index] = create.call(p, urls[index], key);
        }
        if (!images[index + 1] && index + 1 < urls.length) {
            images[index + 1] = create.call(p, urls[index + 1], key);
        }
        if (index >= 5) delete images[index - 5];
        if (index + 5 < urls.length) {
            delete images[index + 5];
        }
        var img = images[index]
        if (ratio > .75 && img) {
            p.width = img.width;
            p.height = img.height;
            p.current = img;
        }
        return images[index];
    };
    if (isElement(url)) {
        var urls = [];
        var p = slider(url);
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
        var p = slider(gen, false);
    }
    p.go(to);
    p.getScale = function () {
        if (p.current) return p.current.getScale();
        return 1;
    };
    p.initialStyle = 'backdrop-filter:blur(0);opacity:0;';
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
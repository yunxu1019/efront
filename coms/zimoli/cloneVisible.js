var cloneProperties = "fontSize,fontFamily,color,textShadow,opacity,writingMode,blockSize,wordSpacing,letterSpacing,whiteSpace".split(",");
var cloneProperties2 = "position,margin,color,verticalAlign,textAlign,textShadow,opacity,boxShadow,overflow,writingMode,blockSize,wordSpacing,letterSpacing,textIndent,lineHeight,display,appearance,webkitAppearance,MozAppearance".split(",");
var pushProperty = function (key, props) {
    props.split(",").forEach(k => {
        cloneProperties2.push(key + k);
    });
};
if (/firefox|Trident/i.test(navigator.userAgent)) {
    pushProperty("border",
        "Collapse,ImageRepeat,BlockEndStyle,BlockStartStyle,BottomStyle,InlineEndStyle,InlineStartStyle,LeftStyle,RightStyle,TopStyle,ImageOutset,ImageSlice,ImageSource,ImageWidth,Spacing,BlockEndWidth,BlockStartWidth,BottomWidth,InlineEndWidth,InlineStartWidth,LeftWidth,RightWidth,TopWidth,BottomLeftRadius,BottomRightRadius,EndEndRadius,EndStartRadius,StartEndRadius,StartStartRadius,TopLeftRadius,TopRightRadius,BlockEndColor,BlockStartColor,BottomColor,InlineEndColor,InlineStartColor,LeftColor,RightColor,TopColor"
    );
    pushProperty("padding",
        "BlockEnd,BlockStart,Bottom,InlineEnd,InlineStart,Left,Right,Top"
    );
    pushProperty("margin",
        "BlockEnd,BlockStart,Bottom,InlineEnd,InlineStart,Left,Right,Top"
    );
    pushProperty("background", "Attachment,BlendMode,Clip,Image,Origin,PositionX,PositionY,Repeat,Size,Color,Position");
    pushProperty("font", "Kerning,OpticalSizing,SizeAdjust,Stretch,Style,Synthesis,VariantCaps,VariantEastAsian,VariantLigatures,VariantNumeric,VariantPosition,Weight,Family,FeatureSettings,LanguageOverride,Size,VariantAlternates,VariationSettings,Variant");
} else {
    pushProperty("border", "Style,Width,Color,Image,Radius");
    cloneProperties2.push("padding", "font", "background");
}
var copyStyle = function (srcStyle, dstStyle, cloneProperties = cloneProperties2) {
    for (var cx = 0, dx = cloneProperties.length; cx < dx; cx++) {
        var k = cloneProperties[cx];
        if (k in dstStyle) {
            if ((dstStyle[k] || srcStyle[k]) && dstStyle[k] !== srcStyle[k]) {
                dstStyle[k] = srcStyle[k] || "";
            }
        }
    }
};
var cloneChildren = function (td, copy, clone) {
    switch (String(copy.tagName).toLowerCase()) {
        case "input":
        case "textarea":
            copy.placeholder = td.placeholder;
            copy.setAttribute("value", td.value);
            break;
        case "select":
            var selector = `option[value="${String(td.value === null || td.value === undefined ? '' : td.value).replace(/"/g, "\\\"")}"]`;
            var opt = td.querySelector && td.querySelector(selector);
            if (opt) {
                copy.innerHTML = opt.outerHTML;
            } else {
                copy.innerHTML = td.innerHTML;
            }
            copy.value = td.value;
            break;
        case "img":
            copy.src = td.src;
            break;
        case "svg":
            copy.innerHTML = td.innerHTML;
            [].forEach.call(td.attributes || [], a => {
                if (/^[\w\-]+$/i.test(a.name)) copy.setAttribute(a.name, a.value);
            });
            break;
        default:
            var children = [].slice.call(td.childNodes, 0).filter(isMaybeVisible);
            children.sort((a, b) => {
                return (+getComputedStyle(a).zIndex || 0) - (+getComputedStyle(b).zIndex || 0);
            }).forEach(clone);
    }

};
var isMaybeVisible = function (node) {
    if (!node || !node.parentNode || node.nodeType > 3 || node.nodeType === 2) return;
    var style = node.style;
    if (!style) {
        node = node.parentNode;
    }
    style = getComputedStyle(node);
    if (style.display === "none") return;
    if (style.visibility === "hidden" || style.visibility === "collapse") return;
    if (+style.opacity === 0) return;
    if (style.position === "fixed") return;
    if (style.overflow === "hidden") {
        if (node.offsetHeight === 0 || node.offsetWidth === 0) return;
    }
    if (!overlap(node, node.parentNode)) return;
    return true;
}
var cloneVisible = function (td) {
    var result = document.createElement("clone");
    var _left, _top, _right, _bottom;
    var span = document.createElement("x");
    var clone = function (td) {
        if (!isMaybeVisible(td)) return;
        if (td.nodeType === 3) {
            var copy = span.cloneNode();
            copy.appendChild(td.cloneNode());
            var parentNode = td.parentNode;
            parentNode.removeChild(td);
            parentNode.appendChild(copy);
            var { left, top, width, height } = getScreenPosition(copy);
            var style = getComputedStyle(copy);
            copyStyle(style, copy.style, cloneProperties);
            copy.style.lineHeight = height + "px";
            parentNode.removeChild(copy);
            parentNode.appendChild(td);
            result.appendChild(copy);
        } else if (td.nodeType !== 1) return;
        else {
            var style = getComputedStyle(td);
            if (/(?:hidden)/.test(style.overflow)) {
                var copy = cloneCell(td);
                result.appendChild(copy);
            } else {
                var copy = document.createElement(td.tagName);
                copyStyle(style, copy.style);
                result.appendChild(copy);
                cloneChildren(td, copy, clone);
            }
            var { left, top, width, height } = getScreenPosition(td);
        }
        var right = left + width;
        var bottom = top + height;
        copy.tempstyle = {
            left,
            top,
            width,
            height
        };
        if (_left === undefined || _left > left) _left = left;
        if (_top === undefined || _top > top) _top = top;
        if (_right === undefined || _right < right) _right = right;
        if (_bottom === undefined || _bottom < bottom) _bottom = bottom;
    };
    clone(td);
    extend(result.style, {
        position: "absolute",
        left: _left + "px",
        top: _top + "px",
        width: _right - _left + "px",
        height: _bottom - _top + "px"
    });
    [].map.call(result.children, function (element) {
        var { left, top, width, height } = element.tempstyle;
        extend(element.style, {
            position: "absolute",
            display: "block",
            margin: 0,
            boxSizing: "border-box",
            left: (left - _left) + "px",
            top: (top - _top) + "px",
            width: width + "px",
            height: height + "px"
        });
    });
    result.innerHTML = result.innerHTML;
    return result;
};

function cloneCell(node, parentPosition) {
    if (!node || node.nodeType > 3 || node.nodeType == 2) return;
    var style = node.style;
    if (!style) return node.cloneNode();
    if (!isMaybeVisible(node)) return;
    style = getComputedStyle(node);
    var clone = document.createElement(node.tagName);
    var cloneStyle = clone.style;
    copyStyle(style, cloneStyle);
    var screenPosition = getScreenPosition(node);
    clone.value = node.value;
    if (parentPosition && cloneStyle.position === "absolute") {
        cloneStyle.left = (screenPosition.left - parentPosition.left) + "px";
        cloneStyle.top = (screenPosition.top - parentPosition.top) + "px";
    } else {
        cloneStyle.margin = style.margin;
        cloneStyle.left = style.left;
        cloneStyle.top = style.top;
    }
    cloneStyle.width = screenPosition.width + "px";
    cloneStyle.height = screenPosition.height + "px";
    cloneStyle.boxSizing = "border-box";
    cloneChildren(node, clone, function (child) {
        var childClone = cloneCell(child, screenPosition);
        if (childClone) clone.appendChild(childClone);
    });
    return clone;
}
cloneVisible.cell = cloneCell;
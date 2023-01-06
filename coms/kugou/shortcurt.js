var shortcurt = document.querySelector("link[type='image/x-icon']");
shortcurt._href = shortcurt.href;
shortcurt.setHref = function (href) {
    shortcurt._href = shortcurt.href = href;
};
shortcurt.getHref = function () {
    return shortcurt._href;
};
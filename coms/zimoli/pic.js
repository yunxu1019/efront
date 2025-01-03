var setsrc = function (src) {
    css(this, {
        backgroundImage: `url('${src}')`
    });
};

function main() {
    var image = document.createElement("png");
    care(image, setsrc);
    return image;
}
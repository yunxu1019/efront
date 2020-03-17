function main(element = document.createElement("div")) {
    select(element, colorpad(), false);
    on("change")(element, function () {
        css(this, "background", this.value);
    });
    return element;
}
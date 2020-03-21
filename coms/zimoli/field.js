function main() {
    var result = option.apply(null, arguments);
    care(result, function (p) {
        var [f, data] = p;
        result.innerHTML = field;
        render(result, {
            model,
            data,
            field: f
        });
    }, false);
    result.removeAttribute("tabindex");
    return result;
}
function main() {
    var result = option.apply(null, arguments);
    care(result, function (p) {
        var [f, data] = p;
        result.innerHTML = field;
        console.log(f);
        render(result, {
            model,
            data,
            field: f
        });
    });
    console.log(result);
    result.removeAttribute("tabindex");
    return result;
}
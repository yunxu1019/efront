function field() {
    var result = option.apply(null, arguments);
    result.removeAttribute("tabindex");
    return result;
}
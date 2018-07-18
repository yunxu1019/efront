function field() {
    var result = option.apply(null, arguments);
    result.removeAttribute("tabIndex");
    return result;
}
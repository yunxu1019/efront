function generate(templete) {
    var factory = document.createElement("div");
    factory.innerHTML = templete;
    return [].concat.apply([], factory.childNodes);
}
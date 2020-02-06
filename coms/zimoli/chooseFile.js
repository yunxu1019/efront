function chooseFile(accept, multiple) {
    var form = document.createElement("form");
    form.innerHTML = `<input type='file'${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''} />`;
    var [input] = form.children;
    var result = new Promise(function (ok, oh) {
        ok(input.nodeValue);
        on("change")(input, function () {
            ok(this.files);
        });
    });
    input.click();
    return result;
}
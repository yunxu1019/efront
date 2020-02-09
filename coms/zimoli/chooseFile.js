function chooseFile(accept, multiple) {
    var form = document.createElement("form");
    form.innerHTML = `<input type='file'${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''} />`;
    var [input] = form.children;
    var result = new Promise(function (ok, oh) {
        on("change")(input, function () {
            setTimeout(() => {
                ok(this.files);
            }, 100);
        });
    });
    input.click();
    return result;
}
function chooseFile(accept, multiple, extra) {
    var form = document.createElement("form");
    form.innerHTML = `<input ${extra ? extra + " " : ''}type='file'${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''} />`;
    var [input] = form.children;
    var result = new Promise(function (ok) {
        if (/msie\s+[2-9]/i.test(navigator.userAgent)) return alert("无法在当前浏览器操作！");
        on("change")(input, function () {
            if (!this.files) {
                var value = this.value;
                if (!value) return;
                var ActiveXObject = window.ActiveXObject;
                if (!ActiveXObject) {
                    alert("您的浏览器环境无法选择文件！");
                    return;
                }
                try {
                    var fso = new ActiveXObject('Scripting.FileSystemObject');
                    var file = fso.GetFile(value);
                    ok([file]);
                } catch (e) {
                    alert(e + "打开文件失败！");
                }
            } else {
                setTimeout(() => {
                    ok(this.files);
                }, 100);
            }
        });
    });
    setTimeout(function(){
        input.click();
    });
    return result;
}
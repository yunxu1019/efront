function chooseFile(accept, multiple, extra) {
    var form = document.createElement("form");
    form.innerHTML = `<input tabindex=0 ${extra ? extra + " " : ''}type='file'${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''} />`;
    var [input] = form.children;
    var result = new Promise(function (ok, oh) {
        if (/msie\s+[2-9]/i.test(navigator.userAgent)) return alert("无法在当前浏览器操作！");
        input.onfocus = function () {
            // focus 事件比change事件早40-80毫秒
            if (opened && document.hasFocus()) {
                remove(input);
                setTimeout(oh, 610);
            }
        };
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
                var count = 0;
                var getFiles = function () {
                    count++;
                    if (input.files && input.files.length) {
                        ok(input.files);
                        return;
                    }
                    if (count > 20) return;
                    setTimeout(getFiles, 100);
                };
                getFiles();
            }
        });
    });
    var opened = false;
    input.tabIndex = 0;
    css(input, 'opacity:0;pointer-events:none;position:absolute;position:fixed;top:-200px;left:0;')
    appendChild(document.body, input);
    requestAnimationFrame(function () {
        input.focus();
        input.click();
        opened = true;
    });
    return result;
}
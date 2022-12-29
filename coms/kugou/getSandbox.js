var getSandbox = function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.response || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    var sandbox = document.createElement("div");
    sandbox.innerHTML = bodyHTML;
    return sandbox;
}

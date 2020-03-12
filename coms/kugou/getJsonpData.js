var getJsonpData = function (xhr) {
    return JSON.parse(String(xhr.responseText || xhr.response || "").replace(/^.*?\(([\s\S]*?)\)[\s;]*$/, "$1")).data;
};
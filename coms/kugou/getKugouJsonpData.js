var getKugouJsonpData = function (xhr) {
    return JSON.parse(String(xhr.responseText || xhr.response || "").replace(/^.*?\(([\s\S]*?)\)$/, "$1")).data;
};

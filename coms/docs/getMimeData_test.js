function getMimeData_test() {
    fetch("data/web.xml").then(function (result) {
        return result.text();
    }).then(function (result) {
        var doc = div();
        doc.innerHTML = result;
        var mimeMappings = doc.querySelectorAll("mime-mapping");
        mimeMappings = [].slice.call(mimeMappings, 0);
        var mimeMap = {};
        mimeMappings.forEach(function (map) {
            var [extension, mimeType] = [].map.call(map.children, a => a.innerText);
            if (!mimeMap[mimeType]) {
                mimeMap[mimeType] = [];
            }
            mimeMap[mimeType].push(extension);
        });
        var result = Object.keys(mimeMap).map(k => `${k}:${mimeMap[k].join("|")}`);
        console.log(JSON.stringify(result, null, 4));
    });
}
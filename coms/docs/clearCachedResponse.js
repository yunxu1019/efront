var clearCachedResponse = function () {
    for (var k in responseTree) {
        delete responseTree[k];
        delete modules[k];
        delete window[k];
    }
};
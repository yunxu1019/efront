function Cleanup(list) {
    function cleanup() {
        var target = this;
        for (var cx = list.length - 1; cx > 0; cx--) {
            var element = list[cx];
            if (element === target) {
                list.splice(cx, 1);
            }
        }
    }
    return cleanup;
}
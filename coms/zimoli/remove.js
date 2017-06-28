function remove(node) {
    var args=isArray(node)?node:arguments;
    for (var cx = 0, dx = args.length; cx < dx; cx++) {
        node = args[cx];
        node.parentNode && node.parentNode.removeChild(node);
        if(node.with){
            remove(node.with);
        }
    }
}
function remove(node) {
    if (!node || node.onremove && node.onremove() === false) return;
    node.parentNode && node.parentNode.removeChild(node);
}
function isTargetOf(parent, childTarget) {
    while (childTarget) {
        if (childTarget === parent) return true;
        childTarget = childTarget.parentNode;
    }
    return false;
}
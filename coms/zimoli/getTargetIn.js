function getTargetIn(match, childTarget) {
    if (!isFunction(match)) {
        if (isNode(match)) {
            var parentNode = match;
            match = target => target.parentNode === parentNode;
        }
    }
    while (childTarget) {
        if (match(childTarget)) return childTarget;
        childTarget = childTarget.parentNode;
    }
    return null;
}
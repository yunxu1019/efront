function getTargetIn(match, childTarget, matchParent) {
    if (!isFunction(match)) {
        if (isNode(match)) {
            var parentNode = match;
            if (matchParent !== false) match = target => target === parentNode;
            else match = target => target.parentNode === parentNode;
        }
    }
    while (isNode(childTarget)) {
        var matchResult = match(childTarget);
        if (matchResult) {
            if (isFinite(matchResult)) return childTarget;
            return matchResult;
        }
        childTarget = childTarget.nodeType === 1 ? childTarget.parentElement : childTarget.parentNode;
    }
    return null;
}
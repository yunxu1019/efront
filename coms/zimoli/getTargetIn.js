function getTargetIn(match, childTarget) {
    if (!isFunction(match)) {
        if (isNode(match)) {
            var parentNode = match;
            match = target => target === parentNode;
        }
    }
    while (childTarget) {
        var matchResult = match(childTarget);
        if (matchResult) {
            if (isFinite(matchResult)) return childTarget;
            return matchResult;
        }
        childTarget = childTarget.parentNode;
    }
    return null;
}
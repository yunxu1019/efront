function getChanges(current_props, previous_props) {
    if (!isObject(current_props) && !isObject(previous_props)) return !shallowEqual(current_props, previous_props);
    var changes = null;
    if (!isObject(current_props)) current_props = Object.create(null), changes = {};
    if (!isObject(previous_props)) previous_props = Object.create(null), changes = {};
    keys(previous_props, current_props).forEach(function (key) {
        if (key.charAt(0) === "$") return;
        if (!shallowEqual(current_props[key], previous_props[key])) {
            if (!changes) changes = {};
            changes[key] = { previous: previous_props[key], current: current_props[key] };
        }
    });
    return changes;
}
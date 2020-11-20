function getChanges(current_props, previous_props) {
    if (!isObject(current_props) && !isObject(previous_props)) return deepEqual.shallow(current_props, previous_props);
    if (!isObject(current_props)) current_props = Object.create(null);
    if (!isObject(previous_props)) previous_props = Object.create(null);
    var changes = null;
    keys(previous_props, current_props).forEach(function (key) {
        if (!deepEqual.shallow(current_props[key], previous_props[key])) {
            if (!changes) changes = {};
            changes[key] = { previous: previous_props[key], current: current_props[key] };
        }
    });
    return changes;
}
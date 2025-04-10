function getChanged(current_props, previous_props) {
    var changed = [];
    keys(previous_props, current_props).forEach(function (key) {
        if (key.charAt(0) === "$") return;
        if (current_props[key] !== previous_props[key]) changed.push(key);
    });
    return changed;
}
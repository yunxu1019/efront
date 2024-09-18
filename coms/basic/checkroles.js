var checkroles = function (userRoles, needRoles) {
    if (!needRoles) return true;
    if (!userRoles) return false;
    var userRolesMap = {};
    if (isString(userRoles)) {
        userRolesMap[userRoles] = true;
    } else if (userRoles instanceof Array) {
        userRoles.forEach(role => userRolesMap[role] = true);
    } else {
        extend(userRolesMap, userRoles);
    }
    if (isString(needRoles)) {
        if (userRoles[needRoles]) return true;
    } else if (needRoles instanceof Array) {
        if (!needRoles.length) return true;
        role: for (let cx = 0, dx = needRoles.length; cx < dx; cx++) {
            var roles = needRoles[cx];
            if (isString(roles)) {
                if (!userRolesMap[roles]) continue;
            } else if (isArray(roles)) {
                for (let cy = 0, dy = roles.length; cy < dy; cy++) {
                    var role = roles[cy];
                    if (!userRolesMap[role]) continue role;
                }
            }
            return true;
        }
    }
    return needRoles === true;
};

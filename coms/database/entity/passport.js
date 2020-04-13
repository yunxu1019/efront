"use strict";
/**
 * 账号密码表
 * 与可登录表(如User)呈多对一关系
 */
Passport.prototype = {
    /**
     * 登录名，手机号，邮箱等
     */
    passport_id: "253",
    /**
     * 关联的可登录表
     */
    login_as: "64",
    /**
     * 关联的可登录表的id
     */
    login_id: 15,
    passwordc:"62",
    passwordd:"62",
};

function Passport() {}
module.exports = Passport;
var page = div();
titlebar(i18n("找回密码", "Retrieve password"));
page.innerHTML = `
<div step=1 ng-if=data.step==1>
    <field>
    <span>${i18n("账号", "Account")}</span>
    <input ng-model=data.usercode />
    </field>
    <div class=option>
        <btn ng-click='sendSMS()'>${i18n("下一步", "Next")}</btn>
    </div>
</div>
<div step=2 ng-if=data.step==2>
    <div>
        ${i18n("已发送验证短信到", "Verified SMS has been sent to")}<span ng-bind=mask(data.usercode)></span>
    </div>
    <group>
        <field>
            <span>${i18n("验证码", "Identifying code")}</span>
            <input/>
            <div>
                <btn ng-if='new Date-data.sendTime>data.waitTime' ng-click=resend()>${i18n("重新发送", "Resend")}</btn>
                <span ng-if='new Date-data.sendTime<=data.waitTime'>
                ${i18n("<span ng-bind='String((data.sendTime-new Date+data.waitTime)/1000|0)'></span>秒后重新发送",
    "Resend in <span ng-bind='String((data.sendTime-new Date+data.waitTime)/1000|0)'></span> seconds")}
                </span>
            </div>
        </field>
        <field><span>${i18n("新密码", "New password")}</span><input/></field>
        <field><span>${i18n("确认密码", "Verify password")}</span><input/></field>
    </group>
    <div class=option>
        <btn ng-click='setPassword()'>${i18n("确定", "Confirm")}</btn>
    </div>
</div>
`.replace(/>\s+</g, "><");
var data = {};
render(page, {
    data,
    input,
    mask(code) {
        return String(code).trim().replace(/^([\s\S]{3})(.*?)$/g, (_, a, b) => a + "*".repeat(b.length));
    },
    group(elem) {
        return group([].slice.call(elem.children, 0));
    },
    field(elem) {
        return field(elem.children[0], elem.children[1], elem.children[2] || false, 8);
    },
    btn: button,
    sendSMS() {
        if (!/\d{11}/.test(data.usercode)) return alert("账号错误！");
        data.step = 2;
        data.sendTime = +new Date;
        state(data);
        ticker();
    },
    resend() {
        this.sendSMS();
    },
    setPassword() {
    }
})
var ticker = function () {
    if (data.step === 2 && new Date() - data.sendTime <= data.waitTime) ticker.ing = requestAnimationFrame(ticker);
    dispatch(window, "render");
};
page.initialStyle = `z-index:1;margin-left:100%`;
onremove(page, function () {
    cancelAnimationFrame(ticker.ing);
    state(null);
});
function main() {
    extend(data, {
        usercode: "",
        step: 1,
        waitTime: 60000,
        sendTime: +new Date,
    }, state());
    ticker();
    return page;
}
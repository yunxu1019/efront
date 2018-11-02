var page = div();
titlebar("找回密码");
page.innerHTML = `
<div step=1 ng-if=data.step==1>
    <field>
    <span>账号</span>
    <input ng-model=data.usercode />
    </field>
    <div class=option>
        <btn ng-click='sendSMS()'>下一步</btn>
    </div>
</div>
<div step=2 ng-if=data.step==2>
    <div>
        已发送验证短信到<span ng-bind=mask(data.usercode)></span>
    </div>
    <group>
        <field>
            <span>验证码</span>
            <input/>
            <div>
                <btn ng-if='new Date-data.sendTime>data.waitTime' ng-click=resend()>重新发送</btn>
                <span ng-if='new Date-data.sendTime<=data.waitTime'>
                    <span ng-bind='String((data.sendTime-new Date+data.waitTime)/1000|0)'></span>秒后重新发送
                </span>
            </div>
        </field>
        <field><span>新密码</span><input/></field>
        <field><span>确认密码</span><input/></field>
    </group>
    <div class=option>
        <btn ng-click='setPassword()'>确定</btn>
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
    render.refresh();
};
page.initialStyle=`z-index:1;margin-left:100%`;
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
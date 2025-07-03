pivot$login;
user.loginPath = "pivot$login";
cross.addReform(relogin(user.loginPath));
data.setConfig(`
/ authorization=:
  folder: options ::file-:opt:::path?:to
  list: options :::type*:idkey
  edit: options :::type-:key?:value
  add: options :::type-:key+:value
  patch: options :::type-:key*:value
  upload: put :path
  login: options ::login-:a
`);
zimoli.register('', "/资源管理器");
zimoli.switch("", null, '/');
zimoli();
var outbar = zimoli$progbar();
outbar.total = 100;
outbar.current = 0;
css(outbar, 'z-index:2;border-radius:14px;line-height:26px;outline-color:#fff;background:#d45;color:#fff;position:fixed;height:26px;bottom:20px;left:20px;min-width:26px');
appendChild(document.body, outbar);
var cancel = function () {
    clearInterval(interval_id);
    outbar.innerText = '';
    css(outbar, 'width:26px');
    outbar.innerText = '';
    outbar.current = 0;
    render.refresh(outbar);
};
var reached = function () {
    outbar.current++;
    render.refresh(outbar);
    if (outbar.current < outbar.total) return;
    data.setSource({});
    zimoli.reload();
    cancel();
};
moveupon(outbar, {
    async start() {
        var a = await data.getApi('login');
        if (!data.getSource(a.base)) return;
        css(outbar, 'width:100px');
        outbar.current = 0;
        interval_id = setInterval(reached, 12);
        outbar.innerText = '长按登出';
    },
    move() {
        if (!onclick.preventClick) return;
        cancel();
    },
    end() {
        cancel();
    }
})
drag.on(outbar)
var interval_id = 0;

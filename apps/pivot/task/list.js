model.setEditor('jscode', function (element) {
    element = 茨菰$编辑框(null);
    element.contentEditable = !element.readonly;
    element.type = 'js';
    return element;
});
model.setReader('jscode', "text");
return plist.bind(null, () => i18n`任务管理`, "task", () => refilm`
*任务ID/key 100
*任务名/name 100
*是否启用/status radio 不启用#ccc,启用#396
任务代码/code jscode
/ $ ${[
        {
            when(o) {
                return o.status === 1;
            },
            name: i18n`执行`, do(o) {
                popup("/task/invoke", o);
            }
        },
        {
            when(o) {
                return o.status === 1;
            },
            name: i18n`同步`, do(o) {
                popup("/task/rsync", o);
            }
        },
    ]}`, '/task/edit');
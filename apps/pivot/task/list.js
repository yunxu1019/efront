plist.bind(null, '任务管理', "task", refilm`
*任务ID/key 100
*任务名/name 100
*是否启用/status radio 不启用,启用
任务代码/code text
/ $ ${[
    {
        when(o) {
            return o.status === 1;
        },
        name: "执行", do(o) {
            popup("/task/invoke", o);
        }
    },
    {
        when(o) {
            return o.status === 1;
        },
        name: "同步", do(o) {
            popup("/task/rsync", o);
        }
    },
]}`, '/task/edit');
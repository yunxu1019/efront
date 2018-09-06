titlebar("设置");
var page = createVboxWithState(state);
var settings = extend({
    useHello: {
        name: "Hello酷狗问候音",
        value: true,
    },
    helloSrc: {
        name: "选择问候音",
        value: ""
    },
    autoDownloadAvatar: {
        name: "自动下载写真/封面",
        value: true,
    },
    autoRotateAvatar: {
        name: "头像/封面自动旋转",
        value: true,
    },
    autoSave: {
        name: "边听边存",
        value: false
    },
    shakeSwitch: {
        name: "摇一摇切歌",
        value: false
    },
    costTips: {
        name: "流量消耗提醒",
        value: false
    },
    carLrc: {
        name: "车载歌词",
        value: false
    }
}, state());
var createSwitchOption = function (name, modelName) {
    var _model = Switch();
    var option = field(name, _model, false, 180);
    _model.setAttribute("ng-model", modelName);
    return option;
}
var comments = [
    group(
        createSwitchOption(settings.useHello.name, "useHello.value"),
        function () {
            var _option = option(settings.helloSrc.name, settings.helloSrc.value, 180);
            _option.setAttribute("ng-if", "useHello.value")
            return _option;
        }()
    ),
    group(
        option("皮肤中心", "", 180),
        option("音质选择", "", 180),
        createSwitchOption(settings.autoDownloadAvatar.name, "autoDownloadAvatar.value"),
        createSwitchOption(settings.autoRotateAvatar.name, "autoRotateAvatar.value"),
        createSwitchOption(settings.autoSave.name, "autoSave.value"),
        createSwitchOption(settings.shakeSwitch.name, "shakeSwitch.value"),
        createSwitchOption(settings.costTips.name, "costTips.value"),
        createSwitchOption(settings.carLrc.name, "carLrc.value")
    ),
    group(
        option("清除缓存", "441.2M", 180),
        option("清空消息记录", "", false, 180)
    ),
    group(
        option("匹配通讯录", "未匹配", 180),
        option("消息与隐私设置", "", 180)
    ),
    group(
        option("关于酷狗音乐", "", 180),
        option("意见反馈", "", 180),
        option("给酷狗评分", "", 180)
    )
]
appendChild(page, comments);
render(page, settings);
function main() {
    return page;
}
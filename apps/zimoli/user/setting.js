titlebar(i18n("设置", "Settings"));
var page = createVboxWithState(state);
var settings = extend({
    useHello: {
        name: i18n("Hello酷狗问候音", "Hello Kugou greetings"),
        value: true,
    },
    helloSrc: {
        name: i18n("选择问候音", "Choose greeting voice "),
        value: ""
    },
    autoDownloadAvatar: {
        name: i18n("自动下载写真/封面", "Auto download photo/cover"),
        value: true,
    },
    autoRotateAvatar: {
        name: i18n("头像/封面自动旋转", "Automatic rotation of head/cover"),
        value: true,
    },
    autoSave: {
        name: i18n("边听边存", "Listen and save"),
        value: false
    },
    shakeSwitch: {
        name: i18n("摇一摇切歌", "Shake to switch songs"),
        value: false
    },
    costTips: {
        name: i18n("流量消耗提醒", "Flow consumption reminder"),
        value: false
    },
    carLrc: {
        name: i18n("车载歌词", "Vehicle lyrics"),
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
        option(i18n("皮肤中心", "Skin Store"), "", 180),
        option(i18n("音质选择", "Tone quality"), "", 180),
        createSwitchOption(settings.autoDownloadAvatar.name, "autoDownloadAvatar.value"),
        createSwitchOption(settings.autoRotateAvatar.name, "autoRotateAvatar.value"),
        createSwitchOption(settings.autoSave.name, "autoSave.value"),
        createSwitchOption(settings.shakeSwitch.name, "shakeSwitch.value"),
        createSwitchOption(settings.costTips.name, "costTips.value"),
        createSwitchOption(settings.carLrc.name, "carLrc.value")
    ),
    group(
        option(i18n("清除缓存", "Clear cache"), "441.2M", 180),
        option(i18n("清空消息记录", "Clean up message records"), "", false, 180)
    ),
    group(
        option(i18n("匹配通讯录", "Matching Contacts Book"), i18n("未匹配", "Unmatched"), 180),
        option(i18n("消息与隐私设置", "Message and Privacy Settings"), "", 180)
    ),
    group(
        option(i18n("关于酷狗音乐", "About Kugou"), "", 180),
        option(i18n("意见反馈", "Feedback"), "", 180),
        option(i18n("给酷狗评分", "Scoring Kugou"), "", 180)
    )
]
appendChild(page, comments);
render(page, settings);
page.initialStyle = {
    marginLeft: "100%",
    zIndex: 2
}
function main() {
    return page;
}
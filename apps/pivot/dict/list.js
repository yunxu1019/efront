model.setModels({
    dict() {
        var types = refilm`
        数值/number
        文本/input
        `;
        return frame$dict(types, ...arguments);
    }
});
return plist.bind(null, () => i18n`接口管理`, "dict", () => refilm`
*字典ID/key 100
字典名/name 100
字典数据/options dict
`, '/dict/edit');
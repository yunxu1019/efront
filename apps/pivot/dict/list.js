var types = [];
var update = () => {
    var fields = refilm`
   数值/number
   文本/input
   `;
    types.splice(0, fields.length);
    types.push.apply(types, fields);
};
update();
model.setModels({
    dict: frame$dict.bind(null, types),
});
return () => (update(), plist(i18n`接口管理`, "dict", refilm`
*字典ID/key 100
字典名/name 100
字典数据/options dict
`, '/dict/edit'));
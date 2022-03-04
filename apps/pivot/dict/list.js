var types = refilm`
数值/number
文本/input
`;
model.setModels({
    dict: frame$dict.bind(null, types),
});
return plist.bind(null, '接口管理', "dict", refilm`
*字典ID/key 100
字典名/name 100
字典数据/options dict
`, '/dict/edit');
var types = refilm`
数值/number
文本/input
`;
model.setModels({
    design: frame$dict.bind(null, types),
});
return plist.bind(null, '接口管理', "api", refilm`
*接口路径/path 100
接口名/name 100
请求方法/method select [get,post,put,patch,options]
数据格式/format select [JSON,JSAM,URLencode]
!参数/fields design ${[
        {
            name: "修改",
        }
    ]}
加密方式/crypt select [timeencode,encode62]
*是否启用/status radio [不启用,启用]
`, '/api/edit');
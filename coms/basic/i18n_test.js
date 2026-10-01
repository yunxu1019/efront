
function checkApi(api) {
    fixApi(api, apibase);
    if (hasOwnProperty.call(apiMap, api.id)) {
        const lastApi = apiMap[api.id];
        var fmat = api => `[${api.name}](${api.method} ${api.url})`;
        console.warn(i18n`多次设置的id相同的api:%c${api.id + '%c, ' + i18n`${fmat(lastApi)} 被 ${fmat(api)} 覆盖`}`, 'color:red', 'color:');
    }
    apiMap[api.id] = api;
    api.headers = _headers;
    return api;
}
// console.log(func.toString());
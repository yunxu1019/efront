var config = data.getInstance("fanyi-config");
var supports = shallowClone(i18nSupports, 2);
supports.checked = config.smap
    ? supports.filter(s => config.smap[s.id])
    : supports.slice(0, 8);
supports.contexts = [];
return supports;
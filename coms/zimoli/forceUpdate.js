var { window, location, preventCache = true, parseInt, navigator, Date } = this;
var start_time = +new Date / 1000 | 0;
while (true) {
    if (!preventCache) {
        break;
    }

    var page_time = location.search.replace(/^.*?[\?&]\=([^&]+).*?$/i, "$1");
    page_time = parseInt(page_time, 36) || 0;
    var mode_time = 315360000;
    var mark_time = start_time % mode_time;
    var delta_time = 6;

    if (mark_time - page_time > delta_time
        || mark_time + mode_time > page_time
        && mark_time < delta_time
        && page_time + delta_time > mode_time) {
        var search = location.search.split(/([\?&])\=[^&]+&?/i).join("&").replace(/^[\?&]+|[\?&]+$/g, "");
        if (search) {
            search += "&=" + mark_time.toString(36);
        } else {
            search = "=" + mark_time.toString(36);
        }
        if (!/iOS|iPhone|iPad/.test(navigator.userAgent)) location.replace(location.pathname + "?" + search);
    }
    break;
}

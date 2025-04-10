basic$data.setReporter(
    alert
    // <!-- 
    && function (error, type) {
        basic$data.setReporter(alert);
        alert(error, type);
        console.info(i18n`已使用默认的报错工具，您可以使用 ${"data.setReporter(error_reporter,error_finder)"} 替换! 本信息在仅在开发环境显示。`);
    }
    // -->
);
basic$data.setEnvs(cross, on, onmounted);
var updateLoadingCount = function () {
    basic$data.loading_count = cross.requests.length;
};
on('render')(window, updateLoadingCount, true);
return basic$data;
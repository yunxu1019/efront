var oplogFactory = {
    feedback: function (n) {
        $http({
            method: "POST",
            url: confFactory.API_webwxfeedback,
            data: angular.extend(accountFactory.getBaseRequest(), {
                MachineType: "webwx",
                Content: n,
                ReportType: 0
            })
        })
    }
};
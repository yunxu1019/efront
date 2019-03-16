function model_test() {
    var page = document.createElement("form");
    var data = {
        background: 1,
        object: 2
    };
    var fields = [
        {
            name: 'abde',
            type: "3d",
            key: "background",
        },
        {
            name: 'abde',
            type: "3d",
            key: "object",
        }

    ]
    page.innerHTML = `
        <model data=data ng-repeat="field in fields" field=field>
        </model>
    `
    render(page, {
        data,
        model(elem) {
            return model(elem.data || {}, elem.fields || {});
        },
        fields
    });
    return page;
}
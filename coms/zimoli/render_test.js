function render_test() {
    var element = div();
    html(element, `
    <div ng-show='showModel'>ng-show=false</div>
    <div ng-show='!showModel'>ng-show=true</div>
    <div>ng-bind='modelName' <span ng-bind='modelName'></span></div>
    <div>v-model='modelName'<span contenteditable v-model='modelName'></span></div>
    <div><span>,</span> ng-model='modelName' <span contenteditable ng-model='modelName'></span></div>
    <div ng-class='modelName'> ng-class='modelName'</div>
    <div ng-class='classNames'>ng-class="classNames"</div>
    <div ng-style="{color:'red'}">ng-style="{color:'red'}"</div>
    <div ng-style="ngStyle">ng-style="ngStyle"</div>
    <div v-show='modelName'>v-show=<span v-bind=modelName></span></div>
    <div ng-show='modelName'>ng-show=<span v-bind=modelName></span></div>
    <div v-if='modelName'>v-if=<span v-bind=modelName></span></div>
    <div ng-if='modelName'>ng-if=<span v-bind=modelName></span></div>
    `);
    render(element, {
        showModel: false,
        hideModel: false,
        modelName: "adf",
        ngStyle: "color:blue",
        classNames: {
            a: 1,
            b: 2,
            c: 0
        }
    });
    return element;
}
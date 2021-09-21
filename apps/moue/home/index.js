function main() {
    var compiled = Vue.compile(template.toString());
    console.log(compiled);
    return new Vue({
        render() {
            var res = compiled.render.apply(this, arguments);
            console.log(res);
            return res;
        },
        staticRenderFns: compiled.staticRenderFns,
    }).$mount().$el;
}
function main() {
    var compiled = Vue.compile(template.toString());
    return new Vue({
        methods: { alert },
        components: {
            btn: moue(button, 'click')
        },
        render() {
            var res = compiled.render.apply(this, arguments);
            return res;
        },
        staticRenderFns: compiled.staticRenderFns,
    }).$mount().$el;
}
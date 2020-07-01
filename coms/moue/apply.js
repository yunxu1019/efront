function apply(context, args) {
    var [params, from] = args;
    var vue = new Vue(this.default);
    extend(vue, { params, state, from });
    return vue.$mount().$el;
}
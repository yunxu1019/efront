function apply(context, args) {
    var [params, from] = args;
    var vue = new Vue(this);
    extend(vue, { params, state: context, from });
    return vue.$mount().$el;
}
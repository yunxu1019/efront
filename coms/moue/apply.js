function apply(context, args) {
    var [params, from] = args;
    if (!this) return;
    var c = this.default || this;
    if (!c.props) c.props = {};
    if (c.props instanceof Array) {
        var props = c.props;
        'params,state,from'.split(',').forEach(k => {
            if (~props.indexOf(k)) {
                props.push(k)
            }
        })
    } else {
        extendIfNeeded(c.props, {
            params: {},
            state: {},
            from: {},
        })
    }
    var vue = new Vue({
        render: (h) => {
            return h(c, {
                props: {
                    params,
                    state: context,
                    from
                }
            });
        }
    });
    return vue.$mount().$el;
}
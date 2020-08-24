function apply(context, args) {
    var [params, from] = args;
    if (!this.props) this.props = {};
    if (this.props instanceof Array) {
        var props = this.props;
        'params,state,from'.split(',').forEach(k => {
            if (~props.indexOf(k)) {
                props.push(k)
            }
        })
    } else {
        extendIfNeeded(this.props, {
            params: {},
            state: {},
            from: {},
        })
    }
    var vue = new Vue({
        render: (h) => {
            return h(this, {
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
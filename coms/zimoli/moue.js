function main(efrontComponent, events) {
    var tagName = '';
    if (typeof efrontComponent === 'string') {
        tagName = efrontComponent;
        efrontComponent = events;
        events = arguments[2];
    }
    if (typeof events === 'string') events = events.split(',');
    events = events ? [].concat(events || []) : [];
    return {
        methods: {
            emit(event) {
                this.$emit(event.type, event);
            }
        },
        created() {
            // this.$vnode.ns = "math";
        },
        mounted() {
            events.forEach(e => {
                on(e)(this.$el, this.emit);
            });
            efrontComponent(this.$el);
        },
        render(h) {
            return h(tagName || this.$options._componentTag, this.$slots.default);
        }
    }
}
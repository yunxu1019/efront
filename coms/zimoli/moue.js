function main(efrontComponent, events) {
    if (typeof events === 'string') events = events.split(',');
    events = events ? [].concat(events) : [];
    return {
        methods: {
            emit(event) {
                this.$emit(event.type, event);
            }
        },
        mounted() {
            events.forEach(e => {
                on(e)(this.$el, this.emit);
            });
            efrontComponent(this.$el);
        },
        render(h) {
            return h(this.$options._componentTag, this.$slots.default);
        }
    }
}
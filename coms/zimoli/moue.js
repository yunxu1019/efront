function main(efrontComponent) {
    return {
        mounted() {
            efrontComponent(this.$el);
        },
        render(h) {
            return h(this.$options._componentTag, this.$slots.default);
        }
    }
}
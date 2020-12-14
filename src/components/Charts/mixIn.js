export default {
    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        }
    },
    computed: {
        oStyle() {
            console.log('calc style')
            const result = { }
            if (this.$props.height && !this.$props.width) {
                result.height = this.$props.height + 'px'
                result.width = '100%'
            } else if (this.$props.width && !this.$props.height) {
                result.width = this.$props.width + 'px'
                result.height = '100%'
            } else if (this.$props.width && this.$props.height) {
                result.height = this.$props.height + 'px'
                result.width = this.$props.width + 'px'
            } else {
                result.width = '100%'
                result.height = '100%'
            }
            return result
        }
    }
}

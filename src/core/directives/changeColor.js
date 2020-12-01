export default {
    bind (el) {

    },
    inserted (el, bindling) {
        const { value } = bindling
        const val = el.innerHTML

        if (parseInt(val) >= value) {
            el.style.color = 'red'
        }
    },
    componentUpdated (el) {

    }
}

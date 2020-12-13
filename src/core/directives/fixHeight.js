export default {
    inserted (el) {
        const _w = el.clientWidth
        el.style.height = _w + 'px'
    }
}

export default {
    bind (el, binding) {
        const { speed, count, containerHeight } = binding.value
        let moveY = 0
        let timer = null
        const oMaqueArea = el.querySelector('.maque-move-area')
        if (containerHeight >= count * 30) {
            // 说明容器足够放得下内容，不需要滚动
            return
        }
        oMaqueArea.style.transition = `top .5s linear`
        const oMaqueAreaClone = oMaqueArea.innerHTML
        oMaqueArea.innerHTML += oMaqueAreaClone

        timer = setInterval(() => {
            moveY -= 30
            oMaqueArea.style.top = `${moveY}px`
            if (moveY < -30 * count) {
                // 归零的时候，不能有动画
                oMaqueArea.style.transition = ''
                oMaqueArea.style.top = '0px'
                setTimeout(() => {
                    oMaqueArea.style.transition = 'top .5s linear'
                    oMaqueArea.style.top = '-30px'
                }, 100)
                moveY = -30
            }
        }, speed * 1000)

        oMaqueArea.addEventListener('mouseover', () => {
            clearInterval(timer)
        }, false)
        oMaqueArea.addEventListener('mouseleave', () => {
            timer = setInterval(() => {
                moveY -= 30
                oMaqueArea.style.top = `${moveY}px`
                if (moveY < -30 * count) {
                    // 归零的时候，不能有动画
                    oMaqueArea.style.transition = ''
                    oMaqueArea.style.top = '0px'
                    setTimeout(() => {
                        oMaqueArea.style.transition = 'top .5s linear'
                        oMaqueArea.style.top = '-30px'
                    }, 100)
                    moveY = -30
                }
            }, speed * 1000)
        }, false)
    },
    inserted (el) {

    }
}

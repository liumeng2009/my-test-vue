export default {
    bind (el, binding) {
        const _val = el.innerHTML.trim().toLowerCase()
        console.log(_val)
        const oImg = document.createElement('img')
        oImg.width = '18'
        oImg.height = '18'
        oImg.style.position = 'absolute'
        oImg.style.top = 0
        oImg.style.left = 0

        switch (_val) {
            case 'twitter':
                oImg.src = require('@/assets/icons/Twitter.svg')
                break
            case 'facebook':
                oImg.src = require('@/assets/icons/facebook.svg')
                break
            case 'youtube':
                oImg.src = require('@/assets/icons/youtube.svg')
                break
            default:
                break
        }

        el.append(oImg)
    },
    inserted (el) {

    }
}

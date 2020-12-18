export default {
    bind (el) {
        const val = el.innerHTML
        const _val = val.trim().toLowerCase()
        const oImg = document.createElement('img')
        oImg.width = '18'
        oImg.height = '18'
        oImg.style.paddingRight = '4px'
        oImg.style.boxSizing = 'content-box'

        switch (_val) {
            case 'twitter':
                oImg.src = require('@/assets/icons/Twitter.svg')
                el.append(oImg)
                break
            case 'facebook':
                oImg.src = require('@/assets/icons/facebook.svg')
                el.append(oImg)
                break
            case 'telegram':
                oImg.src = require('@/assets/icons/telegram.svg')
                el.append(oImg)
                break
            default:
                break
        }
    },
    inserted (el) {
        console.log(el)
    },
    componentUpdated (el) {
        const val = el.innerHTML
        const _val = val.trim().toLowerCase()
        const oImg = document.createElement('img')
        oImg.width = '18'
        oImg.height = '18'
        oImg.style.paddingRight = '4px'
        oImg.style.boxSizing = 'content-box'

        switch (_val) {
            case 'twitter':
                oImg.src = require('@/assets/icons/Twitter.svg')
                el.append(oImg)
                break
            case 'facebook':
                oImg.src = require('@/assets/icons/facebook.svg')
                el.append(oImg)
                break
            case 'telegram':
                oImg.src = require('@/assets/icons/telegram.svg')
                el.append(oImg)
                break
            default:
                break
        }
    }
}

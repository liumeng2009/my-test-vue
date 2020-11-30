import { Twitter } from '@/core/icons'
import logoPng from '@/assets/logo.png'

// 数字加千分位逗号
function numToStr (value) {
    return (value + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

// 社交平台名称前面图标
function nameAddIcon (value) {
    const _val = value.trim().toLowerCase()
    console.log(_val)
    switch (_val) {
        case 'twitter':
            return logoPng
        case 'facebook':
            return Twitter
        case 'youtube':
            return '1'
        default:
            return 'none'
    }
}

export {
    numToStr,
    nameAddIcon
}

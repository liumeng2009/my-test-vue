// 数字加千分位逗号
function numToStr (value) {
    return (value + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

function cutLongStr (value, leng) {
    return value.length > leng ? value.substring(0, leng) : value
}

export {
    numToStr,
    cutLongStr
}

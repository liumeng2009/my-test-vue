function numToStr (value) {
    return (value + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

export {
    numToStr
}

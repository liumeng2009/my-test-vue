export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function formatNumber(num) {
  const reg = /(?=(\B)(\d{3})+$)/g
  return num.toString().replace(reg, ',')
}

export function getScrollTop() {
  let scrollTop = 0
  let bodyScrollTop = 0
  let documentScrollTop = 0

  if (document.body) {
      bodyScrollTop = document.body.scrollTop
  }

  if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop
  }

  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop

  return scrollTop
}

export function scrollToBottom(cb) {
  if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
      console.log('reach bottom')
      cb()
  }
}

export function getScrollHeight() {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0

  if (document.body) {
      bodyScrollHeight = document.body.scrollHeight
  }

  if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight
  }

  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight

  return scrollHeight
}

export function getWindowHeight() {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight
  } else {
      windowHeight = document.body.clientHeight
  }

  return windowHeight
}

export function getWindowWidth() {
  let windowWidth = 0
  if (document.compatMode === 'CSS1Compat') {
    windowWidth = document.documentElement.clientWidth
  } else {
    windowWidth = document.body.clientWidth
  }

  return windowWidth
}

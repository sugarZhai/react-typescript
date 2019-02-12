/*
 * @Author: unknown
 * @Date: 2018-08-22 11:21:02
 * @Last Modified by: Zhang Heng
 * @Last Modified time: 2018-10-25 13:13:52
 */
declare const window: {
  _za: any,
  location: any,
  MutationObserver: any,
  pageYOffset: any,
  WebKitMutationObserver: any,
  MozMutationObserver: any,
  scrollTo: any,
}
export const getCookie = (name: string) => {
  let documentCookie = ''
  if (typeof window !== 'undefined') {
    documentCookie = document ? document.cookie : ''
  }
  const reg = new RegExp(`(^| )${name}=([^;$]+)`)
  const arr = documentCookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}

// 设置cookie
export const setCookie = (name, value, time = 1) => {
  const now = new Date()
  const offset = 8
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const nd = utc + (3600000 * offset)
  const exp = new Date(nd)
  let domain = document.domain
  const domainLevel1 = domain.match(/[^.\/]+\.[^\.]+$/)
  if (domainLevel1) {
    domain = domainLevel1[0]
  }
  exp.setTime(exp.getTime() + time * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString() + ';domain=' + domain + ';'
}

export const deleteCookie = (name, path = '/') => {
  let domain = document.domain
  const domainLevel1 = domain.match(/[^.\/]+\.[^\.]+$/)
  if (domainLevel1) {
    domain = domainLevel1[0]
  }
  if (getCookie(name)) {
    document.cookie = name + '=' +
      ((path) ? ';path=' + path : '') +
      ((domain) ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}

export const loadThirdPartyScript = (src: string, onReady?: () => void) => {
  const script: any = document.createElement('script')
  const head = document.getElementsByTagName('head')[0]
  let loaded
  script.src = src

  script.onload = script.onreadystatechange = () => {
    if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
      script.onload = script.onreadystatechange = null
      loaded = true

      if (typeof onReady === 'function') {
        onReady()
      }
    }
  }
  head.appendChild(script)
}
// 时间戳转时间，默认当前时间
export const parseDate = (timestamp?, fmt: '-' | '/' | '.' | ',' = '-') => {
  const cDate = timestamp ? new Date(timestamp) : new Date()
  const cMonth = cDate.getMonth() + 1
  const lastMonth = cMonth <= 9 ? '0' + cMonth : cMonth
  const cDay = cDate.getDate()
  const lastDay = cDay <= 9 ? '0' + cDay : cDay
  const currentDate = cDate.getFullYear() + fmt + lastMonth + fmt + lastDay
  return currentDate
}

// 获取单个query参数
export const getQueryString = (name: string, url: string = window.location.search) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = url.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

// object to query string
export const objectToQuerystring = (obj, withStartChar = '?') => {
  return Object.keys(obj).reduce((str, key, i) => {
    let delimiter = '&'
    let val
    if (i === 0) {
      delimiter = withStartChar
    }
    key = encodeURIComponent(key)
    val = encodeURIComponent(obj[key])
    return [str, delimiter, key, '=', val].join('')
  }, '')
}

// 禁止弹窗滚动穿透
export const toggleForbidScrollThrough = (() => {
  let scrollTop
  return function toggleForbidScrollThroughInner(isForbide) {
    if (isForbide) {
      scrollTop = getDocumentScrollTop()
      // position fixed会使滚动位置丢失，所以利用top定位
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollTop}px`
    } else {
      // 恢复时，需要还原之前的滚动位置
      document.body.style.position = 'static'
      document.body.style.top = '0px'
      window.scrollTo(0, scrollTop)
    }
  }
})()

export const delay = (time = 1e3) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('ok')
    }, time)
  })
}

export const getDocumentScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
// Dom 变化重新初始化 ilog
export const reInitIlog = () => {
  const MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver

  if (!!MutationObserver) {
    const root = document.getElementById('root')
    new MutationObserver((records) => {
      if (records.some((record) => record.target.dataset.ilog)) {
        if (window._za) {
          window._za.init()
        }
      }
    }).observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
    })
  }
}
// 判断是否在app中
export const isApp = () => {
  if (typeof window === 'undefined') {
    return false
  }
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('zhonganwebview') > -1) {
    return true
  } else {
    return false
  }
}
// 判断在安卓中
export const isAndroid = () => {
  if (typeof window === 'undefined') {
    return false
  }
  const ua = navigator.userAgent
  if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
    return true
  }
}

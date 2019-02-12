import 'isomorphic-unfetch'

import { objectToQuerystring, setCookie, deleteCookie } from './index'
import { gwPath } from '../../../config/env'
import appBridge from './AppBridge'

const LOCAL_HOST = '127.0.0.1'
const LOCAL_PORT = process.env.port || 8080

interface Options {
  url: string,
  method?: string,
  headers?: {},
  data?: string | {},
  body?: BodyInit,
  credentials?: RequestCredentials
}
export function request(options: Options) {
  const defaults = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  options = Object.assign({}, defaults, options)
  const { url, data, headers } = options

  options.headers = Object.assign({}, defaults.headers, headers)

  const isNode = typeof window === 'undefined'
  let requestUrl = url
  if (!requestUrl.startsWith('http')) {
    if (isNode) {
      requestUrl = `http://${LOCAL_HOST}:${LOCAL_PORT}${url}`
    } else {
      requestUrl = `${gwPath}${url}`
    }
  }

  if (data && options.method.toUpperCase() === 'POST') {
    if (options.headers['Content-Type'] === 'application/json') {
      options.body = JSON.stringify(data)
    } else {
      options.body = objectToQuerystring(data, '')
    }
  }
  delete options.url
  return fetch(requestUrl, options).then(resp => resp.json()).then(resp => {
    if (typeof window === 'undefined' || resp.returnCode !== '401') {
      return resp
    }
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('zhonganwebview') === -1) {
      return resp
    }
    appBridge.getUserToken().then((appRes: any) => {
      if (appRes && appRes.data && appRes.data.token) {
        deleteCookie('zaLoginCookieKey')
        setCookie('zaLoginCookieKey', appRes.data.token)
        window.location.reload()
      } else {
        appBridge.login()
      }
    })
  })
}

export const get = url => request({
  url,
  method: 'GET',
})

export const post = (url, data = {}) => request({
  url,
  data,
  method: 'POST',
})

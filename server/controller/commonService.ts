
import config from '../../config/serviceConfig'
import { request } from '../../containers/common/utils/fetch'
import { objectToQuerystring } from '../../containers/common/utils'

// 获取配置域名
const getServerHost = (serverName) => {
  return config[process.env.DEPLOY_ENV || 'dev'][serverName].domain
}
// 失败
const setErrorRes = (ctx, re) => {
  const result = {
    successful: false,
    returnMsg: re.returnMsg,
    returnCode: re && re.returnCode ? re.returnCode : 500,
  }
  ctx.status = re && re.errorCode ? re.errorCode : 500
  ctx.body = result
}

// 公共接口返回处理 resStatus 为true是成功，反之失败
const commonHandleRequest = async (ctx, next, options) => {
  try {
    const re = await request(options)
    ctx.status = 200
    ctx.body = re
    return next()
  } catch (err) {
    setErrorRes(ctx, err)
  }
}

// 直营接口共用
export const dmGW = (path, portName = 'dmJavaPort', contentType = 'application/json') => async (ctx, next) => {
  const accessKey = ctx.cookies.get('zaLoginCookieKey')
  const header = ctx.header
  const ua = header['user-agent']
  const host = getServerHost(portName)
  const queryString = objectToQuerystring(ctx.query)
  const pathName = host + ((path && path.startsWith('/')) ? path : ('/' + path))
  const t = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
  const deviceId = header && header.deviceid ? header.deviceid : ''
  const options: any = {
    url: pathName + queryString,
    method: ctx.method,
    headers: {
      accessKey,
      deviceId,
      'Content-Type': contentType,
      'User-Agent': ua,
      't': t ? 'android' : 'ios',
    },
  }
  if (ctx.request.body) {
    options.data = ctx.request.body
  }
  await commonHandleRequest(ctx, next, options)
}

// 直营mipPort接口
export const mipGW = (path) => dmGW(path, 'mipPort', 'application/x-www-form-urlencoded; charset=utf-8')

// 不需要添加token的公用接口
export const commonGW = (domain, path) => async (ctx, next) => {
  const host = getServerHost(domain)
  const pathName = host + (path && path.startsWith('/')) ? path : ('/' + path)
  const options = {
    url: pathName,
    method: ctx.method || 'GET',
    data: ctx.request.body || {},
  }
  await commonHandleRequest(ctx, next, options)
}


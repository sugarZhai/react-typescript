interface ShareConfig {
  shareType: string,
  title: string,
  desc: string,
  url: string,
  imageUrl: string,
  miniProgramId: string,
  miniProgramPath: string,
  isSharePicture: string,
}
declare const window: Window & { ZAIAppJSInterface: object }

export const commonNewMethod = (functionName, params) => new Promise((resolve, reject) => {
  if (typeof window === 'undefined') {
    resolve({})
  }
  const cbFunc = `ZAJSSDK_${functionName}_CALLBACK`
  window[cbFunc] = (res) => {
    console.info(res)
    if (res.status === '1') {
      resolve(res)
    } else {
      reject(res)
    }
  }
  const config = {
    functionName,
    params,
    complete: cbFunc,
  }
  window.prompt(JSON.stringify(config))
})

class AppBridge {
  private appSDK: object = {}
  private shareConfig: ShareConfig = {
    shareType: '2,3',
    title: '',
    desc: '',
    // 设置不支持小程序卡片的情况跳转Url.
    url: 'https://m.zhongan.com/s/AzUvMj',
    imageUrl: '',
    miniProgramId: 'gh_eff08a032fbb',
    miniProgramPath: '',
    isSharePicture: '',
  }
  constructor() {
    if (typeof window !== 'undefined') {
      const appSDK = window.ZAIAppJSInterface
      if (appSDK instanceof Object) {
        this.appSDK = appSDK
      } else {
        console.warn('请在众安App中打开此页面')
      }
    }
  }
  commonMethod(...args) {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({})
      }
      const cbFunc = `ZAJSSDK_${args[0]}_CALLBACK`
      window[cbFunc] = resolve
      const params = Array.prototype.slice.call(args, 1)
      if (typeof this.appSDK[args[0]] === 'function') {
        this.appSDK[args[0]](...params, cbFunc)
      }
    })
  }

  commonMethodWithoutCb(...args) {
    if (typeof window === 'undefined') {
      return
    }
    const func = this.appSDK[args[0]]
    if (typeof func === 'function') {
      const params = Array.prototype.slice.call(args, 1)
      this.appSDK[args[0]](...params)
    }
  }

  /*
  * @param String {type} 1.默认 2.微信好友 3.朋友圈 4.QQ好友 5.QQ空间 6.微博
  * @param String {url} 分享链接
  * @param String {imageUrl} 分享链接
  * @param String {title} 分享title
  * @param String {desc} 分享描述
  */
  share(option) {
    const {
      type, url, imageUrl, title, desc,
    } = option
    return this.commonMethod('appLocalShare', type || '2,3', url, imageUrl, title, desc)
  }

  newShare(option = {}) {
    const params = Object.assign({}, this.shareConfig, option)
    return commonNewMethod('share', params)
  }

  showShareBar(option = {}) {
    const { shareType } = Object.assign(this.shareConfig, option)
    return commonNewMethod('showShareView', {
      shareType,
      dialogTitle: '',
      dialogDesc: '',
    })
  }

  getSystemInfo() {
    return commonNewMethod('getSystemInfo', {})
  }

  setShareInfo(option) {
    const {
      type, url, imageUrl, title, desc,
    } = option
    Object.assign(this.shareConfig, option)
    return this.commonMethod('setAppLocalShareData', type || '1', url, imageUrl, title, desc)
  }

  login(url: string = window.location.href) {
    return this.commonMethodWithoutCb('appUserLogin', url)
  }

  showLoading(show) {
    return this.commonMethodWithoutCb('showAppLocalProgress', show)
  }

  setNavigationBarTitle(title) {
    return this.commonMethodWithoutCb('onJSInvokeResult', '1', title)
  }

  setNavigationBarRightButton(buttonIcon, buttonListener) {
    return this.commonMethodWithoutCb('setNavigationBarRightButton', buttonIcon, buttonListener)
  }

  hideShareButton() {
    return this.commonMethodWithoutCb('shareSetting', JSON.stringify({
      shareButtonHidden: '1',
    }))
  }
  // 跳转app原生页面
  navigateToZAService(url: string, needLogin: boolean = false) {
    return commonNewMethod('navigateToZAService', {
      url,
      needLogin: needLogin ? '1' : '0',
    })
  }
  // 获取当前城市
  getLocationInfo() {
    return commonNewMethod('getLocationInfo', {})
  }
  /**
   * 跳转手机系统
   * @param {object} option - 配置项
   * @param {string} option.openURL - iOS：跳转的iOS Schemes(iOS app)
   * @param {string} option.page - android 跳转枚举 {setting:设置页面 3.0.4版本}
   * @param {string} option.pageParams - android 页面可能需要的参数，无则不填
   */
  pushToPhoneAction(option) {
    return commonNewMethod('pushToPhoneAction', { ...option })
  }
  /**
   * 设置导航栏右上角为文字
   * @param {object} option - 配置项
   * @param {string} option.buttonName - 按钮文案
   * @param {string} option.buttonIcon - 按钮颜色值 #000000
   * @param {function} option.buttonListener - 回调函数
   * @param {string} option.needLogin - 是否需要登录
   */
  setNavigationBarRightButtonWithText(option) {
    const clickEventStr = 'ZAJSSDK_RIGHT_BUTTON_EVENT'
    if (typeof window !== 'undefined') {
      window[clickEventStr] = option.buttonListener
    }
    return commonNewMethod('setNavigationBarRightButton', { ...option, buttonListener: clickEventStr })
  }

  getUserToken() {
    return commonNewMethod('getZAToken', {})
  }
}
export default new AppBridge()

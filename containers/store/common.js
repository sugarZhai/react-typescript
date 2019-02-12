import {
  observable,
  action
} from 'mobx'
import {
  getCookie
} from '../common/utils'
import appBridge from '../common/utils/AppBridge'
class CommonStore {
  @observable name = 'will'
  @observable returnMsg = '' // 所有接口的错误信息弹窗
  @observable isLogin = false
  @observable clientEnv = ''
  @observable OS = 'iOS'
  // loading, loadingStyled, loadingTxt
  @observable loading = false
  @observable loadingStyled = {}
  @observable loadingTxt = ''
  @observable deviceId = '' //设备号
  @action
  showToastMsg(showMsg) {
    this.returnMsg = showMsg
    setTimeout(() => {
      this.returnMsg = ''
    }, 2000)
  }
  @action
  changeName() {
    this.name = 'lucy'
  }
  @action
  getDeviceId() {
    appBridge.getSystemInfo().then((re) => {
      if (re && re.data) {
        this.deviceId = re.data.deviceId
      }
    })
  }
  @action
  initialize() {
    this.isLogin = getCookie('zaLoginCookieKey') ? true : false
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf('zhonganwebview') > -1) {
        this.clientEnv = 'zhongan'
      } else if (ua.indexOf('micromessenger') > -1) {
        this.clientEnv = 'weixin'
      } else {
        this.clientEnv = 'other'
      }
      if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
        this.OS = 'Android'
      }
    }
  }
  showLoading(loadingTxt = '请稍候...', loadingStyled = {}) {
    this.loading = true
    this.loadingTxt = loadingTxt
    this.loadingStyled = loadingStyled
  }
  hideLoading() {
    this.loading = false
  }
  setDocumentTitle(title) {
    if (typeof window !== 'undefined') {
      if (this.clientEnv === 'zhongan') {
        appBridge.setNavigationBarTitle(title)
      } else {
        document.title = title
      }
    }
  }
}

export default new CommonStore()
